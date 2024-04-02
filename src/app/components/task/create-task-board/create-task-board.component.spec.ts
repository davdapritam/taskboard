import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskBoardComponent } from './create-task-board.component';

describe('CreateTaskBoardComponent', () => {
  let component: CreateTaskBoardComponent;
  let fixture: ComponentFixture<CreateTaskBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaskBoardComponent]
    });
    fixture = TestBed.createComponent(CreateTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
