<script lang="ts">
  import { auth } from '$lib/auth-client'

  let email = $state('')
  let name = $state('')
  let username = $state('')
  let password = $state('')
  let password_confirmation = $state('')
  let error_message = $state<string>()

  async function onsubmit(event: Event) {
    event.preventDefault()

    if (password !== password_confirmation) {
      error_message = 'Passwords dont match'
      return
    }

    const { error, data } = await auth.signUp.email({
      email,
      password,
      username,
      name
    })

    console.log({ error, data })

    if (error) {
      error_message = error.message
    }
  }
</script>

<h1>Sign up</h1>

{#if error_message}
  <p>{error_message}</p>
{/if}


<form {onsubmit}>
  <input type="email" required bind:value={email} placeholder="E-mail">
  <input type="text" required bind:value={name} placeholder="Name">
  <input type="text" required bind:value={username} placeholder="Username">
  <input type="password" required bind:value={password} placeholder="Password"/>
  <input type="password" required bind:value={password_confirmation} placeholder="Confirm password"/>
  <button>Sign up</button>
</form>
