import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";

export enum TaskStatus {
  New = 'New',
  Completed = 'Completed',
  InProgress = 'In Progress'
}

export enum TaskPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export const TaskTableColumns: string[] = ['title', 'description', 'dueDateTime', 'status', 'priority', 'actions'];


export const customTheme: NgxMaterialTimepickerTheme = {
  container: {
    bodyBackgroundColor: '#3e0e92',
    buttonColor: '#ffffff'
  },
  dial: {
    dialBackgroundColor: '#673ab6',
  },
  clockFace: {
    clockFaceBackgroundColor: '#3e0e92',
    clockHandColor: '#673ab6',
    clockFaceTimeInactiveColor: '#ffffff'
  }
};
