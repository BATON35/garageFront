import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  constructor(public translateService: TranslateService) { }



  ngOnInit() {
    this.translateService.setDefaultLang('pl');
  }

  onTabChange(event) {

  }
}
