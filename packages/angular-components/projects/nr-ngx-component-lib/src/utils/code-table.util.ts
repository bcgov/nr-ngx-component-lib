export type CodeDescription = {
    code: string
    description: string
}

export class CodeTable {
    constructor( 
        // private _items: ( CodeDescription | CodeData | Option )[], 
        private _items: ( CodeDescription )[], 
        private _reload?: () => Promise<CodeDescription[]> 
    ) {}

    get items(): readonly CodeDescription[] {
        return this._items
    }

    forCode( code: string ): CodeDescription {
        return this._items.find( o => o.code == code )
    }

    reload(): Promise<void> {
        if ( !this._reload ) return Promise.reject( 'no reload defined' )

        return this._reload()
            .then( res => {
                this._items = res
            } )
    }
}
