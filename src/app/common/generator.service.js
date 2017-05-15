import _ from 'lodash';

class GeneratorService {
    constructor($rootScope, DatabaseService) {
        this.$rootScope = $rootScope;
        this.DatabaseService = DatabaseService;

        this.PARENTS = {
            FATHER: 'father',
            MOTHER: 'mother'
        };

        this.options = {
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

        const FATHER = this.options.father,
            MOTHER = this.options.mother,
            MAX_MARKINGS = _.random(3, 8);

        let skins = [FATHER.skin, MOTHER.skin],
            breeds = [FATHER.breed, MOTHER.breed],
            markings = _.concat([], FATHER.markings, MOTHER.markings); // combine all possible solutions

        let selectedSkin = skins[_.random(0, 1)],
            selectedBreed = breeds[_.random(0, 1)],
            selectedMutations = this._generateMutations(),
            selectedMarkings = []; // the array we'll store into later

        // keep adding markings until we hit the random MAX_MARKINGS amount
        for (let i = 0; i < MAX_MARKINGS && markings.length; i++) {
            const MAX_INDEX = markings.length - 1; // get the max index to use as an upper bound random value to access with
            let marking = markings[_.random(0, MAX_INDEX)]; // get the random marking available from the list

            selectedMarkings.push(marking); // store the random marking
            _.pull(markings, marking); // remove it from the list so it's not added multiple times if possible
        }

        this.$rootScope.$broadcast('newResult', {selectedSkin, selectedBreed, selectedMarkings, selectedMutations});
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

    _generateMutations() {
        function getOffsetBound(index) {
            // the first mutation is a 30% chance
            return 70 + (10 * index);
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
}

export default GeneratorService;
