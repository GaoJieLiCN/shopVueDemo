const BASEURL = "https://www.easy-mock.com/mock/5e8b15509b53a35204ef30aa/vueShop/"
const LOCALURL = "http://172.16.9.195:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',   //用户注册接口
    login:LOCALURL+'user/login',   //用户注册接口
}

module.exports = URL