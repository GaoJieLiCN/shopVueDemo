<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
      <div class="register-button">
        <van-button type="primary" size="large" @click="axiosLoginUser">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from 'vant'
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //*********axios注册用户方法********
    axiosLoginUser() {
        console.log(this.username)
        console.log(this.password)
      axios({
        url: url.login,
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(response => {
          console.log(response);
        

        })
        .catch(error => {
          console.log(error);
           this.$router.push('/') 
        });
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>