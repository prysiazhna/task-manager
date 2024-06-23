import {addHours, addMinutes} from "date-fns";

export const combineDateAndTime = (date: string, time: string): Date => {
  const parsedDueDate = new Date(date).toUTCString();
  const timeParts = time.match(/(\d+):(\d+) (\w+)/);

  if (!timeParts) {
    throw new Error('Invalid time format');
  }

  const [ , hoursString, minutesString, period] = timeParts;
  let hours = parseInt(hoursString);
  const minutes = parseInt(minutesString);

  hours = period === "PM" && hours < 12 ? hours + 12 : period === "AM" && hours === 12 ? 0 : hours;

  return addMinutes(addHours(parsedDueDate, hours), minutes);
}

