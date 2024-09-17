// ==UserScript==
// @name         Color Hebrew Fonts in Google Docs/Presentation UI
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Color Hebrew Fonts in Google Docs/Presentation UI for fast finding
// @author       You
// @match        https://docs.google.com/presentation/d/*
// @match        https://docs.google.com/document/d/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=docs.google.com
// @grant        none
// ==/UserScript==

// Got from Google Docs List ... Click on "More Fonts.."
var hebrewFonts = ["Alef","Amatic SC","Arimo","Assistant","Bellefair","Bona Nova","Cousine","David Libre","Frank Ruhl Libre","Fredoka","Heebo","IBM Plex Sans Hebrew","Karantina","M PLUS 1p","M PLUS Rounded 1c",
                    "Miriam Libre","Noto Rashi Hebrew","Noto Sans Hebrew","Noto Serif Hebrew","Open Sans","Rubik","Rubik Beastly","Rubik Bubbles","Rubik Burned","Rubik Dirt","Rubik Distressed","Rubik Glitch",
                    "Rubik Iso","Rubik Marker Hatch","Rubik Maze","Rubik Microbe","Rubik Moonrocks","Rubik Puddles","Rubik Wet Paint","Secular One","Suez One","Tahoma","Tinos","Varela Round",
                    "Handjet","Solitreo","Bona Nova SC","Lunasima" ];

function addBlueColorToHebewFonts()
{
    try
    {
        var docs_fontmenu_fonts = document.getElementsByClassName("docs-fontmenu-fonts");
        for (var i = 0; i < docs_fontmenu_fonts.length; i++)
        {
            var menuitem_content = docs_fontmenu_fonts[i].getElementsByClassName("goog-menuitem-content");
            for (var j = 0; j < menuitem_content.length; j++)
            {
                if (hebrewFonts.includes(menuitem_content[j].innerText) ||
                    menuitem_content[j].innerText.includes("Hebrew") ||
                    menuitem_content[j].innerText.includes("David") ||
                    menuitem_content[j].innerText.includes("Rubik") )
                {
                    if (menuitem_content[j].style.color != "rgb(1, 54, 177)" )
                    {
                        menuitem_content[j].innerText = menuitem_content[j].innerText + " ✡︎";
                        menuitem_content[j].style.color = "rgb(1, 54, 177)" ;
                    }
                }
            }
        }
    }
    catch(e){}
    setTimeout(function() { addBlueColorToHebewFonts() }, 2000);
}
window.addEventListener('load', function()
{
    addBlueColorToHebewFonts()
}, false);
