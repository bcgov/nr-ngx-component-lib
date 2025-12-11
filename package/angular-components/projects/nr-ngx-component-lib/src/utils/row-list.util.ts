import { Observable } from "rxjs";

export class Aborted {
    constructor( public reason: string ) {}
}

export class ObservableAborter<T> {
    private _promise: Promise<T>
    private _abort: () => void
    private _aborted: boolean

    constructor( 
        private observable: () => Observable<T>,
        private delay: number = 500
    ) {
        this._promise = new Promise( ( res, rej ) => {
            let timer = setTimeout(() => {
                let sub = this.observable().subscribe( {
                    next: res,
                    error: rej
                } )

                this._abort = () => {
                    sub.unsubscribe()
                    rej( new Aborted( 'aborted request' ) )
                    this._abort = null
                }
            }, this.delay);

            this._abort = () => {
                clearTimeout( timer )
                rej( new Aborted( 'aborted timer' ) ) 
                this._abort = null
            }
        } )
    }

    abort() {
        if ( this._aborted ) return
        this._aborted = true
        if ( !this._abort ) return
        this._abort()
    }

    get aborted(): boolean {
        return this._aborted
    }

    get promise(): Promise<T> {
        return this._promise
    }
}
