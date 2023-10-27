export interface QueryStringProps {
  key: string;
  value: string | number;
}

export interface DynamicRoute {
  key: string;
  value: string | number;
}

export interface ChangeRouteProps {
  queryStrings?: QueryStringProps[];
  open?: 'newTab' | 'currentTab';
  dynamicRoute?: DynamicRoute[];
}

export interface LinkProps {
  href: string;
  nickname?: string;
}

export interface ContainerLinkProps {
  links: LinkProps[];
}

export type ProgressLoaderProps = {
  /**
   * Color for the TopLoader.
   * @default "#29d"
   */
  color?: string;
  /**
   * The initial position for the TopLoader in percentage, 0.1 is 10%.
   * @default 0.1
   */
  initialPosition?: number;
  /**
   * The increament delay speed in milliseconds.
   * @default 200
   */
  crawlSpeed?: number;
  /**
   * The height for the TopLoader in pixels (px).
   * @default 3
   */
  height?: number;
  /**
   * Auto increamenting behaviour for the TopLoader.
   * @default true
   */
  crawl?: boolean;
  /**
   * To show spinner or not.
   * @default true
   */
  showSpinner?: boolean;
  /**
   * Animation settings using easing (a CSS easing string).
   * @default "ease"
   */
  easing?: string;
  /**
   * Animation speed in ms for the TopLoader.
   * @default 200
   */
  speed?: number;
  /**
   * Defines a shadow for the TopLoader.
   * @default "0 0 10px ${color},0 0 5px ${color}"
   *
   * @ you can disable it by setting it to `false`
   */
  shadow?: string | false;
  /**
   * Defines a template for the TopLoader.
   * @default "<div class="bar" role="bar"><div class="peg"></div></div>
   * <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>"
   */
  template?: string;
  /**
   * Defines zIndex for the TopLoader.
   * @default 1600
   *
   */
  zIndex?: number;
};
