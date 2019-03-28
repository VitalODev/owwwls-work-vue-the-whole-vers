export default {
  state: {
    categories: ['all', 'chief cook', 'stack', 'organizational'],
    descriptionCategories: {
      all: 'Here you can see all the subtitles from all categories. Choose the category in the list above for subtitles filtering.',
      'chief cook': 'This\'s brief greeting and some information about me.',
      stack: 'Just my skills and favorite technologies that I use for building sites.',
      organizational: 'If you just want me to cook the site for you and you don’t want to know anything about technology and all that ... I think this is what you need.'
    },
    cards: [
      {
        category: 'chief cook',
        question: 'Who am I?',
        text: 'My name is Vital O. You can call me Vital. I live in Ukraine. And I\'m 30 years old. And I\'m a developer of modern web interfaces.'
      },
      {
        category: 'chief cook',
        question: 'Am I an owl?',
        text: 'No, owls is a design trick. I\'m a man ... definitely.'
      },
      {
        category: 'stack',
        question: 'Vue',
        text: 'JavaScript framework for building user interfaces and single-page applications.'
      },
      {
        category: 'stack',
        question: 'Koa',
        text: 'JavaScript framework designed by the team behind Express and Node. Is used on the server side.'
      },
      {
        category: 'stack',
        question: 'Vuetify',
        text: 'JavaScript framework designed on base Vue.js. Is used for cosmetic goals to do a site in material design style.'
      },
      {
        category: 'organizational',
        question: 'How much it cost?',
        text: 'That is a good question. Actually, I can\'t answer precisely right now because there is nothing to assess. We need to discuss your project and work details.'
      },
      {
        category: 'organizational',
        question: 'What are the payment methods allowed?',
        text: 'Payoneer, Paxum, Bitcoin, Billing Service (Visa, MasterCard and etc).'
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
