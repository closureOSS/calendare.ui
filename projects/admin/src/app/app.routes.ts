import { Routes } from '@angular/router';
import { PageNotFound } from './page-not-found/page-not-found';
import { PageLogin } from './page-login/page-login';
import { isPreAuthenticated, isAuthenticatedChild, isUnlinkedAccount, isAuthenticated } from './core/can-match-authenticated';
import { marker as _ } from "@jsverse/transloco-keys-manager/marker";
import {
  matCalendarTodayOutline, matConstructionOutline, matContactsOutline, matFolderOutline,
  matIdCardOutline, matLogoutOutline, matPerson2Outline, matPersonSearchOutline, matTuneOutline
} from '@ng-icons/material-symbols/outline';

export const routes: Routes = [
  { path: 'start', pathMatch: 'full', redirectTo: '/my/credentials' },
  {
    path: '',
    data: {
      breadcrumb: _('#TitleAppname'),
    },
    canActivate: [isAuthenticated],
    loadComponent: () => import('./site-layout/site-layout').then(c => c.SiteLayout),
    children: [
      {
        path: 'my',
        title: _('My profile'),
        data: {
          menu: { label: _('My profile'), section: true, },
          breadcrumb: _('My profile'),
        },
        canActivateChild: [isAuthenticatedChild],
        children: [
          {
            path: 'credentials',
            data: {
              breadcrumb: _('Credentials'),
              menu: { label: _('Credentials'), icon: matIdCardOutline, }
            },
            canActivate: [isAuthenticated],
            loadComponent: () => import('./page-my-credentials/page-my-credentials').then(c => c.PageMyCredentials),
          },
          {
            path: 'principal',
            data: {
              breadcrumb: _('Principal'),
              menu: { label: _('Principal'), icon: matPerson2Outline, }
            },
            canActivate: [isAuthenticated],
            loadComponent: () => import('./page-my-principal/page-my-principal').then(c => c.PageMyPrincipal),
          },
          {
            path: 'calendars',
            data: {
              breadcrumb: _('Calendars'),
              menu: { label: _('Calendars'), icon: matCalendarTodayOutline, }
            },
            canActivate: [isAuthenticated],
            loadComponent: () => import('./page-my-calendars/page-my-calendars').then(c => c.PageMyCalendars),
          },
          {
            path: 'addressbooks',
            data: {
              breadcrumb: _('Addressbooks'),
              menu: { label: _('Addressbooks'), icon: matContactsOutline, }
            },
            canActivate: [isAuthenticated],
            loadComponent: () => import('./page-my-addressbooks/page-my-addressbooks').then(c => c.PageMyAddressbooks),
          },
          {
            path: 'collections',
            data: {
              breadcrumb: _('Collections'),
              menu: { label: _('Collections'), icon: matFolderOutline, }
            },
            canActivate: [isAuthenticated],
            loadComponent: () => import('./page-my-collections/page-my-collections').then(c => c.PageMyCollections),
          },
          { path: '', pathMatch: 'full', redirectTo: 'credentials', },
        ]
      },
      {
        path: 'sysops',
        title: _('Administration'),
        data: {
          menu: { label: _('Administration'), section: true },
          breadcrumb: _('Administration'),
        },
        canActivateChild: [isAuthenticatedChild],
        children: [
          {
            path: 'principal',
            title: _('All principals'),
            data: {
              breadcrumb: _('All principals'),
              menu: { label: _('All principals'), icon: matPersonSearchOutline, }
            },
            canActivate: [isAuthenticated],
            loadComponent: () => import('./page-list-principals/page-list-principals').then(c => c.PageListPrincipals),
          },
          {
            path: 'features',
            // title: _('Features'),
            data: {
              breadcrumb: _('Features'),
              menu: { label: _('Features'), icon: matTuneOutline, }
            },
            canActivate: [isAuthenticated],
            loadComponent: () => import('./page-features/page-features').then(c => c.PageFeatures),
          },
          {
            path: 'maintenance',
            // title: _('Maintenance'),
            data: {
              breadcrumb: _('Maintenance'),
              menu: { label: _('Maintenance'), icon: matConstructionOutline, }
            },
            canActivate: [isAuthenticated],
            loadComponent: () => import('./page-maintenance/page-maintenance').then(c => c.PageMaintenance),
          },
          { path: '', pathMatch: 'full', redirectTo: 'principal', },
        ]
      },
      {
        path: 'principal',
        data: {
          breadcrumb: _('Principal'),
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
          breadcrumb: _('Collection'),
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
        path: 'credential',
        data: {
          breadcrumb: _('Credential'),
        },
        // canMatch: [canMatchAuthenticated],
        canActivateChild: [isAuthenticatedChild],
        children: [
          {
            path: 'create/:username/appkey',
            loadComponent: () => import('./create-credential/create-credential').then(c => c.CreateCredential),
            canDeactivate: [(component) => component.confirmCancel()],
          },
          {
            path: 'create/:username/pwd',
            loadComponent: () => import('./create-credential-pwd/create-credential-pwd').then(c => c.CreateCredentialPwd),
            canDeactivate: [(component) => component.confirmCancel()],
          },
          {
            path: 'reset/:username/:accesskey',
            loadComponent: () => import('./reset-credential-pwd/reset-credential-pwd').then(c => c.ResetCredentialPwd),
            canDeactivate: [(component) => component.confirmCancel()],
          },
        ]
      },
      { path: '', pathMatch: 'full', redirectTo: '/my/credentials' },
    ]
  },
  {
    path: '',
    loadComponent: () => import('./session-layout/session-layout').then(c => c.SessionLayout),
    children: [
      {
        path: 'login',
        title: _('Welcome'),
        loadComponent: () => import('./page-login/page-login').then(c => c.PageLogin),
      },
      {
        path: 'goodbye',
        title: _('Logout'),
        data: {
          menu: { label: _('Logout'), icon: matLogoutOutline, desc: _('Logout DESC'), session: true, }
        },
        loadComponent: () => import('./page-goodbye/page-goodbye').then(c => c.PageGoodbye),
      },
      {
        path: 'starting',
        title: _('Welcome'),
        loadComponent: () => import('./page-start/page-start').then(c => c.PageStart),
      },
      {
        path: 'onboarding',
        title: _('Welcome'),
        loadComponent: () => import('./page-onboarding/page-onboarding').then(c => c.PageOnboarding),
        canActivate: [isPreAuthenticated, isUnlinkedAccount]
      },
      {
        path: 'onboarding/link',
        title: _('Welcome'),
        loadComponent: () => import('./page-onboarding-link/page-onboarding-link').then(c => c.PageOnboardingLink),
        canActivate: [isPreAuthenticated, isUnlinkedAccount]
      },
      { path: '**', component: PageNotFound, canActivate: [isPreAuthenticated], },
      { path: '**', component: PageNotFound }
    ]
  },
  { path: '**', component: PageLogin },
];
