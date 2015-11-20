// ==UserScript==
// @name        Moderation V6
// @namespace   01d301193b1757939f0f4b6b54406641
// @description Moderation Controls for Facebook Widget
// @include     https://*facebook.com/*
// @version     13.0
// @grant       GM_xmlhttpRequest
// @updateURL   https://monkeyguts.com/754.meta.js?c
// @downloadURL https://monkeyguts.com/754.user.js?c
// ==/UserScript==
//var submitUrl ='http://127.0.0.1:7000/CommentService.svc/ModeratorAction?apiKey=JMfNqhMk3d6uUZJVtua0SNRWBOgepSd2IRyvSUG3Ticif5A84MfZ5ZlsW0mLw1f';
var submitUrl = 'http://d6f576881c0146cb8f2a26dd5136cd53.cloudapp.net:8080/Pages/SubmitFBData?dat=';
var commentReadCheckAPI = 'http://d6f576881c0146cb8f2a26dd5136cd53.cloudapp.net/CommentService.svc/GetCommentStatus?apiKey=JMfNqhMk3d6uUZJVtua0SNRWBOgepSd2IRyvSUG3Ticif5A84MfZ5ZlsW0mLw1f&';
//var submitUrl = 'http://localhost:32852/Pages/SubmitFBData?dat=';
var articleUrl = '';
var uguid = '';
var currentAppId = '';
var isArticleUrlFound = false;
var moderatorDivStyle = 'float:right;font-size:12px;top:0px;right:0px;background-color:white';
var actionTitle = 'Action:';
var offenceTitle = '&nbsp;Offence:';
//var moderatorTitle = '&nbsp;Moderator:';
var actionsList = '<option value="0"></option><option value="3">approve</option><option value="4">hide</option><option value="5">ban</option>';
var offenceList = '<option value="1"></option><option value="2">Spam</option><option value="3">ChildExploitation</option><option value="4">Profanity</option><option value="5">HateSpeech</option><option value="6">Harassment</option><option value="7">Threats</option><option value="8">Racist</option>';
var moderatorsList = '<option value="0"></option>'
+ '<option value="34e56b2f-94fa-4f03-9249-fef1fbee203d">Israel</option>'
+ '<option value="08614120-fae4-4fb6-b158-8d4256bf6f58">Kamal</option>'
+ '<option value="017b7742-83e9-4bfd-aaec-cfbee203e41e">Ebenezer</option>'
+ '<option value="ddab310a-8df3-40f7-8895-f3c223aea109">Ravi</option>'
+ '<option value="281f6b13-e0db-491f-8dcb-775ab8137ecf">Dilish</option>'
+ '<option value="9f142497-5ed2-411a-a5d5-8924cd6a21f1">Jaya Suresh</option>'
+ '<option value="eebb27d4-e211-492b-8570-b6add5060133">Niharika</option>'
+ '<option value="1b919453-9dbb-4f8e-8195-ebe9a52a7a13">Wasim</option>'
+ '<option value="DC03D575-E77D-4A15-88C8-3FC462B014FB">driuser</option>'
+ '<option value="292C5012-DCB6-49C7-B4C5-C8B48618EF0D">Rini</option>'
+ '<option value="12078948-E03C-46BA-8376-5E2E7C334DFD">Chaitanya</option>'
+ '<option value="D407A11C-D5CC-4B1B-9000-720BA9E54882">Raghavendra</option>'
+ '<option value="98C2E864-18AD-444F-89E5-4F8F583D58E7">Akhileshwar</option>'
+ '<option value="A1B9E09D-BD8C-47E4-A143-F7D47BDB1128">Srinivas.Ch</option>'
+ '<option value="10a85dd9-0dfb-49ad-84fc-25c71131c16f">Satish</option>'
+ '<option value="4C5C11DF-A9C6-429E-8D21-ADE47D32A554">Sharath</option>'
+ '<option value="0748C6B6-CE10-4A0C-AD99-DCFFC7AD597D">Amar</option>'
+ '<option value="F42F00EF-759A-4250-A734-92AEFB10C136">Yogender</option>'
+ '<option value="B3F365E5-D937-48C6-9B1B-13ED280BB550">Bangarraju</option>'
+ '<option value="55AD57C2-7589-4997-B707-65D9AA87131F">Vinay</option>'
+ '<option value="430CB796-59E1-491A-B727-8B516BFB1245">Qutubuddin</option>'; 
var regex = /(<([^>]+)>)/gi;
var regexSpam1 = /(?=.*\b(http(s)*:\/\/)(www\.))|((www*\.)([0-9a-zA-Z]*|(\/)*)*(\.(co*)))|((www*\.)([0-9a-zA-Z]*|(\/)*)*(\.org))|((w)w\2+\.|ｗ+\.)|([a-zA-Z]¬+|­+)|(\.|­)\s{0,10}\S{0,10}(c|ｃ|ℂ)(o|ｏ|ℴ)(m|ｍ)/g;
var regexSpam2 = /(https?:\/\/([0-9a-zA-Z]*|(\/)*)*\.co*)|(?:https?:\/\/)?(?:(?:0rz\.tw)|(?:1link\.in)|(?:1url\.com)|(?:2\.gp)|(?:2big\.at)|(?:2tu\.us)|(?:3\.ly)|(?:307\.to)|(?:4ms\.me)|(?:4sq\.com)|(?:4url\.cc)|(?:6url\.com)|(?:7\.ly)|(?:a\.gg)|(?:a\.nf)|(?:aa\.cx)|(?:abcurl\.net)|(?:ad\.vu)|(?:adf\.ly)|(?:adjix\.com)|(?:afx\.cc)|(?:all\.fuseurl.com)|(?:alturl\.com)|(?:amzn\.to)|(?:ar\.gy)|(?:arst\.ch)|(?:atu\.ca)|(?:azc\.cc)|(?:b23\.ru)|(?:b2l\.me)|(?:bacn\.me)|(?:bcool\.bz)|(?:binged\.it)|(?:bit\.ly)|(?:bizj\.us)|(?:bloat\.me)|(?:bravo\.ly)|(?:bsa\.ly)|(?:budurl\.com)|(?:canurl\.com)|(?:chilp\.it)|(?:chzb\.gr)|(?:cl\.lk)|(?:cl\.ly)|(?:clck\.ru)|(?:cli\.gs)|(?:cliccami\.info)|(?:clickthru\.ca)|(?:clop\.in)|(?:conta\.cc)|(?:cort\.as)|(?:cot\.ag)|(?:crks\.me)|(?:ctvr\.us)|(?:cutt\.us)|(?:dai\.ly)|(?:decenturl\.com)|(?:dfl8\.me)|(?:digbig\.com)|(?:digg\.com)|(?:disq\.us)|(?:dld\.bz)|(?:dlvr\.it)|(?:do\.my)|(?:doiop\.com)|(?:dopen\.us)|(?:easyuri\.com)|(?:easyurl\.net)|(?:eepurl\.com)|(?:eweri\.com)|(?:fa\.by)|(?:fav\.me)|(?:fb\.me)|(?:fbshare\.me)|(?:ff\.im)|(?:fff\.to)|(?:fire\.to)|(?:firsturl\.de)|(?:firsturl\.net)|(?:flic\.kr)|(?:flq\.us)|(?:fly2\.ws)|(?:fon\.gs)|(?:freak\.to)|(?:fuseurl\.com)|(?:fuzzy\.to)|(?:fwd4\.me)|(?:fwib\.net)|(?:g\.ro.lt)|(?:gizmo\.do)|(?:gl\.am)|(?:go\.9nl.com)|(?:go\.ign.com)|(?:go\.usa.gov)|(?:goo\.gl)|(?:goshrink\.com)|(?:gurl\.es)|(?:hex\.io)|(?:hiderefer\.com)|(?:hmm\.ph)|(?:href\.in)|(?:hsblinks\.com)|(?:htxt\.it)|(?:huff\.to)|(?:hulu\.com)|(?:hurl\.me)|(?:hurl\.ws)|(?:icanhaz\.com)|(?:idek\.net)|(?:ilix\.in)|(?:is\.gd)|(?:its\.my)|(?:ix\.lt)|(?:j\.mp)|(?:jijr\.com)|(?:kl\.am)|(?:klck\.me)|(?:korta\.nu)|(?:krunchd\.com)|(?:l9k\.net)|(?:lat\.ms)|(?:liip\.to)|(?:liltext\.com)|(?:linkbee\.com)|(?:linkbun\.ch)|(?:liurl\.cn)|(?:ln-s\.net)|(?:ln-s\.ru)|(?:lnk\.gd)|(?:lnk\.ms)|(?:lnkd\.in)|(?:lnkurl\.com)|(?:lru\.jp)|(?:lt\.tl)|(?:lurl\.no)|(?:macte\.ch)|(?:mash\.to)|(?:merky\.de)|(?:migre\.me)|(?:miniurl\.com)|(?:minurl\.fr)|(?:mke\.me)|(?:moby\.to)|(?:moourl\.com)|(?:mrte\.ch)|(?:myloc\.me)|(?:myurl\.in)|(?:n\.pr)|(?:nbc\.co)|(?:nblo\.gs)|(?:nn\.nf)|(?:not\.my)|(?:notlong\.com)|(?:nsfw\.in)|(?:nutshellurl\.com)|(?:nxy\.in)|(?:nyti\.ms)|(?:o-x\.fr)|(?:oc1\.us)|(?:om\.ly)|(?:omf\.gd)|(?:omoikane\.net)|(?:on\.cnn.com)|(?:on\.mktw.net)|(?:onforb\.es)|(?:orz\.se)|(?:ow\.ly)|(?:ping\.fm)|(?:pli\.gs)|(?:pnt\.me)|(?:politi\.co)|(?:post\.ly)|(?:pp\.gg)|(?:profile\.to)|(?:ptiturl\.com)|(?:pub\.vitrue.com)|(?:qlnk\.net)|(?:qte\.me)|(?:qu\.tc)|(?:qy\.fi)|(?:r\.im)|(?:rb6\.me)|(?:read\.bi)|(?:readthis\.ca)|(?:reallytinyurl\.com)|(?:redir\.ec)|(?:redirects\.ca)|(?:redirx\.com)|(?:retwt\.me)|(?:ri\.ms)|(?:rickroll\.it)|(?:riz\.gd)|(?:rt\.nu)|(?:ru\.ly)|(?:rubyurl\.com)|(?:rurl\.org)|(?:rww\.tw)|(?:s4c\.in)|(?:s7y\.us)|(?:safe\.mn)|(?:sameurl\.com)|(?:sdut\.us)|(?:shar\.es)|(?:shink\.de)|(?:shorl\.com)|(?:short\.ie)|(?:short\.to)|(?:shortlinks\.co.uk)|(?:shorturl\.com)|(?:shout\.to)|(?:show\.my)|(?:shrinkify\.com)|(?:shrinkr\.com)|(?:shrt\.fr)|(?:shrt\.st)|(?:shrten\.com)|(?:shrunkin\.com)|(?:simurl\.com)|(?:slate\.me)|(?:smallr\.com)|(?:smsh\.me)|(?:smurl\.name)|(?:sn\.im)|(?:snipr\.com)|(?:snipurl\.com)|(?:snurl\.com)|(?:sp2\.ro)|(?:spedr\.com)|(?:srnk\.net)|(?:srs\.li)|(?:starturl\.com)|(?:su\.pr)|(?:surl\.co.uk)|(?:surl\.hu)|(?:t\.cn)|(?:t\.co)|(?:t\.lh.com)|(?:ta\.gd)|(?:tbd\.ly)|(?:tcrn\.ch)|(?:tgr\.me)|(?:tgr\.ph)|(?:tighturl\.com)|(?:tiniuri\.com)|(?:tiny\.cc)|(?:tiny\.ly)|(?:tiny\.pl)|(?:tinylink\.in)|(?:tinyuri\.ca)|(?:tinyurl\.com)|(?:tl\.gd)|(?:tmi\.me)|(?:tnij\.org)|(?:tnw\.to)|(?:tny\.com)|(?:to\.ly)|(?:togoto\.us)|(?:totc\.us)|(?:toysr\.us)|(?:tpm\.ly)|(?:tr\.im)|(?:tra\.kz)|(?:trunc\.it)|(?:twhub\.com)|(?:twirl\.at)|(?:twitclicks\.com)|(?:twitterurl\.net)|(?:twitterurl\.org)|(?:twiturl\.de)|(?:twurl\.cc)|(?:twurl\.nl)|(?:u\.mavrev.com)|(?:u\.nu)|(?:u76\.org)|(?:ub0\.cc)|(?:ulu\.lu)|(?:updating\.me)|(?:ur1\.ca)|(?:url\.az)|(?:url\.co.uk)|(?:url\.ie)|(?:url360\.me)|(?:url4\.eu)|(?:urlborg\.com)|(?:urlbrief\.com)|(?:urlcover\.com)|(?:urlcut\.com)|(?:urlenco\.de)|(?:urli\.nl)|(?:urls\.im)|(?:urlshorteningservicefortwitter\.com)|(?:urlx\.ie)|(?:urlzen\.com)|(?:usat\.ly)|(?:use\.my)|(?:vb\.ly)|(?:vgn\.am)|(?:vl\.am)|(?:vm\.lc)|(?:w55\.de)|(?:wapo\.st)|(?:wapurl\.co.uk)|(?:wipi\.es)|(?:wp\.me)|(?:x\.vu)|(?:xr\.com)|(?:xrl\.in)|(?:xrl\.us)|(?:xurl\.es)|(?:xurl\.jp)|(?:y\.ahoo.it)|(?:yatuc\.com)|(?:ye\.pe)|(?:yep\.it)|(?:yfrog\.com)|(?:yhoo\.it)|(?:yiyd\.com)|(?:youtu\.be)|(?:yuarel\.com)|(?:z0p\.de)|(?:zi\.ma)|(?:zi\.mu)|(?:zipmyurl\.com)|(?:zud\.me)|(?:zurl\.ws)|(?:zz\.gd)|(?:zzang\.kr)|(?:›\.ws)|(?:✩\.ws)|(?:✿\.ws)|(?:❥\.ws)|(?:➔\.ws)|(?:➞\.ws)|(?:➡\.ws)|(?:➨\.ws)|(?:➯\.ws)|(?:➹\.ws)|(?:➽\.ws))\/[a-z0-9]*|(https?:\/\/([0-9a-zA-Z]*|(\/)*)*\.org)/g;
var regexSpam3 = /(?=.*(w(\W+)w(\W+)w.))/g;
var regexSpam4 = /^(?=.*\$[0-9]+)(?=.*(work|home)).*/g;
var regexSpam5 = /^(?=.*\$[0-9]+)(?=.*(got paid))/g;
var regexSpam6 = /^(?=.*\$[0-9]+)(?=.*(per hour))/g;
var regExDict = {};

var enL2RegPatts = new Array(new RegExp('(?!\>)\\b[^\\w>]*(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cunilingus|cunillingus|cunnilingus|cybersex|dick|erotic|escoRt|fagging|'+
'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|gay|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|dumbassit|Islam|islamists|Jew|Jewry|slits)[^\\w<]*\\b(?!\<)','i'),
new RegExp('(?!\>)\\b[^\\w>]*(freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|ohshithead|odumbass|SUCKS|Terroristen|w[*]nkers|'+
'islamo facist|putz|demoskanks|Focks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
'americunt|assed|back-scuttle|back-scuttler|back-scuttlers|back-scuttling|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale|'+
'wench|wenches|wenching|buggers|refugee|refugees|barbaric|butcher|butchering|isis|stupidest|all you clowns|imbeciles|fool|idots|demon-rats|illegal rats|coyotes|terrorism|except for his middle leg|'+
'rat boy|blowhard|drop more bombs|just drop bombs everywhere|jihadists|black male|clowns|idiotic|buffoon|rodent community)[^\\w<]*\\b(?!\<)','i'));
 
var deL2RegPatts = new Array(new RegExp('(?!\>)\\b[^\\w>]*(agedream|bdm|candy|cutegirlfriend|cutemodel|cute-model|cutiefrutti|doll|entwuerdigt|entw[ü]rdigt|erniedrigt|erzwungen|forbiddenvideo|fresh-girls|gedemuetigt|gefesselt|girlfriendgalleries|girlfriendshowoff|'+
'girlfun|girllover|girl-lover|girlranch|girls-and-pics|girls-are-pretty|girlshost|girlvid|grossdeutsch|gross-deutsch|hess|innocentdream|innocent-youth|jungfrau|jungsforum|jungundblond|kindersch[ä]nder|massacre|massaker|momandboy|mord|mutterundtochter|mybestboy|netbunnies|'+
'nice-model|nixgirl|onboys|onlyboysdotnet|onlygirl|onlynngirl|postyourgirl|pretty-model|rape|realboys4u|ritzen|sado|scheiss|schulm[ä]dchen|schwul|shamealbum|spank|suicide|suizid|tod|ukrainian-boy|virgin|young|youth-and-beauty|14words|14-words|3reich|absurd|achtundachtzig|acht-und-achtzig|'+
'adelaideinstitute|adelaide-institute|adolf|ag-schwaben|ahnenerbe|ahnen-erbe|3rdreich|3rd-reich|aktionsberichte|aktions-berichte|aktionsbuero|aktions-buero|aktionsb[ü]ro|aktions-b[ü]ro|aktionsfront|aktions-front|altermedia|anarchy|antifa|arbeitmachtfrei|arbeit-macht-frei|arbeitsdorf|arbeitslager)[^\\w<]*\\b[^\\w<]*\\b(?!\<)','i'),
  new RegExp('(?!\>)\\b[^\\w>]*(arbeitslos|arian|arier|arisch|aryan|asyl|aufstand-fuer-die-wahrheit|auschwitz|auslaender|ausl[ä]nder|autonom|befreiungsluege|befreiungsl[ü]ge|belzec|birkenau|bloddhonor|buchenwald|bund-fuer-echte-demokratie|c18|c-18|combat18|combat-18|dachau|deutschefront|deutsche-front|deutscherstaat|deutscher-staat|'+
'deutscherstandpunkt|deutscher-standpunkt|deutscheskolleg|deutsches-kolleg|deutschesreich|deutsches-reich|deutschherrenklub|deutschlanddendeutschen|deutschland-den-deutschen|deutschlandluege|deutschland-luege|deutschlandl[ü]ge|deutschland-l[ü]ge|divisiontotenkopf|division-totenkopf|divisionwiking|'+
'division-wiking|djihad|doitsch|doitschland|doitschlanddendoitschen|doitschland-den-doitschen|dreck|drittesreich|drittes-reich|dschihad|ebensee|eichmann|eightyeight|eighty-eight|endloesung|end-loesung|endl[ö]sung|end-l[ö]sung|engerhafe|erwache|fallersleben|finalsolution|final-solution|flossenbuerg|flossenb[ü]rg|'+
'forgottentomb|freie-kraefte|freiekr[ä]fte|freienationalisten|freie-nationalisten|fremdherrschaft|fremd-herrschaft|friedensflieger|friedens-flieger|friedensvertrag|friedens-vertrag|fuehrer|f[ü]hrer|gaskammer|gas-kammer|gaszimmer|gas-zimmer|germanhelmetsinc|germania88|germania-88|germaniainternational|germania-international)[^\\w<]*\\b(?!\<)','i'),
  new RegExp('(?!\>)\\b[^\\w>]*(gestapo|getto|ghetto|g[ö]bbels|goebbels|goehring|goering|g[ö]rhring|g[ö]ring|gotschee|gusen|h8|hakenkreuz|haken-kreuz|hammerskin|hammer-skin|hass|hate|hauptkampflinie|heidrich|heimattreu|heimat-treu|herrenvolk|herren-volk|herzogenbusch-vught|heydrich|hinzert|hitler|holo-cartonns|holocartoons|holocaust|holo-caust|holokaust|holo-kaust|'+
'horstwessel|horst-wessel|ianstuart|ian-stuart|interracial|islambruderschaft|islambr[ü]derschaft|islambruederschaft|jedemdasseine|jew|jihad|jude|jugend-offensive|kaltenkirchen|kameradentreff|keltenkreuz|kelten-kreuz|kkk|konzentrationslager|konzentrations-lager|kriegsberichter|kriegsschuldfrage|kuehnen|k[ü]hnen|kulmhof|ladelund|landser|'+
'langenstein-zwieberge|lunikoff|lunikov|maertyrer|m[ä]rtyrer|martyrium|masterrace|master-race|mauthausen|metapedia|minderheit|moringen|mutterkreuz|nationalerbeobachter|nationaler-beobachter|nationalerevolution|nationale-revolution|nationalesnetz|nationales-netz|nationalesradio|nationales-radio|nationalsocialism|national-socialism|nationalsozialis|'+
'national-sozialis|nazi|neuengamme|neuesvolk|neues-volk|niederhagen|nordthueringer-beobachter|ns88|nsdap|nsec-88|nseuropa|nsl-archiv|nsl-forum|nsl-lager|nsl-server|nsm88|nsmnebraska|nspublications|nukeisrael|nuke-israel|oidoxie|oikrach|oimusik|oithanasie|oneeight|one-eight|ostpreussen-radio88|panzer|parazite|personenausweis|prophet-mohammed)[^\\w<]*\\b(?!\<)','i'),
  new RegExp('(?!\>)\\b[^\\w>]*(racistfriendfinder|radiogermania|radio-germania|radioislam|radio-islam|rahowa|rasse|raus|ravensbr[ü]ck|ravensbrueck|reichsarchiv|reichs-archiv|reichsausweis|reichs-ausweis|reichsbewegung|reichs-bewegung|reichsforum|reichs-forum|reichskanzler|reichs-kanzler|reichskarte|reichskriegsfahne|reichs-kriegs-fahne|reichskriegsflagge|reichs-kriegs-flagge|'+
'reichsmeldestelle|reichs-meldestelle|reichsregierung|rennicke|riga-kaiserwald|rocknord|rock-nord|rotfront|rot-front|ruhmundehre|ruhm-und-ehre|sachsenhausen|schandausstellung|schand-ausstellung|schmarotzer|schulhofcd|schulhof-cd|schutzbund-deutschland|schutzstaffel|schutz-staffel|schwarzesonne|schwarze-sonne|sieg|skinhead|skrewdriver|skrew-driver|'+
'sleipnir|sonnenrad|sonnen-rad|sozialschmarotzer|sozial-schmarotzer|spreelichter|spree-lichter|stahlgewitter|stahl-gewitter|stammlager|stormfront|storm-front|struthof|stuermer|stuka|st[ü]rmer|stutthof|subvertednation|supremewhitepower|supreme-white-power|swastika|tage-der-gerechtigkeit|terra-germania|terrorism|theforbiddentruth|theneworder|'+
'thenewsturmer|thiazi|thirdreich|third-reich|thorhammer|thule|totenkopfdivision|totenkopf-division|tuerkenjaeger|tuerken-jaeger|t[ü]rkenj[ä]ger|t[ü]rken-j[ä]ger|[ü]berfremdung|ueberfremdung|ungeziefer|unglaublichkeiten|untermensch|unter-mensch|vergas|verreck|verschwoerung|verschw[ö]rung|voelkisch|voelkischereichsbewegung|voelkische-reichsbewegung)[^\\w<]*\\b(?!\<)','i'),
   new RegExp('(?!\>)\\b[^\\w>]*(v[ö]lkisch|v[ö]lkischereichsbewegung|v[ö]lkische-reichsbewegung|volksbetrug|volks-betrug|volksdeutsch|volks-deutsch|volksgemeinschaft|volks-gemeinschaft|volksseele|volks-seele|volkssozialistisch|volks-sozialistisch|waffenss|waffen-ss|warrior|wehrmacht|wehrsportgruppe|wehrsport-gruppe|wehr-sport-gruppe|weisse-macht|wessel|wewantwar|wewelsburg|whitehonor|'+
'white-honor|whitepower|white-power|whitepride|white-pride|widerstand|wiking|w[ö]bbelin|woebbelin|wunsiedel|zecke|zentralversand|zigeuner|zion|zundel|zyklonb|zyklon-b|absolutlysick|abtreib|amok|aufschlitz|autopsy|babycaust|baby-caust|blood|blut|braindamagefilms|brutal|bumfights|cadaver|cannibal|chainsaw|crush|dead|death|disgrace|executed|execution|exekution|'+
'folter|forced|gedem[ü]tigt|gequaelt|gequ[ä]lt|gezwungen|gore|gruesome|gunshot|horror|hurtme|hurt-me|kadaver|kannibal|kill|macassar|manhunt|mentalzero|midget|murder|ogrish|pain|rotten|satanist|schmerz|schock|shock|shownomercy|sickestsites|sklavenzentrale|sklaven-zentrale|splashdamage|splatter|squish|tightrope|tortur|unfallvideo|unfall-video|vergewalt|violate|'+
'violence|violent|woundgallery|celebritymorgue|besamung|bonbonbabes|boy1st|boycams|boydiamonds|boyfreevideo|boyhouse|boylover|boy-lover|boyreview|boy-review|boys-factory|boys-fantasy|boysfirsttime|boysfood|boystrymoms|boywatch|bravovids|candid|cherry|childsupermodels|childtop|cpm-galleries|crazy-models|dadsandbabe|dadsindaughters|dreamgirls|dreammodels|dream-models)[^\\w<]*\\b(?!\<)','i'),
   new RegExp('(?!\>)\\b[^\\w>]*(entjungfer|fierybabe|fleshbaby|girl1st|girlforgirl|girls-host|idealchick|juniormodel|kindfrau|kind-frau|lil18|little-boy|little-devil|little-dwarf|little-dwarv|little-lady|littlemodel|little-model|lola|loli|lolly|lovelykitten|lsdream|ls-dream|lsmodel|ls-model|me-boy|minimodel|mini-model|moms-boys|newmodel|new-model|nnboy|nn-boy|nngirl|nn-girl|nnmodel|nn-model|nonstop-nn|'+
'onlybabe|p[ä]do|paedo|pedo|perfectgirl|pinkchocolate|pinkclub|pinkdreams|pinkworld|playgal|playlol|real-girl|schoolgirl|sweet|tiny|underage|under-age|xs-model|animal|beast|bestiality|enjoyhorse|farmlove|farmsecret|farmyfun|free-horse-movies|furry|hanginfury|horseloving|petloving|petpleasure|petpound|sodom|zoo|adult|ageoflove|amateur|asiamaedchen|asianbabe|asian-erotism|'+
'asiangoldenladies|asian-paradise|bang-boat|bangbros|bangingbutt|bangingmachine|bangmyhotwife|bang-my-hot-wife|bangyoulater|barelylegal|barely-legal|bezirksbefruchter|bi-girl|big-mouthful|big-mouth-ful|bignatural|big-natural-hooter|bigtitsfantasies|bitch|bizar|blackbeauties|blasen|blondegirl|blowgirls|blowjob|blow-job|bondanime|boob|breast|breitbeinig|brickfist|brueste|'+
'br[ü]ste|bukkake|buttcam|buttmachineboy|buttplug|callboy|call-boy|callgirl|call-girl|cam4|camclip|cam-clip|camgirl|campusgirl|cam-spiele|cheatwife|chicks18to19|chubbychix|city69|clitoris|cloud-69|cock|crazy-mom|creameater|cream-eater|creamfilled|creampie|cum|cybercalendargirl|daddyvid|dadhobbygirl|dailydirt|damnbang|damplips|dampsx|darkobsession|darksecretvideo)[^\\w<]*\\b(?!\<)','i'),
   new RegExp('(?!\>)\\b[^\\w>]*(dasviehinmir|deastiality|deepthroat|deep-throat|destroyed-daughter|deviantclip|devilshandjob|diaper|dicks-and-chicks|dirtyfamilies|dirtyfamilysecret|dirtyfarmer|dirtyhobby|dirty-hobby|dirtyhosting|dirtymind|dirtyskunk|doktorspiel|doktor-spiel|do-me-harder|domination|dont-whack-your-teacher|dreamgirl|dreamland|dreammodel|dream-model|dreammovie|'+
'dreamxy|ebonycheek|ebonyfantasy|el-ladies|enemarotica|entjungfert|erogeschichten|erolive|eropic|eropleasure|erosguide|erosnetz|erosvillage|erotiekpagina|erotische-geschichten|erotizone|erozuna|eunuch|everythingbutt|exesfootdream|exgfpics|extreme|facesitting|face-sitting|facial|familyfancy|fanta-seeroom|fatfantasies|fat-fantasies|'+
'fetisch|fetish|fetizh|fetschi|fick|fistbang|fisten|fisting|flotterdreier|flotter-dreier|footcraving|footlover|foreplayxy|free4men|free6|freeasian|freeatkgal|freehotpic|freier|funhouse|gangbang|gang-bang|gay|geileslips|geilevideo|gonzo-movies|gooclip|grandthumb|grannies|granniez|granny6|grannycookies|grannypicture|'+
'grayvee|groupsparty|groupthrill|gyno|hairybeautie|hairybeauty|hairy-beauty|hairygirlsvideo|hairyhere|hairymiss|hairy-ocean|happyweekend|happy-weekend|hard-and-dirty|hardcore|hard-core|hardpics4you|hardplace|hardtied|heaven666|herfirst|her-first|hiddencam|hidden-cam|hispanicfantasies|hobbyfreundin|homemademoviez)[^\\w<]*\\b(?!\<)','i'),
   new RegExp('(?!\>)\\b[^\\w>]*(homemadempeg|home-made-video|homo|hondenpijpen|hornyandhappy|hotdnk|hotgir|hotjuice|hotlips|hotmovies|hotnessa|hotshots|hot-soccer-moms|hot-story|hottneighbors|houseofsin|housewifefantasies|hqboys|hqgirls|huhre|humoron|idealchicks|illegal|illfantasies|innocent-dream|intim|inudistic|iwannajerk|iwantall|'+
'japanesegirl|j-foxies|juggworld|juniormodels|just4men|justmeat|justwild|k9thumbs|kack-board|katnoir|kaviar-dreams|kickazzvideos|kitzler|kizzler|klitoris|large-labia-lips|lasiescam-live|latina-chicks|latina-online|laythekat|lesben|lesbian|lesbisch|lickinlovers|liebespuppen|'+
'livecamflatrate|livewoman|love-explorer|lovevideoworld|lusthaus|lustscout|lusttoeter|lustundliebe|lutschen|luvboat|madmamas|magic-beauties|magmaclub|maletv|manga|mans-world|mature|megabusen|megarotic|milkboy|modelmania4u|moese|mommaster|momswaiting|momsworkzone|monsterload|motherless|mpuppet|'+
'my-dirty-hobby|myfirstundressing|mylovedparties|nackt|naked|nasty|natursekt|natur-sekt|naughty|neighbourhoodgirl|newbbs|nextdoorlust|niche-gal|nikamovie|nitelife|nsfw|nude|nudism|nudist|nutte|nymph|obscene|olderladies|oldmanwish|onanie|onlymom|oral|orgasm|orgie|orgyasm|orgyfeast)[^\\w<]*\\b(?!\<)','i'),
   new RegExp('(?!\>)\\b[^\\w>]*(orgymaxcfnmblog|orientalfantasies|orwid|ovguide|pantyfantasies|party-models|peeflix|peeing|penis|penthouse|perfectgirls|perfectmums|perfectorgy|pervers|pervert|pipi|piss|playmatestory|playwithme|poppen|poppschiff|porn|preggo|pregnantandhorny|pron|pussies|pussis|pussy|'+
'rammythroat|rasiert|ratemy|rate-my|rateyour|rate-your|real-girls|realityvideo|redlight|reingespritzt|rentmen|retrocunts|rotlicht|scatqueens-berlin|schnackseln|schoolgirls|schwaenz|schwangereweiber|schwanz|schw[ä]nz|schwuhl|self-made-video|selfpic|sex|shacklet|'+
'shadowslaves|shav|shitfun|slavemachine|sleazydream|slippery-and-wet|slut|sly-clip|smother|smut|softcoma|sperm|spiescam|spritzbox|spritzige-geschichten|spunkculture|spunkmouth|spymov|squirt|squirtitinme|strip|suck|supermollies|sweatywifes|swinger-bus|swingerclub|'+
'swinger-club|swingerklub|swinger-klub|swingerparadies|teen|throatpoker|titsndicks|titt|tophotgirl|topless|trampling|tranny|tube|tubgirl|tv6|twinks|unclelust|unclevid|uniformdomination|unrestricted|vagina|vibrator|viphairy|voegeln|votse|vottse|votze|voyeur)[^\\w<]*\\b(?!\<)','i'),
   new RegExp('(?!\>)\\b[^\\w>]*(vulgarbabes|watchhervideo|wet-hole|whore|wichs|wifemovies|wildgirls|windel|wir-privat|wishing-girl|wivesinpantyhose|wix|wowhairy|wowmodels|wowsite|wow-video|xclip|xdom|xhamster|xnxx|xnxxmovies|xpeeps|xpics|xrope|xs-models|xtown|xtreme|xvideos|xxl-video|'+
'xxpasswordxx|xxx|yourwastedgirlfriend|zensiert|zensurfrei|zensur-frei|zweitfrau|zweit-frau|ana-4life|anaengel|ana-hanna|anamia|ana-mia|ana-perfection|anasbrief|anas-brief|anasdiary|anasgebote|anas-gebote|anashome|ana-till-the-end|anorexic|drogendealer|drogen-forum|'+
'drugworld|fur-alle-ana-neulinge|highway-to-ana|lady-ana|me-and-ana|morbid-alcoholica|proana|pro-ana|pro-anorexia|promia|pro-mia|romancingthebone|saufen|skinny|thinspiration|thinspo|valerie-ana-freundschaft|Drecksau|Fett backe|Horst|Onanieren|Pisser|Schei[ß]e|Schwuchtel|'+
'Schwuler|Shishkoff|der Schwanz|die Titten|missgeburt|dummes huhn|trottel|der teufel|der abschaum|dumme kuh|wichser|Dreckschweine|scheiss auf die|was die schei[ß]|Die M[ö]pse|Drecksack!|die Schei[ß]e|geil|mieser stricher|schwanz lecker|so ein beschi[ß]!|der abschaum der menschlichen gesellschaft|'+
'der drecksack|du dumme kuh|duncauf|homofuerst|Fl[ü]chtlinge)[^\\w<]*\\b(?!\<)','i'),
                             // en l2 words list
new RegExp('(?!\>)\\b[^\\w>]*(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cunilingus|cunillingus|cunnilingus|cybersex|dick|erotic|escoRt|fagging|'+
'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|gay|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|dumbassit|Islam|islamists|Jew|Jewry|slits)[^\\w<]*\\b(?!\<)','i'),
new RegExp('(?!\>)\\b[^\\w>]*(freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|ohshithead|odumbass|SUCKS|Terroristen|w[*]nkers|'+
'islamo facist|putz|demoskanks|Focks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
'americunt|assed|back-scuttle|back-scuttler|back-scuttlers|back-scuttling|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale|'+
'wench|wenches|wenching|buggers|refugee|refugees|barbaric|butcher|butchering|isis|stupidest|all you clowns|imbeciles|fool|idots|demon-rats|illegal rats|coyotes|terrorism|except for his middle leg|'+
'rat boy|blowhard|drop more bombs|just drop bombs everywhere|jihadists|black male|clowns|idiotic|buffoon|rodent community)[^\\w<]*\\b(?!\<)','i'));

