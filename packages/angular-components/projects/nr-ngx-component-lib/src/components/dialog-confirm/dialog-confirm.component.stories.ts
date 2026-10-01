import { Component, inject, Input, TemplateRef } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DialogService } from '../../services/dialog.service';
import { ButtonComponent } from '../button/button.component';

@Component( {
    selector: 'dialog-dummy',
    template: `
        <nrcl-button 
            label="Open Dialog" 
            (click)="onClick()"
        ></nrcl-button>
    `,
    imports: [
        ButtonComponent
    ]
} )
class DialogDummyComponent {
    dialogService = inject( DialogService )

    @Input() title?: string
    @Input() template?: TemplateRef<any>
    @Input() context?: string

    onClick() {
        this.dialogService.openConfirmDialog(
            {
                title: this.title!,
                template: this.template!,
                context: this.context,
            },
            {
                disableClose: false
            }
        ).afterClosed().toPromise()
            .then( res => {
                console.log( res )
            } )
    }
}

// @Component({
//     selector: 'dialog-dummy-fullscreen',
//     template: `
//         <nrcl-button
//             label="Open Fullscreen Dialog"
//             (click)="onClick()"
//         ></nrcl-button>
//     `,
//     standalone: false
// })
// class DialogDummyFullscreenComponent {
//     dialogService = inject(DialogService)

//     @Input() title?: string
//     @Input() template?: TemplateRef<any>
//     @Input() context?: string

//     onClick() {
//         this.dialogService.openConfirmDialog(
//             {
//                 title: this.title!,
//                 template: this.template!,
//                 context: this.context,
//                 showActions: false
//             },
//             {
//                 disableClose: false,
//                 panelClass: ['nrcl-dialog', 'nrcl-dialog-fullscreen']
//             }
//         ).afterClosed().toPromise()
//             .then(res => {
//                 console.log(res)
//             })
//     }
// }

const meta: Meta<DialogDummyComponent> = {
    title: 'Dialog Confirm',
    component: DialogDummyComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
            ],
            // declare components that are used in the template
            declarations: [
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
    ],
}

export default meta;

export const Primary: StoryObj<DialogDummyComponent> = {
    args: {
        title: 'Dialog Title'
    },
    render: ( args ) => {
        return {
            props: {
                ...args,
                context: {
                    name: 'foo'
                }
            },
            styles: [`
            `],
            template: `
                <ng-template #myContent let-ctx>
                    <p>Dynamic Content: {{ ctx?.name }}</p>
                </ng-template>

                <dialog-dummy
                    [template]="myContent"
                    [context]="context"
                    [title]="title"
                ></dialog-dummy>
            `
        }
    }
}

// export const Fullscreen: StoryObj<DialogDummyFullscreenComponent> = {
//     args: {
//         title: 'Selected Stations'
//     },
//     render: (args) => {
//         const [, setArgs] = useArgs();
//         return {
//             props: {
//                 ...args,
//                 rows: rowListItems(50),
//                 pageSize: 10,
//                 pageNumber: 1,
//                 rowCount: 50,
//                 columns: [
//                     'make',
//                     'model',
//                     'classification',
//                     'category',
//                     'crewNumber'
//                 ],
//                 context: {
//                     name: 'foo'
//                 },
//                 onPageNumberChange: (ev) => {
//                     setArgs({
//                         pageNumber: ev
//                         });
//                     },
//                     onPageSizeChange: (ev) => {
//                      setArgs({ pageSize: ev, pageNumber: 1
//                     });
//                 }
//             },
//             styles: [`
//                 .mat-mdc-table {
//                     .mat-column-make {
//                         min-width: 200px;
//                     }

//                     .mat-column-model {
//                         min-width: 200px;
//                     }

//                     .mat-column-classification {
//                         min-width: 300px;
//                     }

//                     .mat-column-category {
//                         min-width: 200px;
//                     }

//                     .mat-column-crewNumber {
//                         min-width: 100px;
//                     }
//                 }
//             `],
//             template: `
//                 <ng-template #myContent>

//                     <h3>50 Selected Stations</h3>

//                     <nrcl-row-list-desktop>

//                         <mat-table
//                             [dataSource]="rows | paginate: {
//                                 id: 'fullscreen-story',
//                                 itemsPerPage: pageSize,
//                                 currentPage: pageNumber,
//                                 totalItems: rowCount
//                             }">

//                             <ng-container matColumnDef="make">
//                                 <mat-header-cell *matHeaderCellDef>
//                                     Make
//                                 </mat-header-cell>

//                                 <mat-cell *matCellDef="let item">
//                                     <nrcl-cell-content tooltip>
//                                         {{ item.make }}
//                                     </nrcl-cell-content>
//                                 </mat-cell>
//                             </ng-container>

//                             <ng-container matColumnDef="model">
//                                 <mat-header-cell *matHeaderCellDef>
//                                     Model
//                                 </mat-header-cell>

//                                 <mat-cell *matCellDef="let item">
//                                     <nrcl-cell-content tooltip>
//                                         {{ item.model }}
//                                     </nrcl-cell-content>
//                                 </mat-cell>
//                             </ng-container>

//                             <ng-container matColumnDef="classification">
//                                 <mat-header-cell *matHeaderCellDef>
//                                     Classification
//                                 </mat-header-cell>

//                                 <mat-cell *matCellDef="let item">
//                                     <nrcl-cell-content tooltip>
//                                         {{ item.classification }}
//                                     </nrcl-cell-content>
//                                 </mat-cell>
//                             </ng-container>

//                             <ng-container matColumnDef="category">
//                                 <mat-header-cell *matHeaderCellDef>
//                                     Category
//                                 </mat-header-cell>

//                                 <mat-cell *matCellDef="let item">
//                                     <nrcl-cell-content tooltip>
//                                         {{ item.category }}
//                                     </nrcl-cell-content>
//                                 </mat-cell>
//                             </ng-container>

//                             <ng-container matColumnDef="crewNumber">
//                                 <mat-header-cell *matHeaderCellDef>
//                                     Crew Count
//                                 </mat-header-cell>

//                                 <mat-cell *matCellDef="let item">
//                                     <nrcl-cell-content tooltip>
//                                         {{ item.crewNumber }}
//                                     </nrcl-cell-content>
//                                 </mat-cell>
//                             </ng-container>

//                             <mat-header-row
//                                 *matHeaderRowDef="columns; sticky: true">
//                             </mat-header-row>

//                             <mat-row
//                                 *matRowDef="let item; columns: columns;">
//                             </mat-row>

//                         </mat-table>

//                     </nrcl-row-list-desktop>

//                     <nrcl-gap vertical></nrcl-gap>

//                     <nrcl-row-list-pagination
//                         paginationId="fullscreen-story"
//                         [pageSize]="pageSize"
//                         [pageNumber]="pageNumber"
//                         [rowCount]="rowCount"
//                     >
//                     </nrcl-row-list-pagination>

//                 </ng-template>

//                 <dialog-dummy-fullscreen
//                     [template]="myContent"
//                     [context]="context"
//                     [title]="title"
//                 ></dialog-dummy-fullscreen>
//             `
//         }
//     }
// }