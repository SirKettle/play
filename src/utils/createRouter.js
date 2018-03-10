import createRouter from 'router5';
// import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';

function configureRouter(routes, config = {}, useListenersPlugin = false) {
  const router = createRouter(routes, {
    ...config,
    trailingSlash: true,
    allowNotFound: true
  })
  // Plugins
  // .usePlugin(loggerPlugin)
  .usePlugin(browserPlugin({
    useHash: true
  }));

  if (useListenersPlugin) {
    router.usePlugin(listenersPlugin());
  }

  return router;
}

export default configureRouter;
