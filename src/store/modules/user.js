import {getUser,getTotal,Login} from "../../request/user"
import { Message } from "element-ui"
import router from "@/router"

// 因为仓库里的数据刷新会消失,所以登录进去之后刷新数据会消失,所以将登录获取的数据存入localstorange中
let userinfo = localStorage.getItem("userinfo")? JSON.parse(localStorage.getItem("userinfo")) : {};

export default {
    namespaced:true,
    state: {
        userList:[],  //菜单列表
        page:1, // 页码数
        size:1, // 每页数量
        total:0,  //总条数
        userinfo:userinfo
    },
    getters: {
        userList : state=> state.userList,
        page:state=> state.page,
        size:state=> state.size,
        total:state=> state.total,
        menus: state => state.userinfo.menus,
        menus_url: state => state.userinfo.menus_url,
        username: state => state.userinfo.username
    },
    mutations: {
        SET_LIST(state,data){
            state.userList = data
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
        SET_USERINFO(state,data){
            localStorage.setItem("userinfo",JSON.stringify(data))
            state.userinfo=data
        },
        QUIT(state){
            localStorage.removeItem("userinfo");
            state.userinfo={};
            router.push("/login")
        }
    },
    actions: {
        async get_user_list({commit,dispatch,state}){
            let res = await getUser(state.page,state.size);  
            // console.log(res);
            commit('SET_LIST',res);
            dispatch('get_user_total');
        },
        async get_user_total({commit}){
            let res = await getTotal();
            // console.log(res)
            commit('SET_TOTAL',res.list[0].total)
        },
        set_page({ commit,dispatch }, data){
            commit('SET_PAGE',data)
            dispatch('get_user_list')
        },
        set_size({ commit, dispatch},data){
            commit('SET_SIZE', data)
            dispatch('get_user_list')
        },
        async login({commit},data){
            let res = await Login(data);
            if(res.code==200){
                commit('SET_USERINFO',res.list)
                console.log(res)
                Message.success('登录成功') 
                router.push("/") // 跳转到后台首页
            }else{
                Message.error(res.msg) 
            }
        }
    }
};