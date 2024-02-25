import { Component, Input, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todo.interface';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Output() UTodo: EventEmitter<void> = new EventEmitter();
  managetodo: ManageService = inject(ManageService);

  deleteTodo(todo: Todo): void {
    let todos = this.managetodo.getAllTodos();
    todos.splice(todos.findIndex((item: Todo) => item.sno === todo.sno), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.UTodo.emit();
  }

  markasdone(): void {
    let todos = this.managetodo.getAllTodos();
    todos[todos.findIndex((item: Todo) => item.sno === this.todo.sno)].active = !todos[todos.findIndex((item: Todo) => item.sno === this.todo.sno)].active;
    localStorage.setItem('todos', JSON.stringify(todos));
    this.UTodo.emit()
  }
}