var ptL2RegPatts = new Array(new RegExp('(?!\>)\\b[^\\w>]*(acha que eu n[ã]o consigo?|amo sua bunda|babaca|bicha|viado|viad[ã]o|marica|burro|idiota|cuz[ã]o|cuz[õ]es|filhos da puta|escroto|filho da puta|idiota|burro|maconha|vamos ficar b[ê]bados hoje [à] noite|bicha|bichona)[^\\w<]*\\b(?!\<)','i'),
                            // en l2 words list
new RegExp('(?!\>)\\b[^\\w>]*(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cunilingus|cunillingus|cunnilingus|cybersex|dick|erotic|escoRt|fagging|'+
'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|gay|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|dumbassit|Islam|islamists|Jew|Jewry|slits)[^\\w<]*\\b(?!\<)','i'),
new RegExp('(?!\>)\\b[^\\w>]*(freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|ohshithead|odumbass|SUCKS|Terroristen|w[*]nkers|'+
'islamo facist|putz|demoskanks|Focks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
'americunt|assed|back-scuttle|back-scuttler|back-scuttlers|back-scuttling|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale|'+
'wench|wenches|wenching|buggers|refugee|refugees|barbaric|butcher|butchering|isis|stupidest|all you clowns|imbeciles|fool|idots|demon-rats|illegal rats|coyotes|terrorism|except for his middle leg|'+
'rat boy|blowhard|drop more bombs|just drop bombs everywhere|jihadists|black male|clowns|idiotic|buffoon|rodent community)[^\\w<]*\\b(?!\<)','i'));

