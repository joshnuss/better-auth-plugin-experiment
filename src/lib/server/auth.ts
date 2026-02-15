import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { db } from '$lib/server/db'
import { PUBLIC_ORIGIN } from '$env/static/public'
import { getRequestEvent } from '$app/server'
import { sveltekitCookies } from 'better-auth/svelte-kit'

import type { BetterAuthPlugin } from "better-auth"
import { APIError, sessionMiddleware, createAuthMiddleware } from "better-auth/api"
import { createAuthEndpoint } from 'better-auth/plugins'
import { z } from 'zod'

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
        },
      }
    },
    hooks: {
      after: [{
        matcher: (ctx) => ctx.path == '/sign-in/email',
        handler: createAuthMiddleware(async (ctx) => {
          throw new APIError('OOPS')
          return ctx.json({ test: ctx.path })
        })
      }]
    },
    $ERROR_CODES: {
      OOPS: 'Holy cow'
    },
    endpoints: {
      example22: createAuthEndpoint('/foo/bar', {
        method: 'GET',
        //use: [ sessionMiddleware ],
          query: z.object({ name2: z.string().optional() }),
      }, async (ctx) => {
        return ctx.json({ message: 'yo' })
      })
    }
  } satisfies BetterAuthPlugin)


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
