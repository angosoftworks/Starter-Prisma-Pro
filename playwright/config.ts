export const routes = {
  urls: {
    base: 'http://localhost:3000/',
    UserDashboard: 'http://localhost:3000/user/dashboard'
  },
  segments: {
    authConfirm: '**/auth/confirmed',
    userDash: '**/user/dashboard',
    login: '**/auth/login'
  },
  api: {
    emails: `http://localhost:1080/email`
  },
  filePath: {
    userFile: 'playwright/.auth/user.json',
    adminFile: 'playwright/.auth/admin.json'
  }
};

export const user = {
  admin: { email: 'test4@yahoo.com' }
};
