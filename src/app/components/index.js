import angular from "angular";

import markingsList from "./markings-list";
import breedsList from "./breeds-list";
import skinsList from "./skins-list";
import earsList from "./ears-list";
import tailsList from "./tails-list";
import wingsList from "./wings-list";
import traitiesList from "./traities-list";

import resultDisplay from './result-display';

const module = angular
    .module("app.components", [
        markingsList,
        breedsList,
        skinsList,
        earsList,
        tailsList,
        wingsList,
        traitiesList,
        resultDisplay
    ]);

    export default module.name;