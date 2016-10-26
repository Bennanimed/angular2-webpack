'use strict';

import {Component, EventEmitter, Input, Output}     from '@angular/core';
import {TasksService}                               from '../services/tasks.service';
import {Task}                                       from '../interfaces/task';

@Component({
    selector        : 'pagination',
    templateUrl     : 'app/html/pagination.html',
    providers       : [TasksService]
})

export class PaginationComponent {
    pages: number[] = [0];
    activePage: number = 1;

    @Input()
    set totalPages(totalPages: number[]) {
        this.pages = totalPages;
    };
    @Input()
    set actualPage(actualPage: number) {
        this.activePage = actualPage;
    }
    @Output() loadPageAction = new EventEmitter();

    constructor(public tasksService: TasksService) { }

    public loadPage(pageNumber: number) {
        let taskslist: Task[] = [];

        if ( pageNumber >= 1 && pageNumber <= this.pages.length) {
            this.activePage = pageNumber;
            taskslist = this.tasksService.getTasks(pageNumber);
            this.loadPageAction.emit(
                {
                    items           : taskslist,
                    selectedPage    : pageNumber
                }
            );
        }
    }

}
