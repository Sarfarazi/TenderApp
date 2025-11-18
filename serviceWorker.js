const CACHE_NAME = "cache-v2";
const urlsToCache = [
    '/',
    '/index.html',
    '/main.jsx',
    '/index.css',
    '/logo.png',
    '/assets/icons/carpet.svg',
    '/assets/icons/dashbord.svg',
    '/assets/icons/truck.svg',
    '/assets/icons/user.svg',
    '/assets/images/logo.svg',
    '/assets/images/otp.svg',
    '/assets/images/signUp.svg',
    '/assets/images/truck.svg',
    '/assets/images/verify.svg',
];

// نصب و کش کردن فایل‌های استاتیک
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// مدیریت درخواست‌ها
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // اگر درخواست به API بک‌اند بود → Network First
    if (url.origin === 'https://tenapi.palaz.com') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // ذخیره در کش برای استفاده آفلاین
                    const resClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, resClone);
                    });
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
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

// پاک کردن کش‌های قدیمی
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
