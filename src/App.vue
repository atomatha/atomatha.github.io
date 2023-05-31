<template>
  <ef-panel id="login-page" spacing>
    <ef-loader v-if="loading"></ef-loader>
    <template v-else>
      <h1>{{ title }}</h1>
      <ef-text-field placeholder="Username"></ef-text-field>
      <ef-password-field placeholder="Password"></ef-password-field>
      <div id="button-group">
        <ef-button @click="login">Login</ef-button>
        <ef-button>Cancel</ef-button>
      </div>
    </template>
  </ef-panel>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      title: 'Hello!',
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;

      setTimeout(() => {
        this.title = 'Done!';
        this.loading = false;
      }, 3000);
    },
  },
}
</script>

<style>
#login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 200px;
  margin: 40px auto;
}

#button-group {
  margin: 10px 0;
}
</style>
