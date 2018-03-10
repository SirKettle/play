import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
// import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import createRouter from '../../utils/createRouter';
import configureStore from '../../store/configureStore';
import routes from '../../routes';

const initialImmutableState = Immutable.fromJS({
  movies: {},
  moods: {}
});


// Almost all parts of our store state are Immutable objects but some are native objects
const initialState = initialImmutableState
  .set('router', { route: { name: '__root__', params: {}, path: '' } });


const router = createRouter(routes);
const store = configureStore(router, initialState);

const storeDecorator = (story) => {
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        {story()}
      </RouterProvider>
    </Provider>
  );
};

export default storeDecorator;
