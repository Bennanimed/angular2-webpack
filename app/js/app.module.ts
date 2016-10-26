'use strict';

import {NgModule}                           from '@angular/core';
import {BrowserModule}                      from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {AppComponent}                       from './app.component';
import {TasksComponent}                     from './tasks.component';
import {AddTaskComponent}                   from './addtask.component';
import {FormErrorsValidation}               from './formerrors/formerrors.component';
import {PaginationComponent}                from './pagination/pagination.component';
import "materialize-css";
import "angular2-materialize";
import {MaterializeDirective}               from 'angular2-materialize';

@NgModule({
    imports:        [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations:   [
        AppComponent,
        TasksComponent,
        PaginationComponent,
        AddTaskComponent,
        MaterializeDirective,
        FormErrorsValidation
    ],
    bootstrap:      [AppComponent]
})

export class AppModule {  }
