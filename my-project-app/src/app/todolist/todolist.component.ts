import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor,NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass,ButtonModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class AppComponent {
  private router = inject(Router);
  todoList: TodoItem[] = [];
  newTask: string = '';


  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false
      };
      this.todoList.push(newTodoItem);
      this.newTask = '';
    }
  }
  toggleCompleted(index: number): void {
    this.todoList[index].completed = !this.todoList[index].completed;
    console.log(this.todoList);
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    console.log(this.todoList);
  }
  
}
 

 
  