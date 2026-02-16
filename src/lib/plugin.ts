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
