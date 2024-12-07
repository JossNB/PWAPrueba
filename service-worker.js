const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "/",
    "/css/EstiloCatalogo.css",
    "/images/Producto1.jpg",
    "/images/Producto2.jpg",
    "/images/Producto3.jpg",
    "/images/Producto5.jpg",
    "/Content/icons/icon-192x192.png",
    "/Content/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Archivos en caché");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})