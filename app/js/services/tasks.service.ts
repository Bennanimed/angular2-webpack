'use strict';

import {Injectable}                 from '@angular/core';
import {Task}                       from '../interfaces/task';
import {pageLimit, taskIdentifier}  from '../parameters';

@Injectable()

export class TasksService {
    identifier: string  = taskIdentifier;
    _k: number          = 0;
    pageNumber: number  = 1;
    totalPages: number  = 0;
    tasksLength: number = 0;

    constructor() { }

    public getlocalstorage(pageNbr: number, limit: number): Task[] {
        let tasklist: Task[]        = [],
            actualItemNbr: number   = 0,
            itemsNumber: number     = 0,
            totalItemsNbr: number   = localStorage.length,
            maxPage: number         = Math.ceil(totalItemsNbr / pageLimit);

        if (localStorage) {
            if (pageNbr > maxPage) {
                pageNbr = maxPage;
            }

            this.totalPages = maxPage;

            if (pageNbr > 0) {
                actualItemNbr   = (pageNbr - 1) * limit;
                itemsNumber     = pageNbr * limit;
            }

            for (let _i = actualItemNbr; _i < itemsNumber; _i++) {
                let index = localStorage.key(_i);

                if (index !== null && localStorage.getItem(index) !== null) {
                    if (index.indexOf(this.identifier) !== -1) {
                        let item: any = localStorage.getItem(index);

                        tasklist.push(JSON.parse(item));
                        this._k++;
                    }
                }
            }

            return tasklist;
        }

    }

    public getTotalPagesNbr(): number[] {
        let tabPages: number[] = [],
            totPages: number = Math.ceil(localStorage.length / pageLimit);

        if (totPages > 0) {
            for (let _c = 0; _c < totPages; _c++) {
                tabPages[_c] = _c;
            }
        }

        return tabPages;
    }

    public getTasks(pageNumber = this.pageNumber, limit = pageLimit): Task[] {
        return this.getlocalstorage(pageNumber, limit);
    }

    public setTask(task: Task): void {
        localStorage.setItem(this.identifier + this.formatNbr(task.id), JSON.stringify(task));
    }

    public updateDoneStatus(task: Task): void {
        this.setTask(task);
    }

    public removeTask(taskid: number): void {
        localStorage.removeItem(this.identifier + this.formatNbr(taskid));
    }

    public getLastIndex(): number {
        let lastItemId: number = 0,
            getLastId: boolean = false;

        if (localStorage.length > 0) {
            this.tasksLength = localStorage.length - 1;

            do {
                if (localStorage.key(this.tasksLength) !== null && localStorage.getItem(localStorage.key(this.tasksLength)) !== null) {
                    let itemKey: any = localStorage.key(this.tasksLength).indexOf(this.identifier);

                    if (itemKey !== -1) {
                        let item: Task = JSON.parse(localStorage.getItem(localStorage.key(this.tasksLength)));

                        lastItemId = item.id;
                        getLastId = true;
                    }
                }
            } while (getLastId === false);
        }
        return lastItemId;
    }

    public formatNbr(uid: number): any {
        return (uid < 10) ? '0' + uid : uid;
    }
}
