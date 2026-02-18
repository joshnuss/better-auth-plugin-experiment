<script lang="ts">
  import { auth } from '$lib/auth-client'

  let username = $state('')
  let password = $state('')

  async function onsubmit(event: Event) {
    event.preventDefault()

    const result = await auth.signIn.username({
      username,
      password
    })

    console.log({ result })
  }
</script>

<h1>Sign in</h1>

<form {onsubmit}>
  <input type="text" required bind:value={username} placeholder="Username or E-mail">
  <input type="password" required bind:value={password} placeholder="Password"/>
  <button>Sign in</button>
</form>
