'use strict';

import {Component, Input, OnChanges}    from '@angular/core';
import {ErrorsService}                  from '../services/errors.service';

@Component({
    selector        : 'from-errors',
    templateUrl     : 'app/html/formerrors.html',
    providers       : [ErrorsService]
})

export class FormErrorsValidation implements OnChanges {
    @Input() inputErrors: any;
    @Input() inputPristine: any;
    message: any;
    errorservice: any;

    constructor(formError: ErrorsService) {
        this.errorservice = formError;
    }

    ngOnChanges(changes: any): void {
        let errorMessage: any,
            errorValue: number = null;

        if (this.inputErrors && !this.inputPristine) {
            errorMessage = Object.keys(this.inputErrors);

            if (this.inputErrors[errorMessage[0]]) {
                errorValue = this.inputErrors[errorMessage[0]].requiredLength;
            }

            if (errorMessage) {
                this.errorservice.getErrorMessage(errorMessage, errorValue)
                    .then((message: any) => this.message = message, (err: any) => {
                        console.log(err);
                    });
            }
            return;
        }
        this.message = '';
    }

}
