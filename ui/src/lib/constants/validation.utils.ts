import { AbstractControl, ValidatorFn } from "@angular/forms";

export type ValidationType =
  | 'numeric'
  | 'alphanumeric'
  | 'alphabetic'
  | 'alphanumericwhithspaces'
  | 'expresionregularemails'
  | 'latinName'
  | 'any'
  | 'address'
  | 'phonenumber'
  | 'password';

export const VALIDATION_REGEX_MAP: { [key in ValidationType]: RegExp } = {
  numeric: /^[0-9][0-9]*$/,
  alphanumeric: /^[A-Za-zñÑ0-9ÁÉÍÓÚÜáéíóúü\s]*$/,
  alphabetic: /^[A-Za-zñÑÁÉÍÓÚÜáéíóúü\s]+$/,
  alphanumericwhithspaces: /^[A-Za-zñÑ0-9ÁÉÍÓÚÜáéíóúü]*$/,
  expresionregularemails: /^[A-Za-zñÑ0-9ÁÉÍÓÚÜáéíóúü@\-_.\s]*$/,
  latinName: /^[A-Za-zñÑÁÉÍÓÚÜáéíóúü]+(?:\s[A-Za-zñÑÁÉÍÓÚÜáéíóúü]+)*$/,
  any: /^.*$/,
  address: /^[A-Za-zñÑ0-9ÁÉÍÓÚÜáéíóúü #,.-]*$/,
  phonenumber: /^[0-9 +()-]*$/,
  password: /^[A-Za-zñÑ0-9ÁÉÍÓÚÜáéíóúü#$%./()=?+\-*]*$/,
};

// Factory function para generar validadores basados en ValidationType
export function createValidator(type: ValidationType): ValidatorFn {
  const regex = VALIDATION_REGEX_MAP[type];

  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!regex.test(control.value)) {
      return { 'validationError': { type, value: control.value } };
    }
    return null;
  };
}

export function regexValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = regex.test(control.value);
    return forbidden ? {'forbiddenValue': {value: control.value}} : null;
  };
}
