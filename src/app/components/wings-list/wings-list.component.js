import templateUrl from "./template.html";
import "./style.scss";

const component = {
    templateUrl,
    controller: function (DatabaseService, GeneratorService) {
        let PARENT = null;

        this.$onInit = () => {
            PARENT = (this.parent === "father") ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            this.wings = DatabaseService.getWings();
        };

        this.setSelectedWing = (wing) => GeneratorService.setWing(PARENT, wing);
    },
    bindings: {
        parent: '@'
    }
};

export default component;