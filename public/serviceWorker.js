const CACHE_NAME = "cache-v2";
const urlsToCache = [
    '/',
    '/index.html',
    '/index.css',
    '/font/Yekan.ttf',
    '/logo.png',
    '/icons/carpet.svg',
    '/icons/dashbord.svg',
    '/icons/truck.svg',
    '/icons/user.svg',
    '/images/logo.svg',
    '/images/otp.svg',
    '/images/signUp.svg',
    '/images/truck.svg',
    '/images/verify.svg',
];

// نصب و کش کردن فایل‌های استاتیک
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            for (const url of urlsToCache) {
                try {
                    await cache.add(url);
                } catch (err) {
                    console.error('Cache failed:', url, err);
                }
            }
        })
    );
    self.skipWaiting();
});

// مدیریت درخواست‌ها
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // اگر درخواست به API بک‌اند بود → Network First
    if (url.origin === 'https://tenapi.palaz.com') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (
                        event.request.method === 'GET' &&
                        response &&
                        response.ok
                    ) {
                        const resClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, resClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // اگر شبکه قطع بود، از کش بخون
                    return caches.match(event.request);
                })
        );
    } else {
        // برای فایل‌های استاتیک → Cache First
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    return response || fetch(event.request)
                        .catch(() => caches.match('/index.html'));
                })
        );
    }
});

// پاک کردن کش‌های قدیمی
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            caches.keys().then((cacheNames) =>
                Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            ),
            self.clients.claim()
        ])
    );
});
