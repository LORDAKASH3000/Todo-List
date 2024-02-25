import { Component, inject } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../todo.interface';
import { ManageService } from '../manage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoComponent, CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos: Todo[] = [];
  managetodo: ManageService = inject(ManageService);
  filteredTodoList: Todo[] = [];
  constructor(){
    this.todos = this.managetodo.getAllTodos()
    this.filteredTodoList = this.todos;
  }

  public updateList(): void {
    this.todos = this.managetodo.getAllTodos();
    this.filteredTodoList = this.todos;
  }

  filterResults(value: string): void {
    if(!value) this.filteredTodoList = this.todos;
    this.filteredTodoList = this.todos.filter(
      todo => todo?.title.toLowerCase().includes(value.toLowerCase())
    )
  }
}
