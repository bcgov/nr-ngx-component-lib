import { Injectable } from "@angular/core";

@Injectable( {
    providedIn: "root"
} )
export class PageStateService {
    private readonly _referenceRegistry = new WeakMap<Function, string>();
    private _nextId = 1;
    private readonly _pageState: { [ key: string ]: string } = {}

    getFunctionRef( func: Function, label?: string ): string {
        if ( this._referenceRegistry.has( func ) )
            return this._referenceRegistry.get( func )!

        const uniqueId = `${ label || 'func-ref' }-${ this._nextId++ }`
        this._referenceRegistry.set( func, uniqueId )

        return uniqueId
    }

    getPageState( id: string ): string|undefined {
        if ( id in this._pageState )
            return this._pageState[ id ]
    }

    setPageState( id: string, state: string ) {
        this._pageState[ id ] = state
        console.log('setPageState',id,this._pageState)
    }

    deletePageState( id: string ) {
        delete this._pageState[ id ]
    }
}

