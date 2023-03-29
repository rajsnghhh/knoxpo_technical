import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {

    constructor() { }

    onlyAlphabetsIntegersAndSpace(event: any) {
        const charCode = event.keyCode;
        if ((charCode >= 65 && charCode <= 90) ||
            (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || charCode == 32) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

}
