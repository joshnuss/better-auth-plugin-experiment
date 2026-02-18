import type { BetterAuthPlugin } from "better-auth"
import { sessionMiddleware, createAuthMiddleware } from "better-auth/api"
import { APIError } from "@better-auth/core/error";
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
      signInUsername: createAuthEndpoint('/sign-in/username', {
        method: 'POST',
        body: z.object({
          username: z.string(),
          password: z.string(),
        })
      }, async (ctx) => {
        const { username, password } = ctx.body
        const { adapter } = ctx.context

        let user: User | null

        if (username.includes('@')) {
          user = await adapter.findOne<User>({
            model: 'user',
            where: [
              { field: 'email', value: username }
            ]
          })
        } else {
          user = await adapter.findOne<User>({
            model: 'user',
            where: [
              { field: 'username', value: username }
            ]
          })
        }

        if (!user) {
          return ctx.error()
        }

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
