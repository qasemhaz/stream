import { AbstractControl } from "@angular/forms";

export function passwordMatch(newPassword:string, repeat:string){
  return function(form:AbstractControl){
    const newValue = form.get(newPassword)?.value;
    const repeatValue = form.get(repeat)?.value;
    if(newValue == repeatValue){
      return null;
    }
    return {PasswordNotMatch:true}
  }
}
