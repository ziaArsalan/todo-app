import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../../services/task.service';

export interface TaskData {
  date: string;
  item: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  displayedColumns: string[] = ['check', 'date', 'item', 'action'];
  dataSource: MatTableDataSource<TaskData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  taskData = [];

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getTask()
  }

  getTask(){
    this.taskService.getTasks().subscribe(res => {
      console.log(res);
      res['data'].forEach(task => {
        this.taskData.push({
          date: new Date(task.createdAt._seconds * 1000).toLocaleDateString(),
          item: task.taskTodo,
        })
      });

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.taskData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, err => {
      console.log(err);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
