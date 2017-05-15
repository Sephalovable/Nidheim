import templateUrl from "./template.html";
import "./style.scss";

const component = {
    templateUrl, 
    controller: function(DatabaseService, GeneratorService) {
        let PARENT = null;

        this.$onInit = () => {
            PARENT = (this.parent === "father") ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            this.markings = DatabaseService.getMarkings();
        };

        this.selectMarking = (marking) => GeneratorService.setMarking(PARENT, marking);
    },
    bindings: {
        parent: '@'
    }
};

export default component;