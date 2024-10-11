import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/TaskService';
import { Tasks } from 'src/app/model/Tasks.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  Tasks: Tasks[] = [];
  filteredTasks: Tasks[] = [];
  newTasks: Tasks = { id: 0, title: '', description: '', status: 'pendente', createdDate: new Date().toISOString() };
  selectedTask: Tasks | null = null;
  statusFilter: string = '';

  constructor(private TaskService: TaskService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.TaskService.getTasks().subscribe(data => {
      this.Tasks = data;
      this.filterTasks();
    }, error => {
      console.error('Error loading Tasks:', error);
    });
  }

  filterTasks() {
    if (this.statusFilter === '') {
      this.filteredTasks = this.Tasks;
    } else {
      this.TaskService.filterTasks(this.statusFilter).subscribe(data => {
        this.filteredTasks = data;
      }, error => {
        console.error('Error filtering Tasks:', error);
      });
    }
  }

  addTasks() {
    this.TaskService.addTasks(this.newTasks).subscribe(Tasks => {
      this.Tasks.push(Tasks);
      this.newTasks = { id: 0, title: '', description: '', status: 'pendente', createdDate: new Date().toISOString() };
      this.filterTasks(); 
    }, error => {
      console.error('Error adding Tasks:', error);
    });
  }

  selectTask(Tasks: Tasks) {
    this.selectedTask = { ...Tasks }; 
  }

  deleteSelectedTask() {
    if (this.selectedTask) {
      this.TaskService.deleteTasks(this.selectedTask.id).subscribe(() => {
        this.Tasks = this.Tasks.filter(Tasks => Tasks.id !== this.selectedTask!.id);
        this.selectedTask = null; 
        this.filterTasks();
      }, error => {
        console.error('Error deleting Tasks:', error);
      });
    }
  }

  updateTasks() {
    if (this.selectedTask) {
      this.TaskService.updateTasks(this.selectedTask.id, this.selectedTask).subscribe(updatedTasks => {
        const index = this.Tasks.findIndex(Tasks => Tasks.id === updatedTasks.id);
        this.Tasks[index] = updatedTasks;
        this.selectedTask = null;
        this.filterTasks(); 
      }, error => {
        console.error('Error updating Tasks:', error);
      });
    }
  }
}