var esL2RegPatts = new Array(new RegExp('(?!\>)\\b[^\\w>]*(me llega al pincho|qu[é] tal concha|crees que no puedo?|a la loma del orto|[â]vete al infierno consultoriadedadoscorrea|acabar|al pedo|and[á] a lavar los platos|[á]ndate a la mierda|'+
'argolla|bardo|bobososo|bola|bolsas|buseta|cabilla|cabro|chivo|maric[ó]n|rosquete|cachapera|cana|ca[ñ]o|canuto]|canuto[,]]a|cara de orto|caracart[ó]n|chanta|choto|chumbo|chupa medias|cocolla|coj[í]o|cojonera|cojones|aweonado|'+
'commnidades|co[ñ]aza|conchudo|coscorria|covero|cuchara|curro|de pedo|despelote|el burro sabe m[á]s que t[ú]|en pedo|en pelota|enchavar|estoy arrecho|estoy caliente|est[ú]pido]|imb[é]cil|'+
'falopa|garulla|gasofia|gay|gorronea|groncho|hacerse el boludo|hostiazo|hueco|huevastristes|huevero|huev[ó]n|huev[ó]n|cerdo|cojudo|huevos|idiota|estúpido|huev[ó]n)[^\\w<]*\\b(?!\<)','i'),
   new RegExp('(?!\>)\\b[^\\w>]*(imbecil|japuta|kilúa|la cabeza de la pinga|lelo|lela|nabo|lerdo|machete|malandro|maldito|pelotudo|malpar[í]o|mamonazo|mam[ú]a|marico|cabro|cabro de mierda|'+
'maric[ó]n|marica|maric[ó]n de playa|maricon de playa|marihuana|me la pela|me la vas a comer|me lo pones en la boca|metetela en la boca|met[é]tela en la boca|m[é]tetela en la boca|mina|mocazo|'+
'[ñ]engue|ni en pedo|ojala que mueras|ojal[á] te mueras|pacusobo|pajilla|pandorga|papo|parcha|parchita|parr[ú]s|pedo|pedorro|pel[ó]n|huev[ó]n[.] aweonado|pendejo|pepa|pepire|percanta|'+
'pichinga|pichurria|pijotero|pisar|pocha|ponela en mi boca|pongalo en su boca|p[ó]nmela en la boca|porro|punta|qu[é] buen culo|que te den por culo|que te follen|chupar esta noche|quiero chupar esta noche|romper las bolas)[^\\w<]*\\b(?!\<)','i'),
   new RegExp('(?!\>)\\b[^\\w>]*(ruchar|sapo|te metieron la yuca|te odio|te rompo el cacas|te rompo el culo|tener sexo|tengo ganas|test[í]tulos|tirar|tonto|lerdo|tonta|lerda|lela|tonto a las tres|tontolaba|'+
'tontolcapullo|tontopolla|toparse|totona|trucho|tu crees que no puedo[?]|tu madre|tu vieja|un huevo|vagina|concha|vamos a chupar esta noche|vamos a em borrachar esta noche|'+
'vamos a emborracharnos esta noche|vamos a mamarnos esta noche|verdugo|vete al infierno|vete a la mierda|wepota|y tu mama tambien|y tu mam[á] tambi[é]n|yuta|zunga)[^\\w<]*\\b(?!\<)','i'),
                             // en l2 words list
new RegExp('(?!\>)\\b[^\\w>]*(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cunilingus|cunillingus|cunnilingus|cybersex|dick|erotic|escoRt|fagging|'+
'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|gay|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|dumbassit|Islam|islamists|Jew|Jewry|slits)[^\\w<]*\\b(?!\<)','i'),
new RegExp('(?!\>)\\b[^\\w>]*(freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|ohshithead|odumbass|SUCKS|Terroristen|w[*]nkers|'+
'islamo facist|putz|demoskanks|Focks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
'americunt|assed|back-scuttle|back-scuttler|back-scuttlers|back-scuttling|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale|'+
'wench|wenches|wenching|buggers|refugee|refugees|barbaric|butcher|butchering|isis|stupidest|all you clowns|imbeciles|fool|idots|demon-rats|illegal rats|coyotes|terrorism|except for his middle leg|'+
'rat boy|blowhard|drop more bombs|just drop bombs everywhere|jihadists|black male|clowns|idiotic|buffoon|rodent community)[^\\w<]*\\b(?!\<)','i'));

var frL2RegPatts = new Array(new RegExp('(?!\>)\\b[^\\w>]*(abruti|anulingus|attard[é]|beur|bordel de merde|calisse|branleur|[ç]a pue|[ç]a schlingue!|[ç]a schlingue|casse toi|casse-toi|c[\']est quoi ce bordel|c[\']est quoi ce bordel ?|c[\']est quoi ton de probl[è]me|c[\']est quoi ton ostie de probl[è]me|cochonneries|couille|d[é]bile|'+
'd[é]foncer|d[é]gage|d[é]gage[ !]|d[é]g[é]n[é]r[é]|enfoir[é]|face de cul|ferme ta gueule|fille|fous le camp|fous le camps|f[ü]hrer|glande|idiot|idiot[e]|idiot[(e)]|idiot[(e)][\!]|imbecile|imb[é]cile|jouir|la chatte|mort [à]|mort aux|mouchard|p[é]dale|p[é]d[é]|petite fille|petites filles|pouf|racailles|'+
'raton|rebeu|sac [à] vin|sac [à] vin [\!]|sacrer|seins|sexe|sexe en direct|SEXUELLE|sperme|suce|ta gueule|tais-toi|tapette|tarlouse va|tarlouse va [\!]|transexuelle|[à] m[\']enmerder|m[\']enmerder|tu commence [à] m[\']enmerder|tu commence [à] m[\']enmerder [\!]|tuyau|vache|vibreur|violer|youpin|youpins)[^\\w<]*\\b(?!\<)','i'),
                              // en l2 words list
new RegExp('(?!\>)\\b[^\\w>]*(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cunilingus|cunillingus|cunnilingus|cybersex|dick|erotic|escoRt|fagging|'+
'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|gay|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|dumbassit|Islam|islamists|Jew|Jewry|slits)[^\\w<]*\\b(?!\<)','i'),
new RegExp('(?!\>)\\b[^\\w>]*(freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|ohshithead|odumbass|SUCKS|Terroristen|w[*]nkers|'+
'islamo facist|putz|demoskanks|Focks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
'americunt|assed|back-scuttle|back-scuttler|back-scuttlers|back-scuttling|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale|'+
'wench|wenches|wenching|buggers|refugee|refugees|barbaric|butcher|butchering|isis|stupidest|all you clowns|imbeciles|fool|idots|demon-rats|illegal rats|coyotes|terrorism|except for his middle leg|'+
'rat boy|blowhard|drop more bombs|just drop bombs everywhere|jihadists|black male|clowns|idiotic|buffoon|rodent community)[^\\w<]*\\b(?!\<)','i'));

var itL2RegPatts = new Array(new RegExp('(?!\>)\\b[^\\w>]*(allupate|allupato|ammucchiata|ammucchiate|ano|arrapata|arrapate|arrapati|arrapato|bagardona|bagardone|bagascione|balle|bamba|battone|bega|beghe|belini|bernarde|bocchinare|bocchinari|bocchinaro|'+
 'boiate|bordelli|bordello|broda|brode|bucaiola|bucaiole|bucaioli|bus del cu|busoni|cacche|cagate|cappelle|casini|casino|checca|ciospa|ciospe|cippa|cippe|ciulata|ciulate|coglionazzo|coglione|cornuta|cornute|cornuti|diio|dio cane|fave|fetente|fetenti|'+
 'fiadena|diocane|fiche|figona|figone|figoni|fika|fike|fiodena|froci|frocio|frocione|frocioni|gangia|goldone|goldoni|grilletti|guanti|guanto|incazzarsi|lecchine|lecchini|lecchino|limonare|loffa|loffare|loffe|loffia|loffie|madonna|maiala|maiale|merdosi|'+ 
 'merlotti|merlotto|mignottone|mignottoni|minchione|minchioni|minna|minne|mnchie|mone|monta|musse|nculammammate|ndrocchia|nerchie|orca madonna|orco dio|orcodigel|pacchi|pacco|paduli|padulo|palla|palle|pallosa|pallose|pallosi|palloso|patonze|pecorine)[^\\w<]*\\b(?!\<)','i'),
  new RegExp('(?!\>)\\b[^\\w>]*(pesce|pici|picio|pipe|pippa|pisciate|piscio|piselli|pisello|pistola|pistolotto|pomiciare|pompa|pompe|poppa|poppe|porcodio|puppare|puttanone|puzzona|puzzone|recchione|renza|renze|ricchione|ricchioni|rincoglionirsi|sbattimenti|sbattimento'+
 'sborrone|sborroni|sbroda|sbrodolare|sbrodolata|sbrodolate|scoregge|scoreggia|scoreggiare|scoreggiona|scoreggione|scoreggioni|scorreggione|seghe|segone|segoni|sfondare|slinguare|slinguata|slinguate|sminchiare|sorche|soreta|spompinare|stronzona|sucare|'+
 'succhiacappella|succhiacappelle|sukare|tarzanelli|tarzanello|terronacci|terronaccio|terronazzi|terronazzo|terrone|terroni|topa|tope|uccelli|uccello|vacca|vacche|zio cantante)[^\\w<]*\\b(?!\<)','i'),
                              // en l2 words list
new RegExp('(?!\>)\\b[^\\w>]*(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cunilingus|cunillingus|cunnilingus|cybersex|dick|erotic|escoRt|fagging|'+
'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|gay|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|dumbassit|Islam|islamists|Jew|Jewry|slits)[^\\w<]*\\b(?!\<)','i'),
new RegExp('(?!\>)\\b[^\\w>]*(freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|ohshithead|odumbass|SUCKS|Terroristen|w[*]nkers|'+
'islamo facist|putz|demoskanks|Focks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
'americunt|assed|back-scuttle|back-scuttler|back-scuttlers|back-scuttling|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale|'+
'wench|wenches|wenching|buggers|refugee|refugees|barbaric|butcher|butchering|isis|stupidest|all you clowns|imbeciles|fool|idots|demon-rats|illegal rats|coyotes|terrorism|except for his middle leg|'+
'rat boy|blowhard|drop more bombs|just drop bombs everywhere|jihadists|black male|clowns|idiotic|buffoon|rodent community)[^\\w<]*\\b(?!\<)','i'));


var nlL2RegPatts = new Array(new RegExp('(?!\>)\\b[^\\w>]*(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cunilingus|cunillingus|cunnilingus|cybersex|dick|erotic|escoRt|fagging|'+
'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|gay|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|dumbassit|Islam|islamists|Jew|Jewry|slits)[^\\w<]*\\b(?!\<)','i'),
new RegExp('(?!\>)\\b[^\\w>]*(freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|ohshithead|odumbass|SUCKS|Terroristen|w[*]nkers|'+
'islamo facist|putz|demoskanks|Focks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
'americunt|assed|back-scuttle|back-scuttler|back-scuttlers|back-scuttling|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale)[^\\w<]*\\b(?!\<)','i'),
 new RegExp('(?!\>)\\b[^\\w>]*(wench|wenches|wenching|buggers|refugee|refugees|barbaric|butcher|butchering|isis|'+
 'dombo|rot op|vieze dikke pad|vieze vuile gore smeerlap|debiel|homo|kanker|sukkeltje|hairy |gatverdamme|getverderrie|godverdomme|jezus christus|verdomme|kak|kattenkop|muil|nicht|pissig|poep|'+
 'trut|kaaskop|kakker|medelander|mocro|rapalje|rapaille|nsb\'er|oelewapper|koekert|koekwaus|kk|klere|kolere|krijg de|lazarus|lijer|pleur(it)is|pokke(n)|tering|tyfus|vinkentering|kutmarokkaan|'+
 'terug naar je land|vluchterling |tiefuskop|kankerventje|randdebiel)[^\\w<]*\\b(?!\<)','i'),
                             // en l2 words list
new RegExp('(?!\>)\\b[^\\w>]*(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cunilingus|cunillingus|cunnilingus|cybersex|dick|erotic|escoRt|fagging|'+
'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|gay|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|dumbassit|Islam|islamists|Jew|Jewry|slits)[^\\w<]*\\b(?!\<)','i'),
new RegExp('(?!\>)\\b[^\\w>]*(freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|ohshithead|odumbass|SUCKS|Terroristen|w[*]nkers|'+
'islamo facist|putz|demoskanks|Focks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
'americunt|assed|back-scuttle|back-scuttler|back-scuttlers|back-scuttling|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale|'+
'wench|wenches|wenching|buggers|refugee|refugees|barbaric|butcher|butchering|isis|stupidest|all you clowns|imbeciles|fool|idots|demon-rats|illegal rats|coyotes|terrorism|except for his middle leg|'+
'rat boy|blowhard|drop more bombs|just drop bombs everywhere|jihadists|black male|clowns|idiotic|buffoon|rodent community)[^\\w<]*\\b(?!\<)','i'));

