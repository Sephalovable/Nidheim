import angular from "angular";

import markingsList from "./markings-list";

const module = angular
    .module("app.components", [
        markingsList
    ]);

    export default module.name;