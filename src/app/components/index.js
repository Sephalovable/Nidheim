import angular from "angular";

import markingsList from "./markings-list";
import breedsList from "./breeds-list";
import skinsList from "./skins-list";

const module = angular
    .module("app.components", [
        markingsList,
        breedsList,
        skinsList
    ]);

    export default module.name;