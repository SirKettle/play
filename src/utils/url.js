export const getUriSafe = str => str.replace(/ /gi, '-').replace(/[^A-Za-z0-9_-]/gi, '');

export const encodeUriSafe = str => str.replace(/ /gi, '_').replace(/[^A-Za-z0-9_-]/gi, '');

export const decodeUriSafe = str => str.replace(/_/gi, ' ');
