import templateUrl from "./template.html";
import "./style.scss";

const component = {
    templateUrl,
    controller: function (DatabaseService, GeneratorService) {
        let PARENT = null;

        this.$onInit = () => {
            PARENT = (this.parent === "father") ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            this.traities = DatabaseService.getTraities();
        };

        this.setSelectedTraitie = (traitie) => GeneratorService.setTraitie(PARENT, traitie);
    },
    bindings: {
        parent: '@'
    }
};

export default component;