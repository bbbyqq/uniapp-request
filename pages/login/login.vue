<template>
	<view class="content">
		<input type="text" class="input" v-model="form.username">
		<input type="password" class="input" v-model="form.password">
		<button type="primary" @click="handleClick">登录</button>
	</view>
</template>

<script>
	import {
		login
	} from '../../service/api.js'
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				}
			}
		},
		mounted() {
			this.loginError()
		},
		methods: {
			handleClick() {
				login(this.form).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						// 将登录信息储存到缓存
						uni.setStorageSync('userInfo', JSON.stringify(res.data))
						uni.navigateTo({
							url:'../index/index'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			loginError() {
				uni.setStorageSync('userInfo', '')
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 20px;
	}

	.input {
		border: 1px solid #ccc;
		margin: 40px 0;
		height: 40px;
	}
</style>
