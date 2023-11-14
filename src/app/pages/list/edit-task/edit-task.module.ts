import { NgModule } from '@angular/core';
import { EditTaskRoutingModule } from './edit-task-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { EditTaskComponent } from './edit-task.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [EditTaskRoutingModule, ComponentsModule, SharedModule],
  declarations: [EditTaskComponent],
})
export class EditTaskModule {}
