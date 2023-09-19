export const buildParams = (params: { [key: string]: string }) => {
  let queryString = '';
  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== '') {
      queryString = `${queryString}${key}=${value}&`;
    }
  });

  if (queryString.length > 0) {
    queryString = `?${queryString.substring(0, queryString.length - 1)}`;
  }

  return queryString;
};
