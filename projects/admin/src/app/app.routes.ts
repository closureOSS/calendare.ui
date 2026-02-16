import { Routes } from '@angular/router';
import { PageNotFound } from './page-not-found/page-not-found';
import { PageLogin } from './page-login/page-login';
import { isPreAuthenticated, isAuthenticatedChild, isUnlinkedAccount, isAuthenticated } from './core/can-match-authenticated';
import { PageMode } from './a9uitemplate/page-mode';
import { marker as _ } from "@jsverse/transloco-keys-manager/marker";

export const routes: Routes = [
  { path: 'start', pathMatch: 'full', redirectTo: '/my/credentials' },
  {
    path: 'my',
    title: _('My profile'),
    data: {
      menu: { label: _('My profile'), section: true, },
      pageMode: PageMode.Default,
    },
    canActivateChild: [isAuthenticatedChild],
    children: [
      {
        path: 'credentials',
        data: {
          pageMode: PageMode.Default,
          menu: { label: _('Credentials'), icon: 'id_card' }
        },
        canActivate: [isAuthenticated],
        loadComponent: () => import('./page-my-credentials/page-my-credentials').then(c => c.PageMyCredentials),
      },
      {
        path: 'principal',
        data: {
          pageMode: PageMode.Default,
          menu: { label: _('Principal'), icon: 'person' }
        },
        canActivate: [isAuthenticated],
        loadComponent: () => import('./page-my-principal/page-my-principal').then(c => c.PageMyPrincipal),
      },
      {
        path: 'calendars',
        data: {
          pageMode: PageMode.Default,
          menu: { label: _('Calendars'), icon: 'calendar_today' }
        },
        canActivate: [isAuthenticated],
        loadComponent: () => import('./page-my-calendars/page-my-calendars').then(c => c.PageMyCalendars),
      },
      {
        path: 'addressbooks',
        data: {
          pageMode: PageMode.Default,
          menu: { label: _('Addressbooks'), icon: 'contacts' }
        },
        canActivate: [isAuthenticated],
        loadComponent: () => import('./page-my-addressbooks/page-my-addressbooks').then(c => c.PageMyAddressbooks),
      },
    ]
  },
  {
    path: 'sysops',
    title: _('Administration'),
    data: {
      menu: { label: _('Administration'), section: true },
      pageMode: PageMode.Default,
    },
    canActivateChild: [isAuthenticatedChild],
    children: [
      {
        path: 'principal',
        title: _('All principals'),
        data: {
          menu: { label: _('All principals'), icon: 'person_search' }
        },
        canActivate: [isAuthenticated],
        loadComponent: () => import('./page-list-principals/page-list-principals').then(c => c.PageListPrincipals),
      },
      {
        path: 'features',
        // title: _('Features'),
        data: {
          menu: { label: _('Features'), icon: 'tune' }
        },
        canActivate: [isAuthenticated],
        loadComponent: () => import('./page-features/page-features').then(c => c.PageFeatures),
      },
      {
        path: 'maintenance',
        // title: _('Maintenance'),
        data: {
          menu: { label: _('Maintenance'), icon: 'construction' }
        },
        canActivate: [isAuthenticated],
        loadComponent: () => import('./page-maintenance/page-maintenance').then(c => c.PageMaintenance),
      },
    ]
  },
  {
    path: 'principal',
    data: {
      pageMode: PageMode.Default,
    },
    // canMatch: [canMatchAuthenticated],
    canActivateChild: [isAuthenticatedChild],
    children: [
      {
        path: 'new/:principalTypeLabel',
        loadComponent: () => import('./create-principal/create-principal').then(c => c.CreatePrincipal),
      },
      {
        path: 'edit/:username',
        loadComponent: () => import('./edit-principal/edit-principal').then(c => c.EditPrincipal),
        canDeactivate: [(component) => component.confirmCancel()],
      },
      {
        path: 'permissions/:username',
        loadComponent: () => import('./edit-principal-permissions/edit-principal-permissions').then(c => c.EditPrincipalPermissions),
        canDeactivate: [(component) => component.confirmCancel()],
      },
      {
        path: 'delete/:username',
        loadComponent: () => import('./delete-principal/delete-principal').then(c => c.DeletePrincipal),
      },
      {
        path: 'members/:username',
        loadComponent: () => import('./edit-members/edit-members').then(c => c.EditMembers),
        canDeactivate: [(component) => component.confirmCancel()],
      },
      {
        path: 'privileges/:username',
        loadComponent: () => import('./edit-privileges/edit-privileges').then(c => c.EditPrivileges),
        canDeactivate: [(component) => component.confirmCancel()],
      },
      {
        path: 'show/:username',
        loadComponent: () => import('./page-principal/page-principal').then(c => c.PagePrincipal),
        // children: [
        //   {
        //     path: '**',
        //     resolve: {
        //       slugs: wildcardSlugsResolver,
        //     },
        //     component: PagePrincipalComponent,
        //   },
        // ]
      },
      // { path: '', pathMatch: 'full', component: PageNotFound },
    ]
  },
  {
    path: 'collection',
    data: {
      pageMode: PageMode.Default,
    },
    // canMatch: [canMatchAuthenticated],
    canActivateChild: [isAuthenticatedChild],
    children: [
      {
        path: 'edit/:username',
        loadComponent: () => import('./edit-collection/edit-collection').then(c => c.EditCollection),
        canDeactivate: [(component) => component.confirmCancel()],
      },
      {
        path: 'permissions/:username',
        loadComponent: () => import('./edit-collection-permissions/edit-collection-permissions').then(c => c.EditCollectionPermissions),
        canDeactivate: [(component) => component.confirmCancel()],
      },
      {
        path: 'create/:username/:collectionTypeLabel',
        loadComponent: () => import('./create-collection/create-collection').then(c => c.CreateCollection),
        canDeactivate: [(component) => component.confirmCancel()],
      },
      {
        path: 'create/:username',
        loadComponent: () => import('./create-collection/create-collection').then(c => c.CreateCollection),
        canDeactivate: [(component) => component.confirmCancel()],
      },
    ]
  },
  {
    path: 'login',
    title: _('Welcome'),
    data: { pageMode: PageMode.Modal },
    component: PageLogin,
  },
  {
    path: 'goodbye',
    title: _('Logout'),
    data: { pageMode: PageMode.Modal },
    loadComponent: () => import('./page-goodbye/page-goodbye').then(c => c.PageGoodbye),
  },
  {
    path: 'onboarding',
    data: { pageMode: PageMode.Modal },
    loadComponent: () => import('./page-onboarding/page-onboarding').then(c => c.PageOnboarding),
    // canMatch: [canMatchAuthenticated],
    canActivate: [isPreAuthenticated, isUnlinkedAccount]
  },
  {
    path: 'onboarding/link',
    data: { pageMode: PageMode.Modal },
    loadComponent: () => import('./page-onboarding-link/page-onboarding-link').then(c => c.PageOnboardingLink),
    // canMatch: [canMatchAuthenticated],
    canActivate: [isPreAuthenticated, isUnlinkedAccount]
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', component: PageNotFound, canActivate: [isPreAuthenticated],/* canMatch: [canMatchAuthenticated]*/ },
  { path: '**', component: PageLogin },
];
