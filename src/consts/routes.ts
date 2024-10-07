export type RouteName =
  | 'dashboard'
  | 'friends'
  | 'friend-requests';

export interface Route {
  name: RouteName;
  href: string;
}

export const ROUTES: Route[] = [
  {
    name: 'dashboard',
    href: '/',
  },
  {
    name: 'friends',
    href: '/friends',
  },
  {
    name: 'friend-requests',
    href: '/friend-requests',
  },
];

export const PUBLIC_ROUTES: string[] = ['/login', '/forgot-password'];
