import {FormGroup} from "@angular/forms";

export function passwordMatchValidator(fG: FormGroup) {
  return fG.get('password').value === fG.get('confirmPassword').value ?
    null : {'mismatch': true}
}
