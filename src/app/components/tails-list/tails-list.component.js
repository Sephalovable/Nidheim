import templateUrl from "./template.html";
import "./style.scss";

const component = {
    templateUrl,
    controller: function (DatabaseService, GeneratorService) {
        let PARENT = null;

        this.$onInit = () => {
            PARENT = (this.parent === "father") ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            this.tails = DatabaseService.getTails();
        };

        this.setSelectedTail = (tail) => GeneratorService.setTail(PARENT, tail);
    },
    bindings: {
        parent: '@'
    }
};

export default component;