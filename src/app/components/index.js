import angular from "angular";

import markingsList from "./markings-list";
import breedsList from "./breeds-list";

const module = angular
    .module("app.components", [
        markingsList,
        breedsList
    ]);

    export default module.name;