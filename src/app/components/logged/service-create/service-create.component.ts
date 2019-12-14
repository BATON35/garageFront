import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Store } from '@ngxs/store';
import { SaveServiceCarAction } from '../state/service-car.state';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss']
})
export class ServiceCreateComponent implements OnInit {
  serviceForm = new FormGroup({})
  serviceFields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        labe: 'usluga',
        placeholder: 'usluga',
        required: true
      }
    },
    {
      key: 'price',
      type: 'input',
      templateOptions: {
        label: 'cena ',
        placeholder: 'cena',
        required: true
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'description ',
        placeholder: 'description',
        required: false
      }
    }
  ]
  constructor(public store: Store) { }

  ngOnInit() {
  }
  save() {
    console.log("save service!!!!!!!!!!!!!!!!!!!!!")
    this.store.dispatch(new SaveServiceCarAction({
      name: this.serviceForm.value.name,
      price: this.serviceForm.value.price,
      description: this.serviceForm.value.description,
    }))
  }

}
