import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem {
  id:number;
  task:string;
  completed:boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,NgFor,NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todolist:TodoItem [] = [];
  newTask:string = '';

  ngOnInit():void {
    this.loadTasks();
  }

  addTask():void {
    if(this.newTask.trim() !== ''){

      const newTodoItem:TodoItem = {
        id:Date.now(),
        task:this.newTask,
        completed:false
      }

      //console.log(this.todolist)

      this.todolist.push(newTodoItem)
      this.newTask = ''
      this.saveTasks();
    }
  }

  toggleComplted(index:number):void {
    this.todolist[index].completed =!this.todolist[index].completed
    console.log(this.todolist);
    this.saveTasks();
  }

  deleteTask(id:number):void {
    this.todolist = this.todolist.filter(item => item.id != id)
    console.log(this.todolist)
    this.saveTasks();
  }

  saveTasks():void {
    localStorage.setItem('todolist', JSON.stringify(this.todolist))
  }

  loadTasks():void {
    const savedTasks = localStorage.getItem('todolist')
    if(savedTasks){
      this.todolist = JSON.parse(savedTasks)
    }
  }

}
