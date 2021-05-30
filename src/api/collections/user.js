import http from '../http/common';

const resource = 'https://recipeofhope.herokuapp.com/user';

export default {
    updateUserInfo: (id, payload) => http.put(`${resource}/${id}`, payload)
};
