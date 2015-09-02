// ==UserScript==
// @name        Moderation V6
// @namespace   01d301193b1757939f0f4b6b54406641
// @description Moderation Controls for Facebook Widget
// @include     https://*facebook.com/*
// @version     1
// @grant       none
// @updateURL   https://monkeyguts.com/754.meta.js?c
// @downloadURL https://monkeyguts.com/754.user.js?c
// ==/UserScript==
//var submitUrl ='http://127.0.0.1:7000/CommentService.svc/ModeratorAction?apiKey=JMfNqhMk3d6uUZJVtua0SNRWBOgepSd2IRyvSUG3Ticif5A84MfZ5ZlsW0mLw1f';
var submitUrl = 'http://d6f576881c0146cb8f2a26dd5136cd53.cloudapp.net:8080/Pages/SubmitFBData?dat=';
//var submitUrl = 'http://localhost:32852/Pages/SubmitFBData?dat=';
var articleUrl = '';
var uguid = '';
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
var regexSpam1 = /(?=.*\b(http(s)*:\/\/)(www\.))|((www*\.)([0-9a-zA-Z]*|(\/)*)*(\.(co*)))|((www*\.)([0-9a-zA-Z]*|(\/)*)*(\.org))/g;
var regexSpam2 = /(https?:\/\/([0-9a-zA-Z]*|(\/)*)*\.co*)|(https?:\/\/([0-9a-zA-Z]*|(\/)*)*\.org)/g;
var regexSpam3 = /(?=.*(w(\W+)w(\W+)w.))/g;
var regexSpam4 = /^(?=.*\$[0-9]+)(?=.*(work|home)).*/g;
var regexSpam5 = /^(?=.*\$[0-9]+)(?=.*(got paid))/g;
var regexSpam6 = /^(?=.*\$[0-9]+)(?=.*(per hour))/g;
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
    divFb.setAttribute('style', 'overflow:scroll;width:95%; margin:0px auto;');
    var newFirstElement = document.createElement('label');
    articleUrl = getParameterByName('href');
    if (articleUrl == undefined || articleUrl == '') {
      isArticleUrlFound = false;
    } 
    else {
      isArticleUrlFound = true;
    }
    newFirstElement.innerHTML = '<table style="width:100%"><tr><td><b>Article URL: <input id="txtArticleUrl" type="text" style="width:80%" disabled="disabled" value=\'' + articleUrl + '\' /></b></td><td><input id="btnLoadModControls" type="button" value="1. Load Moderator Controls" /><input id="btnHighlightSpam" type="button" value="2. Find Spam Comments" /></td><td align="right" style="text-align:right">Moderator: <select id="selModerator">' + moderatorsList + '</select></td></tr></table>';
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
    //var btnHideSpamComments = document.getElementById('btnHideSpamComments');
    //btnHideSpamComments.onclick = function ()
    //{
    //  HideSpamComments();
    //}
    uguid = getParameterByName('userguid');
    if (uguid != null) {
      var sModerator = document.getElementById('selModerator');
      sModerator.value = uguid;
    }
  }
  AddModerateControls();   
  if (uguid != '') {
    HideSpamComments();
    window.close();
  }
}, 2000);

