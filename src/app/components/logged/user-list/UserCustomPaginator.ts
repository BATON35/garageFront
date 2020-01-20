import { MatPaginatorIntl } from '@angular/material';

export function CustomPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();

    customPaginatorIntl.itemsPerPageLabel = 'Custom_Label:';

    return customPaginatorIntl;
}