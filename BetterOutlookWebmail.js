// ==UserScript==
// @name         Better Outlook/Gmail Webmail and Trello
// @namespace    https://www.sadan.me/
// @version      1.99
// @description  Better Outlook/Gmail Webmail and Trello
// @author       Zac Sadan
// @match        https://outlook.office.com/calendar/*
// @match        https://outlook.office.com/mail/*
// @match        https://outlook.office365.com/mail/*
// @match        https://aaaaaaaaaaamail.google.com/*
// @match        https://trello.com/b/*
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
                      // RibbonRoot.parentElement.parentElement.parentElement.style.display = "none";
                        RibbonRoot.parentElement.style.display = "none";
                      }catch(e){}
                }, 5000);

            // enable private calendars
             setTimeout(function()
                {
                   try
                   {
                       var buttons = document.getElementsByTagName("button");
                       for(let i = 0 ; i < buttons.length ; i++)
                       {
                           if ( buttons[i].title == "Calendar" && ! buttons[i].innerHTML.includes("StatusCircleCheckmark") )
                           {
                               buttons[i].click();
                           }
                           if ( buttons[i].title == "Show all" ||
                                buttons[i].title.includes("Holidays") ||
                                buttons[i].title.includes("Hebcal") ||
                                buttons[i].title.includes("protected") ||
                                buttons[i].title.includes("Weather") )
                           {
                               buttons[i].click();
                           }
                       }
                       // close calendars
                       buttons = document.getElementsByTagName("button");
                       for(let i = 0 ; i < buttons.length ; i++)
                       {
                           if ( buttons[i].innerHTML.includes("@") )
                           {
                               buttons[i].click();
                           }
                       }
                   }catch(e){}
                }, 20000);
        }
        else if (window.location.href.indexOf(".com/mail") > -1)
        {
            document.getElementsByTagName("body")[0].style.zoom = "1.2";
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
        else if (window.location.href.indexOf("https://trello.com/b/") > -1)
        {
            setTimeout(function()
                {
                var trelloElem= document.getElementsByClassName("js-pup-header-btns");
                trelloElem[0].style.display = "none";
                trelloElem= document.getElementsByClassName("js-board-header-subscribed");
                trelloElem[0].style.display = "none";
                trelloElem= document.getElementsByClassName("js-pup-dropdown-list-btn");
                trelloElem[0].style.display = "none";
                 }, 10000);
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
        document.getElementsByClassName("allowTextSelection")[0].style.zoom = "1.4"; // openning email
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
