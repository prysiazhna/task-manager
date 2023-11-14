import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { SharedModule } from '../shared/shared.module';

const components = [NavbarComponent, CardComponent, TaskFormComponent];
@NgModule({
  declarations: [...components],
  imports: [SharedModule],
  exports: [...components],
})
export class ComponentsModule {}
