import angular from 'angular';

import component from './result-display.component';

const module = angular
    .module('app.components.result-display', [])
    .component('resultDisplay', component);

export default module.name;
