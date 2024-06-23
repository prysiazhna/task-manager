import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Task} from 'src/app/models/task';
import {TaskService} from "../../services/task.service";
import {TaskFilterService} from "../../services/filter.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {TaskTableColumns} from "../../helpers/app.config";

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnChanges, AfterViewInit {
  @Input() tasks: Task[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = TaskTableColumns;
  public dataSource = new MatTableDataSource(this.tasks);
  public dateRange: FormGroup;

  public filterValues: any = this.getFilterInitValue();

  constructor(
    public taskService: TaskService,
    private changeDetector: ChangeDetectorRef,
    private fb: FormBuilder,
    private filterService: TaskFilterService) {
    this.initTable();
  }

  ngOnChanges(): void {
    this.dataSource.data = this.tasks;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.setInitialSort();
  }

  public initTable(): void {
    this.dateRange = this.fb.group({
      start: [null],
      end: [null]
    });

    this.dataSource.filterPredicate = this.filterService.createFilterPredicate();
  }

  public getFilterInitValue() {
    return {
      title: '',
      dueDateStart: null,
      dueDateEnd: null,
      status: '',
      priority: ''
    }
  }

  private setInitialSort(): void {
    const sortState: Sort = {active: 'dueDateTime', direction: 'asc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.changeDetector.detectChanges();
  }

  public onFilterChange(filterValues: Record<string, any>): void {
    this.filterValues = { ...filterValues, dueDateTime: [filterValues['dueDateStart'], filterValues['dueDateEnd']] }; // змінив
    this.dataSource.filter = JSON.stringify(filterValues);
  }

  public deleteTask(task: Task): void {
    this.taskService.deleteTask(task);
  }
}
