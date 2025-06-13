import CONFIG from '../config'
import { getActiveRoute } from '../routes/url-parser'

export const getAccessToken = () => {
  try {
    return localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error(error)
    return false
  }
}

export const storeAccessToken = (token) => {
  try {
    localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, token)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const deleteAccessToken = () => {
  try {
    localStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY)
    location.hash = '/login'
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

let publicRoutes = ['/login', '/register']

export const checkPublicRoutes = (page) => {
  let activeRoute = getActiveRoute()
  let isLoggedIn = getAccessToken()

  if (publicRoutes.includes(activeRoute) && isLoggedIn) {
    location.hash('/')
    return
  }

  return page
}

export const checkAuthenticatedRoutes = (page) => {
  if (!getAccessToken()) {
    location.hash = '/login'
    return
  }

  return page
}
