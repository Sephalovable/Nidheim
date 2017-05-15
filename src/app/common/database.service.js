import DATABASE from "../../data/breeding-data.json";

class DatabaseService {
    constructor(){

    }

getSkins(){
    return DATABASE.baseSkinColors;
}

getMarkings(){
    return DATABASE.markings;
}

getMutations(){
return DATABASE.mutations;

}

getBreeds(){
    return DATABASE.breeds;
}

}

export default DatabaseService;
