"use strict";var precacheConfig=[["/Hardware-Software-Interrupt/index.html","5f4d1ba13f8d8eeb90634286cbb1a7ef"],["/Hardware-Software-Interrupt/static/css/main.c98ce7f3.css","7a4b5a891144d0f4a20d3d40213d9726"],["/Hardware-Software-Interrupt/static/media/Block Queue - Interrupt - Dark.32accb12.png","32accb12c712fbcf06165b272ab4b984"],["/Hardware-Software-Interrupt/static/media/Block Queue - Interrupt - Light.b2505694.png","b2505694f7e9617c4c9f91a834b5f357"],["/Hardware-Software-Interrupt/static/media/Block Queue - Interrupt Handled - Dark.317acdab.png","317acdabbb72944c40a7c5b9f20f928d"],["/Hardware-Software-Interrupt/static/media/Block Queue - Interrupt Handled - Light.adc70f67.png","adc70f677b9f73c52f81bb150e146f6b"],["/Hardware-Software-Interrupt/static/media/Dispatcher - Assign - Dark.83e00b07.png","83e00b07e5b61753cc1085947b35ccf7"],["/Hardware-Software-Interrupt/static/media/Dispatcher - Assign - Light.7d2854ea.png","7d2854ea278efd7aea123fa3cbf4717d"],["/Hardware-Software-Interrupt/static/media/Dispatcher - Return - Dark.9546f062.png","9546f06255dc8e70bb225f0513978bd8"],["/Hardware-Software-Interrupt/static/media/Dispatcher - Return - Light.f91ae889.png","f91ae889c549ed3be0c49b563479ec5e"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var r=new URL(e);return"/"===r.pathname.slice(-1)&&(r.pathname+=t),r.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,r,n){var a=new URL(e);return n&&a.pathname.match(n)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(r)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var r=new URL(t).pathname;return e.some(function(e){return r.match(e)})},stripIgnoredUrlParameters=function(e,r){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return r.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],r=e[1],n=new URL(t,self.location),a=createCacheKey(n,hashParamName,r,/\.\w{8}\./);return[n.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(r){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!r.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var r=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!r.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,r=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(r))||(r=addDirectoryIndex(r,n),e=urlsToCacheKeys.has(r));var a="/Hardware-Software-Interrupt/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(r=new URL(a,self.location).toString(),e=urlsToCacheKeys.has(r)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(r)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});