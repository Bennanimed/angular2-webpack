# Angular2 - webpack ( Tasks )

<dl>Application made with Angular2 / Typescript / Webpack - materialize</dl>
<dl>Data are stored in localStorage</dl>
<dl>Create tasks, change tasks status, delete tasks - with pagination</dl>

![Image of angular2app](https://raw.githubusercontent.com/Bennanimed/angular2-webpack/master/app/assets/jpg/angular2app-img.jpg)

## Installing

```
npm install webpack -g
npm install typescript -g
npm install
```

## Usage

```
npm start
```

webserver will open http://0.0.0.0:3000 on your default browser

## Configuration
if you want to change host and port, use the file under 'config/development.js'
to change pagination limit number edit the value of const 'pageLimit' under 'app/js/parameters.ts'

## Dependencies

* @angular/common: ~2.0.1,
* @angular/compiler: ~2.0.1,
* @angular/core: ~2.0.1,
* @angular/forms: ~2.0.1,
* @angular/http: ~2.0.1,
* @angular/platform-browser: ~2.0.1,
* @angular/platform-browser-dynamic: ~2.0.1,
* @angular/router: ~3.0.1,
* @angular/upgrade: ~2.0.1,
* angular2-materialize: ^5.2.0,
* core-js: ^2.4.1,
* materialize-css: ^0.97.7,
* reflect-metadata: ^0.1.8,
* rxjs: 5.0.0-beta.12,
* systemjs: 0.19.39,
* zone.js: ^0.6.25
