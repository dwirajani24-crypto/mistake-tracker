const CACHE_NAME="alevel-mistakes-tracker-v2";
const APP_SHELL=["./","./index.html","./manifest.json","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-192-maskable.png","./icons/icon-512-maskable.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(xs=>Promise.all(xs.filter(x=>x!==CACHE_NAME).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{if(r&&r.status===200)caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==="navigate"?caches.match("./index.html"):new Response("Offline",{status:503}))))});
