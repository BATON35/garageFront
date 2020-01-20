import { Settings } from 'src/app/model/app.settings.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {
  public settings = new Settings(
    'Gradus', // theme name
    true, // loadingSpinner
    true, // fixedHeader
    true, // sidenavIsOpened
    true, // sidenavIsPinned
    true, // sidenavUserBlock
    'vertical', // horizontal , vertical
    'default', // default, compact, mini
    'indigo-light', // indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark
    false // true = rtl, false = ltr
  );
}
