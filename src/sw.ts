export interface ExtendableEvent extends Event {
  readonly request: Request;
  waitUntil(fn: Promise<unknown>): void;
  respondWith(fn: Promise<unknown>): void;
}

export interface ServiceWorkerGlobalScope {
  skipWaiting: () => void;
}

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

self.addEventListener('install', async (event: Event) => {
  try {
    const cache = await caches.open('hacker-news-static-assets');

    (event as ExtendableEvent).waitUntil(
      cache.addAll(['/', '/index.html', '/app.js']),
    );
  } catch (error) {
    console.warn(`Service Worker installation failed with ${error}`);
  }
});

self.addEventListener('fetch', (event: Event) => {
  const ev = event as ExtendableEvent;
  ev.respondWith(
    caches
      .match(ev.request)
      .then(response => {
        return response || fetch(ev.request);
      })
      .catch(error =>
        console.warn(`Service Worker fetch failed with ${error}`),
      ),
  );
});
