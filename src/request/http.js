import axios from "axios";
import QS from "qs";
import router from "../router";
import store from "../store";
import types from "../store/actionTypes";
const instance = axios.create({
  baseURL: "/index.php?route=apis/",
  timeout: 60000
});
// axios.defaults.baseURL = ''
// axios.defaults.timeout = 60000
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 跳转登录页

const toLogin = () => {
  store.commit(types.LOG_OUT);
  router.replace({
    path: "/login",
    query: {
      redirect:
        router.currentRoute.fullPath != "/login"
          ? router.currentRoute.fullPath
          : "/home"
    }
  });
  // return new Promise(() => { })
};

// axios.interceptors.request.use()  请求拦截
// 响应拦截
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code === 100) {
        toLogin();
        // return Promise.resolve()
      }
      // else {
      return Promise.resolve(response);
      // }
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      // tip(error.response)
      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法封装
 * @param  {String} url [请求的url地址]
 * @param {Object} params [请求携带的参数]
 * @param {Boolean} shouldLogin [请求时是否需要登录状态]
 **/
export function get(url, params = {}, shouldLogin = true) {
  return new Promise((resolve, reject) => {
    let uid = store.state.uid;
    let sr = store.state.sr;
    if (shouldLogin && !uid) {
      toLogin();
      return false;
    }
    if (uid && !params.uid) {
      params.uid = uid;
    }
    params.sr = sr;
    // let loading = Loading.service({
    //     fullscreen: true,
    //     text: '加载中...',
    //     background: 'transparent'
    // })
    store.commit(types.OPEN_LOADING);
    instance
      .get(url, {
        params: params
      })
      .then(res => {
        store.commit(types.CLOSE_LOADING);
        // loading.close()
        resolve(res.data);
      })
      .catch(err => {
        // loading.close()
        store.commit(types.CLOSE_LOADING);
        reject(err.data);
      });
  });
}

/**
 * post方法封装
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求携带的参数]
 * @param {Boolean} shouldLogin [请求时是否需要登录状态]
 * **/

export function post(url, params = {}, shouldLogin = true) {
  return new Promise((resolve, reject) => {
    let uid = store.state.uid;
    let sr = store.state.sr;
    if (shouldLogin && !uid) {
      toLogin();
      return false;
    }
    if (uid && !params.uid) {
      params.uid = uid;
    }
    params.sr = sr;
    store.commit(types.OPEN_LOADING);
    instance
      .post(url, QS.stringify(params))
      .then(res => {
        store.commit(types.CLOSE_LOADING);
        resolve(res.data);
      })
      .catch(err => {
        store.commit(types.CLOSE_LOADING);
        reject(err.data);
      });
  });
}
