import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../../services/task.service';

export interface TaskData {
  id: string;
  date: string;
  item: string;
  isComplete: boolean;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  displayedColumns: string[] = ['date', 'item', 'done', 'action'];
  dataSource: MatTableDataSource<TaskData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  taskData = [];
  showLoader;
  createTaskError;
  task;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.showLoader = true;
    this.getTask()
  }

  getTask(){
    this.taskData = [];
    this.taskService.getTasks().subscribe(res => {
      console.log(res);
      res['data'].forEach(task => {
        if(!task.isDelete){
          this.taskData.push({
            id:   task.id,
            date: new Date(task.createdAt._seconds * 1000).toLocaleDateString(),
            item: task.taskTodo,
            isComplete: task.isComplete
          })
        }
      });

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.taskData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showLoader = false;
    }, err => {
      console.log(err);
      this.showLoader = false;
    })
  }

  createTask(){
    this.taskService.createTask({task: this.task}).subscribe(res => {
      console.log(res);
      this.task = '';
      this.getTask()
    }, err => {
      console.log(err);
      this.createTaskError = true;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  taskDone(row){
    this.taskService.updateTask(row.id, {isComplete: true}).subscribe(res => {
      console.log(res);
      this.taskData = this.taskData.filter(task => {
        if(row.id == task.id){
          task.isComplete = true
        }
        return true
      })
      this.dataSource = new MatTableDataSource(this.taskData);
    })

  }

  taskDelete(row){
    this.taskService.updateTask(row.id, {isDelete: true}).subscribe(res => {
      console.log(res);
      this.taskData = this.taskData.filter(task => {
        if(row.id == task.id){
          return false
        }
        return true
      })
      this.dataSource = new MatTableDataSource(this.taskData);
    })
  }
}
