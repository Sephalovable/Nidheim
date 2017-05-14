import angular from "angular";

import DatabaseService from "./database.service";

const module = angular
    .module("app.common", [ ])
    .service('DatabaseService', DatabaseService);

    export default module.name;
