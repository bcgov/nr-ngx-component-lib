import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
    title: 'Icon',
    component: IconComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
                MatIconModule
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
        // componentWrapperDecorator( 
        //     ( story ) => {
        //         return `
        //             <ng-container *rerender="width + tooltip">
        //                 <div class="component-container-inline">
        //                     ${ story }
        //                 </div>
        //             </ng-container>
        //         `
        //     }
        // ),        
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
                `
            },
            source: {
                excludeDecorators: true
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<IconComponent & { color: string }> = {
    parameters: {
        docs: {
            description: {
                story: `
                `
            }
        }
    },    
    argTypes: {
        color: { control: { type: 'color' } },
    },
    args: {
        color: 'black'
    },
    render: ( args ) => {
        console.log(args.color)
        return {
            props: args,
            styles: [`
                :host {
                    font-family: var( --nrcl-font-family );
                    font-size: var( --nrcl-font-size );

                    section {
                        display: flex;
                        flex-direction: row-wrap;
                        gap: 20px;
                        position: relative;
                        margin-top: 30px;

                        .item {
                            display: flex;
                            flex-direction: row;
                            gap: 10px;

                            label {
                                position: absolute;
                                top: -20px;
                            }

                            .nrcl-icon {
                                color: ${ args.color }
                            }
                        }
                    }
                }
            `],
            template: `
                <h3>NRCL Icons</h3>
                
                <section>
                    <div class="item">
                        <label>clear-filter</label>
                        <nrcl-icon small>clear-filters</nrcl-icon> 
                        <nrcl-icon>clear-filters</nrcl-icon> 
                        <nrcl-icon large>clear-filters</nrcl-icon> 
                    </div>
                </section>

                <h3>Material Icons</h3>

                <section>
                    <div class="item">
                        <label>remove</label>
                        <nrcl-icon small>remove</nrcl-icon> 
                        <nrcl-icon>remove</nrcl-icon> 
                        <nrcl-icon large>remove</nrcl-icon> 
                    </div>

                    <div class="item">
                        <label>add</label>
                        <nrcl-icon small>add</nrcl-icon> 
                        <nrcl-icon>add</nrcl-icon> 
                        <nrcl-icon large>add</nrcl-icon> 
                    </div>

                    <div class="item">
                        <label>expand_less</label>
                        <nrcl-icon small>expand_less</nrcl-icon> 
                        <nrcl-icon>expand_less</nrcl-icon> 
                        <nrcl-icon large>expand_less</nrcl-icon> 
                    </div>

                    <div class="item">
                        <label>expand_more</label>
                        <nrcl-icon small>expand_more</nrcl-icon> 
                        <nrcl-icon>expand_more</nrcl-icon> 
                        <nrcl-icon large>expand_more</nrcl-icon> 
                    </div>
            </section>
            `
        }
    }
}
