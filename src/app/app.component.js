import templateUrl from './template.html';
import './style.scss';

const component = {
    templateUrl,
    controller: function ($rootScope, GeneratorService) {
        this.$onInit = () => {
            this.result = null;

            $rootScope.$on("newResult", (event, newResult) => {
                this.result = newResult;
            });
        };

        this.generate = () => GeneratorService.generate();

        this.checkCanGenerate = () => GeneratorService.checkCanGenerate();
    }
};

export default component;
