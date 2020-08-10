import { VUE_INSTALLER as response} from './src/utilities/response'
import { VUE_INSTALLER as login} from './src/utilities/login'
import { VUE_INSTALLER as querifier} from './src/utilities/querifier'
import { VUE_INSTALLER as mobile} from './src/utilities/mobile'
import { VUE_INSTALLER as masks} from './src/utilities/masks'
import { VUE_INSTALLER as formatter} from './src/utilities/formatter'
import { VUE_INSTALLER as date} from './src/utilities/date'

const HelperUtility = {
    response,
    login,
    querifier,
    mobile,
    masks,
    date,
    formatter,
}


HelperUtility.install = (Vue) => {
    for(let name in HelperUtility){
        var utility = HelperUtility[name]
        if (utility && name !== 'install') {
            Vue.use(utility);
        }
    }
}

if(typeof window != 'undefined' && window.Vue){
    window.Vue.use(HelperUtility);
}

export default HelperUtility
