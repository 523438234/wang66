import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取菜单列表
 */
export async function getUser(page = 1,size=10) {
    let res = await $axios.get("/userlist",{
        params:{
            size,
            page
        }
    })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
/**
 * 添加菜单
 * @param {*} data  添加的数据
 */
export function addUser(data){
    return  $axios.post("/useradd",data)
}
/**
 * 修改菜单
 * @param {*} data  修改的数据
 */
export function editUser(data) {
    return $axios.post("/useredit", data)
}
/**
 * 删除菜单
 * @param {*} id  删除的ID
 */
export function delUser(uid) {
    return $axios.post("/userdelete", {uid})
}

// 获取总数据条数 total
export function getTotal(){
    let res=$axios.get("/usercount");
    // console.log(res)
    return res;
}

// 登录验证
export function Login(data){
    let res=$axios.post("/userlogin", data);
    return res;
}