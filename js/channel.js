// channels for direct message
var directMessage = [
  {
    name: 'Charmander',
    description: '',
    image: 'images/charmander.jpg',
    chat: [
      {
        user: 'Charmander',
        message: 'Hey have you had lunch?'
      },
      {
        user: 'User',
        message: 'Not yet. Did you want to eat together?'
      },
      {
        user: 'Charmander',
        message: 'Sure! Are you fine with Donkey Kings?'
      }],
      id: 0,
  },
  {
    name: 'LuckyStar',
    description: 'sleeping',
    image: 'images/luckystar.webp',
    chat: [
      {
        user: 'LuckyStar',
        message: 'Not feeling too lucky'
      },
      {
        user: 'User',
        message: 'Not yet. Did you want to eat together?'
      },
      {
        user: 'LuckyStar',
        message: 'Sure! Are you fine with Donkey Kings?'
      }],
      id: 0,
  },
  {
    name: 'Weeb-Kun',
    description: 'Dying from cringe',
    image: 'images/weebkun.jpg',
    chat: [],
    id: 0,
  }
]

var bleachTopic = [
  'Thousand Blood Year Arc',
  'Soul Society Arc',
  'Hueco Mundo Invasion Arc'
]

var narutoTopic = [
  'Chuunin Exams Arc',
  'Pain Assault Arc',
  'Five Kage Summit'
]

var onepieceTopic = [
  'Arlong Arc',
  'Saving Ace Arc',
  'Wano Arc'
]

// export
export {directMessage, bleachTopic, narutoTopic, onepieceTopic}