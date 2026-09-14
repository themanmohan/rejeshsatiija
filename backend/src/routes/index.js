import { leadRoutes } from './leadRoutes.js';
import { systemRoutes } from './systemRoutes.js';

export const routes = [...systemRoutes, ...leadRoutes];

export function findRoute(method, path) {
  return routes.find((route) => route.method === method && route.path === path);
}
