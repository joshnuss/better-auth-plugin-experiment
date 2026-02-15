<script lang="ts">
  import { auth } from '$lib/auth-client'

  let email = $state('')
  let password = $state('')

  async function onsubmit(event: Event) {
    event.preventDefault()

    const result = await auth.signIn.email({
      email,
      password
    })

    console.log({ result })
  }
</script>

<h1>Sign in</h1>

<form {onsubmit}>
  <input type="email" required bind:value={email} placeholder="E-mail">
  <input type="password" required bind:value={password} placeholder="Password"/>
  <button>Sign in</button>
</form>
