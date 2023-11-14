import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'create-task',
    loadChildren: () =>
      import('./create-task/create-task.module').then(m => m.CreateTaskModule),
  },
  {
    path: 'edit-task/:id',
    loadChildren: () =>
      import('./edit-task/edit-task.module').then(m => m.EditTaskModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
