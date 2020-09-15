import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取菜单列表
 */
export async function getCategory() {
    let res = await $axios.get("/catelist?istree=1")
    if(res.code==200 && res.list){   // 用来判断，因为获取数据库里list为空时，返回会是null这样循环会报错，
        return res.list
    }else{
        return [];
    }
}
/**
 * 添加菜单
 * @param {*} data  添加的数据
 */
export function addCategory(data){
    return  $axios.post("/cateadd",data)
}
/**
 * 修改菜单
 * @param {*} data  修改的数据
 */
export function editCategory(data) {
    return $axios.post("/cateedit", data)
}
/**
 * 删除菜单
 * @param {*} id  删除的ID
 */
export function delCategory(id) {
    return $axios.post("/catedelete", {id})
}