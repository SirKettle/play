
export const buildUrlWithQueryParams = (url, queryParams) => {
  if (!queryParams) {
    return url;
  }
  const queryPart = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');
  return `${url}?${queryPart}`;
};

export default {
  buildUrlWithQueryParams
};
