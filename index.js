import { VUE_INSTALLER as response} from './src/response'
import { VUE_INSTALLER as login} from './src/login'
import { VUE_INSTALLER as querifier} from './src/querifier'
import { VUE_INSTALLER as mobile} from './src/mobile'
import { VUE_INSTALLER as masks} from './src/masks'
import { VUE_INSTALLER as formatter} from './src/formatter'
import { VUE_INSTALLER as date} from './src/date'

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
