---
permalink: /docs/index.html
---
* the above may be necessary for github pages to work with this angular project? unsure. [see docs here](https://stackoverflow.com/questions/43918286/github-pages-returns-readme-file-instead-of-index-html-cant-host-my-react-proj/53678354#53678354)

# find-my-fam
A mapping project to determine where members of a jet-setting family are at the current time.  
* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build and Deploy

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory by default. Use the `--prod` flag for a production build.  

This project is hosted on github pages. To deploy, run the following command, then push. [Further documentation here](https://angular.io/guide/deployment#deploy-to-github-pages) that will explain how to configure the github repo settings.

```
ng build --prod --output-path docs --base-href /find-my-fam/
```

The output will be in the `/docs` directory, since github pages is configured to publish from `/docs`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## credits
* maps supplied by open street map and Stamen Design
* icon set called [Gradient Design by Nolan](https://icons8.com/icons/nolan)

## TODO:
[] add search bar for search by name or city
[] add more people dots, maybe a square for friends??
[] add a legend