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

    successfullySaved( message: string, duration = 5000 ) {
        this.successful( `${ message } saved successfully.`, duration )
    }

    successfullyDeleted( message: string, duration = 5000 ) {
        this.successful( `${ message } deleted successfully.`, duration )
    }

    successfullyRemoved( message: string, duration = 5000 ) {
        this.successful( `${ message } removed successfully.`, duration )
    }

    successfullyCreated( message: string, duration = 5000 ) {
        this.successful( `${ message } created successfully.`, duration )
    }

    successfullyAdded( message: string, duration = 5000 ) {
        this.successful( `${ message } added successfully.`, duration )
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
