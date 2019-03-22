import templateUrl from "./template.html";
import "./style.scss";

const component = {
    templateUrl,
    controller: function (DatabaseService, GeneratorService) {
        let PARENT = null;

        this.$onInit = () => {
            PARENT = (this.parent === "father") ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            this.ears = DatabaseService.getEars();
        };

        this.setSelectedEar = (ear) => GeneratorService.setEar(PARENT, ear);
    },
    bindings: {
        parent: '@'
    }
};

export default component;