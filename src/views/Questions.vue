<template>
<div>
    <v-jumbotron color="blue" dark>
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Welcome to HactivOverFlow</h3>
                    <span class="subheading">
                    Do you have any questions or interesting topic to ask? You have come to the right place!!!
                    Share it by clicking the 'Ask Question' button below.
                    </span>
                    <v-divider class="my-3"></v-divider>
                    <div class="title mb-3">Don't be shy!</div>
                    <v-layout row justify-center>
                        <v-btn @click.stop="dialog = true" color="primary" dark>Ask Question</v-btn>
                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card >
                                <v-card-title>
                                    <span class="headline">Your Question</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs6 v-model="valid">
                                                <v-text-field v-model="question.title" label="Title" :rules="notEmptyRules" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12>
                                                <v-text-field v-model="question.content" label="Question" :rules="notEmptyRules" required></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                                    <v-btn color="blue darken-1" flat @click.native="addQ" :disabled="!valid">Submit</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 sm8>
            <v-card>
                <v-toolbar color="orange lighten-1" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title>Message Board</v-toolbar-title>
                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
                </v-toolbar>

                <v-list two-line>
                <template v-for="(question, index) in sortedQuestions">
                    <v-subheader v-if="question.title" :key="question.title"> Created at:
                    {{new Date(question.createdAt).getFullYear()+'-' + (new Date(question.createdAt).getMonth()+1) + '-'+new Date(question.createdAt).getDate()}}
                    </v-subheader>
                    <v-flex pl-3>
                        <v-layout>
                            <v-icon >fa fa-user-circle</v-icon>
                                <v-list-tile-content>
                                    <v-list-tile-title @click="goToQuestion(index)" v-model="question.title" style="cursor:pointer">{{question.title}}</v-list-tile-title>
                                    <v-list-tile-sub-title v-model="question.content">{{question.content}}</v-list-tile-sub-title>
                                </v-list-tile-content>

                             <v-flex xs12 sm5 md3 pl-2>
                                <p>Votes: {{question.votes}}</p>
                                <v-icon @click="upVote" style="cursor:pointer;">fa fa-thumbs-up</v-icon>
                                <span> or </span>
                                <v-icon @click="downVote" style="cursor:pointer;">fa fa-thumbs-down</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-divider></v-divider>
                </template>
                </v-list>
            </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { notEmptyRules } from '@/validator'
export default {
  name: 'Questions',
  data () {
    return {
      valid: false,
      dialog: false,
      notEmptyRules,
      question: {
        title: '',
        content: ''
      }
    }
  },
  created () {
    this.getQuestions()
  },
  computed: {
    ...mapState(['title', 'content']),
    sortedQuestions () {
      return this.$store.getters.sortedQuestions
    }
  },
  methods: {
    ...mapMutations(['NEW_QUESTION']),
    ...mapActions(['addQuestion', 'getQuestions', 'upVote', 'downVote']),
    upVote () {
      alert('upvote')
    },
    downVote () {
      alert('downvote')
    },
    addQ () {
      this.addQuestion(this.question)
      this.dialog = false
    },
    goToQuestion (index) {
      let sortedQ = this.$store.getters.sortedQuestions
      let id = sortedQ[index]._id
      let authorId = sortedQ[index].author
      console.log('authorId ==>', authorId)
      console.log('id ===>', id)
      this.$router.push('/questions/' + id)
    }
    // getQuestions(){
    //     this.$store.dispatch('getQuestions')
    // }
  }
}

</script>
