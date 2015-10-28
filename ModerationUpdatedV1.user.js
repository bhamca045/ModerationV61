// ==UserScript==
// @name        Moderation V6
// @namespace   01d301193b1757939f0f4b6b54406641
// @description Moderation Controls for Facebook Widget
// @include     https://*facebook.com/*
// @version     11.15
// @grant       none
// @updateURL   https://monkeyguts.com/754.meta.js?c
// @downloadURL https://monkeyguts.com/754.user.js?c
// ==/UserScript==
//var submitUrl ='http://127.0.0.1:7000/CommentService.svc/ModeratorAction?apiKey=JMfNqhMk3d6uUZJVtua0SNRWBOgepSd2IRyvSUG3Ticif5A84MfZ5ZlsW0mLw1f';
var submitUrl = 'http://d6f576881c0146cb8f2a26dd5136cd53.cloudapp.net:8080/Pages/SubmitFBData?dat=';
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
+ '<option value="34e56b2f-94fa-4f03-9249-fef1fbee203d">israel</option>'
+ '<option value="08614120-fae4-4fb6-b158-8d4256bf6f58">kamal</option>'
+ '<option value="017b7742-83e9-4bfd-aaec-cfbee203e41e">ebenezer</option>'
+ '<option value="ddab310a-8df3-40f7-8895-f3c223aea109">ravik</option>'
+ '<option value="281f6b13-e0db-491f-8dcb-775ab8137ecf">dilishk</option>'
+ '<option value="9f142497-5ed2-411a-a5d5-8924cd6a21f1">jayasuresh</option>'
+ '<option value="eebb27d4-e211-492b-8570-b6add5060133">niharika</option>'
+ '<option value="1b919453-9dbb-4f8e-8195-ebe9a52a7a13">waseem</option>'
+ '<option value="DC03D575-E77D-4A15-88C8-3FC462B014FB">driuser</option>'
+ '<option value="292C5012-DCB6-49C7-B4C5-C8B48618EF0D">Rini Vuba</option>'
+ '<option value="12078948-E03C-46BA-8376-5E2E7C334DFD">Chaitanya</option>'
+ '<option value="D407A11C-D5CC-4B1B-9000-720BA9E54882">Raghavendra</option>'
+ '<option value="98C2E864-18AD-444F-89E5-4F8F583D58E7">Akhileshwar</option>'
+ '<option value="A1B9E09D-BD8C-47E4-A143-F7D47BDB1128">Srinivas.Ch</option>'
+ '<option value="10a85dd9-0dfb-49ad-84fc-25c71131c16f">sathish</option>'
+ '<option value="4C5C11DF-A9C6-429E-8D21-ADE47D32A554">sharath</option>'
+ '<option value="0748C6B6-CE10-4A0C-AD99-DCFFC7AD597D">Amardeep</option>'
+ '<option value="F42F00EF-759A-4250-A734-92AEFB10C136">Yogender</option>'
+ '<option value="B3F365E5-D937-48C6-9B1B-13ED280BB550">Bangarraju</option>'
+ '<option value="55AD57C2-7589-4997-B707-65D9AA87131F">Vinay</option>'
+ '<option value="430CB796-59E1-491A-B727-8B516BFB1245">Qutubuddin</option>'; 
var regex = /(<([^>]+)>)/gi;
var regexSpam1 = /(?=.*\b(http(s)*:\/\/)(www\.))|((www*\.)([0-9a-zA-Z]*|(\/)*)*(\.(co*)))|((www*\.)([0-9a-zA-Z]*|(\/)*)*(\.org))|((w)w\2+\.|ｗ+\.)|([a-zA-Z]¬+|­+)|(\.|­)\s{0,10}\S{0,10}(c|ｃ|ℂ)(o|ｏ|ℴ)(m|ｍ)/g;
var regexSpam2 = /(https?:\/\/([0-9a-zA-Z]*|(\/)*)*\.co*)|(https?:\/\/([0-9a-zA-Z]*|(\/)*)*\.org)/g;
var regexSpam3 = /(?=.*(w(\W+)w(\W+)w.))/g;
var regexSpam4 = /^(?=.*\$[0-9]+)(?=.*(work|home)).*/g;
var regexSpam5 = /^(?=.*\$[0-9]+)(?=.*(got paid))/g;
var regexSpam6 = /^(?=.*\$[0-9]+)(?=.*(per hour))/g;
var regExDict = {};

var enL2RegPatts = new Array(new RegExp('(?:^|[\s\.;\?\!,])(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cunilingus|cunillingus|cunnilingus|cybersex|dick|erotic|escoRt|fagging|'+
'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|gay|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|dumbassit|Islam|islamists|Jew|Jewry|slits|'+
'freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|ohshithead|odumbass|SUCKS|Terroristen|w[*]nkers|'+
'islamo facist|putz|demoskanks|Focks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
'americunt|assed|back-scuttle|back-scuttler|back-scuttlers|back-scuttling|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale|wench|wenches|wenching)(?:$|[\s\.;\?\!,])','i'));

