import angular from "angular";

import common from "../../common";

import component from "./breeds-list.component";

const module = angular
    .module("app.components.breeds-list", [
            common
        ])
        .component("breedsList", component);

        export default module.name;