import templateUrl from "./template.html";
import "./style.scss";

const component = {
    templateUrl, 
    controller: function(DatabaseService){
            this.markings = DatabaseService.getMarkings();
        }
};

export default component;