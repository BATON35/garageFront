import { BackToDefoultVehicleAction } from './../logged/vehicle.state';
import { BackToDefoultClientAction } from './../logged/client.state';
import { AuthGuard } from './../../guart/auth.guard';
import { Router } from '@angular/router';
import { LogoutAction, BackToDefoultAuthAction, AuthState, LoginFromCookieAction } from './../state/auth.state';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/api/models';
import { BackToDefoultUserAction } from '../logged/users.state';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentUser;
  selectedLanguage = null;
  @Select(state => state.auth.currentUser)
  user$: Observable<UserDto>;

  @Select(state => state.auth.jwtToken)
  token$: Observable<string>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  constructor(
    public store: Store,
    public breakpointObserver: BreakpointObserver,
    public router: Router,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    this.user$.subscribe(value => this.currentUser = value);
    this.translateService.setDefaultLang('pl');
    setTimeout(() => { this.selectedLanguage = 'pl'; }, 0);
    this.store.dispatch(new LoginFromCookieAction());
  }
  logout() {
    this.store.dispatch(new LogoutAction());
    this.store.dispatch(new BackToDefoultAuthAction());
    this.store.dispatch(new BackToDefoultClientAction());
    this.store.dispatch(new BackToDefoultUserAction());
    this.store.dispatch(new BackToDefoultVehicleAction());
    this.router.navigate(['/']);
  }
  useLanguage(language: string) {
    this.translateService.use(language);
  }

}
