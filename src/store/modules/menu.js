import {getMenu} from "../../request/menu"
export default {
    namespaced:true,
    state: {
        menuList:[]  //菜单列表
    },
    getters: {
        menuList : state=> state.menuList
    },
    mutations: {
        SET_LIST(state,data){
            state.menuList = data
        }
    },
    actions: {
        async get_menu_list({commit,dispatch,state},data){
            let res=await getMenu();
            commit('SET_LIST',res);
        }
    }
};