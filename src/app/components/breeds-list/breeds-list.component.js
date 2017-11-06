import templateUrl from "./template.html";
import "./style.scss";

const component = {
    templateUrl,
    controller: function(DatabaseService, GeneratorService) {
        let PARENT = null;

        this.$onInit = () => {
            PARENT = (this.parent === 'father') ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            this.breeds = DatabaseService.getBreeds().map(i => i.name);
        };

        this.setSelectedBreed = (breed) => GeneratorService.setBreed(PARENT, breed);
    },
    bindings: {
        parent: '@'
    }
};

export default component;
