// import { MatPaginatorIntl } from '@angular/material';

// const rangeLabel = (page: number, pageSize: number, length: number) => {
//     if (length === 0 || pageSize === 0) { return `0 van ${length}`; }

//     length = Math.max(length, 0);

//     const startIndex = page * pageSize;

//     // If the start index exceeds the list length, do not try and fix the end index to the end.
//     const endIndex = startIndex < length ?
//         Math.min(startIndex + pageSize, length) :
//         startIndex + pageSize;

//     return `${startIndex + 1} - ${endIndex} of ${length}`;
// }

// export function CustomPaginator() {
//     const paginatorIntl = new MatPaginatorIntl();

//     paginatorIntl.itemsPerPageLabel = 'Items per page:';
//     paginatorIntl.nextPageLabel = 'Next page';
//     paginatorIntl.previousPageLabel = 'Previous page';
//     paginatorIntl.lastPageLabel = 'Last page';
//     paginatorIntl.firstPageLabel = 'First page';
//     paginatorIntl.getRangeLabel = rangeLabel;

//     return paginatorIntl;
// }
