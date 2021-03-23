import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as nearest from 'nearest-date';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
    title = 'todo';
    newTodo: string;
    newTodoDate : any;
    todos: any = [];
    todoAlert:any=[];
    todoObj: any;
    editing = false;
    editTodo:string;
    editTodoDate : any;
    editIndex;
    selectedAdd = true;
    selectedList = false;
    pinned:boolean = false;
    nearestTodo:string;
    minDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    constructor(public datepipe: DatePipe) {
    }

    ngOnInit(){
      this.newTodo = '';
      this.newTodoDate =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
          if(!!localStorage.getItem('todos')){
      this.todos = JSON.parse(localStorage.getItem('todos'));
      this.pinned = JSON.parse(localStorage.getItem('pinned'));
      }
      if(this.todos){
        this.getTheNearest();
      }
    }

    ngOnDestroy(){
      localStorage.clear();
    }

    getTheNearest(){
      let dates = [];
      let target = new Date();
      this.todos.forEach(element => {
        dates.push(new Date(element.newTodoDate));
      });
      let index = nearest(dates, target);
      this.nearestTodo = this.todos[index].newTodo;
      alert(this.nearestTodo + ' todo is nearing the deadline');
    }

    addTodo(event) {
      this.todoObj = {
        newTodo: this.newTodo,
        newTodoDate:this.newTodoDate,
        completed : false
      }
      this.todos.push(this.todoObj);
      this.newTodo = '';
      this.newTodoDate =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      event.preventDefault();
      localStorage.setItem('todos',JSON.stringify(this.todos));
    }

    deleteTodo(index) {
      this.todos.splice(index, 1);
      localStorage.setItem('todos',JSON.stringify(this.todos)); 
    }

    getUpdateTodo(index){
      this.editTodo = this.todos[index].newTodo;
      this.editTodoDate = this.todos[index].newTodoDate;
      this.editIndex = index;
    }

    deleteSelectedTodos() {
      for(var i=(this.todos.length -1); i > -1; i--) {
        if(this.todos[i].completed) {
          this.todos.splice(i, 1);
        }
      }
      localStorage.setItem('todos',JSON.stringify(this.todos));  
    }

    updateTodo(){
      this.todos[this.editIndex].newTodo = this.editTodo;
      this.todos[this.editIndex].newTodoDate = this.editTodoDate;
      this.editTodo='';
      this.editing = false;
      localStorage.setItem('todos',JSON.stringify(this.todos)); 
    }

    markAsDone(){
       localStorage.setItem('todos',JSON.stringify(this.todos));
    }

    pinToTop(todo,index){
        this.pinned = true;
        this.todos.splice(index,1);
        this.todos.unshift(todo);
        localStorage.setItem('todos',JSON.stringify(this.todos));
        localStorage.setItem('pinned','true');
    }

    popUpAdded() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
  }

  


