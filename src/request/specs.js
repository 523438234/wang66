import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取菜单列表
 */
export async function getSpecs(page = 1,size=10) {
    let res = await $axios.get("/specslist",{
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
export function addSpecs(data){
    return  $axios.post("/specsadd",data)
}
/**
 * 修改菜单
 * @param {*} data  修改的数据
 */
export function editSpecs(data) {
    return $axios.post("/specsedit", data)
}
/**
 * 删除菜单
 * @param {*} id  删除的ID
 */
export function delSpecs(id) {
    return $axios.post("/specsdelete", {id})
}

// 获取总数据条数 total
export function getSpecsTotal(){
    let res=$axios.get("/specscount");
    // console.log(res)
    return res;
}