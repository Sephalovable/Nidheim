import _ from "lodash";

import templateUrl from "./template.html";

import "./style.scss";

const component = {
    templateUrl,
    controller: function(DatabaseService){
        this.skins = DatabaseService.getSkins();
        let selectedSkin = null;
        this.setSelectedSkin = function(skin){
            selectedSkin = skin;
            console.log(`new selected skin: ${selectedSkin}`);
        };
    }
};

export default component;