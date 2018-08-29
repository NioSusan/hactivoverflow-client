<template>
 <v-container fill-height>
  <v-layout>
    <v-flex>
      <v-card>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{questionDetails.title}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        <v-card-title>
          <div>
            <span class="grey--text">ID: {{this.$route.params.id}} </span><br>
            <span>{{questionDetails.content}}</span><br>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn @click.stop="dialog = true" flat color="orange" >EDIT</v-btn>
                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card >
                                <v-card-title>
                                    <span class="headline">Your Question</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs6 v-model="valid">
                                                <v-text-field v-model="title" :label="questionDetails.title" :rules="notEmptyRules" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12>
                                                <v-text-field v-model="content" :label="questionDetails.content" :rules="notEmptyRules" required></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                                    <v-btn color="blue darken-1" flat @click="editPost" :disabled="!valid">Submit</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
          <v-btn flat color="orange" @click="dialogDelete = true">DELETE</v-btn>
            <v-dialog v-model="dialogDelete" max-width="290" >
              <v-card>
                <v-card-title class="headline">Are you sure?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click="dialogDelete = false"> NO </v-btn>
                  <v-btn color="green darken-1" flat="flat" @click="deletePost"> YES</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          <v-btn flat color="orange" @click="dialogComment = true">ANSWER</v-btn>
          <v-dialog v-model="dialogComment" max-width="500px">
              <v-card >
                  <v-card-title>
                      <span class="headline">Your Answer</span>
                  </v-card-title>
                  <v-card-text>
                      <v-container grid-list-md>
                           <v-layout wrap>
                               <v-textarea
                                  v-model="comment"
                                  label="Message"
                                  counter
                                  maxlength="120"
                                   full-width
                                   single-line
                              ></v-textarea>
                          </v-layout>
                      </v-container>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="dialogComment = false">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="add_Answer" :disabled="comment.length == 0">Submit</v-btn>
                   </v-card-actions>
              </v-card>
          </v-dialog>
          <v-container>
              <v-card>
                <v-card-title>
                <div>COMMENT</div>
                </v-card-title>

                  <!-- <v-list two-line>
                    <div v-for="(comment, index) in comments" :key="index">
                      <p>comment</p>
                      <v-divider></v-divider>
                    </div>
                  </v-list> -->
              </v-card>
          </v-container>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
 </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notEmptyRules } from '@/validator'

export default {
  data () {
    return {
      valid: false,
      title: '',
      content: '',
      dialog: false,
      dialogDelete: false,
      dialogComment: false,
      notEmptyRules,
      comment: ''
    }
  },
  computed: {
    ...mapState(['questionDetails', 'editedQuestion'])
  },
  created () {
    this.$store.dispatch('getQuestionById', this.$route.params.id)
  },
  methods: {
    ...mapActions(['upVote', 'downVote', 'editQuestion', 'deleteQuestion', 'addAnswer']),
    editPost () {
      this.editQuestion({
        id: this.$route.params.id,
        title: this.title,
        content: this.content
      })
      this.title = ''
      this.content = ''
      this.dialog = false
    },
    deletePost () {
      this.deleteQuestion(this.$route.params.id)
      this.dialogDelete = false
      this.$router.push('/questions')
    },
    add_Answer () {
      console.log(' new answeeer for question  =>', this.$route.params.id, this.comment)
      this.addAnswer({
        questionId: this.$route.params.id,
        content: this.comment
      })
      this.comment = ''
      this.dialogComment = false
    }
  }

}

</script>
