<template>



	 <div class = "common-layout">

	    <el-container>

<el-header style="background-color: red;height: 40px" >
 <div style="display: flex; justify-content: space-between; align-items: center;margin-top: 10px">
    <div style="color: white">智慧党建云平台</div>
    <div style="color: white;">
      <el-icon size="String" style="margin-top: 4px"><User /></el-icon>
      {{ username }}
          <el-dropdown style="color: white;margin-top: 4px">
            <el-icon><More /></el-icon>

              <template #dropdown>
                 <el-dropdown-menu>
<!--                     <el-dropdown-item @click = "Resume">个人中心</el-dropdown-item>-->
<!--                  <el-dropdown-item @click = "passwords">账号和安全中心</el-dropdown-item>-->
                     <el-dropdown-item @click = "logoutSys">退出系统</el-dropdown-item>
                 </el-dropdown-menu>
              </template>
          </el-dropdown>
      </div>
  </div>
</el-header>

	      <el-container>

			  <!-- 左侧菜单: -->
	        <el-aside width = "200px">



            <el-row class = "tac">
            <el-col :span = "24">

                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    @click="handleMenuClick"
                >
                <el-sub-menu v-for="m1 in menuList" :index="m1.id">
                  <template #title>
                    <el-icon><location/></el-icon>
                    <span>{{ m1.permName }}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item v-for="m2 in childrenList" :index="m2.id">{{ m2.permName }}</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
              </el-menu>

              <el-button @click="to2">总页面</el-button>
              <el-button @click="to1">申请入党</el-button>
              <el-button @click="to3">积极分子</el-button>
              <el-button @click="to4">发展对象</el-button>
              <el-button @click="to5">正式党员</el-button>


              <el-button @click="to7">党员信息管理</el-button>
              <el-button @click="to8">历史党员</el-button>

              <el-button @click="to9">主题党日活动管理</el-button>

               <el-button @click="to10">党组织信息管理</el-button>


              <el-button @click="to11">三会一课管理</el-button>


              <el-button @click="to12">民主评议党管理</el-button>

              <el-button @click="to13">用户管理</el-button>

             <el-select
                 v-model="value"
                 clearable
                 placeholder="党员信息管理"
                 style="width: 240px"
                 @change="handleSelectChange"
             >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>

            </el-col>
            </el-row>
			    </el-aside>

	        <el-container>

				<!-- 右侧主体区域: -->
	          <el-main>

				  <router-view> </router-view>

			  </el-main>


	        </el-container>
	      </el-container>
	    </el-container>


	  </div>



</template>

