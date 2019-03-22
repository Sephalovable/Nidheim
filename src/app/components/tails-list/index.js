import angular from "angular";

import Common from "../../common";

import component from "./tails-list.component";

const module = angular
    .module("app.components.tails-list", [
        Common
    ])
    .component("tailsList", component);

export default module.name;