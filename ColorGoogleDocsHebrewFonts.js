// ==UserScript==
// @name         Color Hebrew Fonts in Google Docs/Presentation UI
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Color Hebrew Fonts in Google Docs/Presentation UI for fast finding
// @author       You
// @match        https://docs.google.com/presentation/d/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=docs.google.com
// @grant        none
// ==/UserScript==


// Got from Google Docs List ...
var heberewFonts = ["Alef","Amatic SC","Arimo","Assistant","Bellefair","Bona Nova","Cousine","David Libre","Frank Ruhl Libre","Fredoka","Heebo","IBM Plex Sans Hebrew","Karantina","M PLUS 1p","M PLUS Rounded 1c",
                    "Miriam Libre","Noto Rashi Hebrew","Noto Sans Hebrew","Noto Serif Hebrew","Open Sans","Rubik","Rubik Beastly","Rubik Bubbles","Rubik Burned","Rubik Dirt","Rubik Distressed","Rubik Glitch",
                    "Rubik Iso","Rubik Marker Hatch","Rubik Maze","Rubik Microbe","Rubik Moonrocks","Rubik Puddles","Rubik Wet Paint","Secular One","Suez One","Tahoma","Tinos","Varela Round" ];

function addBlueColorToHebewFonts()
{
    try
    {
        var docs_fontmenu_fonts = document.getElementsByClassName("docs-fontmenu-fonts");
        var menuitem_content = docs_fontmenu_fonts[0].getElementsByClassName("goog-menuitem-content");
        for (var i = 0; i < menuitem_content.length; i++)
        {
                for (var hf_indx = 0; hf_indx < heberewFonts.length; hf_indx++)
                {
                    if ( menuitem_content.item(i).innerHTML.indexOf(heberewFonts[hf_indx]) != -1 &&
                         menuitem_content.item(i).innerHTML.indexOf("color: #0136B1") == -1 ) // no color yet
                    {
                        menuitem_content.item(i).innerHTML =
                            menuitem_content.item(i).innerHTML.replace( /style=\"font-family/g,'style="color: #0136B1;font-family');
                        console.log(menuitem_content.item(i).innerHTML);
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
