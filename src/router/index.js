import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import UserList from '../components/admin/UserList.vue'
import Right from '../components/admin/Right.vue'
import Sport from '../components/admin/Sport.vue'
import Goods from '../components/admin/Goods.vue'

Vue.use(VueRouter)
 
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    redirect:"/welcome",
    children:[
      {path:"/welcome",component: Welcome},
      {path:"/user",component: UserList},
      {path:"/right",component: Right},
      {path:"/sport",component: Sport},
      {path:"/goods",component: Goods},
    ]
  },
  
]


const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // to 将要访问 from 从哪访问 next 接着去 next(url) 重定向到url上 next() 继续访问to路径
  if(to.path=='/login') return next();
  //获取user
  const userFlag = window.sessionStorage.getItem("user");//取出当前用户
  if(!userFlag) return next('/login');//无值返回登陆
  next();//放行
})

export default router
