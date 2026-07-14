/* Bal Defterim SW v2.1.0 — kabuğu önbellekler, Supabase istekleri her zaman ağdan gider */
const CACHE = 'baldefterim-v2.1.0';
const KABUK = ['./', './index.html', './manifest.json', './ikon-192.png', './ikon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(KABUK)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Supabase ve diğer API çağrıları: dokunma, doğrudan ağ
  if (url.origin !== location.origin) return;
  // Kabuk: önce ağ, düşerse önbellek (sürüm güncellemeleri hemen insin diye)
  e.respondWith(
    fetch(e.request).then(r => {
      const kopya = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, kopya));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
