<template>
	<h2>模拟实现用户管理</h2>
	
	<!-- 条件搜索表单: -->
	<el-form :inline="true" :model="formInline" class="demo-form-inline">
		
	    <el-form-item label="用户名称">
	      <el-input v-model="formInline.user" placeholder="请输入查询用户名" clearable />
	    </el-form-item>
	 
	    <el-form-item>
	      <el-button type="primary" @click="onSubmit">查询</el-button>
	    </el-form-item>
		
		<el-form-item v-if="checkPermission('user:add')">
		  <el-button type="success" @click="addUser">新增用户</el-button>
		</el-form-item>
		
	  </el-form>
	
	
	<!-- 数据表格: -->
	<el-table :data="tableData" border style="width: 100%">
		
	    <el-table-column prop="id" label="编号" width="150" />
		
	    <el-table-column prop="username" label="姓名" width="150" />
		
		
		 <el-table-column label="操作" >
		     <template #default="scope">
		      
			   <el-button size="small" 
			   @click="handleShow(scope.row)"
		         >查看</el-button
		       >
			   
			   <el-button size="small"
				 type="primary"
				 @click="handleEdit(scope.row)"
				 v-if="checkPermission('user:edit')"
			     >修改</el-button
			   >
			   
		       <el-button
		         size="small"
		         type="danger"
		         @click="handleDelete(scope.row)"
				 v-if="checkPermission('user:del')"
		         >删除</el-button
		       >
		     </template>
		 </el-table-column>
	  </el-table>
	  
	  
	  <!-- 添加分页查询: -->
	    <div class="pagination-block">
	      <el-pagination
	        v-model:current-page="currentPage4"
	        v-model:page-size="pageSize4"
	        :page-sizes="sizes"
	        :small="small"
	        :disabled="disabled"
	        :background="background"
	        layout="total, sizes, prev, pager, next, jumper"
	        :total="total"
	        @size-change="query"
	        @current-change="query"
	      />
	    </div>
	
	
</template>