var enL3RegPatts = new Array(new RegExp('(?!\>)(pussy|fuc(k|ed|ers?|ing|s)?|(f|F)(~|_|!|@|#|$|%|^|&|[*](k))|fckn|Rats|motherfu?|fuk|cunt|d(i|!|[*])ck|asshole|a s s h o l e |assh|a[$]|f\'cking|F-ing|azz|bitch|'+
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
'tit(wank|fuck(er|ing?)?|job|licker|lover|s|ties|ty|tyfuck|tyfucker|tywank)|tiefucker|tonguefuck|twat(face|head|lips|s|ty|waffle)|twobitwhore|unclefucker|uptheass|wank(er|ing|job|ware)|whisk(eydick|kydick)|white trash scumbag|wtf|you dumb ass)(?!\<)','i'));    
 
var deL2RegPatts = new Array(new RegExp('(?:^|[\s\.;\?\!,])(agedream|bdm|candy|cutegirlfriend|cutemodel|cute-model|cutiefrutti|doll|entwuerdigt|entw[ü]rdigt|erniedrigt|erzwungen|forbiddenvideo|fresh-girls|gedemuetigt|gefesselt|girlfriendgalleries|girlfriendshowoff|'+
'girlfun|girllover|girl-lover|girlranch|girls-and-pics|girls-are-pretty|girlshost|girlvid|grossdeutsch|gross-deutsch|hess|innocentdream|innocent-youth|jungfrau|jungsforum|jungundblond|kindersch[ä]nder|massacre|massaker|momandboy|mord|mutterundtochter|mybestboy|netbunnies|'+
'nice-model|nixgirl|onboys|onlyboysdotnet|onlygirl|onlynngirl|postyourgirl|pretty-model|rape|realboys4u|ritzen|sado|scheiss|schulm[ä]dchen|schwul|shamealbum|spank|suicide|suizid|tod|ukrainian-boy|virgin|young|youth-and-beauty|14words|14-words|3reich|absurd|achtundachtzig|acht-und-achtzig|'+
'adelaideinstitute|adelaide-institute|adolf|ag-schwaben|ahnenerbe|ahnen-erbe|3rdreich|3rd-reich|aktionsberichte|aktions-berichte|aktionsbuero|aktions-buero|aktionsb[ü]ro|aktions-b[ü]ro|aktionsfront|aktions-front|altermedia|anarchy|antifa|arbeitmachtfrei|arbeit-macht-frei|arbeitsdorf|arbeitslager|'+
'arbeitslos|arian|arier|arisch|aryan|asyl|aufstand-fuer-die-wahrheit|auschwitz|auslaender|ausl[ä]nder|autonom|befreiungsluege|befreiungsl[ü]ge|belzec|birkenau|bloddhonor|buchenwald|bund-fuer-echte-demokratie|c18|c-18|combat18|combat-18|dachau|deutschefront|deutsche-front|deutscherstaat|deutscher-staat|'+
'deutscherstandpunkt|deutscher-standpunkt|deutscheskolleg|deutsches-kolleg|deutschesreich|deutsches-reich|deutschherrenklub|deutschlanddendeutschen|deutschland-den-deutschen|deutschlandluege|deutschland-luege|deutschlandl[ü]ge|deutschland-l[ü]ge|divisiontotenkopf|division-totenkopf|divisionwiking|'+
'division-wiking|djihad|doitsch|doitschland|doitschlanddendoitschen|doitschland-den-doitschen|dreck|drittesreich|drittes-reich|dschihad|ebensee|eichmann|eightyeight|eighty-eight|endloesung|end-loesung|endl[ö]sung|end-l[ö]sung|engerhafe|erwache|fallersleben|finalsolution|final-solution|flossenbuerg|flossenb[ü]rg|'+
'forgottentomb|freie-kraefte|freiekr[ä]fte|freienationalisten|freie-nationalisten|fremdherrschaft|fremd-herrschaft|friedensflieger|friedens-flieger|friedensvertrag|friedens-vertrag|fuehrer|f[ü]hrer|gaskammer|gas-kammer|gaszimmer|gas-zimmer|germanhelmetsinc|germania88|germania-88|germaniainternational|germania-international|'+
'gestapo|getto|ghetto|g[ö]bbels|goebbels|goehring|goering|g[ö]rhring|g[ö]ring|gotschee|gusen|h8|hakenkreuz|haken-kreuz|hammerskin|hammer-skin|hass|hate|hauptkampflinie|heidrich|heimattreu|heimat-treu|herrenvolk|herren-volk|herzogenbusch-vught|heydrich|hinzert|hitler|holo-cartonns|holocartoons|holocaust|holo-caust|holokaust|holo-kaust|'+
'horstwessel|horst-wessel|ianstuart|ian-stuart|interracial|islambruderschaft|islambr[ü]derschaft|islambruederschaft|jedemdasseine|jew|jihad|jude|jugend-offensive|kaltenkirchen|kameradentreff|keltenkreuz|kelten-kreuz|kkk|konzentrationslager|konzentrations-lager|kriegsberichter|kriegsschuldfrage|kuehnen|k[ü]hnen|kulmhof|ladelund|landser|'+
'langenstein-zwieberge|lunikoff|lunikov|maertyrer|m[ä]rtyrer|martyrium|masterrace|master-race|mauthausen|metapedia|minderheit|moringen|mutterkreuz|nationalerbeobachter|nationaler-beobachter|nationalerevolution|nationale-revolution|nationalesnetz|nationales-netz|nationalesradio|nationales-radio|nationalsocialism|national-socialism|nationalsozialis|'+
'national-sozialis|nazi|neuengamme|neuesvolk|neues-volk|niederhagen|nordthueringer-beobachter|ns88|nsdap|nsec-88|nseuropa|nsl-archiv|nsl-forum|nsl-lager|nsl-server|nsm88|nsmnebraska|nspublications|nukeisrael|nuke-israel|oidoxie|oikrach|oimusik|oithanasie|oneeight|one-eight|ostpreussen-radio88|panzer|parazite|personenausweis|prophet-mohammed|'+
'racistfriendfinder|radiogermania|radio-germania|radioislam|radio-islam|rahowa|rasse|raus|ravensbr[ü]ck|ravensbrueck|reichsarchiv|reichs-archiv|reichsausweis|reichs-ausweis|reichsbewegung|reichs-bewegung|reichsforum|reichs-forum|reichskanzler|reichs-kanzler|reichskarte|reichskriegsfahne|reichs-kriegs-fahne|reichskriegsflagge|reichs-kriegs-flagge|'+
'reichsmeldestelle|reichs-meldestelle|reichsregierung|rennicke|riga-kaiserwald|rocknord|rock-nord|rotfront|rot-front|ruhmundehre|ruhm-und-ehre|sachsenhausen|schandausstellung|schand-ausstellung|schmarotzer|schulhofcd|schulhof-cd|schutzbund-deutschland|schutzstaffel|schutz-staffel|schwarzesonne|schwarze-sonne|sieg|skinhead|skrewdriver|skrew-driver|'+
'sleipnir|sonnenrad|sonnen-rad|sozialschmarotzer|sozial-schmarotzer|spreelichter|spree-lichter|stahlgewitter|stahl-gewitter|stammlager|stormfront|storm-front|struthof|stuermer|stuka|st[ü]rmer|stutthof|subvertednation|supremewhitepower|supreme-white-power|swastika|tage-der-gerechtigkeit|terra-germania|terrorism|theforbiddentruth|theneworder|'+
'thenewsturmer|thiazi|thirdreich|third-reich|thorhammer|thule|totenkopfdivision|totenkopf-division|tuerkenjaeger|tuerken-jaeger|t[ü]rkenj[ä]ger|t[ü]rken-j[ä]ger|[ü]berfremdung|ueberfremdung|ungeziefer|unglaublichkeiten|untermensch|unter-mensch|vergas|verreck|verschwoerung|verschw[ö]rung|voelkisch|voelkischereichsbewegung|voelkische-reichsbewegung|'+
'v[ö]lkisch|v[ö]lkischereichsbewegung|v[ö]lkische-reichsbewegung|volksbetrug|volks-betrug|volksdeutsch|volks-deutsch|volksgemeinschaft|volks-gemeinschaft|volksseele|volks-seele|volkssozialistisch|volks-sozialistisch|waffenss|waffen-ss|warrior|wehrmacht|wehrsportgruppe|wehrsport-gruppe|wehr-sport-gruppe|weisse-macht|wessel|wewantwar|wewelsburg|whitehonor|'+
'white-honor|whitepower|white-power|whitepride|white-pride|widerstand|wiking|w[ö]bbelin|woebbelin|wunsiedel|zecke|zentralversand|zigeuner|zion|zundel|zyklonb|zyklon-b|absolutlysick|abtreib|amok|aufschlitz|autopsy|babycaust|baby-caust|blood|blut|braindamagefilms|brutal|bumfights|cadaver|cannibal|chainsaw|crush|dead|death|disgrace|executed|execution|exekution|'+
'folter|forced|gedem[ü]tigt|gequaelt|gequ[ä]lt|gezwungen|gore|gruesome|gunshot|horror|hurtme|hurt-me|kadaver|kannibal|kill|macassar|manhunt|mentalzero|midget|murder|ogrish|pain|rotten|satanist|schmerz|schock|shock|shownomercy|sickestsites|sklavenzentrale|sklaven-zentrale|splashdamage|splatter|squish|tightrope|tortur|unfallvideo|unfall-video|vergewalt|violate|'+
'violence|violent|woundgallery|celebritymorgue|besamung|bonbonbabes|boy1st|boycams|boydiamonds|boyfreevideo|boyhouse|boylover|boy-lover|boyreview|boy-review|boys-factory|boys-fantasy|boysfirsttime|boysfood|boystrymoms|boywatch|bravovids|candid|cherry|childsupermodels|childtop|cpm-galleries|crazy-models|dadsandbabe|dadsindaughters|dreamgirls|dreammodels|dream-models|'+
'entjungfer|fierybabe|fleshbaby|girl1st|girlforgirl|girls-host|idealchick|juniormodel|kindfrau|kind-frau|lil18|little-boy|little-devil|little-dwarf|little-dwarv|little-lady|littlemodel|little-model|lola|loli|lolly|lovelykitten|lsdream|ls-dream|lsmodel|ls-model|me-boy|minimodel|mini-model|moms-boys|newmodel|new-model|nnboy|nn-boy|nngirl|nn-girl|nnmodel|nn-model|nonstop-nn|'+
'onlybabe|p[ä]do|paedo|pedo|perfectgirl|pinkchocolate|pinkclub|pinkdreams|pinkworld|playgal|playlol|real-girl|schoolgirl|sweet|tiny|underage|under-age|xs-model|animal|beast|bestiality|enjoyhorse|farmlove|farmsecret|farmyfun|free-horse-movies|furry|hanginfury|horseloving|petloving|petpleasure|petpound|sodom|zoo|adult|ageoflove|amateur|asiamaedchen|asianbabe|asian-erotism|'+
'asiangoldenladies|asian-paradise|bang-boat|bangbros|bangingbutt|bangingmachine|bangmyhotwife|bang-my-hot-wife|bangyoulater|barelylegal|barely-legal|bezirksbefruchter|bi-girl|big-mouthful|big-mouth-ful|bignatural|big-natural-hooter|bigtitsfantasies|bitch|bizar|blackbeauties|blasen|blondegirl|blowgirls|blowjob|blow-job|bondanime|boob|breast|breitbeinig|brickfist|brueste|'+
'br[ü]ste|bukkake|buttcam|buttmachineboy|buttplug|callboy|call-boy|callgirl|call-girl|cam4|camclip|cam-clip|camgirl|campusgirl|cam-spiele|cheatwife|chicks18to19|chubbychix|city69|clitoris|cloud-69|cock|crazy-mom|creameater|cream-eater|creamfilled|creampie|cum|cybercalendargirl|daddyvid|dadhobbygirl|dailydirt|damnbang|damplips|dampsx|darkobsession|darksecretvideo|'+
'dasviehinmir|deastiality|deepthroat|deep-throat|destroyed-daughter|deviantclip|devilshandjob|diaper|dicks-and-chicks|dirtyfamilies|dirtyfamilysecret|dirtyfarmer|dirtyhobby|dirty-hobby|dirtyhosting|dirtymind|dirtyskunk|doktorspiel|doktor-spiel|do-me-harder|domination|dont-whack-your-teacher|dreamgirl|dreamland|dreammodel|dream-model|dreammovie|'+
'dreamxy|ebonycheek|ebonyfantasy|el-ladies|enemarotica|entjungfert|erogeschichten|erolive|eropic|eropleasure|erosguide|erosnetz|erosvillage|erotiekpagina|erotische-geschichten|erotizone|erozuna|eunuch|everythingbutt|exesfootdream|exgfpics|extreme|facesitting|face-sitting|facial|familyfancy|fanta-seeroom|fatfantasies|fat-fantasies|'+
'fetisch|fetish|fetizh|fetschi|fick|fistbang|fisten|fisting|flotterdreier|flotter-dreier|footcraving|footlover|foreplayxy|free4men|free6|freeasian|freeatkgal|freehotpic|freier|funhouse|gangbang|gang-bang|gay|geileslips|geilevideo|gonzo-movies|gooclip|grandthumb|grannies|granniez|granny6|grannycookies|grannypicture|'+
'grayvee|groupsparty|groupthrill|gyno|hairybeautie|hairybeauty|hairy-beauty|hairygirlsvideo|hairyhere|hairymiss|hairy-ocean|happyweekend|happy-weekend|hard-and-dirty|hardcore|hard-core|hardpics4you|hardplace|hardtied|heaven666|herfirst|her-first|hiddencam|hidden-cam|hispanicfantasies|hobbyfreundin|homemademoviez|'+
'homemadempeg|home-made-video|homo|hondenpijpen|hornyandhappy|hotdnk|hotgir|hotjuice|hotlips|hotmovies|hotnessa|hotshots|hot-soccer-moms|hot-story|hottneighbors|houseofsin|housewifefantasies|hqboys|hqgirls|huhre|humoron|idealchicks|illegal|illfantasies|innocent-dream|intim|inudistic|iwannajerk|iwantall|'+
'japanesegirl|j-foxies|juggworld|juniormodels|just4men|justmeat|justwild|k9thumbs|kack-board|katnoir|kaviar-dreams|kickazzvideos|kitzler|kizzler|klitoris|large-labia-lips|lasiescam-live|latina-chicks|latina-online|laythekat|lesben|lesbian|lesbisch|lickinlovers|liebespuppen|'+
'livecamflatrate|livewoman|love-explorer|lovevideoworld|lusthaus|lustscout|lusttoeter|lustundliebe|lutschen|luvboat|madmamas|magic-beauties|magmaclub|maletv|manga|mans-world|mature|megabusen|megarotic|milkboy|modelmania4u|moese|mommaster|momswaiting|momsworkzone|monsterload|motherless|mpuppet|'+
'my-dirty-hobby|myfirstundressing|mylovedparties|nackt|naked|nasty|natursekt|natur-sekt|naughty|neighbourhoodgirl|newbbs|nextdoorlust|niche-gal|nikamovie|nitelife|nsfw|nude|nudism|nudist|nutte|nymph|obscene|olderladies|oldmanwish|onanie|onlymom|oral|orgasm|orgie|orgyasm|orgyfeast|'+
'orgymaxcfnmblog|orientalfantasies|orwid|ovguide|pantyfantasies|party-models|peeflix|peeing|penis|penthouse|perfectgirls|perfectmums|perfectorgy|pervers|pervert|pipi|piss|playmatestory|playwithme|poppen|poppschiff|porn|preggo|pregnantandhorny|pron|pussies|pussis|pussy|'+
'rammythroat|rasiert|ratemy|rate-my|rateyour|rate-your|real-girls|realityvideo|redlight|reingespritzt|rentmen|retrocunts|rotlicht|scatqueens-berlin|schnackseln|schoolgirls|schwaenz|schwangereweiber|schwanz|schw[ä]nz|schwuhl|self-made-video|selfpic|sex|shacklet|'+
'shadowslaves|shav|shitfun|slavemachine|sleazydream|slippery-and-wet|slut|sly-clip|smother|smut|softcoma|sperm|spiescam|spritzbox|spritzige-geschichten|spunkculture|spunkmouth|spymov|squirt|squirtitinme|strip|suck|supermollies|sweatywifes|swinger-bus|swingerclub|'+
'swinger-club|swingerklub|swinger-klub|swingerparadies|teen|throatpoker|titsndicks|titt|tophotgirl|topless|trampling|tranny|tube|tubgirl|tv6|twinks|unclelust|unclevid|uniformdomination|unrestricted|vagina|vibrator|viphairy|voegeln|votse|vottse|votze|voyeur|'+
'vulgarbabes|watchhervideo|wet-hole|whore|wichs|wifemovies|wildgirls|windel|wir-privat|wishing-girl|wivesinpantyhose|wix|wowhairy|wowmodels|wowsite|wow-video|xclip|xdom|xhamster|xnxx|xnxxmovies|xpeeps|xpics|xrope|xs-models|xtown|xtreme|xvideos|xxl-video|'+
'xxpasswordxx|xxx|yourwastedgirlfriend|zensiert|zensurfrei|zensur-frei|zweitfrau|zweit-frau|ana-4life|anaengel|ana-hanna|anamia|ana-mia|ana-perfection|anasbrief|anas-brief|anasdiary|anasgebote|anas-gebote|anashome|ana-till-the-end|anorexic|drogendealer|drogen-forum|'+
'drugworld|fur-alle-ana-neulinge|highway-to-ana|lady-ana|me-and-ana|morbid-alcoholica|proana|pro-ana|pro-anorexia|promia|pro-mia|romancingthebone|saufen|skinny|thinspiration|thinspo|valerie-ana-freundschaft|Drecksau|Fett backe|Horst|Onanieren|Pisser|Schei[ß]e|Schwuchtel|'+
'Schwuler|Shishkoff|der Schwanz|die Titten|missgeburt|dummes huhn|trottel|der teufel|der abschaum|dumme kuh|wichser|Dreckschweine|scheiss auf die|was die schei[ß]|Die M[ö]pse|Drecksack!|die Schei[ß]e|geil|mieser stricher|schwanz lecker|so ein beschi[ß]!|der abschaum der menschlichen gesellschaft|'+
'der drecksack|du dumme kuh|duncauf|homofuerst|Fl[ü]chtlinge)(?:$|[\s\.;\?\!,])','i'));

