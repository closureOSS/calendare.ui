import { inject, Service, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Service()
export class BreadcrumbService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  // A read-only Signal holding the current breadcrumbs list
  readonly breadcrumbs: Signal<Breadcrumb[]>;

  constructor() {
    // Listen for NavigationEnd events, then rebuild the breadcrumb tree
    const breadcrumbStream$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumbs(this.activatedRoute.root))
    );

    // Convert the RxJS stream into a modern Angular Signal
    this.breadcrumbs = toSignal(breadcrumbStream$, { initialValue: [] });
  }

  /**
   * Recursively crawls the active route tree to generate breadcrumbs.
   */
  private buildBreadcrumbs(
    route: ActivatedRoute | null,
    url  = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    if (!route) {
      return breadcrumbs;
    }

    // Get the route's path configuration
    const routePath = route.routeConfig?.path || '';
    let nextUrl = url;
    let label = route.routeConfig?.data?.['breadcrumb'] || '';

    // If there is a route path, append it to build the full navigation link
    if (routePath) {
      // Handle dynamic route parameters (e.g. ':userId')
      const pathSegments = routePath.split('/');
      const parsedSegments = pathSegments.map((segment) => {
        if (segment.startsWith(':')) {
          const paramName = segment.slice(1);
          const paramValue = route.snapshot.params[paramName];

          // If the breadcrumb label matches the param placeholder, replace it with the dynamic value
          if (label === segment) {
            label = paramValue;
          }
          return paramValue;
        }
        return segment;
      });

      const resolvedPath = parsedSegments.join('/');
      nextUrl = `${url}/${resolvedPath}`;
    }

    // Add to breadcrumbs array if a valid label exists
    if (label) {
      breadcrumbs.push({
        label,
        url: nextUrl || '/',
      });
    }

    // Recursively process the active child route
    return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
  }
}
