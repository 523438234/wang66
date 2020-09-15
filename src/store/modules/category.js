import {getCategory} from "../../request/category"
export default {
    namespaced:true,
    state: {
        cateList:[]  //菜单列表
    },
    getters: {
        cateList : state=> state.cateList
    },
    mutations: {
        SET_LIST(state,data){
            state.cateList = data
        }
    },
    actions: {
        async get_cate_list({commit,dispatch,state},data){
            let res=await getCategory();
            commit('SET_LIST',res);
        }
    }
};