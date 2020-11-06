const cacheName = "cache-v1"
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/users',
  '/about',
  // 'https://jsonplaceholder.typicode.com/users'
]


this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(urlsToCache)
    })
  )
})

this.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result)
          return result
        // If its not present in cache then go fetch from api
        let requestUrl = event.request.clone();
        return fetch(requestUrl)
      })
    )
  }
})