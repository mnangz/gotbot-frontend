<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3" style="margin-bottom:40px;"
                        >GotBot System</h1>
                        <v-form @submit.prevent="submit">
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            v-model="form.email"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            v-model="form.password"
                          />
                          <div class="text-center mt-3">
                            <v-btn type="submit" rounded color="teal accent-3" dark>SIGN IN</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1" style="margin-bottom:20px;">Hi there</h1>
                        <h5 style="margin-bottom: 20px;">An Admin level user was created by default for you:</h5>
                        <h5>Email: admin@admin.com<br>Password: admin123</h5>
                      </v-card-text>
                    </v-col>
                  </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'home',
  data (){
    return{
      form:{
        email: '',
        password: '',
      }
    }
  },
  methods: {

    ...mapActions({
      signIn: 'auth/signIn'
    }),

    async submit(){
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: 'dashboard'
        })
      }) 
    }
  }
};
</script>