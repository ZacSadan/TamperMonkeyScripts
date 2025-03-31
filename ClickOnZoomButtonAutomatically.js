// ==UserScript==
// @name         Click on Zoom button automatically
// @version      1.0
// @description  Click on Zoom button automatically
// @author       Zac Sadan
// @match        *://*.zoom.us/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zoom.com
// @grant        none
// ==/UserScript==

function clickLaunchMeetingButton()
{
  const launchMeetingButton = document.querySelector('div[role="button"]');

  if (launchMeetingButton && launchMeetingButton.innerText == "Launch Meeting" )
  {
      launchMeetingButton.click();
  }
}

window.addEventListener('load', function()
{
    clickLaunchMeetingButton()
}, false);