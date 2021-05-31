<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <ErrorMessage></ErrorMessage>
    </v-content>
  </v-app>
</template>

<script>
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: 'App',

  components: {
    ErrorMessage
  },

  data: () => ({
    //
  }),
};
</script>