var ptL2RegPatts = new Array(new RegExp('(?:^|[\s\.;\?\!,])(Acha que eu n[ã]o consigo?|Amo sua bunda|Babaca|Bicha|Viado|Viad[ã]o|Marica|Burro|Idiota|Cuz[ã]o|Cuz[õ]es|Filhos da puta|escroto|Filho da puta|Idiota|Burro|Maconha|Vamos ficar b[ê]bados hoje [à] noite|Viado|Bicha|Bichona)(?:$|[\s\.;\?\!,])','i'));

var esL2RegPatts = new Array(new RegExp('(?:^|[\s\.;\?\!,])(Me llega al pincho|Qu[é] tal concha|Crees que no puedo?|a la loma del orto|[â]vete al infierno consultoriadedadoscorrea|acabar|al pedo|And[á] a lavar los platos|[á]ndate a la mierda|argolla|Bardo|Bobososo.|Bola|bolsas|buseta|Cabilla|'+
'Cabro,Chivo,Maricón,Rosquete|Cachapera|cana|caño|canuto,a|cara de orto|caracartón.|chanta|choto|chumbo|Chupa medias|Cocolla|Cojío|Cojonera|cojones|commnidades|Coñaza|Conchudo|Coscorria|Covero|Cuchara|curro|de pedo|despelote|el burro sabe m[á]s que t[ú]|en pedo|en pelota|Enchavar|'+
'Estoy arrecho|Estoy caliente|Est[ú]pido|est[ú]pido, idiota, imb[é]cil|falopa|Garulla|Gasofia|gay|Gorronea|groncho|Hacerse el boludo|hostiazo|hueco|Huevastristes|Huevero|huevón|Huevón,Cerdo,Cojudo|Huevos|Idiota,est[ú]pido|Idiota, est[ú]pido|Idiota, est[ú]pido,huevón|imbecil|Japuta|Kil[ú]a|'+
'la cabeza de la pinga|lelo,lela,nabo|Lerdo|Machete|Malandro|Maldito,Pelotudo|Malparío|mamonazo|mam[ú]a|marica|Marica,maricón|Marico|Maric[ó]n,Cabro|Maric[ó]n,Cabro de mierda|Maric[ó]n,Marica|Maric[ó]n de playa|Maricon de playa.|Marihuana|Me la pela|me la vas a comer|Me lo pones en la boca|'+
'metetela en la boca|met[é]tela en la boca|M[é]tetela en la boca|mina|mocazo|nabo|Ñengue|Ni en pedo|ojala que mueras|ojal[á] te mueras|Pacusobo|pajilla|Pandorga|Papo|Parcha|Parchita|parr[ú]s|Pedo|pedorro|Pel[ó]n|Pelotudo|pelotudo, huev[ó]n. Aweonado|Pendejo|pepa|Pepire|Percanta|Pichinga|'+
'Pichurria|pijotero|pisar|Pocha|Ponela en mi boca|pongalo en su boca|P[ó]nmela en la boca|porro|punta|Qu[é] buen culo|que te den por culo|que te follen|quiero chupar esta noche|Romper las bolas|Ruchar|Sapo|Te metieron la yuca|te odio|te rompo el cacas|te rompo el culo|tener sexo|'+
'Tengo ganas|testítulos|Tirar|tonto|tonto,lerdo ,lelo ,tonta ,lerda ,lela|tonto,tonta|Tonto a las tres.|Tontolaba.|tontolcapullo.|Tontopolla.|toparse|Totona|trucho|tu crees que no puedo?|tu madre|Tu madre,Tu vieja|un huevo|Vagina|vagina, concha|Vamos a chupar esta noche|'+
'vamos a em borrachar esta noche|Vamos a emborracharnos esta noche|vamos a mamarnos esta noche|Verdugo|Vete al infierno|Vete al infierno,Vete a la mierda|Wepota|Y tu mama tambien|Y tu mam[á] tambi[é]n|yuta|Zunga)(?:$|[\s\.;\?\!,])','i'));

