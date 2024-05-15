# Cross-domain live updates.

A Tampermonkey script to substitute local images and styles on live sites.

## 1. Install TamperMonkey extention in your browser

Available [TamperMonkey](https://www.tampermonkey.net/) extentions:
- [For Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- [For Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
- [For Microsoft Edge](https://www.microsoft.com/en-us/p/tampermonkey/9nblggh5162s?activetab=pivot:overviewtab)
- [For Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089?mt=12)

## 2. Configure the script

Download the example "[tampermonkey.js](https://raw.githubusercontent.com/WoollyMittens/tampermonkey-quick-refresh/master/tampermonkey.js)" script from [this repository](https://github.com/WoollyMittens/tampermonkey-quick-refresh).

### Fill in the project information

In the top of the file edit the @name of your project and @match the domain of the site the script should affect.

```javascript
// ==UserScript==
// @name         Fast CSS reload
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Substitute local assets on live sites
// @author       maurice.vancreij@webqem.com
// @include      *://*.domain.tld/*
// @grant        GM_xmlhttpRequest
// @connect      localhost
// ==/UserScript==
```

In this case the following domain would be affected: www.domain.tld

### Fill in the local path

Replace the domain and path in the constant "swap" to the file you want to be replaced with a locally hosted one.
Then replace the domain and path in the constant "local" to the path to the local version.

```javascript
  const rule = 'link[href], img[src]';
  const swap = /domain.tld\/path\/file.ext/i;
  const local = 'localhost/path/file.ext';
  const css = 'localhost/path/file.ext';
  const js = 'localhost/path/file.ext';
```

**rule : {Regexp}** - These elements on page will be affected.

**swap : {Regexp}** - This regular expression will be used to replace the paths.

**local : {String}** - The paths that match the regular expression will be replaced by this.

**css : {String}** - This extra stylesheet will be included in the header.

**js : {String}** - This extra script file will be included in the header.

## Aditional functionality

Pressing ```~``` will reload the assets without refreshing the page.
