

const CACHE_NAME = "cache-v2";
const urlsToCache = [
    '/',
    '/index.html',
    '/main.jsx',
    '/index.css',
    '/logo.png',
    '../TenderApp/src/assets/icons/carpet.svg',
    '../TenderApp/src/assets/icons/dashbord.svg',
    '../TenderApp/src/assets/icons/truck.svg',
    '../TenderApp/src/assets/icons/user.svg',
    '../TenderApp/src/assets/images/logo.svg',
    '../TenderApp/src/assets/images/otp.svg',
    '../TenderApp/src/assets/images/signUp.svg',
    '../TenderApp/src/assets/images/truck.svg',
    '../TenderApp/src/assets/images/verify.svg',
    'https://tenapi.palaz.comapi/Main/GetTypeTenderCar/GetTypeTenderCarAsync',
    'https://tenapi.palaz.comapi/Main/GetBarInfoTender/GetBarInfoTenderAsync',
    "https://tenapi.palaz.comapi/Main/GetBarHistoryTender/GetBarHistoryTenderAsync",
    "https://tenapi.palaz.comapi/Main/GetInfoDriverTenderByMobile/GetInfoDriverTenderByMobileAsync",
]


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                cache.addAll(urlsToCache)
            })
    )
})


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((caches) => {
                return caches || fetch(event.request)
            })
    )
})



self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        caches.delete(cacheName);
                    }
                })
            )
        })
    )

})