var frL2RegPatts = new Array(new RegExp('(?:^|[\s\.;\?\!,])(abruti|anulingus|attard[é]|beur|bordel de merde|branleur|[ç]a pue|[ç]a schlingue!|casse toi!|casse-toi|[c\']est quoi ce bordel ?|[c\']est quoi ton ostie de probl[è]me|cochonneries|couille|d[é]bile|d[é]foncer|d[é]gage !|d[é]g[é]n[é]r[é]|enfoir[é]|face de cul|ferme ta gueule|fille|fous le camp|fous le camps|führer|glande|idiot(e)!|imbecile|imb[é]cile|jouir|la chatte|mort à|mort aux|mouchard|p[é]dale|p[é]d[é]|petite fille|petites filles|pouf|racailles|raton|rebeu|sac à vin !|sacrer|seins|sexe|sexe en direct|SEXUELLE|sperme|suce|ta gueule|tais-toi|tapette|tarlouse va !|transexuelle|tu commence [à] [m\']enmerder !|tuyau|vache|vibreur|violer|youpin|youpins)(?:$|[\s\.;\?\!,])','i'));

var itL2RegPatts = new Array(new RegExp('(?:^|[\s\.;\?\!,])(ALLUPATE|ALLUPATO|AMMUCCHIATA|AMMUCCHIATE|ANO|ARRAPATA|ARRAPATE|ARRAPATI|ARRAPATO|BAGARDONA|BAGARDONE|BAGASCIONE|BALLE|BAMBA|BATTONE|BEGA|BEGHE|BELINI|BERNARDE|BOCCHINARE|BOCCHINARI|BOCCHINARO|BOIATE|BORDELLI|BORDELLO|'+
'BRODA|BRODE|BUCAIOLA|BUCAIOLE|BUCAIOLI|BUS DEL CU|BUSONI|CACCHE|CAGATE|CAPPELLE|CASINI|CASINO|CHECCA|CIOSPA|CIOSPE|CIPPA|CIPPE|CIULATA|CIULATE|COGLIONAZZO|COGLIONE|CORNUTA|CORNUTE|CORNUTI|CU|DIIO|DIO CANE|DIOCANE|FAVE|FETENTE|FETENTI|FIADENA|FICHE|FIGONA|FIGONE|FIGONI|FIKA|FIKE|'+
'FIODENA|FROCI|FROCIO|FROCIONE|FROCIONI|GANGIA|GOLDONE|GOLDONI|GRILLETTI|GUANTI|GUANTO|INCAZZARSI|LECCHINE|LECCHINI|LECCHINO|LIMONARE|LOFFA|LOFFARE|LOFFE|LOFFIA|LOFFIE|MADONNA|MAIALA|MAIALE|MERDOSI|MERLOTTI|MERLOTTO|MIGNOTTONE|MIGNOTTONI|MINCHIONE|MINCHIONI|MINNA|MINNE|MNCHIE|MONE|'+
'MONTA|MUSSE|NCULAMMAMMATE|NDROCCHIA|NERCHIE|ORCA MADONNA|ORCO DIO|ORCODIGEL|PACCHI|PACCO|PADULI|PADULO|PALLA|PALLE|PALLOSA|PALLOSE|PALLOSI|PALLOSO|PATONZE|PECORINE|PESCE|PICI|PICIO|PIPE|PIPPA|PISCIATE|PISCIO|PISELLI|PISELLO|PISTOLA|PISTOLOTTO|POMICIARE|POMPA|POMPE|POPPA|POPPE|'+
'PORCODIO|PUPPARE|PUTTANONE|PUZZONA|PUZZONE|RECCHIONE|RENZA|RENZE|RICCHIONE|RICCHIONI|RINCOGLIONIRSI|SBATTIMENTI|SBATTIMENTO|SBORRONE|SBORRONI|SBRODA|SBRODOLARE|SBRODOLATA|SBRODOLATE|SCOREGGE|SCOREGGIA|SCOREGGIARE|SCOREGGIONA|SCOREGGIONE|SCOREGGIONI|SCORREGGIONE|SEGHE|SEGONE|SEGONI|'+
'SFONDARE|SLINGUARE|SLINGUATA|SLINGUATE|SMINCHIARE|SORCHE|SORETA|SPOMPINARE|STRONZONA|SUCARE|SUCCHIACAPPELLA|SUCCHIACAPPELLE|SUKARE|TARZANELLI|TARZANELLO|TERRONACCI|TERRONACCIO|TERRONAZZI|TERRONAZZO|TERRONE|TERRONI|TOPA|TOPE|UCCELLI|UCCELLO|VACCA|VACCHE|ZIO CANTANTE)(?:$|[\s\.;\?\!,])','i'));

