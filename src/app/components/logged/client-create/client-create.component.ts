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
        require: true
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('client.add.name.label'),
        'templateOptions.placeholder': this.translateService.stream('client.add.name.placeholder')
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        require: true
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('client.add.email.label'),
        'templateOptions.placeholder': this.translateService.stream('client.add.email.placeholder')
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
          //    active: this.clientDto.value.active,
          // surname: this.clientDto.value.surname,
          // phoneNumber: this.clientDto.value.phoneNumber,
          // vehicles: this.clientDto.value.vehicles,
        }
      )
    );
    this.matDialogRef.close();
  }

}
