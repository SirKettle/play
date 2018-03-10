
import { reduce, pick } from 'ramda';

import Home from './components/Routes/Home';
import About from './components/Routes/About';
import Canvas from './components/Routes/Canvas';

export const ROUTES = {
  ROOT: { name: '__root__', path: '/', component: Home, label: 'Home', inNav: true },
  ABOUT: { name: 'about', path: '/about', component: About, label: 'About', inNav: true },
  CANVAS: { name: 'canvas', path: '/canvas', component: Canvas, label: 'Canvas', inNav: true }
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
