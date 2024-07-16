<template>
  <div>
    <h1>view360-Tittle</h1>

    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/Register">Register</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style>
*{
  margin: 0;
  padding: 0;
}


</style>