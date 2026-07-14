import { Injectable } from "@angular/core";

@Injectable( {
    providedIn: "root"
} )
export class PageStateService {
    private readonly _pageState: { [ key: string ]: string } = {}

    getPageState( id: string ): string|undefined {
        if ( id in this._pageState )
            return this._pageState[ id ]
    }

    setPageState( id: string, state: string ) {
        this._pageState[ id ] = state
    }

    deletePageState( id: string ) {
        delete this._pageState[ id ]
    }
}

