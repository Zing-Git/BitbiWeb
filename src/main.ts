import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'hammerjs'

/*if (environment.production ) {
  enableProdMode();
}*/

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
