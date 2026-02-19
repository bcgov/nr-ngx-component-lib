import { AfterViewInit, Component, inject, Input, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DialogService } from '../../services/dialog.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component( {
    selector: 'dialog-dummy',
    template: `
        <nrcl-button 
            label="Open Dialog" 
            (click)="onClick()"
        ></nrcl-button>
    `, 
} )
class DialogDummyComponent {
    dialogService = inject( DialogService )

    @Input() title
    @Input() template: TemplateRef<any>
    @Input() context

    onClick() {
        this.dialogService.openConfirmDialog({
            title: this.title,
            template: this.template,
            context: this.context,
        }).afterClosed().toPromise()
            .then( res => {
                console.log( res )
            } )
    }
}

const meta: Meta<DialogDummyComponent> = {
    title: 'Dialog Confirm',
    component: DialogDummyComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatIconModule,
                BrowserAnimationsModule,
                FormsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatSelectModule,
                MatListModule,
                MatDialogModule,
                MatInputModule,
                MatTooltipModule,
                MatProgressSpinnerModule
            ],
            // declare components that are used in the template
            declarations: [
                DialogComponent,
                DialogConfirmComponent,
                ButtonComponent,
                IconComponent
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
