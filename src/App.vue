<template>
  <div>
    

    <nav>
      <router-link to="/">UpTown Steps</router-link>
      <!-- <router-link to="/login">Login</router-link> |
      <router-link to="/Register">Register</router-link> -->
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}

nav a:hover {
  color: #007bff;
}

.router-view {
  /* No se aplican estilos adicionales aquí */
}
</style>