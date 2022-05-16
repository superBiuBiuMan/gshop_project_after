import store from "@/store"
/**
 * 
 * @param {string} str 要检测的字符串 
 * @return {boolean} 真,含有,假则没有
 */
function hasBtnPermission(str){
    return store.state.user.buttons.includes(str);
}

export default hasBtnPermission