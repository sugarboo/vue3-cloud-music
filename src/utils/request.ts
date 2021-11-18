import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Toast } from 'vant' // Vant轻提示组件

axios.defaults.withCredentials = true // axios跨域处理: 允许跨域携带cookie信息

const service: AxiosInstance | any = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
  
    // if (UserModule.token) {
    //   config.headers['X-Access-Token'] = UserModule.token
    // }
    // config.headers["Access-Control-Allow-Origin"] = "*"
    // config.headers["Access-Control-Allow-Headers"] = "ua,version,channel,subchannel,content-type,mgm-user-agent,IMEI,IMSI,mgm-Network-type,mgm-Network-standard,uid,logId,msisdn,location-data,location-info,mgm-network-operators,test,token,activityId,aversionid,bversionid,mtoken,OAID,HWID,deviceId"
    // config.headers["Access-Control-Allow-Methods"] = "GET,POST"
    Toast.loading({ forbidClick: true })
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response: AxiosResponse | any) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res: any = response.data
    if (res.code !== 200) {
      Toast.fail({
        message: res.message || 'Error',
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        Toast.fail({
          message: '你已被登出，可以取消继续留在该页面，或者重新登录'
        }).then(() => {
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      Toast.clear()
      return response.data
    }
  },
  (error: any) => {
    Toast.fail({
      message: error.message,
    })
    return Promise.reject(error)
  }
)

export default service
