import { ClientUpdateAction } from './../client.state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  clientForm = new FormGroup({});
  clientFields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: '{{ \'panel.client.list.search\' | translate }}',
        Placeholder: 'nazwa Klienta',
        require: true
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'emial klienta',
        Placeholder: 'email urzytkownika',
        require: true
      }
    }
  ];

  constructor(
    public store: Store,
    public matDialogRef: MatDialogRef<ClientCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public clientDto,
    public translateService: TranslateService) { }

  ngOnInit() {
  }

  submit() {
    this.store.dispatch(
      new ClientUpdateAction(
        {
          id: this.clientDto !== null ? this.clientDto.id : null,
          name: this.clientForm.value.name,
          email: this.clientForm.value.email,
        }
      )
    );
    this.matDialogRef.close();
  }

}
