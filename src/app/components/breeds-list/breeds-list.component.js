import _ from "lodash";

import templateUrl from "./template.html";

import "./style.scss";

const component = {
    templateUrl,
    controller: function(DatabaseService){
        this.breeds = DatabaseService.getBreeds();
        let selectedBreed = null;
        this.setSelectedBreed = function(breed){
            selectedBreed = breed;
            console.log(`new selected breed: ${selectedBreed}`);
        };

    }
};

export default component;