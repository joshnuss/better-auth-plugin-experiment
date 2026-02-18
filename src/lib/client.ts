import type { BetterAuthClientPlugin } from "better-auth/client";
import type { username } from "./plugin";

export const usernameClient = {
  id: "username",
  $InferServerPlugin: {} as ReturnType<typeof username>,
} satisfies BetterAuthClientPlugin