<script>
	import qs from 'qs'
  import {Avatar, Document, Location, More, Setting, User, UserFilled} from "@element-plus/icons-vue";

  export default {
    components: {More, User, UserFilled, Location, Document, Avatar, Setting},
    data() {
      return {
        username: '',
        menuList: [],
        childrenList: [],
        options: [
          {
            value: '新增',
            label: '',
          },
          {
            value: '出党',
            label: '',
          },
        ],
      };
    },
    methods: {
      f1(key){
        console.log(key);
        switch (key) {
          case '0':
            this.$router.push({
              name: 'applyForPartyMember'
            })
            break;
          case '1':
            this.$router.push({
              name: 'exitForPartyMember'
            })
            break;
        }
      },
      handleSelectChange(value) {
        switch (value) {
          case '新增':
            this.$router.push({ name: 'addPartyMember' });
            break;
          case '出党':
            this.$router.push({ name: 'exitPartyMember' });
            break;
            // Add more cases for other options if needed
          default:
            break;
        }
      },

      to1(){
        this.$router.push({
          name:'applyForPartyMember'
        })
      },
      to2(){
        this.$router.push({
          name:'TotalNumberOfDevelopingPartyMembers'
        })
      },
      to3(){
        this.$router.push({
          name:'Activists'
        })
      },
      to4(){
        this.$router.push({
          name:'Development'
        })
      },
      to5(){
        this.$router.push({
          name:'FormalParty'
        })
      },
      to6(){
        this.$router.push({
          name:'Probationary'
        })
      },
      to7(){
        this.$router.push({
          name:'InformationManagement'
        })
      },
      to8(){
        this.$router.push({
          name:'HistoryInformationManagement'
        })
      },
      to9(){
        this.$router.push({
          name:'TPDAM'
        })
      },
      to10(){
        this.$router.push({
          name:'POIM'
        })
      },
      to11(){
        this.$router.push({
          name:'TMAOLM'
        })
      },

      to12(){
        this.$router.push({
          name:'DEOPM'
        })
      },
      to13(){
        this.$router.push({
          name:'RPS'
        })
      },
      handleMenuClick(key) {
        switch (key) {
          case '0':
            this.$router.push({
              name: 'TotalNumberOfDevelopingPartyMembers'
            });
            break;
          case '1':
            this.$router.push({
              name: 'applyForPartyMember'
            });
            break;
          case '2':
            this.$router.push({
              name: 'Activists'
            });
            break;
          case '3':
            this.$router.push({
              name: 'Development'
            });
            break;
          case '4':
            this.$router.push({
              name: 'FormalParty'
            });
            break;
          case '5':
            this.$router.push({
              name: 'Probationary'
            });
            break;
          default:
            // Handle other menu items
            break;
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        switch (key) {
          case '4':
            this.$router.push({
              name: 'applyForPartyMember'
            })
            break;
        }
      },
      logoutSys() {
        //1.本地登录状态需要清空.
        //sessionStorage.removeItem("login_account");
        sessionStorage.clear();

        //2.服务器清除登录状态.
        // this.axios({
        // 	url: "http://localhost:8080/119/account/logout",
        // 	method: 'get'
        // });

        //3.退出到登录页面.
        this.$router.push({
          name: 'login'
        });

      }
    },
    //加载钩子函数中：解析sessionStorage数据.
    created() {
      var _this = this;
      var login_token = sessionStorage.getItem("login_token");
      //传递token到后台, 获取对应的user对象.
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/user/details',
        //data参数值: 写入一个临时表单,发送请求.
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          // 'Authorization': "Bearer "+login_token,
          'Authorization': login_token
        },
        data: qs.stringify({
          login_token: login_token
        })
      }).then(function (response) {

        //系统封装返回的对象模型:
        console.log(response);

        //系统也提供了响应状态码:
        console.log(response.status);
        if (response.status === 200) {
          //响应成功:
          //JsonResponse: code , msg , result
          console.log(response.data);
          var jsonResp = response.data;

          if (jsonResp.code === 200) {

            //提示:
            ElMessage({
              message: jsonResp.msg,
              type: 'success',
            })


            //方式二: sessionStorage(前端项目和浏览器搞个会话                                                                   )或localStorage(没有固定截止存储日期) .
            var login_user = JSON.stringify(jsonResp.result);

            sessionStorage.setItem("login_user", login_user);

            _this.username = jsonResp.result.username;


            //加载权限:
            //调用后台的菜单权限集合:
            var login_user = sessionStorage.getItem("login_user");
            var user1 = JSON.parse(login_user);
            console.log("检索后台的详细信息: ");
            console.log(user1);
            _this.axios({
              method: 'post',
              url: 'http://localhost:8080/user/menus',
              //data参数值: 写入一个临时表单,发送请求.
              headers: {
                'content-type': 'application/x-www-form-urlencoded',
                // 'Authorization': "Bearer "+login_token,
                'Authorization': login_token
              },
              data: qs.stringify({
                id: user1.id
              })
            }).then(function (response) {
              //系统封装返回的对象模型:
              console.log(response);

              //系统也提供了响应状态码:
              console.log(response.status);
              if (response.status === 200) {
                //响应成功:
                //JsonResponse: code , msg , result
                console.log(response.data);
                var jsonResp = response.data;

                if (jsonResp.code === 200) {

                  //提示:
                  ElMessage({
                    message: jsonResp.msg,
                    type: 'success',
                  })


                  /* //方式二: sessionStorage(前端项目和浏览器搞个会话)或localStorage(没有固定截止存储日期) .
                   var perms = jsonResp.result;
                   var permsJsonStr = JSON.stringify(perms);

                   sessionStorage.setItem("login_perms" , permsJsonStr);

                   //筛选: 权限集合中的菜单构建一个新集合.
                   var menus = [];
                   var index = 0;
                   for( var i = 0  ; i < perms.length ; i++  ){
                     var perm1 = perms[i];
                     if( perm1.isMenu === 1 && perm1.level === 1 ){
                       menus[index++] = perm1;
                     }
                   }

                   sessionStorage.setItem("login_menu" , menus);*/

                  //方式二: sessionStorage(前端项目和浏览器搞个会话)或localStorage(没有固定截止存储日期) .
                  var perms = jsonResp.result;
                  var permsJsonStr = JSON.stringify(perms);

                  sessionStorage.setItem("login_perms", permsJsonStr);

                  //筛选: 权限集合中的菜单构建一个新集合.
                  var menus = [];
                  var chMenus = [];
                  var index = 0;
                  for (var i = 0; i < perms.length; i++) {
                    var perm1 = perms[i];
                    var perm2 = perms[i];
                    if (perm1.isMenu === 1 && perm1.level === 1) {
                      menus[index++] = perm1;
                      if (perm1.parent_id === i && perm2.level === 2) {
                        chMenus[index++] = perm2;
                      }
                    }
                  }

                  sessionStorage.setItem("login_menu", JSON.stringify(menus));
                  sessionStorage.setItem("sub_menus", JSON.stringify(chMenus));

                  _this.childrenList = chMenus;
                  _this.menuList = menus;
                } else {
                  //登录失败:
                  ElMessage.error(jsonResp.msg)
                }

              } else {
                //响应失败: 请求失败或处理报错.
                ElMessage.error('抱歉,服务器忙,请稍后重试!')
              }
            });

          } else {
            //登录失败:
            ElMessage.error(jsonResp.msg)
          }

        } else {
          //响应失败: 请求失败或处理报错.
          ElMessage.error('抱歉,服务器忙,请稍后重试!')
        }
      });
    }
  }

</script>

<style>
 .t1 {
   margin-top    : 200px;
   align-content : center;
   color         : white;
   font-size     : 20px;
   font-weight   : bold;
   }

 h3 {
   text-align : right;
   }


 .flex-grow {
   flex-grow : 1;
   }


 .el-menu-vertical-demo {
   height : 500px;
   }

</style>
