import {getGoods,getGoodsTotal} from "../../request/goods"


export default {
    namespaced:true,
    state: {
        goodsList:[],  //菜单列表
        page:1, // 页码数
        size:5, // 每页数量
        total:0,  //总条数
    },
    getters: {
        goodsList : state=> state.goodsList,
        page:state=> state.page,
        size:state=> state.size,
        total:state=> state.total,
    },
    mutations: {
        SET_LIST(state,data){
            state.goodsList = data
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
        async get_Goods_list({commit,dispatch,state}){
            let res = await getGoods(state.page,state.size);  
            commit('SET_LIST',res);
            dispatch('get_Goods_total')
        },
        async get_Goods_total({commit}){
            let res = await getGoodsTotal();
            commit('SET_TOTAL',res.list[0].total)
        },
        set_page({ commit,dispatch }, data){
            commit('SET_PAGE',data)
            dispatch('get_Goods_list')
        },
        set_size({ commit, dispatch},data){
            commit('SET_SIZE', data)
            dispatch('get_Goods_list')
        },
    }
};