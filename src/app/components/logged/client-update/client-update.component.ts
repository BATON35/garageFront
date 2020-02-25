import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { TranslateService } from '@ngx-translate/core';
import { ClientUpdateAction } from '../client.state';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {

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
          active: this.clientDto.active,
          // surname: this.clientDto.value.surname,
          // phoneNumber: this.clientDto.value.phoneNumber,
          // vehicles: this.clientDto.value.vehicles,
        }
      )
    );
    this.matDialogRef.close();
  }
}
