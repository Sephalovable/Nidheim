import DATABASE from "../../data/breeding-data.json";

class DatabaseService {
    constructor(){

    }

getSkinColors(){
    return DATABASE.baseSkinColors;
}

getMarkings(){
    return DATABASE.markings;
}

getMutations(){
return DATABASE.mutations;

}

}

export default DatabaseService;
