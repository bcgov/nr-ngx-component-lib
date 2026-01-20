import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { IconComponent } from 'dist/nr-ngx-component-lib';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
import { TagItem, TagListComponent } from './tag-list.component';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<TagListComponent> = {
    title: 'Tag List',
    component: TagListComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatTooltipModule,
                ReactiveFormsModule,
                TextFieldModule,
                MatSelectModule,
                MatChipsModule,
                MatIconModule                       
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective,
                DisplayModeWrapperComponent,
                IconComponent,
                ButtonComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                ConfigurationService
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="displayMode">
                        <display-mode-wrapper 
                            [displayMode]="displayMode"
                        >
                            ${ story }
                        </display-mode-wrapper>
                    </ng-container>
                    `
            }
        ),        
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
                `
            }
        }
    }  
}

export default meta;

export const Primary: StoryObj<TagListComponent & { displayMode: DisplayMode, itemCount: number }> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
    },
    args: {
        displayMode: 'desktop',
        itemCount: 10,
    },
    render: ( args ) => {
        return {
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }
            `],
            props: {
                ...args,
                items: makeTagItems( args.itemCount ),
            },
            template: `
                <nrcl-tag-list
                    [items]="items"
                ></nrcl-tag-list>
            `
        }
    }
}

function makeTagItems( count ) {
    return Array.from<any>( { length: Math.ceil( count / 6 ) } ).reduce( ( acc: any, i ) => {
        return acc.concat( [
            {
                id: 'apple',
                description: 'Apple'
            },
            {
                id: 'banana',
                description: 'Banana'
            },
            {
                id: 'strawberry',
                description: 'Strawberry'
            },
            {
                id: 'orange',
                description: 'Orange'
            },
            {
                id: 'kiwi',
                description: 'Kiwi'
            },
            {
                id: 'cherry',
                description: 'Cherry'
            },
        ] )
    }, [] ).slice( 0, count ).map( ( v, i ) => { v.id = i; return v } )
}