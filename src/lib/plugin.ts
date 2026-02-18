import type { BetterAuthPlugin } from "better-auth"
import { sessionMiddleware, createAuthMiddleware } from "better-auth/api"
import { createAuthEndpoint } from 'better-auth/plugins'
import { z } from 'zod'
import type { User } from "@better-auth/core/db";


export const username = () =>
  ({
    id: "username",
    schema: {
      user: {
        fields: {
          username: {
            type: 'string',
            required: true,
            unique: true,
            index: true
          }
        },
      }
    },
    endpoints: {
      signInUsername: createAuthEndpoint('/sign-in/username2', {
        method: 'POST',
        body: z.object({
          username: z.string(),
          password: z.string(),
          age: z.number()
        })
      }, async (ctx) => {
        ctx.redirect('/home')
      }),
      isUsernameTaken: createAuthEndpoint('/username', {
        method: 'POST',
        body: z.object({ username: z.string() }),
      }, async (ctx) => {
        const { username } = ctx.body
        const user = await ctx.context.adapter.findOne<User>({
          model: 'user',
          where: [
            {field: 'username', value: username }
          ]
        })

        ctx.context.logger.info(`validating username: ${username} is ${user ? 'taken' : 'not taken'}.`)

        return ctx.json({ taken: !!user })
      })
    }
  } satisfies BetterAuthPlugin)
