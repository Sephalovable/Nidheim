import angular from 'angular';

import common from "./common";
import components from "./components";

import component from "./app.component";

const module = angular
    .module('app.containers', [
        common,
        components
    ])
    .component('app', component);

export default module.name;
