import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取菜单列表
 */
export async function getGoods(page = 1,size=10) {
    let res = await $axios.get("/goodslist",{
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
export function addGoods(data){
    return  $axios.post("/goodsadd",data)
}
/**
 * 修改菜单
 * @param {*} data  修改的数据
 */
export function editGoods(data) {
    return $axios.post("/goodsedit", data)
}
/**
 * 删除菜单
 * @param {*} id  删除的ID
 */
export function delGoods(id) {
    return $axios.post("/goodsdelete", {id})
}

// 获取总数据条数 total
export function getGoodsTotal(){
    let res=$axios.get("/goodscount");
    // console.log(res)
    return res;
}