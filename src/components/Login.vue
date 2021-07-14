<template>
    <div class="login_container">
        <!-- 登陆块 -->
        <div class="login_box">
            <!-- logo -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 表单区域 -->
            <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" class="login_form" label-width="0">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-key
"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resstLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            loginForm:{
                username:"admin",
                password:"123456"
            },
            loginRules:{
                username:[
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        //重置表单内容
        resstLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        //登陆方法
        login(){
            //验证校验规则
            this.$refs.loginFormRef.validate( async (valid) =>{
                if( !valid ) return;//验证失败
                const {data:res} = await this.$http.post("login1",this.loginForm);//访问后台
                if( res.flag == "ok"){
                    this.$message.success("操作成功");//信息提示
                    this.$router.push({path:"/home"});//界面跳转
                    window.sessionStorage.setItem("user",res.user);//存储user对象
                }else{
                    this.$message.error("操作失败");//错误信息
                }
            } )
        }
    },
}
</script>
<style scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    
}
.avatar_box img{
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #0ee;
    
}
img{
    width: 100%;
    height: 100%;
    background-color: #eee;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
.el-blreadcrumb{
    margin-bottom: 15px;
    font-size: 17px;
}
</style>
