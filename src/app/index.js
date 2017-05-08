import angular from 'angular';

import templateUrl from './index.html';

import './index.scss';

const module = angular
    .module('app.containers', [

    ])
    .component('app', {templateUrl});

export default module.name;
