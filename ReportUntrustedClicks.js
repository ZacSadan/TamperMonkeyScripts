// ==UserScript==
// @name         Report untrusted clicks to console
// @version      0.1
// @description  Report untrusted clicks to console
// @author       Zac Sadan
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // can debug on https://www.imperiapost.it/ ...
    window.addEventListener('click', console.log);

    window.addEventListener('click', function(e) {
        if(!e.isTrusted)
        {
            console.log('%cUNTRUSTED CLICK !!!', 'color: green; background: yellow; font-size: 30px');
            console.log('%cUNTRUSTED CLICK !!!', 'color: green; background: yellow; font-size: 30px');
            console.log('%cUNTRUSTED CLICK !!!', 'color: green; background: yellow; font-size: 30px');
        }
    }, true);

})();
