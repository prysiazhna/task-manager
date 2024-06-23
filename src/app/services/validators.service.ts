import {AbstractControl} from "@angular/forms";
import {combineDateAndTime} from "../helpers/date-time-format.helper";
import {isBefore} from "date-fns";

export function validateTime(control: AbstractControl): { [key: string]: boolean } | null {
  const dueDate = control.root.get('dueDate')?.value;
  const dueTime = control.value;
  if (dueDate && dueTime) {
    const dueDateTime = combineDateAndTime(dueDate, dueTime);
    if (isBefore(new Date(dueDateTime), new Date())) {
      return { invalidTime: true };
    }
  }
  return null;
}
