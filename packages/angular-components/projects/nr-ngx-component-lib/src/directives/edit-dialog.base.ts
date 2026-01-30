import { AfterViewInit, ChangeDetectorRef, Directive, inject, Injectable, Injector, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export type BaseEditDialogResult<R> = R | 'cancel'

@Directive()
export class EditDialogBase<CONFIG, RESULT = any> implements OnInit, AfterViewInit {
    title: string
    
    saveLabel = 'Save'

    private _saveEnabled = false
    get saveEnabled() { return this._saveEnabled }
    set saveEnabled( v: boolean ) { this._saveEnabled = v }

    // get isLocalSaving() { return this.saveEnabled }
    // set isLocalSaving( v: boolean ) { this.saveEnabled = v }

    cancelLabel = 'Cancel'

    // private _loadState: LoadState
    // get loadState() { return this._loadState }
    // set loadState( v: LoadState ) { 
    //     this._loadState = v
    //     if ( !v ) return
    //     this.isLoading = this.loadState.isLoading
    // }

    private _isLoading = false
    get isLoading() { return this._isLoading }
    set isLoading( v: boolean ) { 
        if ( this._isLoading == v ) return
        this._isLoading = v
        this.changeDetectorRef.detectChanges()
    }

    // errorState: ErrorState[]
    result: RESULT
    // mobile: boolean

    data: CONFIG = inject( MAT_DIALOG_DATA )
    
    dialogRef = inject( MatDialogRef<EditDialogComponent,BaseEditDialogResult<RESULT>> )
    // applicationStateService = inject( ApplicationStateService )
    changeDetectorRef = inject( ChangeDetectorRef )
    
    // constructor() {
    //     this.mobile = this.applicationStateService.getIsMobileResolution();
    // }
    
    ngOnInit(): void {
    }

    ngAfterViewInit() {
        // addRemoveCdkOverlayClass(this.mobile)
    }

    onSaveClick() {
        this.ok()
    }

    onCancelClick() {
        this.cancel()
    }
    
    ok(): void {
        this.dialogRef.close( this.result )
    }

    cancel(){
        this.dialogRef.close( 'cancel' )
    }
}
