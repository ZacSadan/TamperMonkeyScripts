// ==UserScript==
// @name         Better Outlook/Gmail Webmail
// @namespace    https://www.sadan.me/
// @version      1.98
// @description  Better Outlook/Gmail Webmail
// @author       Zac Sadan
// @match        https://outlook.office.com/calendar/*
// @match        https://outlook.office.com/mail/*
// @match        https://outlook.office365.com/mail/*
// @match        https://aaaaaaaaaaamail.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=outlook.office.com
// @grant        none
// ==/UserScript==

window.addEventListener('load', function()
{
    try
    {
        if (window.location.href.indexOf("outlook.office.com/calendar") > -1)
        {
            setTimeout(function()
                {
                   try{ document.querySelector('div[role="main"]').style.zoom = "0.7"; }catch(e){}
                   try{ document.querySelector('div[role="main"]').parentNode.style.height = "calc(100% + 45px)"; }catch(e){}
                   try{ document.querySelector('div[role="main"]').parentNode.parentNode.style.height = "calc(100% + 45px)"; }catch(e){}
                   try{ document.getElementById("leftPaneContainer").style.height ="calc(100% + 45px)" ; }catch(e){}
                   try{
                       var RibbonRoot= document.getElementById("RibbonRoot");
                       RibbonRoot.parentElement.parentElement.parentElement.style.display = "none";
                      }catch(e){}
                }, 2000);
        }
        else if (window.location.href.indexOf(".com/mail") > -1)
        {
            document.getElementsByTagName("body")[0].style.zoom = "1.3";
            fixOutLookMailThread();
        }
        else if (window.location.href.indexOf("mail.google.com/mail/u/1/") > -1)
        {
            document.getElementsByTagName("header")[0].style.backgroundColor ="#E50654" ; // RED
        }
        else if (window.location.href.indexOf("mail.google.com/mail/u/0/") > -1)
        {
            document.getElementsByTagName("header")[0].style.backgroundColor ="#989898" ; // GRAY
        }
    }
    catch(e){}
}, false);

function fixOutLookMailThread()
{
    //console.log("fixOutLookMailThread");
    try
    {
        document.getElementsByClassName("wide-content-host")[0].style.zoom = "1.2"; // openning email
    }
    catch(e){}
    try
    {
        var ReadingPaneContainer= document.getElementById("ReadingPaneContainerId"); // ReadingPaneContainerId
        var divs = ReadingPaneContainer.getElementsByTagName("div");
        for (var i = 0; i < divs.length; ++i)
        {
           if(divs[i].spellcheck == false )
           {
              divs[i].spellcheck=true;
           }
        }
    }
    catch(e){}
    setTimeout(function(){ fixOutLookMailThread(); }, 250);
}