<script>
	
	export default{
		data(){
			return {
				tableData: [],
				currentPage4: 1 , //当前页码.
				pageSize4: 5, //每页大小.
				sizes: [5, 10, 15, 20], //选择切换的页码大小
				small: false,
				disabled: false,
				background: false,
				total: 0, //总条数.
				//搜索条件:
				formInline: {
					user: ''
				}
			};
		},
		methods: {
			checkPermission( chk_perm ){
				
				//chk_perm: user:add 、user:edit、user:del 
				
				var login_perms = sessionStorage.getItem( "login_perms" );
				var permsList = JSON.parse( login_perms );
				//1.先将对象数组中的所有权限code解析到一个新集合或数组中:
				//例如:  [  {code: ‘user:add’ , name: '用户新增'} , {code: ‘user:del’ , name: '用户删除'} ]
				//		解析为: [ ‘user:add’ , 'user:del' ]
				var permsCodeList = [];
				for(var i = 0 ; i < permsList.length ;i++ ){
					permsCodeList.push( permsList[i].permCode );
				}
				
				console.log("等待比较的权限: " + chk_perm);
				console.log("权限Code集合: " + permsCodeList);
				//检查传递的: chk_perm 是否存在于  login_perms集合中.
				var result = permsCodeList.includes( chk_perm );
				
				//如果存在: 有权限则直接reuturn true. 且动态提供后台访问地址.
				return result;
				
			},
			handleShow( row ){
				console.log( row.uid );
				this.$router.push({
					name: 'show_user',
					params: {
						uid: row.uid
					}
				});
			},
			handleEdit( row ){
				console.log( row.uid );
			},
			handleDelete( row ){
				console.log( row.uid );
				var _this = this;
				//询问:
				//确定删除:
				ElMessageBox.confirm(
				    '确认删除编号为: ' + row.uid + ' 的用户记录吗?',
				    'Warning',
				    {
				      confirmButtonText: '确定？',
				      cancelButtonText: '取消',
				      type: 'warning',
				    }
				  )
				    .then(() => {
						
						//发起后台删除: axios请求后台: localhost:8080/119/user/del?uid = row.uid
						console.log("模拟已经删除: " + row.uid);
						//更新当前列表数据:
						_this.query();
						
				      ElMessage({
				        type: 'success',
				        message: '已完成删除',
				      })
				    })
				    .catch(() => {
				      ElMessage({
				        type: 'info',
				        message: '已取消',
				      })
				    })
				
				
			},
			//分页查询:
			query(){
				
				var _this =  this;
				var login_token = sessionStorage.getItem("login_token");
				//发起后台分页查询: 就是传递 页码, 每页大小  到后台完成查询.
				console.log("模拟正在后台查询, 使用的参数为: " + this.currentPage4+" --- "+ this.pageSize4 +" ----- " + this.formInline.user );
				this.axios({
					///user/query_by_page ： 是对应权限集合: 查询用户 对应的 url.
					url: 'http://localhost:8080/user/query_by_page',
					method: 'get',
					headers: {
						 'Authorization': login_token
					},
					params: {
						page_no: this.currentPage4,
						page_size:  this.pageSize4,
						uname: this.formInline.user
					}
				}).then(function(response){
					
					//1.先检查请求是否成功.
					if( response.status == '200' ){
						//2.检查返回状态码.
						var jsonObj = response.data;
						if(jsonObj.code == '200'){
							//3.解析结果绑定.
							
							_this.tableData = jsonObj.result;
							
						}else{
							ElMessage.error("用户列表查询过程失败,请稍后重试")
						}
						
						
						
					}else{
						//请求失败:
						ElMessage.error("用户列表更新失败,请稍后重试")
					}
					
					
					
				});
				
				//查询总条数: 发送查询条件.
				this.axios({
					url: 'http://localhost:8080/user/queryCounts',
					method: 'get',
					headers: {
						 'Authorization': login_token
					},
					params: {
						uname: this.formInline.user
					}
				}).then(function(response){
					
					//1.先检查请求是否成功.
					if( response.status == '200' ){
						//2.检查返回状态码.
						var jsonObj = response.data;
						if(jsonObj.code == '200'){
							//3.解析结果绑定.
							
							_this.total = jsonObj.result;
							
						}else{
							ElMessage.error("用户列表查询过程失败,请稍后重试")
						}
						
						
						
					}else{
						//请求失败:
						ElMessage.error("用户列表更新失败,请稍后重试")
					}
					
					
					
				});
				
				
			},
			onSubmit(){
				//初始化查询位置:
				this.currentPage4 = 1;
				
				//重新查询:
				this.query();
			},
			addUser(){
				//跳往新增:
				this.$router.push({
					name: 'add_user'
				});
			}
			
		},
		created(){
			//vue组件api初始化完毕.  手动初始化: tableData默认值.
			// this.tableData = [
			// 	{
			// 		uid: 1,
			// 		uname: '大锤',
			// 		ugender: '男',
			// 		utelphone: '110',
			// 		uaddress: '合肥市'
			// 	},
			// 	{
			// 		uid: 2,
			// 		uname: '大锤2',
			// 		ugender: '男',
			// 		utelphone: '110',
			// 		uaddress: '合肥市'
			// 	},
			// 	{
			// 		uid: 3,
			// 		uname: '大锤3',
			// 		ugender: '男',
			// 		utelphone: '110',
			// 		uaddress: '合肥市'
			// 	},
			// 	{
			// 		uid: 4,
			// 		uname: '大锤4',
			// 		ugender: '男',
			// 		utelphone: '110',
			// 		uaddress: '合肥市'
			// 	},
			// 	{
			// 		uid: 5,
			// 		uname: '大锤5',
			// 		ugender: '男',
			// 		utelphone: '110',
			// 		uaddress: '合肥市'
			// 	}
			// ];
			
			// 更换为后台交互查询:
			this.query();
			
		}
		
		
	}
</script>

<style>
	
</style>
