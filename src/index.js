import angular from 'angular';

import app from './app/index';

const module = angular
    .module('app', [
        app
    ]);

export default module.name;
