import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tasks } from 'src/app/model/Tasks.model';

@Component({
  selector: 'app-tasks-grid',
  templateUrl: './tasks-grid.component.html',
  styleUrls: ['./tasks-grid.component.css']
})
export class TasksGridComponent implements OnInit {
  @Input() tasks: Tasks[] = []; 
  @Output() selectTask = new EventEmitter<Tasks>(); 

  onSelectTask(tasks: Tasks) {
    this.selectTask.emit(tasks);
  }
  
  constructor() { }

  ngOnInit(): void {
  }



}