var enL3RegPatts = new Array(new RegExp('(?!\>)(pussy|msn|fuc(k|ed|ers?|ing|s)?|(f|F)(~|_|!|@|#|$|%|^|&|[*](k))|fckn|Rats|motherfu?|fuk|cunt|d(i|!|[*])ck|asshole|a s s h o l e |assh|a[$]|f\'cking|F-ing|azz|bitch|'+
             'dumb|suck(s|er|ed)?|^\lick|nigg(ro|ga|er)?|(s|S)((~|!|@|#|$|%|^|&|[*])h(i|!|)t)|jacka(s|$)?)(?!\<)','i'),
 new RegExp('(?!\>)(a s s h o le|anal(e\s+)?(impaler|leakage|annie|buckaneer|jabber|lingus|probe|sex)?|ar(s|5)e(holes?|wipes?)?|(ass|butt)\s*(ho(1|l)(e|z)s?|bag|bagger|bandit|bang|banged|banger|bangs|bite|'+
'blaster|blow|boma|boy|breath|clown|cock|cowboy|cracker|face|fuck(ed|ers?|ing|s)?|stain|pirate|fucking|fukka|goblin|ASSH&%\\$|h0lez?|-?hat|head|hopper|hore|hound|jacker|jockey|kicker|kiss|kisser|'+
'klown|leach|lover|fugly|hole|plug|cheeks|load|ocks|man|monkey|master|mucus|mun?ch|muncher|nigger|packer|peddler|puppies|queen|rag|rammer|range r|shit|shole|sucker|wad|who(l|r)e|wipes?|crack'+
'|lick(ing|s|ers?|ed)?)|ball\s*(kicking|licking|sucking|bag|bags|breaker|buster|busters|hair|licker|ocks)|awfuck|azz|azzhole|badass|badfuck|bang her|bareass|bareassed|bareback|barenaked ladies)(?!\<)','i'),
  new RegExp('(?!\>)(bast(a|e)rd(s|z)?|big\s*(tits|ass|bastard|butt|ot|oted|ots)|bitch\s*(ass|tits?|ass|y|s|ing?|er?s?z?)|black cock|blow(-|\s+)?jobs?|boll(ocks?|ox)|bonesmoker|boo(b(s|y)?|bies|ger|tie|ty\s*(call|warrior))|breast(job|lover|man)|brotherfucker|'+
'bugger|bullshit(s?|ted|ters?|ting)|bullturds|bum(fucke(r|d)s?|fucking|fucks?|holes?|licks?|suckers?)|bung hole|chickenshits?|clit(licker|face|fuck|oris|oritis|orus|s|ty|ty litter)|cock(cheese|jockey|pocket|snot'+
'|sucker|ass|bite|block(er)?|burger|cowboy|face|fight|fucker|head|holster|knob|knocker|knoker|lick(er)?|-?load|lover|master|monkey|munch(er)?|nob|nose|nugget|queen|rider|s|sauce|shit|sman|smith|smok(er)?|sniffer'+
'|sucer|-?suck(ed)>?|sucking|sucks|suka|sukka|tease|teaser|weasel)|clusterfuckcojones|coon(ass|dog)?|couch sluts|cowfuck|crack(ass|head|-?whore)|creampie|cum(chugger|dumpster|freak|guzzler|bubble|catcher|dump|dumpster|fest|jockey|mer|shot|shots|slut|stain))(?!\<)','i'),
 new RegExp('(?!\>)(cumsuck(ers?|ing)?|cun(nilingus|ts?|t badger|t hair|tbag|tball|tfuck(er)?|thunter|tlick(er|ing)?)|dead(ass|hits?)|dipshit|ditchpig|dogshit|douche\s*(bags?)|dumb(shits?|asse?s?|bitch|fuck(ing|s)?)|eatpussy|'+
'dick(breath|-?heads?|hole|licker|shy|bag|beaters|brain|dipper|drink|face|flipper|forbrains|fuck(er)?|hole|juice|less|lick|lips|man|milk|monger|ripper|s|sipper|slap|smacks?|suckers?|sucking|tickler|wads?|weasel|weeds?|whipper|wod)|'+
'eyefuck(s|ed|er|ing)|f u c k( e r)?|facefucker|fag(fucker|ging|g(i|o|e)ts?|gitt|gotcock)|fastfuck|fat\s*(ass|butt|fuck(er)?)|finger\s*fuck(ed|ers?|ing)?|fist(ed|er|fucked|fuckers?|fuckings?|fucks?|ing)|knucklehead|lameass|'+
'foot(fuck(er)?|job)|freaky?(fuck(er)?)|fuck\s*(buttons|hole|knuckle|puppet|whit|able|ass|boy|brain|buddy|butt|butter|ed|edup|er|ers|face|fest|freak|friend|heads?|hole|ing|ing cunt|ingbitch|me|off|pig|tards?|whore|you)|'+
'gangbang|gay(ass|fuck(ist)?|tard)|giant cock|hardcock|hardcoresex|headfuck|hooker|horse\s*(shit|crap)|hotpussy|jack(asssss|off|ass|hole|ing\s*off|shit)|jerk\s*((o|0)ff|ass|off)|knobhead|lameasswipe|limpdick|lipshits|masterbat(ing|ions?|e))(?!\<)','i'),
new RegExp('(?!\>)(moosefucker|morons?|m(o|u)?th(afuck(a?s?z?|ed|ers?|ing?s?)|afucks|afuker|afukk(ah|er)|er\s*fuckers?|erfucka?|erfuck(ed|ing?s?)|erfuckka|erfucks|erfukah|erfuker|erfukkah|erfukker|erfucker|rfucker|rfucking|afucka|afuc?ker|erfucking|rfucking)|'+
'nasty(bitch|slut|whore)|negro(\'s)?|nigg(ar?d?|arded|arding|as|az|er|erhead|erhole|ers|er\'s)|nipple|oral sex|penis(banger|breath|es|fucker|puffer)|pervert|piece of shit|piss(pig|ant|ed|ers?|es|flaps|heads?|ing?)|'+
'punkass|puss(ies?|ys?|y fart|y licker|y palace|yeater|yfucker|ylicking|ylips|ylover|ypounder)|queer cunt|raghead|rapist|rat arsed|redneck|redskin|rentafuck|retard|scum|scumbags?|sex(hound|whore)|whitenigger|whore(bag|face|fucker|hopper|house|s)|'+
'shit(fucker|slinger|ass|bag|bagger|brains|breath|can(ned)?|cunt|dick|e|eater|ey|faced?|fit|forbrains|fuck(ers?)?|full|happ?ens|-?heads?|hole|house|ings?|kicker|s|spitter|stain|stick|t|ted|ters?|tiest|tings?|ty|y|z)|'+
'shiz|skanky?(bitch|fuck|whore|y)|skullfuck|skumbag|slut\s*(bucket|bag|dumper|kiss|s|t|ing|ty|wear|whore)|sonofabitch|stfu|stupidfuck(er)?|suckdick|suckmy(ass|dick|tit)|thundercunt|tightarse|tightass|'+
'tit(wank|fuck(er|ing?)?|job|licker|lover|s|ties|ty|tyfuck|tyfucker|tywank)|tiefucker|tonguefuck|twat(face|head|lips|s|ty|waffle)|twobitwhore|unclefucker|uptheass|wank(er|ing|job|ware)|whisk(eydick|kydick)|white trash scumbag|wtf|you dumb ass|\w\W+)(?!\<)','i')); 

var deL3RegPatts = new Array(new RegExp('(?!\>)(pussy|msn|fuc(k|ed|ers?|ing|s)?|(f|F)(~|_|!|@|#|$|%|^|&|[*](k))|fckn|Rats|motherfu?|fuk|cunt|d(i|!|[*])ck|asshole|a s s h o l e |assh|a[$]|f\'cking|F-ing|azz|bitch|'+
             'dumb|suck(s|er|ed)?|^\lick|nigg(ro|ga|er)?|(s|S)((~|!|@|#|$|%|^|&|[*])h(i|!|)t)|jacka(s|$)?)(?!\<)','i'));    
 
  
setTimeout(function () {
  var divFb = document.getElementById('facebook');
  if (divFb != null)
  {
    //var divFbPostContainer = document.getElementsByTagName('div');
    //for (var i = 0; i < divFbPostContainer.length; i++) {
    //if (divFbPostContainer[i].className == 'fbFeedbackPostsContainer') {
    //divFbPostContainer[i].setAttribute('style', 'overflow:scroll;max-height:100%;height:100%;width:100%; margin:0px auto;');
    //}
    //}
    GetApplicationID();
    LoadApplicationRegExs();
    
    divFb.setAttribute('style', 'overflow:scroll;width:95%; margin:0px auto;');
    var newFirstElement = document.createElement('label');
    articleUrl = getParameterByName('href');
    if (articleUrl == undefined || articleUrl == '') {
      isArticleUrlFound = false;
    } 
    else {
      isArticleUrlFound = true;
    }
    newFirstElement.innerHTML = '<table style="width:100%"><tr><td><b>Article URL: <input id="txtArticleUrl" type="text" style="width:80%" disabled="disabled" value=\'' + articleUrl + '\' /></b></td><td><input id="btnLoadModControls" type="button" value="1. Load Moderator Controls" /><input id="btnHighlightSpam" type="button" value="2. Find Spam Comments" /><input id="btnHideSpamComments" type="button" value="3. Hide All Spam Comments" /><input id="btnHighlightBlacklistwords" type="button" value="4. Hghlight All Blacklist words" /></td><td align="right" style="text-align:right">Moderator: <select id="selModerator">' + moderatorsList + '</select></td></tr></table>';
    //newFirstElement.innerHTML = '<table style="width:100%"><tr><td><b>Article URL: <input id="txtArticleUrl" type="text" style="width:80%" value=\'' + articleUrl + '\' /></b></td><td align="right" style="text-align:right">Article Topic: <input id="articleTopic" type="text" /></td></tr></table>';
    divFb.insertBefore(newFirstElement, divFb.firstChild);
    var btnLoadControls = document.getElementById('btnLoadModControls');
    btnLoadControls.onclick = function ()
    {
      AddModerateControls();
    }
    var btnHighlightSpam = document.getElementById('btnHighlightSpam');
    btnHighlightSpam.onclick = function ()
    {
      HighlightSpamCommentsNew();
    }
    var btnHideSpamComments = document.getElementById('btnHideSpamComments');
    btnHideSpamComments.onclick = function ()
    {
      HideSpamCommentsNew();
    }
    var btnHighlightBlacklistwords = document.getElementById('btnHighlightBlacklistwords');
    btnHighlightBlacklistwords.onclick = function ()
    {
      HighLightBlackListedWords();      
    }
    
    uguid = getParameterByName('userguid');
    if (uguid != null) {
      var sModerator = document.getElementById('selModerator');
      sModerator.value = uguid;
    }
  }
  AddModerateControls();   
  if (uguid != '') {
    HideSpamCommentsNew();
    window.close();
  }
}, 2000);

// Gets the Current Application ID
function GetApplicationID() {  
  try
  { 
    var pageUrl = window.location.href;
    if(!pageUrl.contains('tools/comments/url')) {
      var textContainers = document.getElementsByClassName('_50f8 _50f3'); 
      if(textContainers.length>0) {
        for(var i=0; i<textContainers.length;i++) {
          var spanText = textContainers[i].innerHTML;
          if(spanText.contains('App ID:')){
          currentAppId = spanText.match(/\d+/)[0];
            break;}
          //var spans = textContainers[i].getElementsByTagName('span');           
          //for(var j=0;j<spans.length;j++) { 
          //  var dataId = spans[j].getAttribute('data-reactid');            
          //  if (dataId != null && dataId.indexOf('22') != - 1) {
          //    currentAppId = spans[j].textContent;
          //    break;          
          //  }
          //}
        }
      }
    }
    else {      
      textContainers = document.getElementsByClassName('_5c0n'); 
      if(textContainers.length>0)
      currentAppId = textContainers[0].href.match(/\d+/)[0]; 
    }  
    //alert(currentAppId);
  }
  catch(ex) 
  {
    alert(ex);
  }
}  

// Load Application's RegExPatterns
function LoadApplicationRegExs() {

  switch(currentAppId) {
    //'EN-MSN#689384617806917'
    case '689384617806917':
      regExDict['review'] = enL2RegPatts;
      regExDict['public'] = enL3RegPatts;
      break;
    //'FR-MSN#340534406099501'    
    case '340534406099501':
      regExDict['review'] = frL2RegPatts;
      regExDict['public'] = enL3RegPatts;
      break;
      // 'PT-MSN#1449534195317908'
      case '1449534195317908':
        regExDict['review'] = ptL2RegPatts;
        regExDict['public'] = enL3RegPatts;
        break;
        // 'ES-MSN#577804522329995'
      case '577804522329995':
        regExDict['review'] = esL2RegPatts;
        regExDict['public'] = enL3RegPatts;
        break;
        // 'IT-MSN#1455766471352205'
      case '1455766471352205':
        regExDict['review'] = itL2RegPatts;
        regExDict['public'] = enL3RegPatts;
        break;
    //'DE-MSN#544580382313562'
    case '544580382313562':
      regExDict['review'] = deL2RegPatts;
      regExDict['public'] = deL3RegPatts;
      break;
     //'NL-MSN#486847318126219'
    case '486847318126219':
      regExDict['review'] = nlL2RegPatts;
      regExDict['public'] = enL3RegPatts;
      break;
    default:
      regExDict['review'] = enL2RegPatts;
      regExDict['public'] = enL3RegPatts;
  }
  
  //'SV-MSN#253239748208334'
  //'TR-MSN#667415743327744'
  //'RU-MSN#760049184057705'
  //'JA-MSN#304492469722269'
  //'TH-MSN#320330421467948'
  //'ID-MSN#242727845936737'
  //'HE-MSN#319883131525928'
  //'KO-MSN#1445736572366490'
  //'NB-MSN#1452940268301780'
  //'VI-MSN#1516422451902910'
  //'ZH-MSN#268405136692327'
  //'FI-MSN#963921453634367'
  //'EL-MSN#796325693750916'
  //'DA-MSN#1542514589303710'
  //'PL-MSN#689527477782682'
  //'AR-MSN#636427529797723'  
}

