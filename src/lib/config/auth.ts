const config = {
  routes: {
    login: {
      link: '/auth/login'
    },
    signup: {
      link: '/auth/signup'
    },
    forgotPassword: {
      link: '/auth/forgot-password'
    },
    magiclink: {
      link: '/auth/magic-link'
    }
  },
  redirects: {
    //dashboard
    dashboardBase: '/dashboard/',
    toDashboard: '/main',
    toSubscription: '/settings/subscription',
    toBilling: '/settings/billing',
    toProfile: '/dashboard/settings/profile',
    requireSub: '/dashboard/settings/subscription-required',
    toAddSub: '/dashboard/settings/add-subscription',
    //auth
    toLogin: '/auth/login',
    requireAuth: '/auth/required',
    authConfirm: '/auth/confirmed',
    callback: '/api/auth-callback',
    //user
    toUserDashboard: 'user/orgs',
    //todos
    toMyTodos: '/dashboard/todos/my-todos'
  }
};

export default config;
