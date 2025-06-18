import { URL_NEW_STREET, URL_EXAMPLE_STREET } from './constants'
import Authenticate from './auth0'
import { setSignInData } from '../store/slices/user'
import store from '../store'
import Cookies from 'js-cookie'

const AUTH0_SIGN_IN_CALLBACK_URL = new URL(
  '/services/auth/sign-in-callback',
  window.location.origin
).href

export function goReload () {
  window.location.reload()
}

export function goHome () {
  window.location.href = '/'
}

export function goNewStreet (sameWindow) {
  if (sameWindow) {
    window.location.replace(URL_NEW_STREET)
  } else {
    window.location.href = URL_NEW_STREET
  }
}

export function goExampleStreet () {
  window.location.href = URL_EXAMPLE_STREET
}

export function goTwitterSignIn () {
  const auth0 = Authenticate()
  auth0.authorize({
    responseType: 'code',
    connection: 'twitter',
    redirectUri: AUTH0_SIGN_IN_CALLBACK_URL
  })
}

export function goFacebookSignIn () {
  const auth0 = Authenticate()
  auth0.authorize({
    responseType: 'code',
    connection: 'facebook',
    redirectUri: AUTH0_SIGN_IN_CALLBACK_URL
  })
}

export function goGoogleSignIn () {
  const auth0 = Authenticate()
  auth0.authorize({
    responseType: 'code',
    connection: 'google-oauth2',
    redirectUri: AUTH0_SIGN_IN_CALLBACK_URL
  })
}

export function goEmailSignIn (email, callback) {
  const auth0 = Authenticate()
  auth0.passwordlessStart(
    {
      send: 'link',
      email,
      connection: 'email',
      authParams: {
        redirectUri: AUTH0_SIGN_IN_CALLBACK_URL,
        responseType: 'code'
      }
    },
    (err, res) => {
      callback(err, res)
    }
  )
}

export async function goAdminEmailSignIn (email, password) {
  const response = await window.fetch('/api/v1/admin/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  const data = await response.json();
  if (!response.ok) {
    // handle error
  } else {
    if (data.user) {

      // You can store user info in Redux or state, but NOT the token

      const userSignInDetails = {
        userId: data.user.id,
        details: {
          ...data.user,
          displayName: data.user.email,
          roles:data.user.roles,
          profileImageUrl: '',
          flags: {},
          data: {}
        }
      }
      store.dispatch(setSignInData(userSignInDetails))
    }
  }
  return { status: response.status, ...data }
}

export async function fetchCurrentAdminUser() {
  const response = await fetch('/api/v1/admin/me', {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.user || null;
}

export async function updateAdminPassword(currentPassword, newPassword, confirmPassword) {
  const response = await window.fetch('/api/v1/admin/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    credentials: 'include'
  });

  const data = await response.json();
  return { status: response.status, ...data };
}

export async function fetchAllElementData() {
  const response = await fetch('/api/v1/admin/elements', {
    method: 'GET',
    credentials: 'include', 
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.elements || null;
}

export async function fetchAllPavementStructureData() {
  const response = await fetch('/api/v1/admin/pavement-structure', {
    method: 'GET',
    credentials: 'include', 
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.pavementStructure || null;
}

export async function saveElementData(modifiedRows) {
  const response = await fetch('/api/v1/admin/elements', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({elements: modifiedRows}),
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.elements || null;
}

export async function savePavementStructureData(modifiedRows) {
  const response = await fetch('/api/v1/admin/pavement-structure', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({pavementStructure: modifiedRows}),
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.pavementStructure || null;
}