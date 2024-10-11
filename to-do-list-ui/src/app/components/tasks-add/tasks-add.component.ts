import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from 'src/app/service/TaskService';
import { Tasks } from 'src/app/model/Tasks.model';

@Component({
  selector: 'app-tasks-add',
  templateUrl: './tasks-add.component.html',
  styleUrls: ['./tasks-add.component.css']
})
export class TasksAddComponent implements OnInit {
  newTask: Tasks = { id: 0, title: '', description: '', status: 'pendente', 
    createdDate: new Date().toISOString() };
  isEditMode: boolean = false;
  errorMessage: string = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.isEditMode = true;
      this.getTasksData(+id); 
    }
  }

  getTasksData(id: number): void {
    this.taskService.getTasksById(id).subscribe(Tasks => {
      this.newTask = { ...Tasks };
      console.log('Tarefa carregada para edição:', this.newTask);
    }, error => {
      this.errorMessage = error; 
      console.error('Error loading Tasks:', error);
    });
  }

  addTask(): void {
    console.log('Dados da tarefa antes de enviar:', this.newTask);

    if (this.isEditMode) {
      this.taskService.updateTasks(this.newTask.id, this.newTask).subscribe(updatedTasks => {
        console.log('Tarefa atualizada com sucesso:', updatedTasks);
      }, error => {
        this.errorMessage = error; 
        console.error('Error updating Tasks:', error);
      });
    } else {
      this.taskService.addTasks(this.newTask).subscribe(() => {
        this.newTask = { id: 0, title: '', description: '', status: 'pendente', createdDate: new Date().toISOString() };
      }, error => {
        this.errorMessage = error;
        console.error('Error adding Tasks:', error);
      });
    }
  }
}