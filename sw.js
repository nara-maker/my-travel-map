const CACHE="my-travel-map-shell-v2";
const ASSETS=["./","./index.html","./manifest.json"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  const url=new URL(event.request.url);
  // Only cache the app shell. MapLibre/OpenFreeMap map data is intentionally not cached or prefetched.
  if(url.origin===location.origin){
    event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));
  }
});
