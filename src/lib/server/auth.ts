import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { db } from '$lib/server/db'
import { PUBLIC_ORIGIN } from '$env/static/public'
import { getRequestEvent } from '$app/server'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import { myPlugin } from '../plugin'

export const auth = betterAuth({
  baseURL: PUBLIC_ORIGIN,
  database: prismaAdapter(db, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    myPlugin(),
    sveltekitCookies(getRequestEvent) // must be last
  ]
})

// auth.api.example22({
//   query: {
//   }
// })

export type Session = (typeof auth.$Infer.Session)['session']
export type User = (typeof auth.$Infer.Session)['user']
