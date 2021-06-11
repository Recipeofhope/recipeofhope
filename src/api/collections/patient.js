import http from '../http/common';

const resource = '/patient';

export default {
  getAvailableMeals: () => http.get(`${resource}/get-meals`),

  bookMeals: (payload) => http.put(`${resource}/book-meals`, payload),

  addToWaitlist: (payload) => http.post(`${resource}/waitlist`, payload),
};
