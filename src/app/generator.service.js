class GeneratorService{
    constructor($rootScope) {
        this.$rootScope = $rootScope;
    }
    generate() {
        this.$rootScope.$broadcast("newResult", "I generated a thing!")
        console.log("BUZZ!");
}
}

export default GeneratorService;