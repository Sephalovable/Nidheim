import angular from 'angular';

import common from "./common";

import templateUrl from './template.html';
import './style.scss';

const module = angular
    .module('app.containers', [
        common
    ])
    .component('app', {templateUrl});

export default module.name;