// HighLight Black Listed Words
function HighLightBlackListedWords() {
  try
  {     
    var totalComentCount =0;
    var tablerows = document.getElementsByClassName('_1ql3');  
    var L1Words =0;
    var L2Words =0;
    if(tablerows.length>0)
    totalComentCount = 0;
    var blackLsistedCommentCount = 0;
    // Gets the Current Application ID    
    if(currentAppId == '' ) {
      GetApplicationID();
      LoadApplicationRegExs();
    }    
    var textContainers = document.getElementsByClassName('_2uma');
        //   tablerows[0].childNodes[0].childNodes; 
    var hilightTag = '';
    var regPatterns;
    var pageUrl = window.location.href;
    if(pageUrl.contains('/approved/')) {
      hilightTag = "<font style='background-color:cyan'>";
      regPatterns = regExDict['public'];
    }
    else {
      hilightTag = "<font style='background-color:red;color:white'>";
      regPatterns = regExDict['review'];
    }    
    var highlightEndTag = "</font>";  
    var l1CountArray = new Array();
    var l2CountArray = new Array();
    var l1l2CountArray = new Array();      
    for(var i=0; i<textContainers.length;i++) {   
      totalComentCount = totalComentCount + 1;
      var spans = textContainers[i].getElementsByTagName('span'); 
      //textContainers[i].getElementsByClassName('_2uma')[0].getElementsByTagName('span'); 
      for(var j=0;j<spans.length;j++) { 
        //var dataId = spans[j].getAttribute('data-reactid');            
        //if (dataId != null && dataId.indexOf('.0.1.0.1.0.0:$') != - 1) { 
          var content = spans[j].innerHTML;             
          for each(var regPatt in regPatterns ) {                         
            while(match=regPatt.exec(content)) {              
              var before = content.slice(0,match.index);
              var after = content.slice(match.index + match[0].length,content.length);
              content = before + hilightTag + match[0] + highlightEndTag + after;                               
            }
          }
          spans[j].innerHTML = ''; 
          spans[j].innerHTML = content;  
       // }
      }      
      var checkText = textContainers[i].innerHTML;
      //textContainers[i].getElementsByClassName('_2uma')[0].innerHTML;
      var l1matches = (checkText.match(/_3wbz/g)||[]).length;      
      var l2matches = (checkText.match(/<font style=('|")background-color:red;color:white('|")>/g)||[]).length; 
      L1Words = L1Words + l1matches;
      L2Words = L2Words + l2matches;
      if(l1matches==0 && l2matches==0){
        // do nothing
      }
      else if(l1matches==l2matches)
        l2CountArray.push(i);
      else if(l1matches>0 && l2matches==0) 
        l1CountArray.push(i);      
      else
        l1l2CountArray.push(i);      
    } 
    var lblText = '<br><font style=\'color:#9399A5;font-size: 12px;line-height: 16px;\'>Total comments: '+ totalComentCount + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L1 Words: '+L1Words+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L2 Words: '+L2Words+'<br>L1 Comments: '+ l1CountArray.length +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L2 Comments: '+ l2CountArray.length +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L1&L2 Comments: '+ l1l2CountArray.length +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Comments: '+ (totalComentCount-(l1CountArray.length+l2CountArray.length+l1l2CountArray.length)) +'</font>';
    var lblcheck = document.getElementById('lblCounts');  
    if(pageUrl.contains('/tools/comments/url/')){
     var countContainers =  document.getElementsByClassName('_2pic _5c0o  _50f4');
      if(countContainers.length>0) {
        for(var i=0; i<countContainers.length;i++) {
          var divparent = countContainers[i];                    
          if(lblcheck==null){
            var lblcounts = document.createElement('label');
            lblcounts.id = 'lblCounts';
          lblcounts.innerHTML = lblText;
            divparent.appendChild(lblcounts);}
          else
            lblcheck.innerHTML =lblText;
          break;
        } 
      }
    }
    else{
    var countContainers = document.getElementsByClassName('_50f8 _50f3'); 
      if(countContainers.length>0) {        
        for(var i=0; i<countContainers.length;i++) {
          var divparent = countContainers[0].parentNode;                    
          if(lblcheck==null){
            var lblcounts = document.createElement('label');
            lblcounts.id = 'lblCounts';
          lblcounts.innerHTML = lblText;
            divparent.appendChild(lblcounts);}
          else
            lblcheck.innerHTML =lblText;
          break;
        }
      }}
  }
  catch(ex)
  {
    alert(ex);
  }
}

// Load More button click
function SetPagerDivClickAction() {
  try
  {    
    var buttonPager = document.getElementsByTagName('button');
    for (var i = 0; i < buttonPager.length; i++) {
      var dataId = buttonPager[i].getAttribute('class');
      
      if (dataId != null && ((dataId.indexOf('_4jy0 _4jy3 _517h') != - 1) || (dataId.indexOf('.0.0.2.1.0') != -1))) {
       // alert(dataId);
        buttonPager[i].onclick = function ()
        {
          setTimeout(function () {
           AddModerateControls();            
          }, 5000);
        }
      }
    }
  } 
  catch (ex)
  {
    alert(ex);
  }
}

// see more reply hyperlink click
function SetMoreCommentClickAction() {
  try
  {    
    var buttonPager = document.getElementsByTagName('a');
    for (var i = 0; i < buttonPager.length; i++) {
      var dataId = buttonPager[i].getAttribute('class');
      if (dataId != null && ((dataId.indexOf('_3uik _2ph-') != - 1) || (dataId.indexOf('_5v47 ') != - 1))) {
        buttonPager[i].onclick = function ()
        {
          setTimeout(function () {
            AddModerateControls();            
          }, 5000);
        }
      }
    }
  } 
  catch (ex)
  {
    alert(ex);
  }
}

// comments view change action
function SetViewChangeAction() {
  try
  {    
    var buttonPager = document.getElementsByTagName('li');
    for (var i = 0; i < buttonPager.length; i++) {
      var dataId = buttonPager[i].getAttribute('class');
      if (dataId != null && dataId.indexOf('_5vwz') != - 1) {
        buttonPager[i].onclick = function ()
        {
          setTimeout(function () {
            AddModerateControls();            
          }, 5000);
        }
      }
    }
  } 
  catch (ex)
  {
    alert(ex);
  }
}

// sort by button click action
function SetSortByChangeAction() {
  try
  {  
    var mainDataId;    
      var divs = document.getElementsByTagName('div');
      for (var i = 0; i < divs.length; i++) {
        var divClass = divs[i].getAttribute('class');
        if (divClass != null && divClass.indexOf('uiPopover _6a _6b') != - 1) {
          mainDataId = divs[i];
          break;
        }
      }
   
    if (mainDataId != null) {        
      mainDataId.onclick = function ()
      {
        setTimeout(function () {
          AddModerateControls();            
        }, 5000);
      }
    }        
  } 
  catch (ex)
  {
    alert(ex);
  }
}

// adding moderators controls
function AddModerateControls() {
  try
  { 
    var pageUrlFlage = false;    
    if(window.location.href.substring(0,31)==='https://developers.facebook.com')
      pageUrlFlage = true;
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
      var divClass = divs[i].getAttribute('class');
      if (divClass != null && divClass.indexOf('UFIImageBlockContent') != - 1) {
        var articleHref = null;
        var articleHrefId = null;
        if(pageUrlFlage){
        articleHref = divs[i].childNodes[0].childNodes[0].childNodes[2].getElementsByTagName('a')[0].getAttribute("href");        
          articleHrefId =  articleHref.match(/[^/]+$/)[0];}
        var dateDiv = '';
    dateDiv = divs[i].getElementsByTagName('abbr') [0];    
    var datev = '';
        if(dateDiv != null && dateDiv != '') {
          datev = dateDiv.getAttribute('data-utime');
          datev += '000';
        }
        else {
          datev ="UNDEFINE";
        }          
          
        //profileName
    var pDiv = divs[i].getElementsByTagName('a');
    var from = '';
    var userName = '';
        
         for (var k = 0; k < pDiv.length; k++) {      
      if (pDiv[k].className == ' UFICommentActorName') {
        from = pDiv[k].getAttribute('href');
        from = from.replace('https://www.facebook.com/', '');
        from = from.replace(/\/$/,'');
        userName = pDiv[k].childNodes[0].innerHTML;        
        if (from.indexOf('?id=') != - 1) {
          from = from.replace('profile.php?id=', '');
        }
        break;
      }
    }
        
        //alert("i" + i + "   datev: " + datev + "    from :" + from + "             userName" + userName);
        
        
        var pId =  datev+"|"+from+"|"+userName;  //divs[i].getAttribute('data-reactid');
        //alert(pId);
        var divFbId = 'divFb_' + pId;
        var divCheck = document.getElementById(divFbId);
        if (divCheck == null)
        {  
          if(pageUrlFlage){
          var commentReadReq = commentReadCheckAPI+'articleUrl=' + articleHref + '&commentId=' + pId + '|' + articleHrefId ;
          var statusResponse = GetCommentStatusInfo(commentReadReq);          
          var flagSpan = document.createElement('span');          
          var newFlagLabel = document.createElement('label');
          if(statusResponse ==-1)
          newFlagLabel.innerHTML = '<font style=\'color:#9399A5;font-size: 12px;line-height: 16px;\' >Read:</font>&nbsp;<input id="chk_'+pId+'" type="checkbox"">';
          else
          newFlagLabel.innerHTML = '<font style=\'color:#9399A5;font-size: 12px;line-height: 16px;\'>'+ statusResponse +'</font>';  
          flagSpan.appendChild(newFlagLabel);                    
          flagSpan.setAttribute('style', moderatorDivStyle);
          divs[i].childNodes[0].childNodes[0].appendChild(flagSpan);
          
          var chkSendFalg = document.getElementById('chk_'+pId);
          if(chkSendFalg!=null){
          chkSendFalg.onchange = function ()
          {
            sendFbData(this.id);               
          }}
          }
          var divModerate = document.createElement('div');
          divModerate.id = divFbId;
          var actionLabel = document.createElement('label');
          actionLabel.innerHTML = actionTitle;
          var offenceLabel = document.createElement('label');
          offenceLabel.innerHTML = offenceTitle;
          //var moderatorLabel = document.createElement('label');
          //moderatorLabel.innerHTML = moderatorTitle;
          var selAction = document.createElement('select');
          selAction.innerHTML = actionsList;
          var selOffence = document.createElement('select');
          selOffence.innerHTML = offenceList;
          //var selModerator = document.createElement('select');
          //selModerator.innerHTML = moderatorsList;
          var input = document.createElement('input');
          input.type = 'button';
          input.value = 'Submit';
          input.zIndex = 10000;
          input.onclick = function ()
          {
            sendFbData(this.id);
          }
          selAction.id = 'selAction_' + pId;
          selOffence.id = 'selOffence_' + pId
          //selModerator.id = 'selModerator_' + pId
          input.id = 'btnSum_' + pId;
          divModerate.appendChild(actionLabel);
          divModerate.appendChild(selAction);
          divModerate.appendChild(offenceLabel);
          divModerate.appendChild(selOffence);
          //divModerate.appendChild(moderatorLabel);
          //divModerate.appendChild(selModerator);
          divModerate.appendChild(input);
          divModerate.setAttribute('style', moderatorDivStyle);
          divs[i].childNodes[0].appendChild(divModerate);          
          divs[i].onclick = function ()
          {
            if (!isArticleUrlFound) {
              var articleLinks = this.getElementsByTagName('a');              
              for (var i = 0; i < articleLinks.length; i++) {                
                var dataId = articleLinks[i].parentElement.getAttribute('class');                
                if (dataId != null && dataId.indexOf('_3lfy') != - 1) {
                  var tmpArtUrl = articleLinks[i].getAttribute('href')                  
                  document.getElementById('txtArticleUrl').value = tmpArtUrl.replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%3F/g, '?').replace(/%25/g, '%');                  
                  break;
                }
              }
            }
          }
        }
      }
    }    
    SetPagerDivClickAction();    
    SetViewChangeAction();    
    SetMoreCommentClickAction();
    SetSortByChangeAction();
    HighlightSpamCommentsNew();
    HighLightBlackListedWords();    
    
    var divCheck = document.getElementById('divFb_UNDEFINE||');
    if(divCheck != null)
      {
        divCheck.parentNode.removeChild(divCheck);
      }
  } 
  catch (ex)
  {
    alert(ex);    
  }
}

// Read comment status from API
function GetCommentStatusInfo(uri) {
  try
  {    
    var res = null;    
    var details =  GM_xmlhttpRequest({method: "GET",url: uri,synchronous: true});    
    var json = details.responseText.replace('[', '');
    json = json.replace(']', '');
    //alert(uri);
    //alert(json);
    var jsonObj = JSON.parse(json);            
    if(jsonObj.CommentStatus==-1){
            res = jsonObj.CommentStatus;            
          }
    else {         
           res =  jsonObj.ModeratorName +' at '+jsonObj.StatusDateTime;
            if(jsonObj.CommentStatus == 3)
              {
                res = 'Approved by: '+ res;
              }
            else if(jsonObj.CommentStatus == 4)
              {
                res = 'Hidden by: '+ res;
              }
            else if(jsonObj.CommentStatus == 5)
              {
                res = 'Banned by: '+ res;
              }
            else if(jsonObj.CommentStatus == 6)
              {
                res = 'Read by: '+ res;
              }
    }
    return res;
  }
  catch(ex)
  {
    alert(ex);
  }
}


// Highliting spam comments
function HighlightSpamCommentsNew() {
  try
  { 
    var allCommentsParent;
    var tblBodys = document.getElementsByClassName('_1ql3');
    if(tblBodys.length > 0) {
        allCommentsParent = tblBodys[0].getElementsByTagName('tbody')[0];      
      }    
    
    //for (var i = 0; i < tblBodys.length; i++) {
    //  var tbodyId = tblBodys[i].getAttribute('class');
    //  if (tbodyId != null && tbodyId.indexOf('.0.1.0.1.0') != -1)
    //  {
   //     if (allCommentsParent == null) {
    //      allCommentsParent = tblBodys[i];        
    //    }
    //  }
   // }
    
    if(allCommentsParent != null) {            
    var firstCommentTblRow;
    var tblRows = allCommentsParent.getElementsByTagName('tr');
      if(tblRows.length > 0) {
        firstCommentTblRow = tblRows[0];        
      }
    for (var i = 0; i < tblRows.length; i++) {
    //  var trId = tblRows[i].getAttribute('data-reactid');
     // if (trId != null && trId.indexOf('.0.1.0.1.0.0:$') != - 1) {
       // if (firstCommentTblRow == null) {
       //   firstCommentTblRow = tblRows[i];
       // }
     
      var imageBlockContent = tblRows[i].getElementsByClassName('UFIImageBlockContent _42ef');
      for(l=0;l<imageBlockContent.length;l++){
      
      var dateDiv = '';
    dateDiv = imageBlockContent[l].getElementsByTagName('abbr') [0];    
    var datev = '';
        if(dateDiv != null && dateDiv != '') {
          datev = dateDiv.getAttribute('data-utime');
          datev += '000';
        }
        else {
          datev ="UNDEFINE";
        }          
          
        //profileName
    var pDiv = imageBlockContent[l].getElementsByTagName('a');
    var from = '';
    var userName = '';
        
         for (var k = 0; k < pDiv.length; k++) {      
      if (pDiv[k].className == ' UFICommentActorName') {
        from = pDiv[k].getAttribute('href');
        from = from.replace('https://www.facebook.com/', '');
        from = from.replace(/\/$/,'');
        userName = pDiv[k].childNodes[0].innerHTML;        
        if (from.indexOf('?id=') != - 1) {
          from = from.replace('profile.php?id=', '');
        }
        break;
      }
    } 
        
        var pId =  datev+"|"+from+"|"+userName;  //divs[i].getAttribute('data-reactid');
        //alert(pId);
        var divFbId = 'divFb_' + pId;
        
       // var divFbId = '';
       // if(trId.indexOf('.1.0.0.1.0.0:$') != -1) {
       //   divFbId = 'divFb_' + trId + '.0.1.0.0.$right.0';  
      //  }
      //  else {          
      //    divFbId = 'divFb_' + trId + '.1.0.0.0.$right.0';  
      //  }          
        
        var divCheck = document.getElementById(divFbId);
        if (divCheck != null)
        { 
          //comment text
          try
          {
            var mDiv = divCheck.parentElement;
            var comDiv = mDiv.getElementsByTagName('span');
            var commentCheck = '';
            var decodedCommentCheck = '';
            var regExMatched = false;
            
            for (var cc = 0; cc < comDiv.length; cc++) {
              var comSpanID = comDiv[cc].getAttribute('class');
              if (comSpanID != null && ((comSpanID.indexOf('_2uma') != -1) || (comSpanID.indexOf('_5mdd') != -1))) {               
                commentCheck = '';
                commentCheck = comDiv[cc].textContent.replace(regex, '');                
                var res1 = regexSpam1.exec(commentCheck);
                var res2 = regexSpam2.exec(commentCheck);
                var res3 = regexSpam3.exec(commentCheck);
                var res4 = regexSpam4.exec(commentCheck);
                var res5 = regexSpam5.exec(commentCheck);
                var res6 = regexSpam6.exec(commentCheck);
                var patt = new RegExp("every hour");                
                res6 = patt.exec(commentCheck);
                if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null) {
                  //alert(comDiv[cc].textContent);
                  regExMatched = true; 
                } 
                else
                {
                  decodedCommentCheck = commentCheck.replace(/&shy;/g, '-').replace(/&gt;/g, '>').replace(/amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, '');
                  res1 = regexSpam1.exec(decodedCommentCheck);
                  res2 = regexSpam2.exec(decodedCommentCheck);
                  res3 = regexSpam3.exec(decodedCommentCheck);
                  res4 = regexSpam4.exec(decodedCommentCheck);
                  res5 = regexSpam5.exec(decodedCommentCheck);
                  res6 = regexSpam6.exec(decodedCommentCheck);
                  if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null) {
                    regExMatched = true;
                  }
                }
                if(regExMatched) {
                  for(var k = 0; k < comDiv.length; k++) {
                   if(comDiv[k].className == "_2uma" || comDiv[k].className.indexOf("_5mdd") != -1) {
                     comDiv[k].setAttribute('style', 'background-color:yellow;');
                     var sourceNode = mDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                     
                     if(sourceNode.parentNode.parentNode.className == '_2slp _2pit') {
                       sourceNode = mDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                     }
                     allCommentsParent.insertBefore(sourceNode, firstCommentTblRow);
                     break;
                   }
                  }
                }
              }
              if(regExMatched)
              {  break; }
            }
          } 
          catch (ex)
          {
          }
        }
    //  }
    }
    }
  }
    else
      { 
        var divTags = document.getElementsByTagName('div');        
  //  for (var i = 0; i < divTags.length; i++) {
   //   var mainDivId = divTags[i].getAttribute('data-reactid');
   //   if (mainDivId != null && mainDivId.indexOf('.0.0.2') != -1) {
   //      if (allCommentsParent == null) { 
   //        allCommentsParent = divTags[i];  
    //     }
   //   }
   // }
        
        var firstCommentDiv;        
        
    for (var i = 0; i < divTags.length; i++) {      
      var divClass = divTags[i].getAttribute('class');
       if (divClass != null && divClass.indexOf('_4k-6') != - 1) {
        if (allCommentsParent == null) {          
          allCommentsParent = divTags[i];          
          firstCommentDiv = divTags[i+1];          
        }      
       }
      
      if (divClass != null && divClass.indexOf('UFIImageBlockContent') != - 1) {
        //var pId = divTags[i].getAttribute('data-reactid');
        
        var dateDiv = '';
    dateDiv = divTags[i].getElementsByTagName('abbr') [0];    
    var datev = '';
        if(dateDiv != null && dateDiv != '') {
          datev = dateDiv.getAttribute('data-utime');
          datev += '000';
        }
        else {
          datev ="UNDEFINE";
        }          
          
        //profileName
    var pDiv = divTags[i].getElementsByTagName('a');
    var from = '';
    var userName = '';
        
         for (var k = 0; k < pDiv.length; k++) {      
      if (pDiv[k].className == ' UFICommentActorName') {
        from = pDiv[k].getAttribute('href');
        from = from.replace('https://www.facebook.com/', '');
        from = from.replace(/\/$/,'');
        userName = pDiv[k].childNodes[0].innerHTML;        
        if (from.indexOf('?id=') != - 1) {
          from = from.replace('profile.php?id=', '');
        }
        break;
      }
    } 
        
        var pId =  datev+"|"+from+"|"+userName;  //divs[i].getAttribute('data-reactid');
        //alert(pId);
        var divFbId = 'divFb_' + pId;
        
        var divCheck = document.getElementById(divFbId);        
        if (divCheck != null)
        {
          //comment text
          try
          {
            var mDiv =  divTags[i];
            var comDiv = mDiv.getElementsByTagName('span');
            var commentCheck = '';
            var decodedCommentCheck = '';            
            for (var cc = 0; cc < comDiv.length; cc++) {
              var comSpanID = comDiv[cc].getAttribute('class');
              if (comSpanID != null && comSpanID.indexOf('_5mdd') != -1) {               
                commentCheck = '';                
                commentCheck = comDiv[cc].textContent.replace(regex, '');                
                var res1 = regexSpam1.exec(commentCheck);
                var res2 = regexSpam2.exec(commentCheck);
                var res3 = regexSpam3.exec(commentCheck);
                var res4 = regexSpam4.exec(commentCheck);
                var res5 = regexSpam5.exec(commentCheck);
                var res6 = regexSpam6.exec(commentCheck);
                if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null) {
                  comDiv[cc].setAttribute('style', 'background-color:yellow;');                                                    
                    var moveEle = mDiv.parentElement.parentElement;
                    allCommentsParent.insertBefore(moveEle, firstCommentDiv);              
                } 
                else
                {
                  decodedCommentCheck = commentCheck.replace(/&shy;/g, '-').replace(/&gt;/g, '>').replace(/amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, '');
                  res1 = regexSpam1.exec(decodedCommentCheck);
                  res2 = regexSpam2.exec(decodedCommentCheck);
                  res3 = regexSpam3.exec(decodedCommentCheck);
                  res4 = regexSpam4.exec(decodedCommentCheck);
                  res5 = regexSpam5.exec(decodedCommentCheck);
                  res6 = regexSpam6.exec(decodedCommentCheck);
                  if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null) {
                    comDiv[cc].setAttribute('style', 'background-color:yellow;');                       
                      var moveEle = mDiv.parentElement.parentElement;
                    allCommentsParent.insertBefore(moveEle, firstCommentDiv);              
                  }
                }
                break;
              }
            }            
          } 
          catch (ex)
          {
          }
        }
      }
      }
  }
  }
  catch (ex)
  {
    alert(ex);
  }
}

// Clicks pager button
function ClickPagerButtons() {
  try
  {
    var buttonPager = document.getElementsByTagName('button');
    for (var i = 0; i < buttonPager.length; i++) {
      var dataId = buttonPager[i].getAttribute('data-reactid');
      if (dataId != null && (dataId.indexOf('$/=10.0') != - 1)) {
        
        buttonPager[i].click();
        
        buttonPager[i].onclick = function ()
       {
         setTimeout(function () {
           //alert('beforeinnterpagerclick');
           ClickPagerButtons();    
          }, 5000);
        }
      }
    }    
  }
  catch (ex)
  {
    //alert(ex);
  }
}

