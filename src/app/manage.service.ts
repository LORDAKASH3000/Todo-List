import { Injectable } from '@angular/core';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor() { }

  getAllTodos(): Todo[] {
    let lS = localStorage.getItem("todos");
    if (lS) {
      return JSON.parse(lS);
    }return []
  }

  getHousingLocationById(todo: Todo): Todo | undefined {
    let lS = localStorage.getItem("todos");
    if (lS) {
      let todos = JSON.parse(lS);
      return todos[todos.findIndex((item: Todo) => item.sno === todo.sno)];
    }return undefined
  }
}
