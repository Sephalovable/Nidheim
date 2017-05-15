import angular from "angular";

import Common from "../../common";

import component from "./skins-list.component";

const module = angular
    .module("app.components.skins-list", [
        Common
    ])
    .component("skinsList", component);

export default module.name;