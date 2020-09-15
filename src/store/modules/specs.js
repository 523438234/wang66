import {getSpecs,getSpecsTotal} from "../../request/specs"


export default {
    namespaced:true,
    state: {
        specsList:[],  //菜单列表
        page:1, // 页码数
        size:10, // 每页数量
        total:0,  //总条数
    },
    getters: {
        specsList : state=> state.specsList,
        page:state=> state.page,
        size:state=> state.size,
        total:state=> state.total,
    },
    mutations: {
        SET_LIST(state,data){
            state.specsList = data
        },
        SET_PAGE(state,data){
            state.page=data
        },
        SET_SIZE(state,data){
            state.size=data
        },
        SET_TOTAL(state,data){
            state.total=data
        },
    },
    actions: {
        async get_Specs_list({commit,dispatch,state}){
            let res = await getSpecs(state.page,state.size);  
            // console.log(res);
            commit('SET_LIST',res);
            dispatch('get_Specs_total')
        },
        async get_Specs_total({commit}){
            let res = await getSpecsTotal();
            // console.log(res)
            commit('SET_TOTAL',res.list[0].total)
        },
        set_page({ commit,dispatch }, data){
            commit('SET_PAGE',data)
            dispatch('get_Specs_list')
        },
        set_size({ commit, dispatch},data){
            commit('SET_SIZE', data)
            dispatch('get_Specs_list')
        },
    }
};