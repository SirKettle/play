
const trackPage = (routePath) => {
  if (window.ga) {
    window.ga('send', 'pageview', `/#${routePath}`);
  }
};

const trackEvent = (type, key, data) => {
  if (window.ga) {
    window.ga('send', {
      hitType: 'event',
      eventCategory: type,
      eventAction: key,
      eventLabel: data
    });
  }
};

export default {
  page: trackPage,
  event: trackEvent
};
