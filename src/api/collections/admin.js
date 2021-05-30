import http from '../http/common';

const resource = '/admin';

export default {
  getUnapprovedCooks: () => http.get(`${resource}/unapproved-cooks`),

  approveCooks: (payload) => http.patch(`${resource}/approve-cooks`, payload),
};
