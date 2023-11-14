import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [ListRoutingModule, ComponentsModule, SharedModule],
  declarations: [ListComponent],
})
export class ListModule {}
