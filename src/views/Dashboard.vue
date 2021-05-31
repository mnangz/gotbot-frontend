<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="9">
          <v-card class="elevation-12 mb-5 teal accent-3" style="padding:5px;">
            <v-card-title style="color: #fff;">Hi {{user.name}} |&nbsp; 
              <v-icon
                  medium
                  class="ml-2"
                  @click="logout()"
                  color="white"
                >
                  mdi-logout
              </v-icon>
            </v-card-title>
          </v-card>
          <v-card class="elevation-12">
            <v-data-table
              :headers="headers"
              :items="allUsers"
              :search="search"
              sort-by="name"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-toolbar-title>
                  <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog
                    v-model="dialog"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        rounded 
                        color="teal accent-3"
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Add User
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-form @submit.prevent="save">
                        <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.title"
                                label="Title"
                                type="text"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.name"
                                label="Name"
                                type="text"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.email"
                                label="Email"
                                type="text"
                              ></v-text-field>
                            </v-col>
                            <!-- <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.birthdate"
                                label="Birth Date"
                                type="text"
                              ></v-text-field>
                              <v-date-picker v-model="editedItem.birthdate"></v-date-picker>
                            </v-col> -->
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="editedItem.birthdate"
                                persistent
                                width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedItem.birthdate"
                                    label="Birth Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.birthdate"
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="modal = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog.save(editedItem.birthdate)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-select
                                v-model="editedItem.user_type"
                                :items="userType"
                                label="User Type"
                              ></v-select>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.password"
                                label="Password"
                                type="password"
                              ></v-text-field>
                            </v-col>                            
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          rounded 
                          color="teal accent-3"
                          text
                          @click="close"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          rounded 
                          color="teal accent-3"
                          text
                          type="submit"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>

                      </v-form>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded color="teal accent-3" text @click="closeDelete">Cancel</v-btn>
                        <v-btn rounded color="teal accent-3" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  color="teal accent-3"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                  color="red"
                >
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn
                  @click="initialize"
                  rounded 
                  color="teal accent-3"
                >
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    data: () => ({
      search: '',
      modal: false,
      userType: ['USER', 'ADMIN'],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Birth Date', value: 'birthdate' },
        { text: 'User Type', value: 'user_type' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        title: '',
        name: '',
        email: '',
        birthdate: new Date().toISOString().substr(0, 10),
        user_type: '',
        password: '',
      },
      defaultItem: {
        title: '',
        name: '',
        email: '',
        birthdate: new Date().toISOString().substr(0, 10),
        user_type: '',
        password: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
      ...mapGetters({allUsers: 'users/allUsers', user: 'auth/user'} )
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapActions({
        signIn: 'auth/signIn',
        signOut: 'auth/signOut',
        fetchUsers: 'users/fetchUsers',
        addUser: 'users/addUser',
        deleteUser: 'users/deleteUser',
        updateUser: 'users/updateUser'
      }),
      initialize () {
        this.fetchUsers()
      },

      editItem (item) {
        this.editedIndex = 2 
        this.editedItem = item
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = 2
        this.editedItem = item
        /* eslint-disable no-console */
        console.log(this.editedIndex);
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        // this.allUsers.splice(this.editedIndex, 1)
        this.deleteUser(this.editedItem.id)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          // Object.assign(this.allUsers[this.editedIndex], this.editedItem)
          this.updateUser(this.editedItem);
        } else {
          this.addUser(this.editedItem);
          /* eslint-disable no-console */
          console.log(this.editedItem);
        }
        this.close()
      },

      async logout(){
        // this.signOut();
        this.$router.replace({ name: 'home'}); 
      }
    },
  }
</script>



