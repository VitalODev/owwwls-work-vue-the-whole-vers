<template><h1>How did you get here?</h1></template>

<script>
export default {
  name: 'LogOut',
  created () {
    this.$store.dispatch('logoutUser')

    this.$cookie.delete('defense')

    this.$router.push('/')
  }
}
</script>
