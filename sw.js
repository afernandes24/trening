const C="trening-v1";const CORE=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{caches.open(C).then(c=>c.put("index.html",r.clone()));return r;}).catch(()=>caches.match("index.html")));return;}
  e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{if(r.ok||r.type==="opaque")caches.open(C).then(c=>c.put(e.request,r.clone()));return r;})));});
