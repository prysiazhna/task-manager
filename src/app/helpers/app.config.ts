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

export const TaskTableColumns: string[] = ['title', 'description', 'dueDate', 'status', 'priority', 'actions'];

