import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Plugins } from '@capacitor/core';

const { Device } = Plugins;

if (environment.production) {
  enableProdMode();
}

function fixKeyboard() {
  document.addEventListener('deviceready', () => {
    const hack = () => {
      const ionApp = document.querySelector('ion-app');
      if (ionApp) {
        window.requestAnimationFrame(() => {
          ionApp.style.height = '100.1%';
          window.requestAnimationFrame(() => {
            ionApp.style.height = '100%';
          });
        });
      }
    };
    if ('ResizeObserver' in window) {
      const ResizeObserver = (window as any).ResizeObserver;
      new ResizeObserver(hack).observe(document.documentElement);
    } else {
      window.addEventListener('keyboardWillShow', hack);
      window.addEventListener('keyboardWillHide', hack);
    }
  });
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));

Device.getInfo().then((info) => {
  if (info.operatingSystem === 'android'){
    fixKeyboard();
  }
}).catch(() => fixKeyboard());
