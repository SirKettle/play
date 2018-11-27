
import { reduce, pick } from 'ramda';

import Home from './components/Routes/Home';
import Canvas from './components/Routes/Canvas';
import Fantasy from './components/Routes/FPL';

export const ROUTES = {
  ROOT: { name: '__root__', path: '/', component: Home, label: 'Home', inNav: true },
  CANVAS: { name: 'canvas', path: '/canvas', component: Canvas, label: 'Canvas', inNav: true },
  FPL: { name: 'fpl', path: '/fpl', component: Fantasy, label: 'FPL', inNav: true }
};

const composeLink = route => pick(['name', 'label'], route);
const composeRouteDefinition = route => pick(['name', 'path'], route);

export const components = reduce((acc, route) => ({
  ...acc,
  [route.name]: route.component
}), {}, Object.values(ROUTES));

const routes = Object.values(ROUTES)
  .map(composeRouteDefinition);

export const navItemLinks = Object.values(ROUTES)
  .filter(route => route.inNav === true)
  .map(composeLink);

export default routes;
