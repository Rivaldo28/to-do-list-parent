import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/TaskService';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  chartData: number[] = [];
  chartLabels: string[] = ['Pendente', 'Realizado', 'Em Andamento'];

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  
  tasks: any[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: any[]) => {
        this.tasks = data;
        this.loadChartData();
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao carregar tarefas:', error);
        this.loading = false; // Mantenha a loading state
      }
    );
  }

  loadChartData(): void {
    const pendingTasks = this.tasks.filter(task => task.status === 'pendente').length;
    const completedTasks = this.tasks.filter(task => task.status === 'realizado').length;
    const ongoingTasks = this.tasks.filter(task => task.status === 'em andamento').length;

    this.chartData = [pendingTasks, completedTasks, ongoingTasks];
  }
}