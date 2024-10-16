import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { TaskService } from './service/TaskService';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ComponentsModule,
    ToastrModule.forRoot(),
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }