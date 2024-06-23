import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';
import { SharedModule } from '../shared/shared.module';
import {TaskTableComponent} from "./task-table/task-table.component";
import {TaskFilterFormComponent} from "./task-filter-form/task-filter-form.component";

const components = [NavbarComponent, TaskFilterFormComponent, TaskTableComponent, TaskFormComponent];
@NgModule({
  declarations: [...components],
  imports: [SharedModule],
  exports: [...components],
})
export class ComponentsModule {}
