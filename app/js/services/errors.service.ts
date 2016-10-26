'use strict';

import {Injectable} from '@angular/core';

@Injectable()

export class ErrorsService {
    public getErrorMessage(errorType: any, typeValue?: number): Promise <string[]> {

        let messagesList: any = {
                'required'  : 'Field required',
                'minlength' : 'Field invalid min length : required ' + typeValue,
                'maxlength' : 'Field invalid max length : required ' + typeValue
            },
            error: string[] = messagesList[errorType];

        return Promise.resolve(error);
    }
}
