import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TasksGridComponent } from './components/tasks/tasks-grid/tasks-grid.component';
import { TasksComponent } from './components/tasks/tasks.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; 

import { TaskService } from './service/TaskService';
import { ChartsModule } from 'ng2-charts';
import { TasksAddComponent } from './components/tasks-add/tasks-add.component';


const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, 
  { path: 'tasks', component: TasksComponent },
  { path: 'edit/:id', component: TasksAddComponent },
  { path: 'add', component: TasksAddComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TasksGridComponent,
    TasksAddComponent,
    NavbarComponent,
    DashboardComponent
  ],
  exports: [
    TasksComponent,
    TasksGridComponent,
    TasksAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ChartsModule
  ],
  providers: [
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
