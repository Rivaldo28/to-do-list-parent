import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Importação do catchError
import { Tasks } from '../model/Tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.apiUrl).pipe(
      catchError(this.handleError) 
    );
  }

  addTasks(tasks: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(this.apiUrl, tasks).pipe(
      catchError(this.handleError) 
    );
  }

  updateTasks(id: number, tasks: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.apiUrl}/${id}`, tasks).pipe(
      catchError(this.handleError) 
    );
  }

  getTasksById(id: number): Observable<Tasks> {
    return this.http.get<Tasks>(`${this.apiUrl}/edit/${id}`).pipe(
      catchError(this.handleError) 
    );
}

  deleteTasks(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) 
    );
  }

  filterTasks(status: string): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.apiUrl}/filter?status=${status}`).pipe(
      catchError(this.handleError) 
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Aqui você pode personalizar a mensagem de erro
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // Erro do lado do servidor
      console.error(`Código de erro do servidor: ${error.status}, corpo da resposta: ${error.error}`);
    }
    return throwError('Algo deu errado; por favor, tente novamente mais tarde.');
  }
}