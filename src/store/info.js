export default {
  state: {
    categories: ['all', 'organizational', 'technical'],
    descriptionCategories: {
      all: 'Choose the category in the list above for subtitles filtering.'
    },
    cards: [
      {
        category: 'organizational',
        question: 'What is your name?',
        text: 'Call me Vital, please.'
      },
      {
        category: 'organizational',
        question: 'Where are you from?',
        text: 'At the moment I live in Ukraine.'
      },
      {
        category: 'organizational',
        question: 'What is your professional experience?',
        text: '2 years with Unity 3D (C#); 1 year with iOS (Swift); 1 year with Django (Python); last 3 years I\'ve been concentrating on javascript'
      },
      {
        category: 'technical',
        question: 'What is a technology stack used?',
        text: 'I like to do with JavaScript. For client-side I use Vue. For server-side - Node and Node-based frameworks.'
      },
      {
        category: 'technical',
        question: 'Do you use a version control system?',
        text: 'Yes, I use git.'
      },
      {
        category: 'technical',
        question: 'What about single page applications?',
        text: 'This is my specialization.'
      }
    ]
  },
  getters: {
    categories (state) {
      return state.categories
    },
    cards (state) {
      return state.cards
    },
    descriptionCategories (state) {
      return state.descriptionCategories
    }
  }
}
