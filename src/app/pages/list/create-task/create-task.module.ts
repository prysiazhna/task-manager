import { NgModule } from '@angular/core';
import { CreateTaskRoutingModule } from './create-task-routing.module';
import { CreateTaskComponent } from './create-task.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CreateTaskRoutingModule, ComponentsModule, SharedModule],
  declarations: [CreateTaskComponent],
})
export class CreateTaskModule {}
