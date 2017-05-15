import _ from "lodash";

import templateUrl from "./template.html";

import "./style.scss";

const component = {
    templateUrl, 
    controller: function(DatabaseService){
            this.markings = DatabaseService.getMarkings();
            this.selectedMarkings = [];
            this.selectMarking = function(marking){
                if (this.selectedMarkings.includes(marking)){
                    _.pull(this.selectedMarkings, marking);
                } else {
                    this.selectedMarkings.push(marking);
                }
                                    console.log(this.selectedMarkings);
            }
        }
};

export default component;