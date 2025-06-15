import HomePage from '../pages/home/home-page'
import SavePage from '../pages/save-story/save-page.js' 
import RegisterPage from '../pages/auth/register/register-page'
import LoginPage from '../pages/auth/login/login-page'
import CreateStoryPage from '../pages/create-story/create-story_page'

import {
  checkAuthenticatedRoutes,
  checkPublicRoutes,
  deleteAccessToken,
} from '../utils/auth'

let routes = {
  
  '/login': () => checkPublicRoutes(new LoginPage()),
  '/register': () => checkPublicRoutes(new RegisterPage()),
  '/': () => checkAuthenticatedRoutes(new HomePage()),
  '/save': () => checkAuthenticatedRoutes(new SavePage()),
  '/create-story': () => checkAuthenticatedRoutes(new CreateStoryPage()),
  '/logout': () => deleteAccessToken(),
}

export default routes
