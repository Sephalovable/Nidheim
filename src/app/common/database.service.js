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

getWings() {
    return DATABASE.wings;
    
}    
    
getTraities() {
    return DATABASE.traities;
    
}   
    
getEars() {
    return DATABASE.ears;    
}   

getTails() {
    return DATABASE.tails;    
}    

getBreeds(){
    return DATABASE.breeds;
    }
    

}

export default DatabaseService;
