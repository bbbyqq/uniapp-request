import http from './index';

const url = {
  login: 'system/user/login',
  listByOrgId: 'system/port-data/listByOrgId',
};

export const login = (data) => {
  return http({
    url: url.login,
    method: 'POST',
	data: data
  });
}

export const getListByOrgId = (data) => {
  return http({
    url: url.listByOrgId,
    method: 'GET',
	data: data
  });
}
