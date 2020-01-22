import { TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorCustom extends MatPaginatorIntl {
    // itemsPerPageLabel = 'Items per page:';
    // nextPageLabel = 'Next page';
    // previousPageLabel = 'Previous page';
    // lastPageLabel = 'Last page';
    // firstPageLabel = 'First page';

    constructor(public translateService: TranslateService) {
        super();
        this.translateService.stream('vehicle.ubdate.matSnackBar.message').subscribe(v => {
            console.log('mat_paginator.ts');
            console.log(v);
            this.itemsPerPageLabel = v;
        });
        this.translateService.stream('vehicle.ubdate.matSnackBar.message').subscribe(v => this.nextPageLabel = v);
    }
}