import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TasksAddComponent } from './tasks-add.component';
import { ToastrService } from 'ngx-toastr';

class MockToastrService {
  success() {}
  error() {}
  info() {}
  warning() {}
}

describe('TasksAddComponent', () => {
  let component: TasksAddComponent;
  let fixture: ComponentFixture<TasksAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [TasksAddComponent],
      providers: [
        { provide: ToastrService, useClass: MockToastrService } // Adiciona o mock do ToastrService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
