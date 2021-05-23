import http from '../http/common'

const resource = '/user'

export default {

	login: (payload) => http.post(`${resource}/login`, payload),

	logout: (payload) => http.post(`${resource}/logout`, payload),

}