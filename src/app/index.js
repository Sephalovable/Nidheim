import angular from 'angular';

import common from "./common";
import components from "./components";

import templateUrl from './template.html';
import './style.scss';

const module = angular
    .module('app.containers', [
        common,
        components
    ])
    .component('app', {templateUrl});

export default module.name;
