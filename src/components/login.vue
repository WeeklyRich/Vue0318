<template >
  <div class="background">
    <img src="../assets/login/login-background.jpg" style="width: 100%; height: auto;" alt="" />
  </div>
  <h1 style="display: flex;
  justify-content: center;
  align-items: center;color: white;padding-top: 100px">智慧党建云平台</h1>
  <div class="log">
    <div style="height: 400px ;width: 800px;" class="loginForm sign-in-form">
      <el-form v-model="form" style="padding-left: 400px" ref="ruleForm">
        <el-form-item style="margin-top: 80px;width: 400px" label="账号">
          <el-input v-model="form.username" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item style=";width: 400px" label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="输入密码"></el-input>
        </el-form-item>

        <el-form-item style="padding-top: 30px">
          <el-button type="danger" style="margin-left: 100px;width: 200px" round @click="login" color="red">登录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>忘记密码 <a href="">立即找回</a></p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

	export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
      }
    },
    methods: {
      qwe(){
        this.$router.push({
          name:'personalRegistration'
        })
      },
      login() {
        var _this = this;


        this.axios({
          url: 'http://localhost:8080/user/login',
          method: 'get',
          params: {
            username: _this.form.username,
            password: _this.form.password,
          }
        }).then(function(response){

          //系统封装返回的对象模型:
          console.log(response);

          //系统也提供了响应状态码:
          console.log(response.status);
          if( response.status == 200 ){
            //响应成功:
            //JsonResponse: code , msg , result
            console.log(response.data);
            var jsonResp = response.data;

            if(jsonResp.code == 200){
              //提示:
              ElMessage({
                message: jsonResp.msg,
                type: 'success',
              })
              //登录成功:  方式一: cookie中存储jsessionid.
              //方式二: sessionStorage(前端项目和浏览器搞个会话)或localStorage(没有固定截止存储日期) .
              sessionStorage.setItem("login_token" , jsonResp.result);
              //跳转其他页面: 后台首页.
              console.log( this );
              _this.$router.push({
                name: 'index_main'
              });
            }else{
              //登录失败:
              ElMessage.error(jsonResp.msg)
            }
          }else{
            //响应失败: 请求失败或处理报错.
            ElMessage.error('抱歉,服务器忙,请稍后重试!')
          }
        });
      },
    }
  }
</script>

<style scoped>
.background{
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: absolute;
  }

.log{
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  }
/* from表单 */
.loginForm {
  margin-top: 20px;
  background-image: url("../assets/loginbg.jpg");
  background-size: cover;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 6px 10px #cccc;

  }
.submit-btn {
  width: 100%;
  }
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
  }
.tiparea p a {
  color: #409eff;
  }
</style>
