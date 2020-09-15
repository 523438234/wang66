import {getRole} from "../../request/role"
export default {
    namespaced:true,
    state: {
        roleList:[]  //菜单列表
    },
    getters: {
        roleList : state=> state.roleList
    },
    mutations: {
        SET_LIST(state,data){
            state.roleList = data
        }
    },
    actions: {
        async get_role_list({commit,dispatch,state},data){
            let res=await getRole();
            commit('SET_LIST',res);
        }
    }
};