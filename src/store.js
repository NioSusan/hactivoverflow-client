import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: !!localStorage.getItem('token'),
    _id: '',
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    votes: '',
    answers: [],
    answer: {},
    dialog: true,
    questions: [],
    questionDetails: []
  },
  getters: {
    authenticated (state) {
      return state.authenticated
    },
    sortedQuestions (state) {
      // return state.questions
      return state.questions.sort((questionA, questionB) => {
        return questionA.createdAt > questionB.createdAt
      })
    },
    loadedQuestion (state) {
      return (questionId) => {
        return state.loadedQuestion.find((question) => {
          return question._id === questionId
        })
      }
    }
  },
  mutations: {
    NEW_QUESTION (state, payload) {
      state.title = payload.title
      state.content = payload.content
      state.createdAt = payload.createdAt
      state.votes = payload.votes
      state.author = payload.author
      state.questions.push({
        _id: payload._id,
        title: payload.title,
        content: payload.content,
        votes: payload.votes,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        answers: payload.answers,
        author: payload.author,
        answer: []
      })
      console.log('from mutations: payload dari NEW_QUESTION ===>', payload)
    },
    AUTH (state, payload) {
      state.authenticated = true
    },
    QUESTIONS (state, payload) {
      state.questions = payload
    },
    QUESTION_DETAILS (state, payload) {
      state.questionDetails = payload
    },
    EDIT_QUESTION (state, payload) {
      state.questionDetails = payload
    },
    REMOVE_QUESTION (state, payload) {
      const index = state.questions.indexOf(payload)
      state.questions.splice(index, 1)
    },
    ADD_ANSWER (state, payload) {
      state.answer = payload
    }
  },
  actions: {
    addQuestion (context, payload) {
      console.log('from actions : payload dari addQuestion ===>', payload)
      axios({
        method: 'POST',
        url: 'http://server-hacktiv.hasilpanen.com/questions',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
        // commit to the store
          context.commit('NEW_QUESTION', response.data.newQuestion)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuestions (context, payload) {
      axios({
        method: 'GET',
        url: 'http://server-hacktiv.hasilpanen.com/questions',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
        // commit to the store
          context.commit('QUESTIONS', response.data.questions)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuestionById (context, payload) {
      axios({
        method: 'GET',
        url: 'http://server-hacktiv.hasilpanen.com/questions/' + payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.commit('QUESTION_DETAILS', response.data.question)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editQuestion (context, payload) {
      console.log('editQuestion dari store', payload)
      axios({
        method: 'PUT',
        url: 'http://server-hacktiv.hasilpanen.com/questions/' + payload.id,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: payload.title,
          content: payload.content
        }
      })
        .then(response => {
          console.log('response dari editQuestion di store', response.data.question)
          context.commit('EDIT_QUESTION', response.data.question)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuestion (context, payload) {
      console.log('deleteQuestion dari store', payload)
      axios({
        method: 'DELETE',
        url: 'http://server-hacktiv.hasilpanen.com/questions/' + payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('response dari deleteQuestion di store===>', response)
          context.commit('REMOVE_QUESTION', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    upVote (context, payload) {

    },
    downVote (context, payload) {

    },
    addAnswer (context, payload) {
      console.log('addAnswer dari store', payload)
      axios({
        method: 'POST',
        url: 'http://server-hacktiv.hasilpanen.com/answers/' + payload.id,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          questionId: payload.questionId,
          content: payload.content
        }
      })
        .then(response => {
          console.log(response)
          context.commit('ADD_ANSWER', payload)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
