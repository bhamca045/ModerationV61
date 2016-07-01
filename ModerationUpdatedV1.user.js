// ==UserScript==
// @name        Moderation V6
// @namespace   01d301193b1757939f0f4b6b54406641
// @description Moderation Controls for Facebook Widget
// @include     https://*facebook.com/*
// @version     18.4
// @grant       GM_xmlhttpRequest
// @updateURL   https://monkeyguts.com/754.meta.js?c
// @downloadURL https://monkeyguts.com/754.user.js?c
// ==/UserScript==
//var submitUrl ='http://127.0.0.1:7000/CommentService.svc/ModeratorAction?apiKey=JMfNqhMk3d6uUZJVtua0SNRWBOgepSd2IRyvSUG3Ticif5A84MfZ5ZlsW0mLw1f';
var submitUrl = 'http://d6f576881c0146cb8f2a26dd5136cd53.cloudapp.net:8080/Pages/SubmitFBData?dat=';
var commentReadCheckAPI = 'http://d6f576881c0146cb8f2a26dd5136cd53.cloudapp.net/CommentService.svc/GetCommentStatus?apiKey=JMfNqhMk3d6uUZJVtua0SNRWBOgepSd2IRyvSUG3Ticif5A84MfZ5ZlsW0mLw1f&';
var profanityRegExp = 'http://d6f576881c0146cb8f2a26dd5136cd53.cloudapp.net/CommentService.svc/GetLanguageRegExpression?apiKey=JMfNqhMk3d6uUZJVtua0SNRWBOgepSd2IRyvSUG3Ticif5A84MfZ5ZlsW0mLw1f&';
//var submitUrl = 'http://localhost:32852/Pages/SubmitFBData?dat=';
var articleUrl = '';
var uguid = '';
var currentAppId = '';
var en_msn_appId = '689384617806917';
var isArticleUrlFound = false;
var moderatorDivStyle = 'float:left;font-size:12px;top:0px;right:0px;background-color:white';
var l2CommentSpanStyle = 'background-color:#EDE0D3';
var actionTitle = '&nbsp;Action:';
var offenceTitle = '&nbsp;Offence:';
var inputTextTitle = "Text:";
var textCategoryTitle = '&nbsp;Category:'
//var moderatorTitle = '&nbsp;Moderator:';
var freeText = '';
var inputTypeList = '<option value="0"></option><option value="1">L1 Profanity</option><option value="2">L2 Profanity</option><option value="3">New Spam</option>';
var actionsList = '<option value="0"></option><option value="3">approve</option><option value="4">hide</option><option value="5">ban</option>';
var offenceList = '<option value="1"></option><option value="2">Spam</option><option value="3">ChildExploitation</option><option value="4">Profanity</option><option value="5">HateSpeech</option><option value="6">Harassment</option><option value="7">Threats</option><option value="8">Racist</option>';
var moderatorsList = '<option value="0"></option>'
+ '<option value="34e56b2f-94fa-4f03-9249-fef1fbee203d">Israel</option>'
+ '<option value="08614120-fae4-4fb6-b158-8d4256bf6f58">Kamal</option>'
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
+ '<option value="007980b8-c5cd-4c09-81f2-0a645164254e">Manohar</option>'
+ '<option value="0748C6B6-CE10-4A0C-AD99-DCFFC7AD597D">Amar</option>'
+ '<option value="B3F365E5-D937-48C6-9B1B-13ED280BB550">Bangarraju</option>'
+ '<option value="55AD57C2-7589-4997-B707-65D9AA87131F">Revanth</option>'
+ '<option value="7718f94d-b57a-4902-8d3e-bc42e2c76b75">Sangamesh</option>'
+ '<option value="430CB796-59E1-491A-B727-8B516BFB1245">Qutubuddin</option>'; 
var regex = /(<([^>]+)>)/gi;
var regexSpam1 = /(?=.*\b(http(s)*:\/\/)(www\.))|((www*\.)([0-9a-zA-Z]*|(\/)*)*(\.(co*)))|((www*\.)([0-9a-zA-Z]*|(\/)*)*(\.org))|((w)w\2+\.|ｗ+\.)|([a-zA-Z]¬+|­+)|(\.|­)\s{0,10}\S{0,10}(c|ｃ|ℂ)(o|ｏ|ℴ)(m|ｍ)/g;
var regexSpam2 = /(https?:\/\/([0-9a-zA-Z]*|(\/)*)*\.co*)|(https?:\/\/([0-9a-zA-Z]*|(\/)*)*\.org)/g;
var regexSpam7 = /(?:https?:\/\/)?(?:(?:0rz\.tw)|(?:1link\.in)|(?:1url\.com)|(?:2\.gp)|(?:2big\.at)|(?:2tu\.us)|(?:3\.ly)|(?:307\.to)|(?:4ms\.me)|(?:4sq\.com)|(?:4url\.cc)|(?:6url\.com)|(?:7\.ly)|(?:a\.gg)|(?:a\.nf)|(?:aa\.cx)|(?:abcurl\.net)|(?:ad\.vu)|(?:adf\.ly)|(?:adjix\.com)|(?:afx\.cc)|(?:all\.fuseurl.com)|(?:alturl\.com)|(?:amzn\.to)|(?:ar\.gy)|(?:arst\.ch)|(?:atu\.ca)|(?:azc\.cc)|(?:b23\.ru)|(?:b2l\.me)|(?:bacn\.me)|(?:bcool\.bz)|(?:binged\.it)|(?:bit\.ly)|(?:bizj\.us)|(?:bloat\.me)|(?:bravo\.ly)|(?:bsa\.ly)|(?:budurl\.com)|(?:canurl\.com)|(?:chilp\.it)|(?:chzb\.gr)|(?:cl\.lk)|(?:cl\.ly)|(?:clck\.ru)|(?:cli\.gs)|(?:cliccami\.info)|(?:clickthru\.ca)|(?:clop\.in)|(?:conta\.cc)|(?:cort\.as)|(?:cot\.ag)|(?:crks\.me)|(?:ctvr\.us)|(?:cutt\.us)|(?:dai\.ly)|(?:decenturl\.com)|(?:dfl8\.me)|(?:digbig\.com)|(?:digg\.com)|(?:disq\.us)|(?:dld\.bz)|(?:dlvr\.it)|(?:do\.my)|(?:doiop\.com)|(?:dopen\.us)|(?:easyuri\.com)|(?:easyurl\.net)|(?:eepurl\.com)|(?:eweri\.com)|(?:fa\.by)|(?:fav\.me)|(?:fb\.me)|(?:fbshare\.me)|(?:ff\.im)|(?:fff\.to)|(?:fire\.to)|(?:firsturl\.de)|(?:firsturl\.net)|(?:flic\.kr)|(?:flq\.us)|(?:fly2\.ws)|(?:fon\.gs)|(?:freak\.to)|(?:fuseurl\.com)|(?:fuzzy\.to)|(?:fwd4\.me)|(?:fwib\.net)|(?:g\.ro.lt)|(?:gizmo\.do)|(?:gl\.am)|(?:go\.9nl.com)|(?:go\.ign.com)|(?:go\.usa.gov)|(?:goo\.gl)|(?:goshrink\.com)|(?:gurl\.es)|(?:hex\.io)|(?:hiderefer\.com)|(?:hmm\.ph)|(?:href\.in)|(?:hsblinks\.com)|(?:htxt\.it)|(?:huff\.to)|(?:hulu\.com)|(?:hurl\.me)|(?:hurl\.ws)|(?:icanhaz\.com)|(?:idek\.net)|(?:ilix\.in)|(?:is\.gd)|(?:its\.my)|(?:ix\.lt)|(?:j\.mp)|(?:jijr\.com)|(?:kl\.am)|(?:klck\.me)|(?:korta\.nu)|(?:krunchd\.com)|(?:l9k\.net))\/[a-z0-9]*/g;
var regexSpam8 = /(?:https?:\/\/)?(?:(?:lat\.ms)|(?:liip\.to)|(?:liltext\.com)|(?:linkbee\.com)|(?:linkbun\.ch)|(?:liurl\.cn)|(?:ln-s\.net)|(?:ln-s\.ru)|(?:lnk\.gd)|(?:lnk\.ms)|(?:lnkd\.in)|(?:lnkurl\.com)|(?:lru\.jp)|(?:lt\.tl)|(?:lurl\.no)|(?:macte\.ch)|(?:mash\.to)|(?:merky\.de)|(?:migre\.me)|(?:miniurl\.com)|(?:minurl\.fr)|(?:mke\.me)|(?:moby\.to)|(?:moourl\.com)|(?:mrte\.ch)|(?:myloc\.me)|(?:myurl\.in)|(?:n\.pr)|(?:nbc\.co)|(?:nblo\.gs)|(?:nn\.nf)|(?:not\.my)|(?:notlong\.com)|(?:nsfw\.in)|(?:nutshellurl\.com)|(?:nxy\.in)|(?:nyti\.ms)|(?:o-x\.fr)|(?:oc1\.us)|(?:om\.ly)|(?:omf\.gd)|(?:omoikane\.net)|(?:on\.cnn.com)|(?:on\.mktw.net)|(?:onforb\.es)|(?:orz\.se)|(?:ow\.ly)|(?:ping\.fm)|(?:pli\.gs)|(?:pnt\.me)|(?:politi\.co)|(?:post\.ly)|(?:pp\.gg)|(?:profile\.to)|(?:ptiturl\.com)|(?:pub\.vitrue.com)|(?:qlnk\.net)|(?:qte\.me)|(?:qu\.tc)|(?:qy\.fi)|(?:r\.im)|(?:rb6\.me)|(?:read\.bi)|(?:readthis\.ca)|(?:reallytinyurl\.com)|(?:redir\.ec)|(?:redirects\.ca)|(?:redirx\.com)|(?:retwt\.me)|(?:ri\.ms)|(?:rickroll\.it)|(?:riz\.gd)|(?:rt\.nu)|(?:ru\.ly)|(?:rubyurl\.com)|(?:rurl\.org)|(?:rww\.tw)|(?:s4c\.in)|(?:s7y\.us)|(?:safe\.mn)|(?:sameurl\.com)|(?:sdut\.us)|(?:shar\.es)|(?:shink\.de)|(?:shorl\.com)|(?:short\.ie)|(?:short\.to)|(?:shortlinks\.co.uk)|(?:shorturl\.com)|(?:shout\.to)|(?:show\.my)|(?:shrinkify\.com)|(?:shrinkr\.com)|(?:shrt\.fr)|(?:shrt\.st)|(?:shrten\.com)|(?:shrunkin\.com)|(?:simurl\.com)|(?:slate\.me)|(?:smallr\.com)|(?:smsh\.me))\/[a-z0-9]*/g;
var regexSpam9 = /(?:https?:\/\/)?(?:(?:smurl\.name)|(?:sn\.im)|(?:snipr\.com)|(?:snipurl\.com)|(?:snurl\.com)|(?:sp2\.ro)|(?:spedr\.com)|(?:srnk\.net)|(?:srs\.li)|(?:starturl\.com)|(?:su\.pr)|(?:surl\.co.uk)|(?:surl\.hu)|(?:t\.cn)|(?:t\.co)|(?:t\.lh.com)|(?:ta\.gd)|(?:tbd\.ly)|(?:tcrn\.ch)|(?:tgr\.me)|(?:tgr\.ph)|(?:tighturl\.com)|(?:tiniuri\.com)|(?:tiny\.cc)|(?:tiny\.ly)|(?:tiny\.pl)|(?:tinylink\.in)|(?:tinyuri\.ca)|(?:tinyurl\.com)|(?:tl\.gd)|(?:tmi\.me)|(?:tnij\.org)|(?:tnw\.to)|(?:tny\.com)|(?:to\.ly)|(?:togoto\.us)|(?:totc\.us)|(?:toysr\.us)|(?:tpm\.ly)|(?:tr\.im)|(?:tra\.kz)|(?:trunc\.it)|(?:twhub\.com)|(?:twirl\.at)|(?:twitclicks\.com)|(?:twitterurl\.net)|(?:twitterurl\.org)|(?:twiturl\.de)|(?:twurl\.cc)|(?:twurl\.nl)|(?:u\.mavrev.com)|(?:u\.nu)|(?:u76\.org)|(?:ub0\.cc)|(?:ulu\.lu)|(?:updating\.me)|(?:ur1\.ca)|(?:url\.az)|(?:url\.co.uk)|(?:url\.ie)|(?:url360\.me)|(?:url4\.eu)|(?:urlborg\.com)|(?:urlbrief\.com)|(?:urlcover\.com)|(?:urlcut\.com)|(?:urlenco\.de)|(?:urli\.nl)|(?:urls\.im)|(?:urlshorteningservicefortwitter\.com)|(?:urlx\.ie)|(?:urlzen\.com)|(?:usat\.ly)|(?:use\.my)|(?:vb\.ly)|(?:vgn\.am)|(?:vl\.am)|(?:vm\.lc)|(?:w55\.de)|(?:wapo\.st)|(?:wapurl\.co.uk)|(?:wipi\.es)|(?:wp\.me)|(?:x\.vu)|(?:xr\.com)|(?:xrl\.in)|(?:xrl\.us)|(?:xurl\.es)|(?:xurl\.jp)|(?:y\.ahoo.it)|(?:yatuc\.com)|(?:ye\.pe)|(?:yep\.it)|(?:yfrog\.com)|(?:yhoo\.it)|(?:yiyd\.com)|(?:youtu\.be)|(?:yuarel\.com)|(?:z0p\.de)|(?:zi\.ma)|(?:zi\.mu)|(?:zipmyurl\.com)|(?:zud\.me)|(?:zurl\.ws)|(?:zz\.gd)|(?:zzang\.kr)|(?:›\.ws)|(?:✩\.ws)|(?:✿\.ws)|(?:❥\.ws)|(?:➔\.ws)|(?:➞\.ws)|(?:➡\.ws)|(?:➨\.ws)|(?:➯\.ws)|(?:➹\.ws)|(?:➽\.ws))\/[a-z0-9]*/g;
var regexSpam3 = /(?=.*(w(\W+)w(\W+)w.))/g;
var regexSpam4 = /^(?=.*\$[0-9]+)(?=.*(work|home)).*/g;
var regexSpam5 = /^(?=.*\$[0-9]+)(?=.*(got paid))/g;
var regexSpam6 = /^(?=.*\$[0-9]+)(?=.*(per hour))/g;
var regExDict = {};

