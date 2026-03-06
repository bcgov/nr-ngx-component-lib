import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent, SnackbarConfig } from "../components/snackbar/snackbar.component";

@Injectable({
    providedIn: 'root'
})
export class SnackbarUtilService {
    snackbar = inject( MatSnackBar )

    successful( message: string, duration = 5000 ) {
        this.snackbar.openFromComponent<SnackbarComponent,SnackbarConfig>(
            SnackbarComponent, 
            {
                duration: duration,
                data: {
                    type: 'success',
                    message: message
                }
            }
        )
    }

    successfullySaved( item: string, duration = 5000 ) {
        this.successful( `${ item } saved successfully.`, duration )
    }

    successfullyDeleted( item: string, duration = 5000 ) {
        this.successful( `${ item } deleted successfully.`, duration )
    }

    successfullyRemoved( item: string, duration = 5000 ) {
        this.successful( `${ item } removed successfully.`, duration )
    }

    successfullyCreated( item: string, duration = 5000 ) {
        this.successful( `${ item } created successfully.`, duration )
    }

    successfullyAdded( item: string, duration = 5000 ) {
        this.successful( `${ item } added successfully.`, duration )
    }

    information( message: string, duration = null ) {
        this.snackbar.openFromComponent<SnackbarComponent,SnackbarConfig>(
            SnackbarComponent, 
            {
                duration: duration,
                data: {
                    type: 'info',
                    message: message
                }
            }
        )
    }

    error( message: string, duration = null ) {
        this.snackbar.openFromComponent<SnackbarComponent,SnackbarConfig>(
            SnackbarComponent, 
            {
                duration: duration,
                data: {
                    type: 'error',
                    message: message
                }
            }
        )
    }

    updated( message: string, duration = null ) {
        this.snackbar.openFromComponent<SnackbarComponent,SnackbarConfig>(
            SnackbarComponent, 
            {
                duration: duration,
                data: {
                    type: 'update',
                    message: message
                }
            }
        )
    }
}
