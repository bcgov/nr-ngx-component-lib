import { ChangeDetectorRef, Directive, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogComponent } from "../components/dialog/dialog.component";
import { NrclBase } from "./nrcl.base";

export type DialogBaseResult<R> = R | 'cancel'

@Directive()
export class DialogBase<CONFIG, RESULT = any> extends NrclBase {
    dialogRef = inject( MatDialogRef<DialogComponent,DialogBaseResult<RESULT>> )
    changeDetectorRef = inject( ChangeDetectorRef )

    // title: string

    private _isLoading = false
    get isLoading() { return this._isLoading }
    set isLoading( v: boolean ) { 
        // if ( this._isLoading == v ) return
        this._isLoading = v
        // this.changeDetectorRef.detectChanges()
    }
    
    saveLabel = 'Save'

    private _saveEnabled = false
    get saveEnabled() { return this._saveEnabled }
    set saveEnabled( v: boolean ) { this._saveEnabled = v }

    cancelLabel = 'Cancel'

    private _cancelEnabled = false
    get cancelEnabled() { return this._cancelEnabled }
    set cancelEnabled( v: boolean ) { this._cancelEnabled = v }

    config: CONFIG = inject( MAT_DIALOG_DATA )
    // result: RESULT
    
    getResult(): RESULT {
        return null
    }

    onSaveClick() {
        // this.ok( null )
        this.dialogRef.close( this.getResult() )
    }

    onCancelClick() {
        this.dialogRef.close( 'cancel' )
        // this.cancel()
    }
    
    // ok( result: RESULT ): void {
    //     this.dialogRef.close( result )
    // }

    // cancel(){
    //     this.dialogRef.close( 'cancel' )
    // }
}
