import { AfterViewInit, Component, inject, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DialogService } from '../../services/dialog.service';
import { ButtonComponent } from '../button/button.component';
import { DialogComponent } from './dialog.component';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component( {
    selector: 'dialog-story',
    styles: [
        `section { background-color: #e5f3e5; }`
    ],
    template: `
        <nrcl-button
            [label]="label"
            (click)="onClick()"
        ></nrcl-button>

        <ng-template #dialog>
            <nrcl-dialog
                [title]="title"
                [isLoading]="isLoading"
                [showClose]="showClose"
                [showWarning]="showWarning"
                [showActions]="showActions"

                [saveLabel]="saveLabel"
                [saveEnabled]="saveEnabled"
                (saveClick)="saveClick.emit()"

                [cancelLabel]="cancelLabel"
                [cancelEnabled]="cancelEnabled"
                (cancelClick)="cancelClick.emit()"
            >
                <section title>
                    title
                </section>

                <section content>
                    content
                </section>

                <section footer>
                    footer
                </section>
            </nrcl-dialog>
        </ng-template>
    `,
    imports: [
        ButtonComponent,
        DialogComponent
    ],
} )
class DialogStoryComponent extends DialogComponent implements AfterViewInit, OnDestroy {
    dialogService = inject( DialogService )

    @Input() label = 'Open Dialog'
    @Input() useHeader = false
    @Input() useActions = false

    @ViewChild( 'dialog' ) dialog?: TemplateRef<any>

    dialogRef?: MatDialogRef<any>

    ngAfterViewInit(): void {
        this.onClick()
    }

    ngOnDestroy(): void {
        if ( this.dialogRef ) this.dialogRef.close()
    }

    onClick() {
        this.dialogRef = this.dialogService.openDialogTemplate<any,{},void>( this.dialog!, {} )
        
        this.dialogRef.afterClosed().toPromise()
            .then( console.log )
            .catch( console.warn )
    }
}


const meta: Meta<DialogStoryComponent> = {
    title: 'Dialog',
    component: DialogStoryComponent,
    decorators: [
    //     // Apply metadata to all stories
    //     moduleMetadata( {
    //         // import necessary ngModules or standalone components
    //         imports: [
    //         ],
    //         // declare components that are used in the template
    //         declarations: [
    //         ],
    //         // List of providers that should be available to the root component and all its children.
    //         providers: [
    //         ],
    //     } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="displayMode">
                        <display-mode-wrapper 
                            [displayMode]="displayMode"
                            [interfaceStyle]="interfaceStyle"
                        >
                            ${ story }
                        </display-mode-wrapper>
                    </ng-container>
                    `
            }
        )
    ],
}

export default meta;

export const Primary: StoryObj<DialogStoryComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        saveEnabled: {
            control: { type: 'inline-radio' },
            options: [ 'Null', 'False', 'True' ],
            mapping: {
                'Null': undefined,
                'False': false,
                'True': true,
            }
        },
        cancelEnabled: {
            control: { type: 'inline-radio' },
            options: [ 'Null', 'False', 'True' ],
            mapping: {
                'Null': undefined,
                'False': false,
                'True': true,
            }
        },
        cancelClick: { action: 'cancel' },
        saveClick: { action: 'save' },
    },
    args: {
        ...displayModeWrapperStory.args,
        title: 'Dialog Title',
        isLoading: false,
        showClose: false,
        showWarning: false,
        showActions: true,
        saveLabel: 'Save',
        saveEnabled: true,
        cancelLabel: 'Cancel',
        cancelEnabled: true,
        useHeader: false,
        useActions: false,
    },
    // render: ( args ) => {
    //     return {
    //         props: {
    //             ...args,
    //             // get dialogService() { return inject( DialogService ) }
    //             // dialogService: inject( DialogService )
    //             // context: {
    //             //     name: 'foo'
    //             // }
    //         },
    //         styles: [`
    //         `],
    //         template: `
    //             <dialog-story></dialog-story>
    //         `,

    //     }
    // }
}
