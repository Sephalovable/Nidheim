import _ from 'lodash';

class GeneratorService {
    constructor($rootScope) {
        this.$rootScope = $rootScope;

        this.PARENTS = {
            FATHER: "father",
            MOTHER: "mother"
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
        }
    }

    generate() {
        this.$rootScope.$broadcast("newResult", "I generated a thing!");
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
}

export default GeneratorService;
