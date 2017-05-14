import angular from "angular";

import Common from "../../common";

import component from "./markings-list.component";

const module = angular
    .module("app.components.markings-list", [
        Common
     ])
     .component("markingsList", component);

     export default module.name;
