const CACHE="uno-party-v1";
const ASSETS=["./","./index.html","./manifest.json","./apple-touch-icon.png","./icon-192.png","./icon-512.png","./draw-two.png","./skip.png","./reverse.png","./wild.png","./point-taken.png","./wild-pile-up.png","./wild-drawn-together.png","./wild-draw-four.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match("./index.html")))));
