import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";

@Directive( {
    selector: '[rerender]'
} )
export class RerenderDirective {
    private _previous

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}    

    // if detects changes of the input `val`, clear and rerender the view
    @Input() set rerender( val ) {
        let vj = JSON.stringify(val)
        if ( !this._previous || vj != this._previous ) {
            // console.log(vj)
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView( this.templateRef );
            this._previous = vj
        }
    }
}

