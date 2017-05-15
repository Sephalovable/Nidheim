import angular from "angular";

import markingsList from "./markings-list";
import breedsList from "./breeds-list";
import skinsList from "./skins-list";
import resultDisplay from './result-display';

const module = angular
    .module("app.components", [
        markingsList,
        breedsList,
        skinsList,
        resultDisplay
    ]);

    export default module.name;