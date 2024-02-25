import { Component, inject, ViewChild } from '@angular/core';
import { TodosComponent } from '../todos/todos.component';
import { ManageService } from '../manage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [TodosComponent, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent  {
  @ViewChild(TodosComponent) todosComponent!: TodosComponent;
  sno: number= 0;
  managetodo: ManageService = inject(ManageService);

  addForm = new FormGroup({
    title: new FormControl(''),
    desc: new FormControl('')
  });

  addTodo() {
    const Tcount = localStorage.getItem('Tcount');
    this.sno = 0;
    if(Tcount) this.sno = parseInt(Tcount);

    const todo = {
      sno: ++this.sno,
      title: this.addForm.value.title ?? '',
      desc: this.addForm.value.desc ?? '',
      active: true
    }

    let todos = this.managetodo.getAllTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('Tcount', `${this.sno}`);
    this.todosComponent.updateList();
    this.addForm.reset();
  }
}
