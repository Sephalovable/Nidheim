import angular from 'angular';

import common from "./common";
import components from "./components";
import GeneratorService from "./generator.service";
import component from "./app.component";

const module = angular
    .module('app.containers', [
        common,
        components
    ])
    .service("GeneratorService", GeneratorService)
    .component('app', component);

export default module.name;