// Hide Spam comments new method
function HideSpamCommentsNew() {
  try
  {
    var moderator = document.getElementById('selModerator');
    if (moderator.value == 0)
    {
      window.alert('please select moderator');
      //moderator.focus();
      return;
    }
    //alert('fromhidespam');
    
    //ClickPagerButtons();
    
    var tblRows = document.getElementsByClassName('_1ql3')[0].childNodes[0].childNodes;
    for (var i = 0; i < tblRows.length; i++) {
      //var trId = tblRows[i].getAttribute('data-reactid');      
      //if (trId != null && trId.indexOf('.0.1.0.1.0.0:$') != - 1) {
    
       var imageBlockContent = tblRows[i].getElementsByClassName('UFIImageBlockContent _42ef');
      for(l=0;l<imageBlockContent.length;l++){
       var dateDiv = '';
    dateDiv = imageBlockContent[l].getElementsByTagName('abbr') [0];    
    var datev = '';
        if(dateDiv != null && dateDiv != '') {
          datev = dateDiv.getAttribute('data-utime');
          datev += '000';
        }
        else {
          datev ="UNDEFINE";
        }          
          
        //profileName
    var pDiv = imageBlockContent[l].getElementsByTagName('a');
    var from = '';
    var userName = '';
        
         for (var k = 0; k < pDiv.length; k++) {      
      if (pDiv[k].className == ' UFICommentActorName') {
        from = pDiv[k].getAttribute('href');
        from = from.replace('https://www.facebook.com/', '');
        from = from.replace(/\/$/,'');
        userName = pDiv[k].childNodes[0].innerHTML;        
        if (from.indexOf('?id=') != - 1) {
          from = from.replace('profile.php?id=', '');
        }
        break;
      }
    } 
        
        var pId =  datev+"|"+from+"|"+userName;  //divs[i].getAttribute('data-reactid');
        //alert(pId);
        var divFbId = 'divFb_' + pId;      
        
        var divCheck = document.getElementById(divFbId);
        if (divCheck != null)
        { 
          //comment text
          try
          {
            var mDiv = divCheck.parentElement;
            var comDiv = mDiv.getElementsByTagName('span');
            for(var k = 0; k < comDiv.length; k++) {
              if(comDiv[k].className == "_2uma" || comDiv[k].className.indexOf("_5mdd") != -1) {
                if(comDiv[k].style.backgroundColor == 'yellow') {                  
                  commentCheck = comDiv[k].textContent;
                  mDiv.parentElement.click();
                  Delay(1000);
                  var modDivs = mDiv.getElementsByTagName('div');
                      
                  var aId = divFbId.replace('divFb_', 'selAction_');
                  var action = document.getElementById(aId);
                  var oId = divFbId.replace('divFb_', 'selOffence_');
                  var offence = document.getElementById(oId);
                  action.value = 4;
                  offence.value = 2;
                  //sendFbData(divFbId);
                  //Delay(1000);
                  var sourceNode = mDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;                   
                  var hideTD = null;
                  var datReactId = sourceNode.parentElement.parentElement.getAttribute('class');
                  if(datReactId != null && datReactId == '_2slp _2pit') {
                    hideTD = sourceNode.childNodes[1];                    
                  }
                  else {
                    hideTD = sourceNode.childNodes[2];                    
                  }                  
                  var actionLst = hideTD.getElementsByTagName('a');                  
                  for (var ll = 0; ll < actionLst.length && actionLst.length>1; ll++) {                    
                    var ancId = actionLst[ll].innerHTML;                    
                    if (ancId != null && ancId== 'Hide') {                      
                      sendFbData(divFbId);
                      Delay(1000);
                      actionLst[ll].click();
                      break;
                    }
                  }
                }
              }
            }
          } 
          catch (ex)
          {
          }
        }
      
      // is for if
      //}
      
      
    }
    }
  }
  catch (ex)
  {
    alert(ex);
  }
}

// sending fb data to server
function sendFbData(objid) {
  try
  {
    var aId = objid.replace('btnSum', 'selAction');    
    var oId = objid.replace('btnSum', 'selOffence');
    var mId = 'selModerator'; //objid.replace('btnSum', 'selModerator');
    var cId = objid.replace('btnSum_', '');
    cId = objid.replace('chk_', '');
    
    var divCheck = document.getElementById(objid);
    var mDiv = null;    
    if(  objid.substring(0,4) === 'chk_'  )
      mDiv = divCheck.parentElement.parentElement.parentElement.parentElement.parentElement;
      else
        mDiv = divCheck.parentElement.parentElement.parentElement;
    
    var tmpArtUrl = document.getElementById('txtArticleUrl').value;
    
    if (!isArticleUrlFound) {
      var articleLinks = mDiv.getElementsByTagName('a');              
      for (var i = 0; i < articleLinks.length; i++) {                
        var dataId = articleLinks[i].parentElement.getAttribute('class');                
                if (dataId != null && dataId.indexOf('_3lfy') != - 1) {
          tmpArtUrl = articleLinks[i].getAttribute('href')                  
          document.getElementById('txtArticleUrl').value = tmpArtUrl.replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%3F/g, '?').replace(/%25/g, '%');                  
          break;
        }
      }
    }
    
    var res = tmpArtUrl.split("/");
    var articleID = res[res.length -1];
    //alert(articleID);
    
    //alert(tmpArtUrl);
    
    var commentID = cId + "|"+  articleID;
    //if(cId.indexOf('.1.0.0.1.0.0:$') != -1){      
      //var tmp = cId.split('$');
    ///commentID = tmp[tmp.length -2];      
   // }
    //else {
    //var tmp = cId.split('$');      
   // commentID = tmp[1].replace('.1.0.0.0.','');      
   // }
   // commentID = commentID.replace('.0.1.0.0.','');
   // commentID = commentID.replace('.','');
    //alert(commentID);
    //if (cId.indexOf('reply'))
    //commentID = tmp[2];    
    //main comment div
    //var mainDiv = document.getElementById(cId);
    //comment text
    //var conDiv = mainDiv.getElementsByTagName('div');
    
    var comment = '';
    var likes = 0;
    
    
      //comment text      
      var comDiv = mDiv.getElementsByTagName('span');      
            
      for (var cc = 0; cc < comDiv.length; cc++) {        
        var comSpanID = comDiv[cc].className;        
        if (comSpanID != null && ((comSpanID == "_2uma") || (comSpanID.indexOf("_5mdd") != -1))) {          
          comment = comDiv[cc].innerHTML.replace(regex, '');
          comment = comment.replace(/&amp;/g, 'and');
          comment = comment.replace(/&/g, 'and');
          comment = comment.replace(/"/g, '');
          comment = encodeURIComponent(comment);
          comment = comment.replace(/%0A/g, ' ');
          comment = comment.replace(/%20/g, ' ');
          if (comment.length > 2000) {
            comment = comment.substr(0, 2000) + '...';
          }
          break;
        }
      }      
        
    //comment udate

    
    
    var artUrl = document.getElementById('txtArticleUrl');
    articleUrl = artUrl.value;
    if (articleUrl == '')
    {
      window.alert('please enter article URL');
      //artUrl.focus();
      return;
    }
    var artiTopic = '';
    //artiTopic = artiTopic.replace(/"/g, '');
    var dateDiv = '';
    dateDiv = mDiv.getElementsByTagName('abbr') [0];    
    var datev = '';
    datev = dateDiv.getAttribute('data-utime');
    datev += '000';
    //profileName
    var pDiv = mDiv.getElementsByTagName('a');
    var from = '';
    var userName = '';
     
    for (var i = 0; i < pDiv.length; i++) {      
      if (pDiv[i].className == ' UFICommentActorName') {
        from = pDiv[i].getAttribute('href');
        from = from.replace('https://www.facebook.com/', '');
        from = from.replace(/\/$/,'');
        userName = pDiv[i].childNodes[0].innerHTML;        
        if (from.indexOf('?id=') != - 1) {
          from = from.replace('profile.php?id=', '');
        }
        break;
      }
    }
    
    pDiv = mDiv.getElementsByTagName('img');
    for (var i = 0; i < pDiv.length; i++) {
      if (pDiv[i].className == '_3-8_ _4iy4 img')
      {
        var spn = pDiv[i].parentElement.getElementsByTagName('span') [0];
        likes = parseInt(spn.innerHTML);
        break;
      }
    }
    //action

    var action = document.getElementById(aId);
    if (action.value == 0 && objid.substring(0,4) !='chk_')
    {
      window.alert('please select action');
      //action.focus();
      return;
    }
    //moderator name

    var moderator = document.getElementById(mId);
    if (moderator.value == 0)
    {
      window.alert('please select moderator');
      //moderator.focus();
      return;
    }
    //offence type

    var offence = document.getElementById(oId);
    if (action.value > 3 && offence.value == 1)
    {
      window.alert('please select offence');
      //offence.focus();
      return;
    }
    
    // viewType Information
    var viewType = 3;
    var ulList = document.getElementsByTagName('ul');
    if(ulList != null) {
      for(var k = 0; k < ulList.length; k++) {
        var ulClass = ulList[k].getAttribute('class');
        if(ulClass != null && ulClass.indexOf('_43o4') != -1) {
          
          var anchors =  ulList[k].getElementsByTagName('a');
          
          for(var i =0; i<anchors.length; i++ ) {
            
            var areaSel = anchors[i].getAttribute('aria-selected'); 
            
            if(areaSel != '' && areaSel == "true")
              {
                if(anchors[i].getAttribute('href').indexOf('pending') != -1) {
                  viewType = 3;
                }
                else if(anchors[i].getAttribute('href').indexOf('approved') != -1) {
                  viewType = 2;
                }
                else if(anchors[i].getAttribute('href').indexOf('deleted') != -1) {
                  viewType = 4;
                }
                break;
              }
          }
          
          //alert(viewType);
          
          //var spans = ulList[k].getElementsByTagName('a');
          //for(var i = 0; i< spans.length; i++) {
          //  var spanClass = spans[i].className;
          //  if(spanClass != null && spanClass.indexOf('accessible_elem') != -1) {              
           //   var spanId = spans[i].getAttribute('data-reactid');              
          //    if(spanId.indexOf('$0.$pending') != -1) {
           //       viewType = 3;
           //     }
          //    else if(spanId.indexOf('$0.$approved') != -1) {
          //        viewType = 2;
          //      }
          //    else if(spanId.indexOf('$0.$deleted') != -1) {
          //        viewType = 4;
          //      }
         //     break;
         //   }            
         // }          
        }
      }
    }
    
    //request data
    if (articleUrl.indexOf('?') != - 1)
    {
      articleUrl = articleUrl.split('?') [0];
    }
    var actionValue = action.value;
    var offenceValue = offence.value;
    if(objid.substring(0,4) ==='chk_')
      {
        actionValue = 6;
        offenceValue = 1;
      }
    
    var moderationMessage = '{ "CommentId":"' + commentID + '","IsReset":false,"CommentMessage":"' + comment + '","CommentedUserID":"' + from + '","CommentedUserName":"' + userName + '","CommentDateTime":"' + datev + '","ModeratorGUID":"' + moderator.value + '","ModeratorAction":' + actionValue + ',"OffenceType":' + offenceValue + ',"ViewType":' + viewType + ',"LikesCount":' + likes + ',"ArticleTopic":"' + artiTopic + '","ArticleUrl":"' + articleUrl + '"}';
    
    var element = mDiv;
    while(element.parentNode) {      
      if(element.parentNode.nodeName == "TR") {        
        element = element.parentNode;
        break;
      }
      element = element.parentNode;
    }    
    
    var checkSel = element.getElementsByTagName('input');
    if(checkSel.length == 2) {
      checkSel[0].click();
      checkSel[0].checked = true;      
    }
    
    //var requestData = '{"apiKey"="JMfNqhMk3d6uUZJVtua0SNRWBOgepSd2IRyvSUG3Ticif5A84MfZ5ZlsW0mLw1f","moderationMessage"="' + moderationMessage + '"}';
    //alert(moderationMessage);
    if(objid.substring(0,4) ==='chk_'   ){
      divCheck.disabled  = true;}
    
    window.open(submitUrl + moderationMessage, '_blank');    
    
    
    //var xmlhttp = new XMLHttpRequest();
    //xmlhttp.open('PUT', submitUrl);
    //xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    //xmlhttp.send(moderationMessage);
    //alert(xmlhttp.responseText);
  } 
  catch (ex)
  {
    alert(ex);
  }
}
//get query string value

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
  results = regex.exec(location.search);
  return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
//delay or sleep by duration

function Delay(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) { /* do nothing */
  }
}
