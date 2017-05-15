import angular from "angular";

import Common from "../../common";

import component from "./breeds-list.component";

const module = angular
    .module("app.components.breeds-list", [
            Common
        ])
        .component("breedsList", component);

        export default module.name;