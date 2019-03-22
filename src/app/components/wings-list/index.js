import angular from "angular";

import Common from "../../common";

import component from "./wings-list.component";

const module = angular
    .module("app.components.wings-list", [
        Common
    ])
    .component("wingsList", component);

export default module.name;