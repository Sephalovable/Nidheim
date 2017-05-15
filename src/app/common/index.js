import angular from "angular";

import DatabaseService from "./database.service";
import GeneratorService from "./generator.service";

const module = angular
    .module("app.common", [ ])
    .service('DatabaseService', DatabaseService)
    .service("GeneratorService", GeneratorService);

    export default module.name;
