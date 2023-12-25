import { useRouter as useNextRouter } from 'next/navigation';
import { ChangeRouteProps, UseRouterTypes } from '../types';
import { progress } from '../services/progressService';
import { changeRoute } from '../services/eventsServices';

/**
 * The new and updated useRouter() hook
 */
export function useRouter(): UseRouterTypes {
  const router = useNextRouter();

  function push(routeName: string, params?: ChangeRouteProps) {
    changeRoute(routeName, params);
  }

  function back() {
    progress.start();
    router.back();
  }

  function replace(routeName: string, params?: ChangeRouteProps) {
    changeRoute(routeName, params);
  }

  return { ...router, push, back, replace };
}
