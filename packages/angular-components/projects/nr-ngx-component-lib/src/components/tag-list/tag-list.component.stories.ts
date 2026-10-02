import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayMode } from '../../services/configuration.service';
import { TagListComponent } from './tag-list.component';

const meta: Meta<TagListComponent> = {
    title: 'Tag List',
    component: TagListComponent,
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
        removable: true,
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
                itemRemoved: ( ev ) => { console.log( ev ) }
            },
            template: `
                <nrcl-tag-list
                    [items]="items"
                    [removable]="removable"
                    (itemRemoved)="itemRemoved( $event )"
                >
                </nrcl-tag-list>
            `
        }
    }
}

export const Empty: StoryObj<TagListComponent & { displayMode: DisplayMode, itemCount: number }> = {
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
        removable: true,
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
                items: [],
                itemRemoved: ( ev ) => { console.log( ev ) }
            },
            template: `
                <nrcl-tag-list
                    [items]="items"
                    [removable]="removable"
                    (itemRemoved)="itemRemoved( $event )"
                >
                </nrcl-tag-list>
            `
        }
    }
}

export const Template: StoryObj<TagListComponent & { displayMode: DisplayMode, itemCount: number }> = {
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
        removable: true,
    },
    render: ( args ) => {
        return {
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }

                .nrcl-tag-list {
                    .mat-mdc-standard-chip {
                        --mat-chip-container-height: auto;
                    }
                }
            `],
            props: {
                ...args,
                items: makeTagItems( args.itemCount ).map( (i,j) => { return { ...i, extra: 'item #' + j } } ),
                itemRemoved: ( ev ) => { console.log( ev ) }
            },
            template: `
                <nrcl-tag-list
                    [items]="items"
                    [removable]="removable"
                    (itemRemoved)="itemRemoved( $event )"
                    [tagTemplate]="tag"
                >
                </nrcl-tag-list>

                <ng-template #tag let-item>
                    description: {{ item.description }}
                    <h2>extra: {{ item.extra }}</h2>
                </ng-template>
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