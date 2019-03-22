import angular from "angular";

import Common from "../../common";

import component from "./traities-list.component";

const module = angular
    .module("app.components.traities-list", [
        Common
    ])
    .component("traitiesList", component);

export default module.name;