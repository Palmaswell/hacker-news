/* eslint-disable @typescript-eslint/no-explicit-any */
export function register(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            `Service Worker registration succeeded. Scope is ${registration.scope}`,
          );
        })
        .catch(error =>
          console.warn(`Service Worker registration failed with ${error}`),
        );
    });
  }
}

self.addEventListener('install', event => {
  (event as any).waitUntil(
    caches
      .open('hacker-news-static-assets')
      .then(cache => cache.addAll(['/', '/index.html', '/app.js'])),
  );
});
