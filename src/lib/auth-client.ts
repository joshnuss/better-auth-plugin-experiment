import { createAuthClient } from 'better-auth/svelte'
import { PUBLIC_ORIGIN } from '$env/static/public'
import { myPluginClient } from './client'

export const auth = createAuthClient({
  baseURL: PUBLIC_ORIGIN,
  plugins: [
    myPluginClient
  ]
})

export type Session = (typeof auth.$Infer.Session)['session']
export type User = (typeof auth.$Infer.Session)['user']
