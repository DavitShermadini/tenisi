// Service Worker — offline ქეში
const CACHE = 'tenisi-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
];

// ინსტალაცია — ვქეშავთ ძირითად ფაილებს
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

// გააქტიურება — ძველი ქეშების წაშლა
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// HTML/ნავიგაცია — network-first (ახალი ვერსია ყოველთვის ჩანს, offline-ზე ქეშიდან).
// სტატიკური ფაილები (აიქონი, manifest) — cache-first (სწრაფი).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // HTML და manifest — network-first (ცვლილებები მაშინვე ჩანს, მაგ. orientation)
  const isDoc = e.request.mode === 'navigate' ||
                e.request.destination === 'document' ||
                e.request.url.endsWith('.html') ||
                e.request.url.endsWith('.webmanifest');

  if (isDoc) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request).then(h => h || caches.match('./index.html')))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }))
    );
  }
});
