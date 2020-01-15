import { Store } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PartUpdateAction } from '../state/part.state';

@Component({
  selector: 'app-part-create',
  templateUrl: './part-create.component.html',
  styleUrls: ['./part-create.component.scss']
})
export class PartCreateComponent implements OnInit {

  partForm = new FormGroup({});
  partFields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        labe: 'nazwa czesci label',
        placeholder: 'nazwa czesci placeholder',
        required: true
      }
    },
    {
      key: 'price',
      type: 'input',
      templateOptions: {
        label: 'cena label',
        placeholder: 'cena placeholder',
        required: true
      }
    }
  ];

  constructor(
    public store: Store,
    public matDialogRef: MatDialogRef<PartCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public partDto) { }

  ngOnInit() {
  }
  submit() {
    this.store.dispatch(
      new PartUpdateAction(
        {
          id: this.partDto !== null ? this.partDto.id : null,
          name: this.partForm.value.name,
          price: this.partForm.value.price,
        }
      )
    );
    this.matDialogRef.close();
  }

}
