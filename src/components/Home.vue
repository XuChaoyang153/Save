<template>
<!-- 引入container布局 -->
<el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>个人运动平台</span>
      </div>
      <el-button type="info" @click="logout">安全退出</el-button>
    </el-header>
    <!-- 主体 -->
  <el-container>
      <!-- 侧边栏 -->
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="toggle-Button" @click="toggleCollapse">|||</div>
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
      unique-opened :collapse="isCollapse" :collapse-transition=false :router=true
      :default-active="activePath">
        <!-- 一级菜单 -->
        <el-submenu :index="item.path+''" v-for="item in menuList " :key="item.id">
          <template slot="title">
            <i :class="iconsObject[item.id]"></i>
            <span>{{item.title}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item :index="it.path+''" v-for="it in item.sList " :key="it.id" @click="saveNavState(it.path)">
            <template slot="title">
              <i :class="iconsObject[it.id]"></i>
              <span>{{it.title}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 主体内容 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  data() {
    return{
      // 菜单列表
      menuList:[],
      isCollapse:false,// 侧边栏伸缩
      iconsObject:{
        '100':'el-icon-location',
        '200':'el-icon-location',
        '101':'el-icon-location',
        '102':'el-icon-location',
        '103':'el-icon-location',
        '104':'el-icon-location',
        '201':'el-icon-location',
        '202':'el-icon-location',
        '203':'el-icon-location',
        '204':'el-icon-location',
      },
      activePath:'/welcome',//默认路径
    }
  },
  // onload 事件
  created() {
    // 查询menuList
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activepath');//取出session中path 修改activepath
  },
    methods: {
      logout(){
          window.sessionStorage.clear();//清除session
          this.$router.push("/login");//退出登陆
      },
      // 获取导航菜单
      async getMenuList() {
        const {data:res} = await this.$http.get("menus");
        console.log(res);
        if(res.flag != 200) return this.$message.error("获取失败");
        this.menuList = res.menus;//数据回填
      },
      //控制伸缩
      toggleCollapse(){
        this.isCollapse = !this.isCollapse;
      },
      //保存路径
      saveNavState(activePath){
        window.sessionStorage.setItem("activepath",activePath)
        this.activePath = activePath;
      }
    }
}
</script>
<style scoped>
/* 布局器样式*/
.home-container {
    height: 100%;
}
/* 头部样式 */
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;/*左右贴边*/
    padding-left: 0%;
    color: #fff;
    font-size: 20px;
    align-items: center;
}
div {
    display: flex;
    align-items: center;
}
span {
    margin-left: 15px;
    margin-right: 15px;
}
/* 侧边栏样式 */
.el-aside{
    background-color: #333744;
    border-right: none;
}
/* 主体样式 */
.el-aside.el-main {
    background-color: #eaedf1;
}
img {
    width: 55px;
    height: 55px;
} 
.toggle-Button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>