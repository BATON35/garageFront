import { TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorCustom extends MatPaginatorIntl {
    constructor(public translateService: TranslateService) {
        super();
        this.translateService.stream('paginator.itemsPerPageLabel').subscribe(v => {
            this.itemsPerPageLabel = v;
        });
        this.translateService.stream('paginator.nextPageLabel').subscribe(v => {
            this.nextPageLabel = v;
        });
        this.translateService.stream('paginator.previousPageLabel').subscribe(v => {
            this.previousPageLabel = v;
        });
        this.translateService.stream('paginator.lastPageLabel').subscribe(v => {
            this.lastPageLabel = v;
        });
        this.translateService.stream('paginator.firstPageLabel').subscribe(v => {
            this.firstPageLabel = v;
        });
        this.translateService.stream('paginator.separator')
            .subscribe(v => this.getRangeLabel = (page: number, pageSize: number, length: number) => {
                if (length === 0 || pageSize === 0) { return `0 ` + v + ` ${length}`; }
                length = Math.max(length, 0);
                const startIndex = page * pageSize;
                // If the start index exceeds the list length, do not try and fix the end index to the end.
                const endIndex = startIndex < length ?
                    Math.min(startIndex + pageSize, length) :
                    startIndex + pageSize;
                return `${startIndex + 1} - ${endIndex} ` + v + ` ${length}`;
            })
    }
}