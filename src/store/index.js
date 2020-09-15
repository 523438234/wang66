import Vue from "vue"
import Vuex from 'vuex'
import menu from "../store/modules/menu"
import role from "../store/modules/role"
import user from "../store/modules/user"
import category from "../store/modules/category"
import specs from "./modules/specs"
import goods from "./modules/goods"
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{

    },
    getters:{

    },
    mutations:{

    },
    actions:{
        
    },
    modules:{
        menu,role,user,category,specs,goods
    }
})

export default store