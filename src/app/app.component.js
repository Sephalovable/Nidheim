import templateUrl from './template.html';
import './style.scss';

const component = {
    templateUrl,
    controller: function ($rootScope, GeneratorService) {
        this.result = null;
        $rootScope.$on("newResult", function (event, newResult) {
            this.result = newResult; 
        });
        this.generate = GeneratorService.generate;
    }
};

export default component;