var deL3RegPatts = new Array(new RegExp('(?!\>)(pussy|fuc(k|ed|ers?|ing|s)?|(f|F)(~|_|!|@|#|$|%|^|&|[*](k))|fckn|Rats|motherfu?|fuk|cunt|d(i|!|[*])ck|asshole|a s s h o l e |assh|a[$]|f\'cking|F-ing|azz|bitch|'+
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
          var spans = textContainers[i].getElementsByTagName('span');          
          for(var j=0;j<spans.length;j++) { 
            var dataId = spans[j].getAttribute('data-reactid');            
            if (dataId != null && dataId.indexOf('.0.0.0.$right.0.0.1.1.0.2') != - 1) {
              currentAppId = spans[j].textContent;
              break;          
            }
          }
        }
      }
    }
    else {      
      textContainers = document.getElementsByClassName('_5c0n');      
      currentAppId = textContainers[0].href.match(/\d+/);  
    }   
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
    default:
      regExDict['review'] = enL2RegPatts;
      regExDict['public'] = enL3RegPatts;
  }
  
  //'DE-MSN#544580382313562'
  //'PT-MSN#1449534195317908'
  //'IT-MSN#1455766471352200'
  //'ES-MSN#577804522329995'
  //'NL-MSN#486847318126219'
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
    // Gets the Current Application ID    
    if(currentAppId == '' ) {
      GetApplicationID();
      LoadApplicationRegExs();
    }
    var textContainers = document.getElementsByClassName('_2uma');
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
    for(var i=0; i<textContainers.length;i++) {
      var spans = textContainers[i].getElementsByTagName('span');
      for(var j=0;j<spans.length;j++) { 
        var dataId = spans[j].getAttribute('data-reactid');            
        if (dataId != null && dataId.indexOf('.0.1.0.1.0.0:$') != - 1) { 
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
        }
      }            
    }
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
      var dataId = buttonPager[i].getAttribute('data-reactid');
      if (dataId != null && ((dataId.indexOf('$/=10.0') != - 1) || (dataId.indexOf('.0.0.2.1.0') != -1))) {
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
      var dataId = buttonPager[i].getAttribute('data-reactid');
      if (dataId != null && ((dataId.indexOf('$right.0.$left.0.3.1.0') != - 1) || (dataId.indexOf('.0.1.0.1.0.0:$') != - 1))) {
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
    var dataId = document.getElementById('js_3');   
    if(dataId == null)
      {
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length; i++) {
      var divClass = divs[i].getAttribute('class');
      if (divClass != null && divClass.indexOf('uiPopover') != - 1) {
        mainDataId = divs[i];
        break;
      }
        }
      }
    else
      {
        mainDataId = dataId;
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
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
      var divClass = divs[i].getAttribute('class');
      if (divClass != null && divClass.indexOf('UFIImageBlockContent') != - 1) {
        var pId = divs[i].getAttribute('data-reactid');
        var divFbId = 'divFb_' + pId;
        var divCheck = document.getElementById(divFbId);
        if (divCheck == null)
        {
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
                var dataId = articleLinks[i].getAttribute('data-reactid');                
                if (dataId != null && dataId.indexOf('$child:0.1') != - 1) {
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
    
    var divCheck = document.getElementById('divFb_.0.0.1.$right.0');
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

// Highliting spam comments
function HighlightSpamCommentsNew() {
  try
  {    
    var allCommentsParent;
    var tblBodys = document.getElementsByTagName('tbody');    
    for (var i = 0; i < tblBodys.length; i++) {
      var tbodyId = tblBodys[i].getAttribute('data-reactid');
      if (tbodyId != null && tbodyId.indexOf('.0.1.0.1.0') != -1)
      {
        if (allCommentsParent == null) {
          allCommentsParent = tblBodys[i];        
        }
      }
    }
    
    if(allCommentsParent != null) {            
    var firstCommentTblRow;
    var tblRows = document.getElementsByTagName('tr');
    for (var i = 0; i < tblRows.length; i++) {
      var trId = tblRows[i].getAttribute('data-reactid');
      if (trId != null && trId.indexOf('.0.1.0.1.0.0:$') != - 1) {
        if (firstCommentTblRow == null) {
          firstCommentTblRow = tblRows[i];
        }
        
        var divFbId = '';
        if(trId.indexOf('.1.0.0.1.0.0:$') != -1) {
          divFbId = 'divFb_' + trId + '.0.1.0.0.$right.0';  
        }
        else {          
          divFbId = 'divFb_' + trId + '.1.0.0.0.$right.0';  
        }          
        
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
              var comSpanID = comDiv[cc].getAttribute('data-reactid');
              if (comSpanID != null && ((comSpanID.indexOf('$end/=1$text') != -1) || (comSpanID.indexOf('.0.1.0.0.$right.0.0.1.0.0') != -1))) {               
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
                     var datReactId = sourceNode.getAttribute('data-reactid');
                     if(datReactId != null && datReactId.indexOf('.1.0.0.1.0.0:$') != -1) {
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
      }
    }
  }
    else
      {        
        var divTags = document.getElementsByTagName('div');        
    for (var i = 0; i < divTags.length; i++) {
      var mainDivId = divTags[i].getAttribute('data-reactid');
      if (mainDivId != null && mainDivId.indexOf('.0.0.2') != -1) {
         if (allCommentsParent == null) { 
           allCommentsParent = divTags[i];  
         }
      }
    }
        
        var firstCommentDiv;        
    for (var i = 0; i < divTags.length; i++) {
      
      var divClass = divTags[i].getAttribute('class');
       if (divClass != null && divClass.indexOf('_4k-6') != - 1) {
        if (firstCommentDiv == null) {
          firstCommentDiv = divTags[i];          
        }      
       }
      
      if (divClass != null && divClass.indexOf('UFIImageBlockContent') != - 1) {
        var pId = divTags[i].getAttribute('data-reactid');
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
              var comSpanID = comDiv[cc].getAttribute('data-reactid');
              if (comSpanID != null && comSpanID.indexOf('$right.0.$left.0.1.0.0.0') != -1) {               
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
    
    var tblRows = document.getElementsByTagName('tr');
    for (var i = 0; i < tblRows.length; i++) {
      var trId = tblRows[i].getAttribute('data-reactid');
      if (trId != null && trId.indexOf('.0.1.0.1.0.0:$') != - 1) {
        
        var divFbId = '';
        if(trId.indexOf('.1.0.0.1.0.0:$') != -1) {
          divFbId = 'divFb_' + trId + '.0.1.0.0.$right.0';  
        }
        else {          
          divFbId = 'divFb_' + trId + '.1.0.0.0.$right.0';  
        }          
        
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
                  sendFbData(divFbId);
                  Delay(1000);
                  var sourceNode = mDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                  
                  var hideTD = null;
                  var datReactId = sourceNode.getAttribute('data-reactid');
                  if(datReactId != null && datReactId.indexOf('.1.0.0.1.0.0:$') != -1) {
                    hideTD = sourceNode.getElementsByTagName('td')[1];
                  }
                  else {
                    hideTD = sourceNode.getElementsByTagName('td')[2];
                  }
                  
                  var actionLst = hideTD.getElementsByTagName('a');
                  for (var ll = 0; ll < actionLst.length; ll++) {
                    var ancId = actionLst[ll].getAttribute('data-reactid');
                    if (ancId != null && ancId.indexOf('1$delete.0') != -1) {
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
    
    var commentID = '';
    if(cId.indexOf('.1.0.0.1.0.0:$') != -1){      
      var tmp = cId.split('$');
    commentID = tmp[tmp.length -2];      
    }
    else {
    var tmp = cId.split('$');      
    commentID = tmp[1].replace('.1.0.0.0.','');      
    }
    commentID = commentID.replace('.0.1.0.0.','');
    commentID = commentID.replace('.','');
    //alert(commentID);
    //if (cId.indexOf('reply'))
    //commentID = tmp[2];    
    //main comment div
    //var mainDiv = document.getElementById(cId);
    //comment text
    //var conDiv = mainDiv.getElementsByTagName('div');
    
    var comment = '';
    var likes = 0;
    var divCheck = document.getElementById(objid);
    var mDiv = divCheck.parentElement.parentElement.parentElement;
    
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
          //if (comment.length > 200)
         //   comment = comment.substr(0, 200) + '...';
            break;
        }
      }      
        
    //comment udate

    if (!isArticleUrlFound) {
      var articleLinks = mDiv.getElementsByTagName('a');              
      for (var i = 0; i < articleLinks.length; i++) {                
        var dataId = articleLinks[i].getAttribute('data-reactid');                
        if (dataId != null && dataId.indexOf('$right.0.0.0.$=11/=1$child') != - 1) {
          var tmpArtUrl = articleLinks[i].getAttribute('href')                  
          document.getElementById('txtArticleUrl').value = tmpArtUrl.replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%3F/g, '?').replace(/%25/g, '%');                  
          break;
        }
      }
    }
    
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
    if (action.value == 0)
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
        if(ulClass != null && ulClass.indexOf('_43o4') != -1){
          var spans = ulList[k].getElementsByTagName('span');
          for(var i = 0; i< spans.length; i++) {
            var spanClass = spans[i].className;
            if(spanClass != null && spanClass.indexOf('accessible_elem') != -1) {              
              var spanId = spans[i].getAttribute('data-reactid');              
              if(spanId.indexOf('$0.$pending') != -1) {
                  viewType = 3;
                }
              else if(spanId.indexOf('$0.$approved') != -1) {
                  viewType = 2;
                }
              else if(spanId.indexOf('$0.$deleted') != -1) {
                  viewType = 4;
                }
              break;
            }            
          }          
        }
      }
    }
    
    //request data
    if (articleUrl.indexOf('?') != - 1)
    {
      articleUrl = articleUrl.split('?') [0];
    }
    var moderationMessage = '{ "CommentId":"' + commentID + '","IsReset":false,"CommentMessage":"' + comment + '","CommentedUserID":"' + from + '","CommentedUserName":"' + userName + '","CommentDateTime":"' + datev + '","ModeratorGUID":"' + moderator.value + '","ModeratorAction":' + action.value + ',"OffenceType":' + offence.value + ',"ViewType":' + viewType + ',"LikesCount":' + likes + ',"ArticleTopic":"' + artiTopic + '","ArticleUrl":"' + articleUrl + '"}';
    
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
