'use strict';

import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators}             from '@angular/forms';
import {TasksService}                                   from './services/tasks.service';
import {Task}                                           from './interfaces/task';
import {pageLimit}                                      from './parameters';

@Component({
    selector        : 'newtask',
    templateUrl     : 'app/html/formAddTask.html',
    providers       : [TasksService]
})

export class AddTaskComponent implements OnInit {
    taskForm: FormGroup;
    modalActions: any       = new EventEmitter();
    uid: number             = this.getNextIndex();
    identifier: number      = 0;

    @Input() taskslist: Task[];
    @Output() tasksUpdated = new EventEmitter();

    constructor(public fb: FormBuilder, public tasksService: TasksService) { }

    ngOnInit() {
        this.taskForm = this.fb.group({
            id:             ['', Validators.required],
            taskname:       ['', [Validators.required, Validators.minLength(5)]],
            description:    ['', Validators.required],
            done:           ['', Validators.required]
        });
    }

    public onSubmit(): void {
        let newTask: Task = this.taskForm.value;
        // Update and emit data to tasks component

        if (this.taskslist.length < pageLimit) {
            this.taskslist.push(newTask);
        }
        this.tasksService.setTask(newTask);
        this.tasksUpdated.emit(this.taskslist);
        // close modal and reset form
        this.modalActions.emit('closeModal');
        this.taskForm.reset();
    }

    public resetForm(): void {
        this.taskForm.reset();
    }

    public getNextIndex(): number {
        let lastId = this.tasksService.getLastIndex();

        return lastId + 1;
    }

    public openModal(): void {
        this.taskForm.patchValue(
            {
                'id' : this.getNextIndex(),
                done : false
            }
        );
    }

    public formatNbr(uid: number): any {
        return (uid < 10) ? '0' + uid : uid;
    }

}
