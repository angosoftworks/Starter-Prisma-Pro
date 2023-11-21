import { Icons } from '@/components/Icons';

const routes = {
  routes_dashboard: [
    { title: 'Overview', link: '/main', icon: Icons.Home },
    { title: 'Todos', link: '/todos/create', icon: Icons.Laptop },
    { title: 'Settings', link: '/settings/profile', icon: Icons.Settings }
  ],
  routes_dashboard_subroutes: {
    todos: [
      { title: 'Create', link: '/todos/create' },
      { title: 'My Todos', link: '/todos/my-todos' },
      { title: 'All Todos', link: '/todos/list-todos' }
    ],
    settings: [
      { title: 'Profile', link: '/settings/profile' },
      { title: 'Billing', link: '/settings/billing' },
      { title: 'Subscription', link: '/settings/subscription' }
    ]
  },
  redirects: {
    dashboard: {
      dashboardBase: '/dashboard/',
      toDashboard: '/main',
      settings: {
        toSubscription: '/settings/subscription',
        toBilling: '/settings/billing',
        toProfile: '/settings/profile',
        requireSub: '/settings/subscription-required',
        toAddSub: '/settings/add-subscription'
      },
      todos: { toMyTodos: '/todos/my-todos' }
    },
    auth: {
      toLogin: '/auth/login',
      requireAuth: '/auth/required',
      authConfirm: '/auth/confirmed',
      callback: '/api/auth-callback'
    },
    user: { toUserDashboard: '/user/dashboard' }
  },
  routes_marketing: [
    { title: 'Pricing', link: '/pricing' },
    { title: 'Docs', link: '/docs' },
    { title: 'Blog', link: '/blog' }
  ],
  footer_nav: {
    about: {
      title: 'About',
      routes: [{ title: 'Pricing', link: '/pricing' }]
    },
    resources: {
      title: 'Resources',
      routes: [
        { title: 'Blog', link: '/' },
        { title: 'Docs', link: '/' }
      ]
    },
    legal: {
      title: 'Legal',
      routes: [
        { title: 'Privacy Policy', link: '/' },
        { title: 'Terms and Conditions', link: '/' }
      ]
    }
  }
};

export default routes;
