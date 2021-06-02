import http from '../http/common';

const resource = '/cook';

export default {
  updateCookSchedule: (payload) => http.put(`${resource}/schedule`, payload),

  markMealsAsReady: (payload) => http.post(`${resource}/meals-ready`, payload),
};
