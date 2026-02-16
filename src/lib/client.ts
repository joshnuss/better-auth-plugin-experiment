import type { BetterAuthClientPlugin } from "better-auth/client";
import type { myPlugin } from "./plugin";
import type { BetterFetchOption } from "@better-fetch/fetch";

export const myPluginClient = {
  id: "my-plugin",
  $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
  getActions: ($fetch) => {
    return {
      myCustomAction: async (data: {
        foo: string,
      }, fetchOptions?: BetterFetchOption) => {
        const res = $fetch("/custom/action", {
          method: "POST",
          body: {
            foo: data.foo
          },
          ...fetchOptions
        })
        return res
      }
    }
  }
} satisfies BetterAuthClientPlugin
