import store from '@state/store'

// auth related routes
const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@views/pages/account/login')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => lazyLoadView(import('@views/pages/account/register')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/confirm-account',
    name: 'confirm-account',
    component: () => lazyLoadView(import('@views/pages/account/confirm')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: () =>
      lazyLoadView(import('@views/pages/account/forgetPassword')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.meta.authRequired
        )
        // Navigate back to previous page, or home as a fallback
        next(
          authRequiredOnPreviousRoute ? { name: 'dashboard' } : { ...routeFrom }
        )
      },
    },
  },
]

// error pages
const errorPagesRoutes = [
  {
    path: '/404',
    name: '404',
    component: require('@views/pages/secondary/error-404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  {
    path: '/500',
    name: '500',
    component: require('@views/pages/secondary/error-500').default,
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

// dashboard
const homeRoutes = [
  {
    path: '/',
    name: 'Home',
    header: '',
    icon: 'home',
    // badge: {
    //   text: '1',
    //   varient: 'success',
    // },
    component: () => lazyLoadView(import('@views/pages/dashboard/dashboard')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]

// apps
const orderRoutes = [
  {
    path: '/new-order',
    name: 'Create new order',
    header: 'Order',
    icon: 'shopping-cart',
    component: () => lazyLoadView(import('@views/pages/order/new.vue')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    path: '/orders',
    name: 'Orders',
    icon: 'plus-square',
    component: () => lazyLoadView(import('@views/pages/order/all')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]

const accountRoutes = [
  {
    path: '/account/company',
    name: 'Company details',
    header: 'account',
    icon: 'compass',
    component: () => lazyLoadView(import('@views/pages/account/company')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    path: '/account/user',
    name: 'Users & Offices',
    icon: 'user',
    component: () => lazyLoadView(import('@views/pages/account/user')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    path: '/account/billing',
    name: 'Billing',
    icon: 'dollar-sign',
    component: () => lazyLoadView(import('@views/pages/account/billing')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    path: '/account/plan',
    name: 'Floor plan style',
    icon: 'calendar',
    component: () => lazyLoadView(import('@views/pages/account/plan')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]

const apiRoutes = [
  {
    path: '/api',
    name: 'API key',
    header: 'Developers',
    icon: 'code',
    component: () => lazyLoadView(import('@views/pages/developer/api')),
    meta: { authRequired: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]

const appsRoutes = [
  ...orderRoutes,
  ...accountRoutes,
  ...apiRoutes,
]

const authProtectedRoutes = [...homeRoutes, ...appsRoutes]
const allRoutes = [...authRoutes, ...authProtectedRoutes, ...errorPagesRoutes]

export { allRoutes, authProtectedRoutes }

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@components/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    // error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
