/* eslint-disable @typescript-eslint/no-explicit-any */
export function register(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log(
          `Service Worker registration succeeded. Scope is ${registration.scope}`,
        );
      } catch (error) {
        console.warn(`Service Worker registration failed with ${error}`);
      }
    });
  }
}

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches
      .open('hacker-news-static-assets')
      .then(cache =>
        cache
          .addAll(['/', '/index.html', '/app.js'])
          .then(() => (self as any).skipWaiting()),
      ),
  );
});

self.addEventListener('fetch', async (event: any) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }),
  );
});
