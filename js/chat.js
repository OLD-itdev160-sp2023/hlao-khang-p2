// Array to store messages
var messages = [];

// message constructor function
function Message(user, message){
  this.user = user;
  this.message = message;
}

// creates message
function createMessageElement(message){
  var messageText = document.createTextNode(
    message.user + ': ' + message.message
  );

  // create element and add message text
  var messageEl = document.createElement('div');
  messageEl.appendChild(messageText);

  return messageEl;
}

// Button click event handler to add new message
function addMessageHandler(event){
  var user = 'User';
  var messageInput = document.getElementById('textbox');
  var messageContainerEl = document.getElementById('message-log-container');

  // creates new message
  if (messageInput.value != ''){
    // construct message and add it to the messages array
    var message = new Message(user, messageInput.value);
    messages.push(message);

    // create a message element
    var el  = createMessageElement(message);
    el.classList.add('message');

    // add message to DOM
    messageContainerEl.appendChild(el);

    // reset input
    messageInput.value = '';
  }
}

function loadChatMessages(messagelogs) {
  // loads in saved data into messages array
  for(var i = 0; i < messagelogs.length; ++i){
    var message = new Message(messagelogs[i].user, messagelogs[i].message);
    messages.push(message);
  }

  // finds the message log containter
  var container = document.getElementById('message-log-container');

  messages.forEach(message => {
    var el = createMessageElement(message);
    
    // creates container of message
    var messageContainerEl = document.createElement('message-container');
    messageContainerEl.appendChild(el);
    messageContainerEl.classList.add('message');
    container.appendChild(messageContainerEl);
  })
}

export {addMessageHandler, loadChatMessages};