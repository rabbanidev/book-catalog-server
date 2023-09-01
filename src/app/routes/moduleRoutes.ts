import { IRoute } from '../../interfaces/route';
import { AuthRoutes } from '../modules/auth/auth.route';

const modulesRoutes: IRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

export default modulesRoutes;
