import templateUrl from './template.html';
import './style.scss';

const component = {
    templateUrl,
    bindings: {
        id: '@',
        character: "<"
    }
};

export default component;
