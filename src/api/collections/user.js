import http from '../http/common';

const resource = '/user';

export default {
  updateUserInfo: (id, payload) => http.put(`${resource}/${id}`, payload),
};
