// ==UserScript==
// @name         Fast CSS reload
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  Cache-bust all the things
// @author       maurice.vancreij@webqem.com
// @include      *://*
// @grant        GM_xmlhttpRequest
// @connect      localhost
// ==/UserScript==

(function() {

  'use strict';

  // CONDITIONS

  if (/admin/.test(document.location.href)){ return false; }
  else { window.tampered = true; }

  // PROPERTIES

  const rule = 'link[href], img[src]';
  const swap = /domain.tld\/path\/file.ext/i;
  const local = 'localhost/path/file.ext';
  const css = 'localhost/path/file.ext';
  const js = 'localhost/path/file.ext';

  // METHODS

  function insert() {
    if (css && css !== '') {
      var link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', css);
      document.head.appendChild(link);
    }
    if (js && js !== '') {
      var script = document.createElement('script');
      script.setAttribute('src', js);
      document.head.appendChild(script);
    }
  }

  function bustCaches() {
    var url, type;
    var time = new Date().getTime();
    var elems = [...document.querySelectorAll(rule)];
    var path = '';
    elems.map(elem => {
      type = (elem.getAttribute('href')) ? 'href' : 'src';
      try {
        url = new URL(elem[type]);
        url.searchParams.set('t', time);
        path = url.href.replace(swap, local);
        elem.setAttribute(type, path);
      } catch (e) {
        console.log(e, elem.getAttribute(type));
      }
    });
  };

  // EVENTS

  insert();
  bustCaches();

  window.addEventListener('keyup', function(evt) {
    if (evt.key === '`' || evt.key === '~') {
      bustCaches();
    }
  });

})();
