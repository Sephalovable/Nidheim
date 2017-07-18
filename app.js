webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _database = __webpack_require__(11);

var _database2 = _interopRequireDefault(_database);

var _generator = __webpack_require__(12);

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = _angular2.default.module("app.common", []).service('DatabaseService', _database2.default).service("GeneratorService", _generator2.default);

exports.default = _module.name;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _common = __webpack_require__(1);

var _common2 = _interopRequireDefault(_common);

var _components = __webpack_require__(15);

var _components2 = _interopRequireDefault(_components);

var _app = __webpack_require__(10);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = _angular2.default.module('app.containers', [_common2.default, _components2.default]).component('app', _app2.default);

exports.default = _module.name;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _template = __webpack_require__(27);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = {
    templateUrl: _template2.default,
    controller: function controller($rootScope, GeneratorService) {
        var _this = this;

        this.$onInit = function () {
            _this.result = null;

            $rootScope.$on("newResult", function (event, newResult) {
                _this.result = newResult;
            });
        };

        this.generate = function () {
            return GeneratorService.generate();
        };

        this.checkCanGenerate = function () {
            return GeneratorService.checkCanGenerate();
        };

        this.togglePlusOne = function () {
            return GeneratorService.options.plusOne = !GeneratorService.options.plusOne;
        };

        this.generateRandom = function () {
            return GeneratorService.generateRandom();
        };
    }
};

exports.default = component;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _breedingData = __webpack_require__(30);

