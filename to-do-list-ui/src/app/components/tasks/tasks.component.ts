import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/TaskService';
import { Tasks } from 'src/app/model/Tasks.model';
import { Router } from '@angular/router';
import { ExportCSVService } from 'src/app/service/export-csv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Tasks[] = [];
  filteredTasks: Tasks[] = [];
  newTasks: Tasks = { id: 0, title: '', description: '', status: 'pendente', createdDate: new Date().toISOString() };
  selectedTask: Tasks | null = null;
  statusFilter: string = '';
  public tasksList: Array<Tasks> = [];
  public listExportCSV = new Array<Tasks>();
  loading = false;

  constructor(private taskService: TaskService,
    private router: Router,
    private exportCsvService: ExportCSVService,) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 500);
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (data: Tasks[]) => {
        this.tasks = data;
        this.sortTasksDescending(); 
        this.filterTasks(); 
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  sortTasksDescending() {
    this.tasks.sort((a, b) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      return 0;
    });
  }

  filterTasks() {
    if (this.statusFilter === '') {
      this.filteredTasks = this.tasks;
    } else {
      this.taskService.filterTasks(this.statusFilter).subscribe(data => {
        this.filteredTasks = data;
      }, error => {
        console.error('Error filtering Tasks:', error);
      });
    }
  }

  addTasks() {
    this.taskService.addTasks(this.newTasks).subscribe(Tasks => {
      this.tasks.push(Tasks);
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
    Swal.fire({
        title: 'Deletar',
        text: "Tem certeza que deseja deletar o registro?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Não!',
        confirmButtonText: 'Sim!'
    }).then((result) => {
        if (result.isConfirmed && this.selectedTask) {
            this.taskService.deleteTasks(this.selectedTask.id).subscribe(() => {
                this.tasks = this.tasks.filter(task => task.id !== this.selectedTask!.id);
                this.selectedTask = null; 
                this.filterTasks();

                Swal.fire(
                    'Deletado!',
                    'Deletado com sucesso.',
                    'success'
                );
            }, error => {
                console.error('Error deleting Tasks:', error);
                Swal.fire(
                    'Erro!',
                    'Não foi possível deletar a tarefa.',
                    'error'
                );
            });
        }
    });
}

  updateTasks() {
      if (this.selectedTask) {
        this.taskService.updateTasks(this.selectedTask.id, this.selectedTask).subscribe(updatedTasks => {
          const index = this.tasks.findIndex(Tasks => Tasks.id === updatedTasks.id);
          this.tasks[index] = updatedTasks;
          this.selectedTask = null;
          this.filterTasks(); 
        }, error => {
          console.error('Error updating Tasks:', error);
        });
      }
    }

    exportCSV() {
      const header: string[] = ['Código', 'Título', 'Descrição', 'Status'];
      const dados: any[] = [];
      this.listExportCSV = this.filteredTasks; 

      this.listExportCSV.forEach((task) => {
          const linha: any[] = [];
          linha.push(task.id); 
          linha.push(task.title ? task.title : '');
          linha.push(task.description ? task.description : '');
          linha.push(task.status ? task.status : '');
          dados.push(linha);
      });

      this.exportCsvService.exportCsv(header, dados, 'lista-tarefas.csv');
  }

}