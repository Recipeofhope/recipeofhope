import http from '../http/common';

const resource = '/cook';

export default {
  updateCookSchedule: (payload) => http.put(`${resource}/schedule`, payload),
};
