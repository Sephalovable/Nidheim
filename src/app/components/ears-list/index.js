import angular from "angular";

import Common from "../../common";

import component from "./ears-list.component";

const module = angular
    .module("app.components.ears-list", [
        Common
    ])
    .component("earsList", component);

export default module.name;