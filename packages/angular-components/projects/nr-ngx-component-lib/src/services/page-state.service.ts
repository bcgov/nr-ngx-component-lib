import { Injectable } from "@angular/core";

type StateContainer = {
    label: string
    state: any
}

@Injectable( {
    providedIn: "root"
} )
export class PageStateService {
    private readonly classRegistry = new WeakMap<Function, StateContainer>();

    constructor() {
    }

    getPageState<S>( classConstructor: Function, defaultState: S, label?: string ): S {
        if ( this.classRegistry.has( classConstructor ) ) {
            let sc = this.classRegistry.get( classConstructor )
            return sc.state
        }

        this.setPageState( classConstructor, defaultState, label )
        return defaultState
    }

    setPageState<S>( classConstructor: Function, state: S, label?: string ) {
        let sc: StateContainer = { label, state }
        this.classRegistry.set( classConstructor, sc )
    }
}