var enL2RegPatts = new Array();



var localL2RegPatts = new Array();

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

  
setTimeout(function () {
  var divFb = document.getElementById('facebook');
  if (divFb != null)
  {
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
          if(spanText.contains('App ID')) {
            spanText = spanText.replace(new RegExp('<!--.*?-->', 'g'), '');
            currentAppId = spanText.match(/\d+/)[0];
            break;
          }
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
  try {
    enL2RegPatts = new Array();
    localL2RegPatts = new Array();
  // Gets EN L2 Profanity Words list
  var regExpReq = profanityRegExp+'appId=' + en_msn_appId;
  var regPatts = GetProfanityInfo(regExpReq);
      
  var regPattArr = regPatts.split('$');
    
  for(var k=0; k< regPattArr.length -1; k++) {
    var regEx = new RegExp('(?!\>)\\b[^\\w>]*(' + regPattArr[k] + ')[^\\w<]*\\b(?!\<)', 'i');
    enL2RegPatts.push(regEx);
  }
    
    var temp = regPattArr[regPattArr.length -1];
    var newStr = temp.replace('^','\\^');
    newStr = newStr.replace('*','[*]');
    newStr = newStr.replace('@','[@]');
    newStr = newStr.replace('_','[_]');
   
    var addRegEx = new RegExp('(?!\>)(' + newStr + ')(?!\<)','i');
    enL2RegPatts.push(addRegEx);
    
//    enL2RegPatts = new Array(new RegExp('(?!\>)\\b[^\\w>]*(adultsex|amaTeur|asexualox|badass|balls|bigoted|bitching|bitchy|boned|butt|buttocks|clitoritis|clitorus|cybersex|dick|erotic|escort|fagging|'+
//'faggot|faggotry|faggots|faggott|fagot|fagots|freesex|freex|Gay Bow|gay bOy|gay dog|gay man|gay men|gay sEx|gaybert|gaybob|gaybor|gayboy|gaydo|gaygirl|dumb|dumbs|dumbest|gaylord|gays|gaysex|gaysian|'+
//'gaytard|gayteens|gayteenz|gaywad|suck|sucking|god damn|god-dam|redneck|slope|horny|hot chiCk|hotsex|idiot|jerk|lesbain|lesbayn|lusting|masturbat|mormon|pervert|pissant|pissed off|pisspIg|porn|prick|rapist|'+
//'sex|sexx|sexxx|sexY|shoot|stupid|teabaggers|transsexual|voyeur|willy|troll|scrounger|sow|crapped|immigrant|immigrants|imigrants Moslem|Muslim|Moslim|scrounge|Islam|islamists|Jew|Jewry|slits)[^\\w<]*\\b(?!\<)','i'),
//new RegExp('(?!\>)\\b[^\\w>]*(freaks|assinine|Axx|B_A_L_L_S!|bullocks|fracking|fricking|i.d.i.o.t.|idiots|idoit|jerks|knuckleheads|load of crap|loser|perverts|pi[*][*][*]ed|retarded|sucked|SUCKS|Terroristen|w[*]nkers|'+
//'islamo facist|putz|demoskanks|ragheads|Snatch|numbskull|half breed|nit wit|dummy|dole bludging|filth|Bozo|shagging|ball-less|peabrain|libtard|Jesus|Christ|refugee|muslims|Hookers|adultplayground|adultsite|'+
//'assed|beastiality|bestiality|bint|bints|bitched|bitchery|bitchier|bitchin\'|bleeth|bongs|canibus|ceemen|cyberbabe|cybererotica|dildoes|dildos|'+
//'ejaculates|foreskin|ganja|genitals|hussies|hussy|ladyboy|lady-boy|ladyboys|lady-boys|naked girl|naked girls|naked-girl|naked-girls|naked-woman|naked-women|nipples|nookie|nooky|sadomasochist|shemale)[^\\w<]*\\b(?!\<)','i'),
//new RegExp('(?!\>)\\b[^\\w>]*(wench|wenches|wenching|buggers|refugee|refugees|barbaric|butcher|butchering|isis|stupidest|all you clowns|imbeciles|fool|idots|demon-rats|illegal rats|coyotes|terrorism|except for his middle leg|'+
//'rat boy|blowhard|drop more bombs|just drop bombs everywhere|jihadists|black male|clowns|idiotic|buffoon|rodent community|anal|ball kicking|bigot|bigots|bookie|bootee|bootie|breastman|bung hole|childporn|'+
//'cock|crackhead|cummin|curtir|dix|godamnit|knucklehead|nipple|penis|penus|redskin|scrotum|scum|skank|suckers|tit|t[*][*]t|kiddy fiddler|bds|anus|beddable|bfd|bollocked|centerfolds|diesel-dike|dp|fornik|gay cancer|'+
//'gay lord|gay second base|heifer|hooters|hotchat|humpers|hymies|ifintermyself|kanibis|kannabis|kannibis|muff|nymphet|nympho|pikeys|reefers|spaffs|topless|wad|wazzak|wazzaks|wencher|wenchers|woofter|woolly-woofters|gay)[^\\w<]*\\b(?!\<)','i'),
//                           new RegExp('(?!\>)([@]|[*]|[$])(?!\<)','i'));
    
  
  regExDict['public'] = enL3RegPatts;
  
  if(currentAppId != en_msn_appId && currentAppId != "829406873836572" && currentAppId != "1966743960216840" && currentAppId != "1056389514424151" && currentAppId != "125117174535490" ) {
    var localRegExpReq = profanityRegExp+'appId=' + currentAppId;
    var localRegPatts = GetProfanityInfo(localRegExpReq);
    
    if(localRegPatts != null && localRegPatts != '') {
      var localRegPattArr = localRegPatts.split('$');
      for(var len =0; len < localRegPattArr.length; len++) {
        var localRegEx = new RegExp('(?!\>)\\b[^\\w>]*(' + localRegPattArr[len] + ')[^\\w<]*\\b(?!\<)', 'i');
        //alert(localRegEx);
        localL2RegPatts.push(localRegEx);
      }
      regExDict['review'] = localL2RegPatts;
    }
  }
  else {
    regExDict['review'] = enL2RegPatts;
  } 
  }
  catch(ex) {
    alert(ex);
  }
}

// Gets the Profanity Words Info
function GetProfanityInfo(uri) {
 try
  { 
    var res;
    var details =  GM_xmlhttpRequest({method: "GET",url: uri,synchronous: true});    
    var json = details.responseText.replace('[', '');
    json = json.replace(']', '');
    var jsonObj = JSON.parse(json);
    if(jsonObj.ProfanityRegEx != null && jsonObj.ProfanityRegEx != '') {
      res = jsonObj.ProfanityRegEx;
    }
    return res;
  }
  catch(ex)
  {
    alert(ex);
  }
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
      
      for(var j=0;j<spans.length;j++) { 
        var content = spans[j].innerHTML; 
        var contSpanCheck = content.slice(0, 6, content.length);
        if(contSpanCheck == '<span>') { 
          continue;
        }
        
        //alert(j + ': '+content);
        if(currentAppId != en_msn_appId) {
          for each(var regPatt in regPatterns ) {    
            //alert(regPatt);
            while(match=regPatt.exec(content)) {
              
                  //var fnd = match[0].length;
                  //alert(fnd);
                  
              var before = content.slice(0,match.index);
              var after = content.slice(match.index + match[0].length,content.length);
              content = before + hilightTag + match[0] + highlightEndTag + after;
            //}
            }
         }
    }
        
         for each(var regPatt in enL2RegPatts) {
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
      
      // All Words highlighted by Facebook
      var l1wordhligts = textContainers[i].getElementsByClassName('_3wbz');
      
      var l1matches =0;
      var l2matches = 0;
      for(var w=0; w< l1wordhligts.length; w++) {        
        var l1checkText = l1wordhligts[w].innerHTML;
        //alert(l1checkText);
        // Finding L1 overrides by red color (L2)
        var l1Overridematches = (l1checkText.match(/<font style=('|")background-color:red;color:white('|")>/g)||[]).length;         
        if(l1Overridematches ==0) {   // if No overrides
          l1matches = l1matches +1;
        }
        // If Overrides are there
        else {
          //alert(l1checkText);
          // check for whether full word overridden or partially, if partially overrides count for both L1 and L2 counts
          var l1highltTextLen = l1checkText.replace(/<[^>]*>/g, "").length;
          var l2highltTextLen = (l1checkText.match(/<font style=('|")background-color:red;color:white('|")>(.*?)<\/font>/g)||[])[0].replace(/<[^>]*>/g, "").length;
          if(l1highltTextLen != l2highltTextLen) {
            l1matches = l1matches +1;
          }
          l2matches = l2matches +1;
        }
      }
      
      if(l1wordhligts.length == 0) {
        var checkText = textContainers[i].innerHTML;
        //alert(checkText);
        var nonL1Andl2matches = (checkText.match(/<font style=('|")background-color:red;color:white('|")>/g)||[]).length; 
        //alert(nonL1Andl2matches);
        l2matches = l2matches + nonL1Andl2matches;
      }
      
      //alert(checkText);
      
      L1Words = L1Words + l1matches;
      L2Words = L2Words + l2matches;
      if(l1matches == 0 && l2matches >0) {
        var spanTxt = textContainers[i];
        spanTxt.setAttribute('style', l2CommentSpanStyle);
        l2CountArray.push(i);
      }
      else if(l1matches>0 && l2matches==0) 
        l1CountArray.push(i);      
      else if(l1matches>0 && l2matches>0)
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
  try { 
    var pageUrlFlag = false;    
    if(window.location.href.substring(0,31)==='https://developers.facebook.com' && (/\/deleted\/|\/approved\/|\/reported_spam\/|\/my_queue\//).test(window.location.href))
      pageUrlFlag = true;
    var divs = document.getElementsByTagName('div');    
    for (var i = 0; i < divs.length; i++) { 
        var divClass = divs[i].getAttribute('class');
        if (divClass != null && divClass.indexOf('UFIImageBlockContent') != - 1) {
          var articleHref = null;
          var articleHrefId = null;
          if(pageUrlFlag) {
            articleHref = divs[i].childNodes[0].childNodes[0].childNodes[2].getElementsByTagName('a')[0].getAttribute("href");        
            articleHrefId =  articleHref.match(/[^/]+$/)[0];
          }
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
              userName = pDiv[k].innerHTML;        
              userName = userName.replace(new RegExp('<!--.*?-->', 'g'), '');        
              if (from.indexOf('?id=') != - 1) {
                from = from.replace('profile.php?id=', '');
              }
              break;
            }
          }
        
          var pId =  datev+"|"+from+"|"+userName; 
          //pId = pId.replace(' ', '');
          //alert(pId);
          var divFbId = 'divFb_' + pId;
          
          var divCheck = document.getElementById(divFbId);
          if (divCheck == null) {
            var divModerate = document.createElement('div');
            divModerate.id = divFbId;          
            if(pageUrlFlag) {
              var commentReadReq = commentReadCheckAPI+'articleUrl=' + articleHref + '&commentId=' + pId + '|' + articleHrefId;
              //alert(commentReadReq);
              var statusResponse = GetCommentStatusInfo(commentReadReq);   
              //alert(statusResponse);
              var flagSpan = document.createElement('span');          
              var newFlagLabel = document.createElement('label');
              if(statusResponse ==-1) {
                if(window.location.href.contains("/deleted/") || window.location.href.contains("/reported_spam/")|| window.location.href.contains("/my_queue/")){
                  // do nothing
                  //alert('if page url deleted flag');
                }
                else {
                  //alert('if page url deleted else flag');
                  newFlagLabel.innerHTML = '<font style=\'color:#9399A5;font-size: 12px;line-height: 16px;\' >Read:</font>&nbsp;';
                  var chkElement = document.createElement('input');
                  chkElement.type = 'checkbox';            
                  chkElement.id = 'chk_'+pId;          
                  chkElement.onchange = function ()
                  { 
                    sendFbData(this.id);               
                  }
                  flagSpan.appendChild(newFlagLabel);
                  flagSpan.appendChild(chkElement);
                }
              }
              else {
                newFlagLabel.innerHTML = '<font style=\'color:#9399A5;font-size: 12px;line-height: 16px;\'>'+ statusResponse +'</font>'; 
                flagSpan.appendChild(newFlagLabel);
                var linebreak = document.createElement("br");
                flagSpan.appendChild(linebreak);
              }
              divModerate.appendChild(flagSpan);          
            }
            var textLabel = document.createElement('label');
            textLabel.innerHTML = inputTextTitle;
            
            var categoryLabel = document.createElement('label');
            categoryLabel.innerHTML = textCategoryTitle;
            
            var actionLabel = document.createElement('label');
            actionLabel.innerHTML = actionTitle;
            var offenceLabel = document.createElement('label');
            offenceLabel.innerHTML = offenceTitle;
            //var moderatorLabel = document.createElement('label');
            //moderatorLabel.innerHTML = moderatorTitle;
            
            var textBoxEle = document.createElement("input");
            textBoxEle.setAttribute("type", 'text');
            textBoxEle.setAttribute('size', 10);
            
            var categoryList = document.createElement('select');
            categoryList.innerHTML = inputTypeList;
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
            input.onclick = function () {
              sendFbData(this.id);
            } 
            
            textBoxEle.id = 'selText_' + pId;
            categoryList.id = 'selCategory_' + pId;
            selAction.id = 'selAction_' + pId;
            selOffence.id = 'selOffence_' + pId;
            //selModerator.id = 'selModerator_' + pId
            
            input.id = 'btnSum_' + pId;
            divModerate.appendChild(textLabel);
            divModerate.appendChild(textBoxEle);
            divModerate.appendChild(categoryLabel);
            divModerate.appendChild(categoryList);
            
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
    //  }    
    }
    
    SetPagerDivClickAction();    
    SetViewChangeAction();
    SetMoreCommentClickAction();
    SetSortByChangeAction();
    HighLightBlackListedWords();
    HighlightSpamCommentsNew();
    
    var divCheck = document.getElementById('divFb_UNDEFINE||');
    if(divCheck != null) {
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
  var res = '-1';  
  try
  {    
      
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
           res =  jsonObj.ModeratorName +' at '+jsonObj.StatusDateTime + '&nbsp;';
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
  }
  catch(ex)
  {
    //alert(ex);
  }
  return res;
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
    
    if(allCommentsParent != null) {            
    var firstCommentTblRow;
    var tblRows = allCommentsParent.getElementsByTagName('tr');
      if(tblRows.length > 0) {
        firstCommentTblRow = tblRows[0];        
      }
    for (var i = 0; i < tblRows.length; i++) {
     
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
        userName = pDiv[k].innerHTML;        
        userName = userName.replace(new RegExp('<!--.*?-->', 'g'), '');         
        if (from.indexOf('?id=') != - 1) {
          from = from.replace('profile.php?id=', '');
        }
        break;
      }
    } 
        
        var pId =  datev+"|"+from+"|"+userName;
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
                var res7 = regexSpam7.exec(commentCheck);
                var res8 = regexSpam8.exec(commentCheck);
                var res9 = regexSpam9.exec(commentCheck);
                var patt = new RegExp("every hour");                
                res6 = patt.exec(commentCheck);
                if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null || res7 != null || res8 != null || res9 != null) {
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
                  res7 = regexSpam7.exec(decodedCommentCheck);
                  res8 = regexSpam8.exec(decodedCommentCheck);
                  res9 = regexSpam9.exec(decodedCommentCheck);
                  if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null || res7 != null || res8 != null || res9 != null) {
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
        userName = pDiv[k].innerHTML;        
        userName = userName.replace(new RegExp('<!--.*?-->', 'g'), '');         
        if (from.indexOf('?id=') != - 1) {
          from = from.replace('profile.php?id=', '');
        }
        break;
      }
    } 
        
        var pId =  datev+"|"+from+"|"+userName;
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
                var res7 = regexSpam7.exec(commentCheck);
                var res8 = regexSpam8.exec(commentCheck);
                var res9 = regexSpam9.exec(commentCheck);
                if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null || res7 != null || res8 != null || res9 != null) {
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
                  res7 = regexSpam7.exec(decodedCommentCheck);
                  res8 = regexSpam8.exec(decodedCommentCheck);
                  res9 = regexSpam9.exec(decodedCommentCheck);
                  if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null || res7 != null || res8 != null || res9 != null) {
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
    
    var tblRows = document.getElementsByClassName('_1ql3')[0].childNodes[0].childNodes;
    for (var i = 0; i < tblRows.length; i++) {
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
        userName = pDiv[k].innerHTML;        
        userName = userName.replace(new RegExp('<!--.*?-->', 'g'), '');         
        if (from.indexOf('?id=') != - 1) {
          from = from.replace('profile.php?id=', '');
        }
        break;
      }
    } 
        
        var pId =  datev+"|"+from+"|"+userName;  
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
    var txtId = '';
    var catgId = '';
    if(objid.substring(0,4) === 'chk_') {
      txtId = objid.replace('chk', 'selText');
     catgId = objid.replace('chk', 'selCategory');  
    } 
    else {
     txtId = objid.replace('btnSum', 'selText');
     catgId = objid.replace('btnSum', 'selCategory');  
    }   
    
    var aId = objid.replace('btnSum', 'selAction');    
    var oId = objid.replace('btnSum', 'selOffence');
    var mId = 'selModerator'; //objid.replace('btnSum', 'selModerator');
    var cId = objid.replace('btnSum_', '');
    cId = cId.replace('chk_', '');    
    
    var divCheck = document.getElementById(objid);
    var mDiv = null;    
    if(objid.substring(0,4) === 'chk_')
      mDiv = divCheck.parentElement.parentElement.parentElement.parentElement;
      //.parentElement;
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
    
    var market = res[3].split("-")[0];
    var commentID = cId + "|"+  articleID;
    
    var comentLength = 2000;
    
    if(market === "ja" || market === "ru" || market === "ar" || market === "ko" || market === "vi" || market === "zh") {
      comentLength = 300;
    }
    
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
          if (comment.length > comentLength) {
            comment = comment.substr(0, comentLength) + '...';
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
        userName = pDiv[i].innerHTML;        
        userName = userName.replace(new RegExp('<!--.*?-->', 'g'), '');         
        if (from.indexOf('?id=') != - 1) {
          from = from.replace('profile.php?id=', '');
        }
        break;
      }
    }
    
    //alert(userName);
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
      if(objid.substring(0,4) ==='chk_')
        document.getElementById(objid).checked = false;
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
                else if(anchors[i].getAttribute('href').indexOf('reported_spam') != -1) {
                  viewType = 5;
                }
                else if(anchors[i].getAttribute('href').indexOf('my_queue') != -1) {
                  viewType = 6;
                }
                break;
              }
          }
          
         // alert(viewType);
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
    
    if (action.value == 3 && viewType == 2)
    {
      window.alert('You can\'t approve from public view');      
      return;
    }
    
    var textInput = document.getElementById(txtId)
    var textInputVal = textInput.value.toString().trim();
    var category =  document.getElementById(catgId);
    if(textInputVal != '') { 
      if(category.value == 0) {
        window.alert('Please Select input Text Category');
        return;
      }
    }
    
    var moderationMessage = '{ "CommentId":"' + commentID + '","IsReset":false,"CommentMessage":"' + comment + '","CommentedUserID":"' + from + '","InputText":"' + textInputVal + '","TextCategory":"' + category.value +'","CommentedUserName":"' + userName + '","CommentDateTime":"' + datev + '","ModeratorGUID":"' + moderator.value + '","ModeratorAction":' + actionValue + ',"OffenceType":' + offenceValue + ',"ViewType":' + viewType + ',"LikesCount":' + likes + ',"ArticleTopic":"' + artiTopic + '","ArticleUrl":"' + articleUrl + '"}';
    // section to let comment check box selected
    if(objid.substring(0,7) ==='btnSum_'){
    var element = mDiv;       
    while(element.nodeName != "TR") {            
        element = element.parentNode;
    }
    var checkSel = element.childNodes[0].getElementsByTagName('input');    
    if(checkSel.length == 1 &&  element.childNodes.length==3) {
      checkSel[0].click();
      checkSel[0].checked = true;      
    }}
    
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
