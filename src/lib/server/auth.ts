import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { db } from '$lib/server/db'
import { PUBLIC_ORIGIN } from '$env/static/public'
import { getRequestEvent } from '$app/server'
import { sveltekitCookies } from 'better-auth/svelte-kit'

import type { BetterAuthPlugin } from "better-auth";

export const myPlugin = () =>
  ({
    id: "myPlugin",
    schema: {
      user: {
        fields: {
          city: {
            type: 'string',
            required: true,
          }
        }
      }
    }
  } satisfies BetterAuthPlugin)


export const auth = betterAuth({
  baseURL: PUBLIC_ORIGIN,
  database: prismaAdapter(db, {
    provider: 'postgresql'
  }),
  plugins: [
    myPlugin(),
    sveltekitCookies(getRequestEvent) // must be last
  ]
})

export type Session = (typeof auth.$Infer.Session)['session']
export type User = (typeof auth.$Infer.Session)['user']
