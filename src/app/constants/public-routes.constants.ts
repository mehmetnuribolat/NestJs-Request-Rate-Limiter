import { RouteModel } from '../core/dtos';

export class PublicRoutes {
  public static requestOne: RouteModel = {
    path: '/requestOne',
    request_weight: 1,
  };
  public static requestTwo: RouteModel = {
    path: '/requestTwo',
    request_weight: 2,
  };
  public static requestThree: RouteModel = {
    path: '/requestThree',
    request_weight: 5,
  };
}
