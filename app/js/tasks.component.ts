'use strict';

import {Component, OnInit}      from '@angular/core';
import {TasksService}           from './services/tasks.service';
import {Task}                   from './interfaces/task';
import {PaginationComponent}    from './pagination/pagination.component';
import {Observable}             from 'rxjs/Observable';
import {Observer}               from 'rxjs/Observer';

@Component({
    selector        : 'tasks',
    templateUrl     : 'app/html/tasks.html',
    providers       : [TasksService, PaginationComponent]
})

export class TasksComponent implements OnInit {
    tasks: Task[]       = [];
    pages: number       = 0;
    tabPages: number[]  = [];
    actualpage: number  = 1;
    data$: Observable<Task[]>;

    constructor(public tasksService: TasksService, public pagination: PaginationComponent) { }

    ngOnInit() {
        // Get tasks form TasksService

        this.data$ = new Observable<Task[]>((observer: Observer<Task[]>) => {
            observer.next(this.tasksService.getTasks());
        });

        this.data$.subscribe(
            tasklist => { this.tasks = tasklist; }
        );

        this.tabPages = this.tasksService.getTotalPagesNbr();
    }

    public updateTasks(taskList: Task[]): void {
        this.tasks = taskList;
        this.tabPages = this.tasksService.getTotalPagesNbr();
    }

    public loadTasks($event: any): void {
        this.updateTasks($event.items);
        this.actualpage = $event.selectedPage;
    }

    public doneStatus(task: Task): void {
        task.done = !task.done;
        this.tasksService.updateDoneStatus(task);
    }

    public deleteTask(taskid: number): void {
        let index: any = this.tasks.findIndex(Task => Task.id === taskid);

        this.tasks.splice(index, 1);
        this.tasksService.removeTask(taskid);
        if (this.tasks.length === 0) {
            this.actualpage = this.actualpage - 1;
        }
        this.updateTasks(this.tasksService.getTasks(this.actualpage));
    }

}
