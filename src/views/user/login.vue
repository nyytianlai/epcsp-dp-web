<template> 
  <div class="login-container">
    <div class="login-form-box">
      <div class="title-container">
        <!-- title: '深圳市电力充储放一张网平台' -->
        <h3 class="title">{{t(`${tHead}.title`)}}</h3>
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <!-- yhdl: '用户登录' -->
        <div class="login-title">{{t(`${tHead}.yhdl`)}}</div>
        <div class="arrow left-top"></div>
        <div class="arrow right-top"></div>
        <div class="arrow left-bottom"></div>
        <div class="arrow right-bottom"></div>
        <el-form-item prop="accountName">
          <!-- qsryhm: '请输入用户名'  -->
          <el-input v-model="loginForm.accountName" :placeholder="t(`${tHead}.qsryhm`)" type="text">
            <template #prefix>
              <icon icon="svg-icon:login-user" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <!-- qsrmm: '请输入密码' -->
          <el-input
            v-model="loginForm.password"
            ref="passwordRef"
            :key="state.passwordType"
            :type="state.passwordType"
            :placeholder="t(`${tHead}.qsrmm`)"
            @keyup.enter="handleLogin(loginFormRef)"
          >
            <template #prefix>
              <icon icon="svg-icon:login-locked" />
            </template>
          </el-input>
          <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span> -->
        </el-form-item>
        <el-button
          :loading="state.loading"
          class="login-btn"
          shape="round"
          @click="handleLogin(loginFormRef)"
        >
        <!-- login: '登录' -->
          {{t(`${tHead}.login`)}}
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { setToken } from '@/utils/auth';
import { useRouter, useRoute } from 'vue-router';
import { login, getProfile } from './api';
import { useUserStore } from '@/stores/user';
import md5 from 'md5';
import Icon from '@sutpc/vue3-svg-icon';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `login`;

const route = useRoute();
const store = useUserStore();
const loginFormRef = ref();
const passwordRef = ref();
const router = useRouter();
const loginForm = reactive({
  accountName: '',
  password: ''
});
const state = reactive({
  passwordType: 'password',
  loading: false,
  redirect: undefined,
  otherQuery: {}
});

const loginRules = {
  accountName: [{ required: true, trigger: 'blur', message: t(`${tHead}.loginRules.qsryhm`) || '请输入用户名' }],
  password: [
    { required: true, trigger: 'blur', message: t(`${tHead}.loginRules.qsrmm`) ||  '请输入密码' },
    { min: 6, max: 15, message: t(`${tHead}.loginRules.mmMessage`) || '密码长度在6-15位之间', trigger: 'blur' }
  ]
};
const handleLogin = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      state.loading = true;
      login({ accountName: loginForm.accountName, password: md5(String(loginForm.password)) })
        .then(async (res) => {
          const data = res.data || {};
          sessionStorage.setItem('login-username', data);
          const profile = await getProfile();
          if (profile) {
            const token = profile.data.profile.__token;
            setToken(token);
            store.changeToken(token);
            store.changeProfile(profile.data.profile);
            sessionStorage.setItem('profile', JSON.stringify(profile.data.profile));
            router.push({ path: state.redirect || '/', query: state.otherQuery });
          }
          state.loading = false;
        })
        .catch(() => {
          state.loading = false;
        });
    } else {
      console.log('error submit!', fields);
    }
  });
};
const getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
};

watch(
  route,
  (newVal) => {
    const query = newVal.query;
    if (query) {
      state.redirect = query.redirect;
      state.otherQuery = getOtherQuery(query);
    }
  },
  {
    immediate: true
  }
);

onMounted(() => {});
</script>

<style lang="less" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url('./images/login-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .login-form-box {
    width: 650px;
    max-width: 100%;
    // border-radius: 20px;
    // padding: 43px 40px;
    margin: 0 auto;
    overflow: hidden;
    // background-color: #fff;
    position: absolute;
    right: 172px;
    top: 50%;
    transform: translateY(-50%);
  }
  .login-form {
    background: rgba(60, 94, 134, 0.18);
    border: 2px solid rgba(0, 191, 250, 0.2);
    width: 508px;
    padding: 50px 66px;
    margin: 0 auto;
    position: relative;
    :deep(.el-input) {
      font-size: 18px;
    }
    :deep(.el-input__inner) {
      height: 44px;
      line-height: 44px;
      font-size: 20px;
      color: rgba(255, 255, 255, 0.8);
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .arrow {
    width: 37px;
    height: 37px;
    background-image: url('./images/arrow.png');
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;

    &.left-top {
      left: 0;
      top: 0;
    }
    &.right-top {
      right: 0;
      top: 0;
      transform: rotate(90deg);
    }
    &.left-bottom {
      left: 0;
      bottom: 0;
      transform: rotate(-90deg);
    }
    &.right-bottom {
      right: 0;
      bottom: 0;
      transform: rotate(180deg);
    }
  }

  .login-title {
    color: #fff;
    font-size: 36px;
    text-align: center;
    margin-bottom: 40px;
  }

  .login-btn {
    width: 100%;
    height: 60px;
    font-size: 24px;
    margin-top: 55px;
    color: #fff;
    background: linear-gradient(180deg, #20b9fa 0%, #007de9 100%);
  }

  .tips {
    font-size: 14px;
    color: #68759c;
    margin-bottom: 10px;

    .login-links {
      float: right;

      a {
        color: #2957ff;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 48px;
      background: linear-gradient(0deg, #0297c6 0%, #b9e6ff 63.33%, #f4f5ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    // color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

@media screen and (max-width: 1200px) {
  .login-container {
    .title-container {
      .title {
        font-size: 35px;
        margin-bottom: 30px;
      }
    }

    .login-btn {
      margin-top: 40px;
    }
  }
}
</style>
