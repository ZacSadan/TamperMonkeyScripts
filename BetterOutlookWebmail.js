// ==UserScript==
// @name         Better Outlook/Gmail Webmail and Trello
// @namespace    https://www.sadan.me/
// @version      1.99
// @description  Better Outlook/Gmail Webmail and Trello
// @author       Zac Sadan
// @match        https://outlook.office.com/calendar/*
// @match        https://outlook.office.com/mail/*
// @match        https://outlook.office365.com/mail/*
// @match        https://calendar.google.com/calendar/*
// @match        https://aaaaaaaaaaamail.google.com/*
// @match        https://trello.com/b/*
// @match        https://www.yad2.co.il/*
// @match        https://www.madlan.co.il/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=outlook.office.com
// @grant        none
// ==/UserScript==
//------------------------------------------------------------------------------------------------------------------
var loaded = false;
// sometimes after reload , load event isn't being called ...
setTimeout(function(){ dispatchEvent(new Event('load')); }, 10000);
//------------------------------------------------------------------------------------------------------------------
window.addEventListener('load', function()
{
    if (loaded == true) { return; } // load only once ...
    loaded = true ;

    try
    {
        // OUTLOOK SECTION
        if (window.location.href.indexOf("outlook.office.com/calendar") > -1)
        {
            fixOutLookCalendar();
            // refresh outlook calendar each 60 minutes , reload from server and not from cache ..
            setTimeout(function(){ location.reload(true) }, 60*60*1000); // dispatchEvent(new Event('load'))
        }
        else if (window.location.href.indexOf("outlook.office.com/mail") > -1) // outlook mail
        {
            document.getElementsByTagName("body")[0].style.zoom = "1.2";
            fixOutLookMailThread();
            //console.log("outlook.office.com/mail");
        }
        // GOOGLE SECTION
        else if (window.location.href.indexOf("calendar.google.com") > -1)
        {
            document.getElementsByTagName("body")[0].style.zoom = "0.8";
        }
        else if (window.location.href.indexOf("mail.google.com/mail/u/1/") > -1)
        {
            document.getElementsByTagName("header")[0].style.backgroundColor ="#E50654" ; // RED
        }
        else if (window.location.href.indexOf("mail.google.com/mail/u/0/") > -1)
        {
            document.getElementsByTagName("header")[0].style.backgroundColor ="#989898" ; // GRAY
        }
        // TRELLO
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
        else if ( window.location.href.includes("yad2.co.il") )
        {
            fixYad2();
        }
        else if ( window.location.href.includes("madlan.co.il") )
        {
            fixMadlan();
        }


    }
    catch(e){}
}, false);
//------------------------------------------------------------------------------------------------------------------
function fixOutLookCalendar()
{

    /*const element = document.querySelector('[class="customScrollBar"]');
    if (element)
    {
        element.style.zoom = '1.3';
    }*/
    try { document.getElementsByClassName("allDayHeaderContent")[0].style.zoom = "1.3"; }catch(e){}
    //try{ document.querySelector('div[role="main"]').style.zoom = "0.65"; }catch(e){}
    try{ document.querySelector('div[role="main"]').style.zoom = "0.6"; }catch(e){}
    try{ document.querySelector('div[role="main"]').parentNode.style.height = "calc(100% + 45px)"; }catch(e){}
    try{ document.querySelector('div[role="main"]').parentNode.parentNode.style.height = "calc(100% + 45px)"; }catch(e){}
    try{ document.getElementById("leftPaneContainer").style.height ="calc(100% + 45px)" ; }catch(e){}
    try{
        var RibbonRoot= document.getElementById("RibbonRoot");
        RibbonRoot.parentElement.style.display = "none"; // RibbonRoot.parentElement.parentElement.parentElement.style.display = "none";
    }catch(e){}
    try
    {
        var buttons = document.getElementsByTagName("button");
        for(let i = 0 ; i < buttons.length ; i++)
        {
            if ( ( buttons[i].title.includes("Birthdays") || buttons[i].title.includes("OOO") ) && buttons[i].getAttribute("aria-selected")=="false" )
            {
                buttons[i].click();
            }
            else if ( ( buttons[i].title.includes("My calendars") || buttons[i].title.includes("zsadan") ) && buttons[i].getAttribute("aria-expanded")=="false" )
            {
                 buttons[i].click();
            }
            else if ( buttons[i].title.includes("Show all") )
            {
                 buttons[i].click();
            }
        }
    }
    catch(e){}

   setTimeout(function(){ fixOutLookCalendar(); }, 2000);
}
//------------------------------------------------------------------------------------------------------------------
function fixOutLookMailThread()
{
    //console.log("fixOutLookMailThread");
    try
    {
        //document.getElementsByClassName("wide-content-host")[0].style.zoom = "1.4"; // openning email 1.2
        //document.getElementsByClassName("allowTextSelection")[0].style.zoom = "1.4"; // openning email 1.4 //also ConversationContainer ?

        document.querySelector('div[role="document"]').style.zoom = "1.4";

        //document.getElementById("editorParent_1").style.zoom = "1.4"
        //document.querySelector('div[role="main"]').style.marginTop = "-10px";
    }
    catch(e){}
    try
    {
        var ReadingPaneContainer= document.getElementById("ReadingPaneContainerId"); // ReadingPaneContainerId
        ReadingPaneContainer.style.height = ""; // run over calc 130%..

        ReadingPaneContainer.style.zoom = "1.4"

        var divs = ReadingPaneContainer.getElementsByTagName("div");
        for (var i = 0; i < divs.length; ++i)
        {
           if(divs[i].spellcheck == false )
           {
              divs[i].spellcheck=true;
           }
        }
        var ConversationReadingPaneContainer= document.getElementById("ConversationReadingPaneContainer");
        ConversationReadingPaneContainer.style.height = ""; // run over calc 130%..
        ConversationReadingPaneContainer.style.width = "";
        ConversationReadingPaneContainer.style.transform = "";
    }
    catch(e){}
    setTimeout(function(){ fixOutLookMailThread(); }, 250);
}
//------------------------------------------------------------------------------------------------------------------
function fixYad2()
{
    const feedList = document.querySelector('ul[data-testid="feed-list"]');
    var li = feedList.getElementsByTagName("li");
    for(let i = 0 ; i < li.length ; i++)
    {
        if ( ! ( li[i].innerText.includes("השקד") ||
                 li[i].innerText.includes("שמיר") ||
                 li[i].innerText.includes("מוטה גור") ||
                 li[i].innerText.includes("ליפקין שחק") ||
                 li[i].innerText.includes("רחבת אילן") ||
                 li[i].innerText.includes("רמת הדר") ||
                 li[i].innerText.includes("מנחם בגין") ||
                 li[i].innerText.includes("קרן היסוד") ||
                 li[i].innerText.includes("בארי") ||
                 li[i].innerText.includes("החל מ-") )
           && li[i].innerText.includes("₪")
           )
        {
            try{
                var price = li[i].querySelector('span[data-testid="price"]');
                price.style.color = "red";
            }catch(e){console.log(e)}
        }
    }
    setTimeout(function(){ fixYad2(); }, 2000);
}
//------------------------------------------------------------------------------------------------------------------
function fixMadlan()
{
    console.log("fixMadlan");
    const bulletins = document.querySelectorAll('div[data-auto="listed-bulletin"]');
    //console.log(bulletins);
    for(let i = 0 ; i < bulletins.length ; i++)
    {
          if ( ! ( bulletins[i].innerText.includes("השקד") ||
                 bulletins[i].innerText.includes("שמיר") ||
                 bulletins[i].innerText.includes("מוטה גור") ||
                 bulletins[i].innerText.includes("ליפקין שחק") ||
                 bulletins[i].innerText.includes("רחבת אילן") ||
                 //bulletins[i].innerText.includes("רמת הדר") ||
                 bulletins[i].innerText.includes("מנחם בגין") ||
                 bulletins[i].innerText.includes("קרן היסוד") ||
                 bulletins[i].innerText.includes("בארי") ||
                 bulletins[i].innerText.includes("החל מ-") )
              && bulletins[i].innerText.includes("₪")
            )
        {
            try{
                var price = bulletins[i].querySelector('div[data-auto="property-price"]');
                price.style.color = "red";
            }catch(e){console.log(e)}
        }
    }
    setTimeout(function(){ fixMadlan(); }, 2000);
}
//------------------------------------------------------------------------------------------------------------------
