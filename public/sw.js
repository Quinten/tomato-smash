const PRECACHE = 'precache-v0.0.1';
const RUNTIME = 'runtime-v0.0.1';
const PRECACHE_URLS = [
    './',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'android-chrome-36x36.png',
    'android-chrome-48x48.png',
    'android-chrome-72x72.png',
    'android-chrome-96x96.png',
    'android-chrome-144x144.png',
    'android-chrome-192x192.png',
    'android-chrome-256x256.png',
    'android-chrome-384x384.png',
    'android-chrome-512x512.png',
    'apple-touch-icon-57x57.png',
    'apple-touch-icon-60x60.png',
    'apple-touch-icon-72x72.png',
    'apple-touch-icon-76x76.png',
    'apple-touch-icon-114x114.png',
    'apple-touch-icon-120x120.png',
    'apple-touch-icon-144x144.png',
    'apple-touch-icon-152x152.png',
    'apple-touch-icon-167x167.png',
    'apple-touch-icon-180x180.png',
    'apple-touch-icon-1024x1024.png',
    'apple-touch-icon.png',
    'apple-touch-icon-precomposed.png',
    'mstile-70x70.png',
    'mstile-144x144.png',
    'mstile-150x150.png',
    'mstile-310x150.png',
    'mstile-310x310.png',
    'manifest.json',
    'browserconfig.xml',
    'styles.css',
    'index.js',
    'index.html',
];


function createCacheBustedRequest(url) {
    let request = new Request(url, { cache: "reload" });
    if ("cache" in request) {
        return request;
    }
    let bustedUrl = new URL(url, self.location.href);
    bustedUrl.search += (bustedUrl.search ? "&" : "") + "cachebust=" + Date.now();
    return new Request(bustedUrl);
}

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {

    if (
        event.request.mode === "navigate" ||
        (event.request.method === "GET" && event.request.headers.get("accept").indexOf("text/html") > -1)
    ) {
        console.log("Handling fetch event for", event.request.url)
        event.respondWith(fetch(createCacheBustedRequest(event.request.url)).catch(error => {
            console.log("Fetch failed; returning offline page instead.", error)
            return caches.match("index.html")
        }));
    }
});

self.addEventListener('fetch', event => {

    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    }).catch((err) => { return err; });
                });
            })
        );
    }
});
