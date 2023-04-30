import 'i18next';
import jaJP from '@/langs/ja-JP.json';

declare module 'i18next' {
  // and extend them!
  interface CustomTypeOptions {
    resources: {
      jaJP: typeof jaJP;
    };
  }
}
