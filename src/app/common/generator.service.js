import _ from 'lodash';

class GeneratorService {
    constructor($rootScope, DatabaseService) {
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

    generate() {
        // if we can't generate, return early
        if (!this.checkCanGenerate()) {
            return;
        }

        const MAX_CHARACTER_SEED = _.random(1, 2);        
        const MAX_CHARACTERS = (this.options.plusOne) ? MAX_CHARACTER_SEED + 1 : MAX_CHARACTER_SEED;

        let characters = [];

        while (characters.length < MAX_CHARACTERS) {
            characters.push(this._generateCharacter());
        }

        this.$rootScope.$broadcast('newResult', characters);
    }

    generateRandom(withLimitedData = false) {
        const BREEDS = this.DatabaseService.getBreeds()
            .filter(i => withLimitedData ? i.limited : true)
            .map(i => i.name);
        const SKINS = this.DatabaseService.getSkins();
        const BREEDS_MAX_INDEX = BREEDS.length - 1;
        const SKINS_MAX_INDEX = SKINS.length - 1;

        this.options = {
            plusOne: false,
            father: {
                skin: SKINS[_.random(0, SKINS_MAX_INDEX)],
                breed: BREEDS[_.random(0, BREEDS_MAX_INDEX)],
                markings: this._generateRandomListOfMarkings()
            },
            mother: {
                skin: SKINS[_.random(0, SKINS_MAX_INDEX)],       
                breed: BREEDS[_.random(0, BREEDS_MAX_INDEX)],
                markings: this._generateRandomListOfMarkings()
            }
        };

        this.generate();
    }

    checkCanGenerate() {
        const FATHER = this.options.father,
              MOTHER = this.options.mother;

        return FATHER.breed && MOTHER.breed &&
            FATHER.skin && MOTHER.skin;
    }

    setSkin(parent, skin) {
        this.options[parent].skin = skin;
        console.log(`${parent} Skin: ${skin}`);
    }

    setBreed(parent, breed) {
        this.options[parent].breed = breed;
        console.log(`${parent} Breed: ${breed}`);
    }

    setMarking(parent, marking) {
        let markings = this.options[parent].markings;

        if (markings.includes(marking)) {
            _.pull(markings, marking);
        } else {
            markings.push(marking);
        }

        console.log(`${parent} Markings: ${markings}`);
    }

    _generateCharacter() {
        const FATHER = this.options.father,
            MOTHER = this.options.mother,
            GENDERS = ["Male", "Female"],
            MAX_MARKINGS = _.random(0, this.MAX_MARKINGS);

        let skins = [FATHER.skin, MOTHER.skin],
            breeds = [FATHER.breed, MOTHER.breed],
            markings = _.concat([], FATHER.markings, MOTHER.markings); // combine all possible solutions

        let selectedSkin = skins[_.random(0, 1)],
            selectedBreed = breeds[_.random(0, 1)],
            selectedMutations = this._generateMutations(),
            selectedTraities = this._generateTraities(),
            selectedGender = GENDERS[_.random(0, 1)],
            selectedMarkings = []; // the array we'll store into later

        // keep adding markings until we hit the random MAX_MARKINGS amount
        for (let i = 0; i < MAX_MARKINGS && markings.length; i++) {
            const MAX_INDEX = markings.length - 1; // get the max index to use as an upper bound random value to access with
            let marking = markings[_.random(0, MAX_INDEX)]; // get the random marking available from the list

            selectedMarkings.push(marking); // store the random marking
            _.pull(markings, marking); // remove it from the list so it's not added multiple times if possible
        }

        return {
            skin: selectedSkin,
            breed: selectedBreed,
            gender: selectedGender,
            markings: selectedMarkings,
            traities: selectedTraities,
            mutations: selectedMutations,
        };
    }

    _generateTraities() {
        function getOffsetBound(index) {
            // the first trait is a 10% chance
            return 0 + (1 * index);
        }

        const MAX_TRAITIES = _.random(1, 1);
        let traities = _.concat([], this.DatabaseService.getTraities()), // we don't want to change the original array
            selectedTraities = [];

        while (selectedTraities.length < MAX_TRAITIES &&
            _.random(0, 100) > getOffsetBound(selectedTraities.length)) {
            const MAX_INDEX = traities.length - 1;
            let traitie = traities[_.random(0, MAX_INDEX)];

            selectedTraities.push(traitie);
            _.pull(traities, traitie);
        }

        return selectedTraities;
    }

    _generateMutations() {
        function getOffsetBound(index) {
            // the first mutation is a 3% chance
            return 97 + (1 * index);
        }

        const MAX_MUTATIONS = _.random(0, 3);
        let mutations = _.concat([], this.DatabaseService.getMutations()), // we don't want to change the original array
            selectedMutations = [];

        while (selectedMutations.length < MAX_MUTATIONS &&
                _.random(0, 100) > getOffsetBound(selectedMutations.length)) {
            const MAX_INDEX = mutations.length - 1;
            let mutation = mutations[_.random(0, MAX_INDEX)];

            selectedMutations.push(mutation);
            _.pull(mutations, mutation);
        }

        return selectedMutations;
    }

    _generateRandomListOfMarkings() {
        const MAX_MARKINGS = _.random(1, this.MAX_MARKINGS);

        let markings = _.concat([], this.DatabaseService.getMarkings()),
             chosenMarkings = [];

        for (let i = 0; i < MAX_MARKINGS; i++) {
            const MAX_INDEX = markings.length - 1;
            let marking = markings[_.random(0, MAX_INDEX)];

            chosenMarkings.push(marking);
            _.remove(markings, marking);
        }

        return chosenMarkings;
    }
}

export default GeneratorService;
