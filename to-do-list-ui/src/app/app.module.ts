import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TasksGridComponent } from './components/tasks/tasks-grid/tasks-grid.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksAddComponent } from './components/tasks-add/tasks-add.component';
import { TaskService } from './service/TaskService';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, 
  { path: 'tasks', component: TasksComponent },
  { path: 'edit/:id', component: TasksAddComponent },
  { path: 'add', component: TasksAddComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TasksGridComponent,
    TasksAddComponent
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
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
