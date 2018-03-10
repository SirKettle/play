import { createSelector } from 'reselect';
import { SERVICES } from './configActions';

export const configSelector = state => state.config;

export const ipInfoSelector = createSelector(
  configSelector,
  (config) => {
    if (!config) {
      return null;
    }
    return config.get(SERVICES.IP_INFO) || null;
  }
);

export const ipCountrySelector = createSelector(
  ipInfoSelector,
  (ipInfo) => {
    const defaultCountryCode = 'US';
    if (!ipInfo) {
      return defaultCountryCode;
    }
    return ipInfo.getIn(['data', 'country']) || defaultCountryCode;
  }
);