// Load More button click
function SetPagerDivClickAction() {
  try
  {    
    var buttonPager = document.getElementsByTagName('button');
    for (var i = 0; i < buttonPager.length; i++) {
      var dataId = buttonPager[i].getAttribute('data-reactid');
      if (dataId != null && ((dataId.indexOf('$=10/=10.0') != - 1) || (dataId.indexOf('.0.0.2.1.0') != -1))) {
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

//adding moderators controls
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

//Highliting spam comments
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
                //alert(comDiv[cc].textContent);
                commentCheck = comDiv[cc].textContent.replace(regex, '');
                var res1 = regexSpam1.exec(commentCheck);
                var res2 = regexSpam2.exec(commentCheck);
                var res3 = regexSpam3.exec(commentCheck);
                var res4 = regexSpam4.exec(commentCheck);
                var res5 = regexSpam5.exec(commentCheck);
                var res6 = regexSpam6.exec(commentCheck);
                if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null) {
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
              if (comSpanID != null && comSpanID.indexOf('$text0:0') != -1) {               
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

function HighlightSpamComments() {
  try
  {
    var uls = document.getElementsByTagName('ul');
    var allCommentsParent;
    for (var i = 0; i < uls.length; i++) {
      if (uls[i].className.indexOf('uiList fbFeedbackPosts') != - 1)
      {
        allCommentsParent = uls[i];
      }
    }
    var firstCommentDiv;
    var divs = document.getElementsByTagName('li');
    for (var i = 0; i < divs.length; i++) {
      if (divs[i].id.indexOf('fbc_') != - 1) {
        if (firstCommentDiv == null) {
          firstCommentDiv = divs[i];
        }
        var pId = divs[i].id;
        var divFbId = 'divFb_' + pId;
        var divCheck = document.getElementById(divFbId);
        if (divCheck != null)
        {
          //comment text
          try
          {
            var mDiv = document.getElementById(pId);
            var comDiv = mDiv.getElementsByTagName('div');
            var commentCheck = '';
            var decodedCommentCheck = '';
            for (var cc = 0; cc < comDiv.length; cc++) {
              if (comDiv[cc].className == 'postText') {
                commentCheck = '';
                commentCheck = comDiv[cc].textContent.replace(regex, '');
                var res1 = regexSpam1.exec(commentCheck);
                var res2 = regexSpam2.exec(commentCheck);
                var res3 = regexSpam3.exec(commentCheck);
                var res4 = regexSpam4.exec(commentCheck);
                var res5 = regexSpam5.exec(commentCheck);
                var res6 = regexSpam6.exec(commentCheck);
                if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null)
                {
                  comDiv[cc].setAttribute('style', 'background-color:yellow;');
                  if (mDiv.id.indexOf('reply') != - 1) {
                    allCommentsParent.insertBefore(mDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, firstCommentDiv);
                  } 
                  else {
                    allCommentsParent.insertBefore(mDiv, firstCommentDiv);
                  }
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
                  if (res1 != null || res2 != null || res3 != null || res4 != null || res5 != null || res6 != null)
                  {
                    comDiv[cc].setAttribute('style', 'background-color:yellow;');
                    if (mDiv.id.indexOf('reply') != - 1)
                    allCommentsParent.insertBefore(mDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, firstCommentDiv);
                     else
                    allCommentsParent.insertBefore(mDiv, firstCommentDiv);
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
  catch (ex)
  {
    alert(ex);
  }
}

//Hide highlighted comments
function HideSpamComments() {
  try
  {
    var moderator = document.getElementById('selModerator');
    if (moderator.value == 0)
    {
      window.alert('please select moderator');
      //moderator.focus();
      return;
    }
    var isModerateView = false;
    var btnCommentHide;
    var hideBtn = document.getElementsByTagName('label');
    for (var hh = 0; hh < hideBtn.length; hh++) {
      if (hideBtn[hh].className.indexOf('fbRemoveButton') != - 1) {
        var inBtns = hideBtn[hh].getElementsByTagName('input');
        for (var ii = 0; ii < inBtns.length; ii++) {
          if (inBtns[ii].value == 'Hide') {
            btnCommentHide = inBtns[ii];
            isModerateView = true;
            break;
          }
        }
        break;
      }
    }
    if (isModerateView) {
      var divs = document.getElementsByTagName('li');
      for (var i = 0; i < divs.length; i++) {
        if (divs[i].id.indexOf('fbc_') != - 1) {
          var isUndoFound = false;
          var aUndos = divs[i].getElementsByTagName('a');
          for (var u = 0; u < aUndos.length; u++) {
            if (aUndos[u].className == 'fbUndoBlacklistLink')
            isUndoFound = true;
          }
          if (isUndoFound == false) {
            var pId = divs[i].id;
            var divFbId = 'divFb_' + pId;
            var divCheck = document.getElementById(divFbId);
            if (divCheck != null)
            {
              //comment text
              try
              {
                var mDiv = document.getElementById(pId);
                var comDiv = mDiv.getElementsByTagName('div');
                var commentCheck = '';
                var decodedCommentCheck = '';
                for (var cc = 0; cc < comDiv.length; cc++) {
                  if (comDiv[cc].className == 'postText') {
                    if (comDiv[cc].style.backgroundColor == 'yellow') {
                      commentCheck = comDiv[cc].textContent;
                      mDiv.click();
                      Delay(1000);
                      var action = document.getElementById('selAction_' + pId);
                      var offence = document.getElementById('selOffence_' + pId);
                      action.value = 4;
                      offence.value = 2;
                      sendFbData('btnSum_' + pId);
                      Delay(1000);
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
      if (btnCommentHide.disabled != undefined || btnCommentHide.disabled != 1) {
        btnCommentHide.click();
      }
    } 
    else
    {
      var divs = document.getElementsByTagName('li');
      for (var i = 0; i < divs.length; i++) {
        if (divs[i].id.indexOf('fbc_') != - 1) {
          var isUndoFound = false;
          var aUndos = divs[i].getElementsByTagName('a');
          for (var u = 0; u < aUndos.length; u++) {
            if (aUndos[u].className == 'fbUndoBlacklistLink')
            isUndoFound = true;
          }
          if (isUndoFound == false) {
            var pId = divs[i].id;
            var divFbId = 'divFb_' + pId;
            var divCheck = document.getElementById(divFbId);
            if (divCheck != null)
            {
              //comment text
              try
              {
                var mDiv = document.getElementById(pId);
                var comDiv = mDiv.getElementsByTagName('div');
                var commentCheck = '';
                var decodedCommentCheck = '';
                for (var cc = 0; cc < comDiv.length; cc++) {
                  if (comDiv[cc].className == 'postText') {
                    if (comDiv[cc].style.backgroundColor == 'yellow') {
                      commentCheck = comDiv[cc].textContent;
                      mDiv.click();
                      Delay(1000);
                      var modDivs = mDiv.getElementsByTagName('div');
                      for (var mm = 0; mm < comDiv.length; mm++) {
                        if (modDivs[mm].className == 'fbModerationDropdownList hidden_elem') {
                          var action = document.getElementById('selAction_' + pId);
                          var offence = document.getElementById('selOffence_' + pId);
                          action.value = 4;
                          offence.value = 2;
                          sendFbData('btnSum_' + pId);
                          Delay(1000);
                          modDivs[mm].className = 'fbModerationDropdownList';
                          var actionLst = modDivs[mm].getElementsByTagName('a');
                          for (var ll = 0; ll < actionLst.length; ll++) {
                            if (actionLst[ll].className == 'fbModerationDropdownListItem fbSwitchPrivacy')
                            {
                              actionLst[ll].click();
                              break;
                            }
                          }
                          break;
                        }
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
  } 
  catch (ex)
  {
    alert(ex);
  }
}
//sending fb data to server

function sendFbData(objid) {
  try
  {
    var aId = objid.replace('btnSum', 'selAction');    
    var oId = objid.replace('btnSum', 'selOffence');
    var mId = 'selModerator'; //objid.replace('btnSum', 'selModerator');
    var cId = objid.replace('btnSum_', '');
    
    var commentID = '';
    if(cId.indexOf('$left.0.3.0:$') != -1){
      var tmp = cId.split('$');
    commentID = tmp[tmp.length -2];
    }
    else {
    var tmp = cId.split('$');
    commentID = tmp[1].replace('.1.0.0.0.','');      
    }
    commentID = commentID.replace('1.0.0.1.0.0:','');
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
          if (comment.length > 200)
            comment = comment.substr(0, 200) + '...';
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
    var viewType = 2;
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