var _breedingData2 = _interopRequireDefault(_breedingData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatabaseService = function () {
    function DatabaseService() {
        _classCallCheck(this, DatabaseService);
    }

    _createClass(DatabaseService, [{
        key: "getSkins",
        value: function getSkins() {
            return _breedingData2.default.baseSkinColors;
        }
    }, {
        key: "getMarkings",
        value: function getMarkings() {
            return _breedingData2.default.markings;
        }
    }, {
        key: "getMutations",
        value: function getMutations() {
            return _breedingData2.default.mutations;
        }
    }, {
        key: "getBreeds",
        value: function getBreeds() {
            return _breedingData2.default.breeds;
        }
    }]);

    return DatabaseService;
}();

exports.default = DatabaseService;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeneratorService = function () {
    function GeneratorService($rootScope, DatabaseService) {
        _classCallCheck(this, GeneratorService);

        this.$rootScope = $rootScope;
        this.DatabaseService = DatabaseService;

        this.PARENTS = {
            FATHER: 'father',
            MOTHER: 'mother'
        };

        this.MAX_MARKINGS = 8;

        this.options = {
            plusOne: false,
            father: {
                skin: null,
                breed: null,
                markings: []
            },
            mother: {
                skin: null,
                breed: null,
                markings: []
            }
        };
    }

    _createClass(GeneratorService, [{
        key: 'generate',
        value: function generate() {
            // if we can't generate, return early
            if (!this.checkCanGenerate()) {
                return;
            }

            var MAX_CHARACTER_SEED = _lodash2.default.random(1, 4);
            var MAX_CHARACTERS = this.options.plusOne ? MAX_CHARACTER_SEED + 1 : MAX_CHARACTER_SEED;

            var characters = [];

            while (characters.length < MAX_CHARACTERS) {
                characters.push(this._generateCharacter());
            }

            this.$rootScope.$broadcast('newResult', characters);
        }
    }, {
        key: 'generateRandom',
        value: function generateRandom() {
            var BREEDS = this.DatabaseService.getBreeds(),
                SKINS = this.DatabaseService.getSkins(),
                BREEDS_MAX_INDEX = BREEDS.length - 1,
                SKINS_MAX_INDEX = SKINS.length - 1;

            this.options = {
                plusOne: false,
                father: {
                    skin: SKINS[_lodash2.default.random(0, SKINS_MAX_INDEX)],
                    breed: BREEDS[_lodash2.default.random(0, BREEDS_MAX_INDEX)],
                    markings: this._generateRandomListOfMarkings()
                },
                mother: {
                    skin: SKINS[_lodash2.default.random(0, SKINS_MAX_INDEX)],
                    breed: BREEDS[_lodash2.default.random(0, BREEDS_MAX_INDEX)],
                    markings: this._generateRandomListOfMarkings()
                }
            };

            this.generate();
        }
    }, {
        key: 'checkCanGenerate',
        value: function checkCanGenerate() {
            var FATHER = this.options.father,
                MOTHER = this.options.mother;

            return FATHER.breed && MOTHER.breed && FATHER.skin && MOTHER.skin;
        }
    }, {
        key: 'setSkin',
        value: function setSkin(parent, skin) {
            this.options[parent].skin = skin;
            console.log(parent + ' Skin: ' + skin);
        }
    }, {
        key: 'setBreed',
        value: function setBreed(parent, breed) {
            this.options[parent].breed = breed;
            console.log(parent + ' Breed: ' + breed);
        }
    }, {
        key: 'setMarking',
        value: function setMarking(parent, marking) {
            var markings = this.options[parent].markings;

            if (markings.includes(marking)) {
                _lodash2.default.pull(markings, marking);
            } else {
                markings.push(marking);
            }

            console.log(parent + ' Markings: ' + markings);
        }
    }, {
        key: '_generateCharacter',
        value: function _generateCharacter() {
            var FATHER = this.options.father,
                MOTHER = this.options.mother,
                GENDERS = ["Male", "Female"],
                MAX_MARKINGS = _lodash2.default.random(1, this.MAX_MARKINGS);

            var skins = [FATHER.skin, MOTHER.skin],
                breeds = [FATHER.breed, MOTHER.breed],
                markings = _lodash2.default.concat([], FATHER.markings, MOTHER.markings); // combine all possible solutions

            var selectedSkin = skins[_lodash2.default.random(0, 1)],
                selectedBreed = breeds[_lodash2.default.random(0, 1)],
                selectedMutations = this._generateMutations(),
                selectedGender = GENDERS[_lodash2.default.random(0, 1)],
                selectedMarkings = []; // the array we'll store into later

            // keep adding markings until we hit the random MAX_MARKINGS amount
            for (var i = 0; i < MAX_MARKINGS && markings.length; i++) {
                var MAX_INDEX = markings.length - 1; // get the max index to use as an upper bound random value to access with
                var marking = markings[_lodash2.default.random(0, MAX_INDEX)]; // get the random marking available from the list

                selectedMarkings.push(marking); // store the random marking
                _lodash2.default.pull(markings, marking); // remove it from the list so it's not added multiple times if possible
            }

            return {
                skin: selectedSkin,
                breed: selectedBreed,
                gender: selectedGender,
                markings: selectedMarkings,
                mutations: selectedMutations
            };
        }
    }, {
        key: '_generateMutations',
        value: function _generateMutations() {
            function getOffsetBound(index) {
                // the first mutation is a 3% chance
                return 97 + 1 * index;
            }

            var MAX_MUTATIONS = _lodash2.default.random(0, 3);
            var mutations = _lodash2.default.concat([], this.DatabaseService.getMutations()),
                // we don't want to change the original array
            selectedMutations = [];

            while (selectedMutations.length < MAX_MUTATIONS && _lodash2.default.random(0, 100) > getOffsetBound(selectedMutations.length)) {
                var MAX_INDEX = mutations.length - 1;
                var mutation = mutations[_lodash2.default.random(0, MAX_INDEX)];

                selectedMutations.push(mutation);
                _lodash2.default.pull(mutations, mutation);
            }

            return selectedMutations;
        }
    }, {
        key: '_generateRandomListOfMarkings',
        value: function _generateRandomListOfMarkings() {
            var MAX_MARKINGS = _lodash2.default.random(1, this.MAX_MARKINGS);

            var markings = _lodash2.default.concat([], this.DatabaseService.getMarkings()),
                chosenMarkings = [];

            for (var i = 0; i < MAX_MARKINGS; i++) {
                var MAX_INDEX = markings.length - 1;
                var marking = markings[_lodash2.default.random(0, MAX_INDEX)];

                chosenMarkings.push(marking);
                _lodash2.default.remove(markings, marking);
            }

            return chosenMarkings;
        }
    }]);

    return GeneratorService;
}();

exports.default = GeneratorService;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _template = __webpack_require__(23);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = {
    templateUrl: _template2.default,
    controller: function controller(DatabaseService, GeneratorService) {
        var _this = this;

        var PARENT = null;

        this.$onInit = function () {
            PARENT = _this.parent === 'father' ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            _this.breeds = DatabaseService.getBreeds();
        };

        this.setSelectedBreed = function (breed) {
            return GeneratorService.setBreed(PARENT, breed);
        };
    },
    bindings: {
        parent: '@'
    }
};

exports.default = component;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _common = __webpack_require__(1);

var _common2 = _interopRequireDefault(_common);

var _breedsList = __webpack_require__(13);

var _breedsList2 = _interopRequireDefault(_breedsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = _angular2.default.module("app.components.breeds-list", [_common2.default]).component("breedsList", _breedsList2.default);

exports.default = _module.name;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _markingsList = __webpack_require__(16);

var _markingsList2 = _interopRequireDefault(_markingsList);

var _breedsList = __webpack_require__(14);

var _breedsList2 = _interopRequireDefault(_breedsList);

var _skinsList = __webpack_require__(20);

var _skinsList2 = _interopRequireDefault(_skinsList);

var _resultDisplay = __webpack_require__(18);

var _resultDisplay2 = _interopRequireDefault(_resultDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = _angular2.default.module("app.components", [_markingsList2.default, _breedsList2.default, _skinsList2.default, _resultDisplay2.default]);

exports.default = _module.name;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _common = __webpack_require__(1);

var _common2 = _interopRequireDefault(_common);

var _markingsList = __webpack_require__(17);

var _markingsList2 = _interopRequireDefault(_markingsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = _angular2.default.module("app.components.markings-list", [_common2.default]).component("markingsList", _markingsList2.default);

exports.default = _module.name;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _template = __webpack_require__(24);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = {
    templateUrl: _template2.default,
    controller: function controller(DatabaseService, GeneratorService) {
        var _this = this;

        var PARENT = null;

        this.$onInit = function () {
            PARENT = _this.parent === "father" ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            _this.markings = DatabaseService.getMarkings();
        };

        this.selectMarking = function (marking) {
            return GeneratorService.setMarking(PARENT, marking);
        };
    },
    bindings: {
        parent: '@'
    }
};

exports.default = component;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _resultDisplay = __webpack_require__(19);

var _resultDisplay2 = _interopRequireDefault(_resultDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = _angular2.default.module('app.components.result-display', []).component('resultDisplay', _resultDisplay2.default);

exports.default = _module.name;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _template = __webpack_require__(25);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = {
    templateUrl: _template2.default,
    bindings: {
        id: '@',
        character: "<"
    }
};

exports.default = component;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _common = __webpack_require__(1);

var _common2 = _interopRequireDefault(_common);

var _skinsList = __webpack_require__(21);

var _skinsList2 = _interopRequireDefault(_skinsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = _angular2.default.module("app.components.skins-list", [_common2.default]).component("skinsList", _skinsList2.default);

exports.default = _module.name;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _template = __webpack_require__(26);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = {
    templateUrl: _template2.default,
    controller: function controller(DatabaseService, GeneratorService) {
        var _this = this;

        var PARENT = null;

        this.$onInit = function () {
            PARENT = _this.parent === "father" ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            _this.skins = DatabaseService.getSkins();
        };

        this.setSelectedSkin = function (skin) {
            return GeneratorService.setSkin(PARENT, skin);
        };
    },
    bindings: {
        parent: '@'
    }
};

exports.default = component;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = _angular2.default.module('app', [_index2.default]);

exports.default = _module.name;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var path = 'C:/Users/Master/Documents/Nidheim/src/app/components/breeds-list/template.html';
var html = "<label ng-repeat = \"breed in $ctrl.breeds\">\r\n    <input type = \"radio\" name = \"{{$ctrl.parent}}SelectedBreed\" ng-click = \"$ctrl.setSelectedBreed(breed)\"/> {{breed}}\r\n</label>";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var path = 'C:/Users/Master/Documents/Nidheim/src/app/components/markings-list/template.html';
var html = "<label ng-repeat = \"marking in $ctrl.markings\">\r\n    <input type = \"checkbox\" ng-click =\"$ctrl.selectMarking(marking)\"></input> \r\n    {{marking}}\r\n</label>\r\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var path = 'C:/Users/Master/Documents/Nidheim/src/app/components/result-display/template.html';
var html = "<span></span><br>\r\n<label>{{$ctrl.id}}) {{$ctrl.character.gender}} - Healthy</label> \r\n<br>\r\n<label>{{$ctrl.character.breed}} - Fledgeling</label>\r\n<br>\r\n<label>{{$ctrl.character.skin}} with</label><label data-ng-if=\"$ctrl.character.markings.length\">\r\n    <label data-ng-repeat=\"marking in $ctrl.character.markings\">{{marking}}, </label>\r\n</label>\r\n<label data-ng-if=\"$ctrl.character.mutations.length\">\r\n    <br>\r\n    [Mutations:]\r\n    <label data-ng-repeat=\"mutation in $ctrl.character.mutations\">{{mutation}}</label>\r\n</label>\r\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var path = 'C:/Users/Master/Documents/Nidheim/src/app/components/skins-list/template.html';
var html = "<label ng-repeat = \"skin in $ctrl.skins\"><input type =\"radio\" name = \"{{$ctrl.parent}}SelectedSkin\" ng-click = \"$ctrl.setSelectedSkin(skin)\"/>{{skin}}</label>";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var path = 'C:/Users/Master/Documents/Nidheim/src/app/template.html';
var html = "<div class=\"center\">\r\n<div class=\"container\">\r\n\r\n<div class=\"boxed\">\r\n    <center><h2>Father</h2></center>\r\n    <hr>\r\n<section class = \"father\">\r\n   <h4>Breed</h4>\r\n        <breeds-list data-parent=\"father\"></breeds-list>\r\n    <h4>Base Coat</h4>\r\n        <skins-list data-parent=\"father\"></skins-list>\r\n        <h4>Markings</h4>\r\n        <markings-list data-parent=\"father\"></markings-list>\r\n</section>\r\n</div>\r\n<div class=\"boxed\">\r\n    <center><h2>Mother</h2></center>\r\n    <hr>\r\n<section class = \"mother\">\r\n    <h4>Breed</h4>\r\n<breeds-list data-parent=\"mother\"></breeds-list>\r\n    <h4>Base Coat</h4>\r\n    <skins-list data-parent=\"mother\"></skins-list>\r\n    <h4>Markings</h4>\r\n    <markings-list data-parent=\"mother\"></markings-list>\r\n</section>\r\n</div>\r\n<br>\r\n<div class=\"boxed\">\r\n<section class=\"result\">\r\n    <div>\r\n        <section>\r\n            <button data-ng-click=\"$ctrl.generate()\" data-ng-disabled=\"!$ctrl.checkCanGenerate()\" div-align=\"center\">ROLL NORMAL</button>\r\n        </section>\r\n        <br>\r\n        <section>\r\n            <button data-ng-click=\"$ctrl.generateRandom()\" div-align=\"center\">ROLL RANDOM</button>\r\n        </section>\r\n        <br>\r\n        <br>\r\n        <section>\r\n            <label><input type =\"checkbox\" ng-click=\"$ctrl.togglePlusOne()\"> Fertility Treatment</label>   <label><input type =\"checkbox\" ng-click=\"$ctrl.togglePlusOne()\"> Plump Heart</label>\r\n        </section>\r\n        <result-display data-ng-repeat=\"character in $ctrl.result track by $index\" data-id=\"{{$index + 1}}\" data-character=\"character\"></result-display>\r\n    </div>\r\n    </div>\r\n    </div>\r\n<br>\r\n<br>\r\n</div>\r\n<center>Roller designed by Dethmisu for Nidheim</center>";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports) {

module.exports = {
	"baseSkinColors": [
		"Earthbound",
		"Jade",
		"Jasper",
		"Mauve",
		"Onyx",
		"Pearl",
		"Russian",
		"Solar"
	],
	"breeds": [
		"Blisterwing",
		"Pridebreaker",
		"Ripplefrill",
		"Slabhide",
		"Vilebane",
		"Windspeaker"
	],
	"markings": [
		"Anaconda",
		"Bandit",
		"Bullseye",
		"Caped",
		"Collared",
		"Crested",
		"Dalmatian",
		"Fawn Spots",
		"Fleabitten",
		"Ghoul",
		"Harlequin",
		"Highlights",
		"Ink",
		"King Cheetah",
		"Marked",
		"Merle",
		"Nebula",
		"Piebald",
		"Siamese",
		"Smear",
		"Soot",
		"Splash",
		"Tasmanian Tiger",
		"Victorian",
		"Water Trickle",
		"Webbed"
	],
	"mutations": [
		"Maned",
		"Fanged",
		"Albino",
		"Whelp Syndrome",
		"Wingless",
		"Chameleon",
		"Chimerism"
	]
};

/***/ })
],[22]);
//# sourceMappingURL=app.js.map