import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { TasksAddComponent } from './tasks-add/tasks-add.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksGridComponent } from './tasks/tasks-grid/tasks-grid.component';
import { TasksComponent } from './tasks/tasks.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TasksComponent,
    TasksGridComponent,
    NavbarComponent,
    DashboardComponent,
    TasksAddComponent
  ],
  exports: [
    TasksComponent,
    TasksGridComponent,
    NavbarComponent,
    DashboardComponent,
    TasksAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    RouterModule 
  ]
})
export class ComponentsModule { }