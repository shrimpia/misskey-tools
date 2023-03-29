import 'reflect-metadata';

(async () => {
  (await import('./calculate-all-rating.worker')).default();
})();
