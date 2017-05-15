import templateUrl from "./template.html";
import "./style.scss";

const component = {
    templateUrl,
    controller: function(DatabaseService, GeneratorService) {
        let PARENT = null;

        this.$onInit = () => {
            PARENT = (this.parent === "father") ? GeneratorService.PARENTS.FATHER : GeneratorService.PARENTS.MOTHER;

            this.skins = DatabaseService.getSkins();
        };

        this.setSelectedSkin = (skin) => GeneratorService.setSkin(PARENT, skin);
    },
    bindings: {
        parent: '@'
    }
};

export default component;