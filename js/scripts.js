//imports
import { directMessage, bleachTopic, narutoTopic, onepieceTopic } from "./channel.js";
import { addMessageHandler, loadChatMessages } from "./chat.js";

// seed for servers
var data = [
  {
    id: 0,
    name: 'Direct Messages',
    image_url: 'images/not-discord.webp',
    channel: directMessage,
  },
  {
    id: 1,
    name: 'Bleach Topic',
    image_url: 'images/bleach-chatroom.jpg',
    channel: bleachTopic,
    wallpaper: 'images/bleach-wallpaper.png'
  },
  {
    id: 2,
    name: 'Naruto Topic',
    image_url: 'images/naruto-chatroom.jpg',
    channel: narutoTopic,
    wallpaper: 'images/naruto-wallpaper.jpg'
  },
  {
    id: 3,
    name: 'One Piece Topic',
    image_url: 'images/onepiece-chatroom.jpg',
    channel: onepieceTopic,
    wallpaper: 'images/onepiece-wallpaper.jpg'
  }
]

function Server(name, image_url, id, channel){
  this.id = id;
  this.name = name;
  this.image_url = image_url;
  this.channel = channel;
}

function createServerElement(server){
  // server status
  var serverStatus = document.createElement('p');
  serverStatus.classList.add('server-status', 'not-current');

  // server image
  var serverImage = document.createElement('img');
  serverImage.src = server.image_url;
  serverImage.classList.add('server-image', 'not-current');

  // server name
  var serverName = document.createElement('div');
  var serverNameText = document.createTextNode(server.name);
  serverName.appendChild(serverNameText);
  serverName.classList.add('server-name');
  
  // creates the server div
  var serverEl = document.createElement('div');
  serverEl.classList.add('server');
  serverEl.appendChild(serverStatus);
  serverEl.appendChild(serverImage);
  serverEl.appendChild(serverName);
  
  // adds serverEl to DOM
  document.getElementById('server-container').appendChild(serverEl);
}

function addVisibility(id){
  var name = document.getElementsByClassName('server-name')[id];
  name.classList.add('visible');
}

function removeVisibility(id){
  var name = document.getElementsByClassName('server-name')[id];
  name.classList.remove('visible');
}

// tracks current server user is on
var currentServer = 0;
function updateStatus(id, state){
  // gets DOM elements
  var status = document.getElementsByClassName('server-status')[id];
  var image = document.getElementsByClassName('server-image')[id];

  if(status.classList.contains('current'))
    return;
  
  // if server has been clicked, then updates the registered id of the current class
  // also removes the current status from the previous server and gives it the not-current status
  if(state === 'current'){
    var previousCurrentStatus = document.getElementsByClassName('server-status')[currentServer];
    previousCurrentStatus.classList.remove('current', 'not-current', 'hovering');
    previousCurrentStatus.classList.add('not-current');

    var previousCurrentImage = document.getElementsByClassName('server-image')[currentServer];
    previousCurrentImage.classList.remove('current', 'not-current', 'hovering');
    previousCurrentImage.classList.add('not-current');

    // Updates current server
    currentServer = id;

    // adds in channels
    loadChannels();
  }

  status.classList.remove('hovering', 'not-current');
  status.classList.add(state);
  image.classList.remove('hovering', 'not-current');
  image.classList.add(state);
}

function addServerEvents(id){
  var image = document.getElementsByClassName('server-image')[id];
  image.addEventListener('mouseover', event => addVisibility(id));
  image.addEventListener('mouseenter', event => updateStatus(id, 'hovering'));
  image.addEventListener('mouseleave', event => removeVisibility(id));
  image.addEventListener('mouseleave', event => updateStatus(id, 'not-current'));
  image.addEventListener('click', event => updateStatus(id, 'current'));
}

function addChannelEvents(id){
  var channels = document.getElementsByClassName('channel');
  channels.forEach(channel => {
    channel.onclick = updateChannelStatus()
  })
}

var currentChannel = 0;
function updateChannelStatus(){
  var container = document.getElementById('message-log-container');
  while (container.firstChild)
    container.removeChild(container.firstChild);

  var channel = data[currentServer].channel[currentChannel];
  loadChatMessages(channel.chat)
}

function loadDirectChat(){
  var title = document.createElement('h2');
  title.append('Chat List');
  var description = document.createElement('h2');
  description.append('Chat Your Day Away!');

  var channelElArray = [];
  data[0].channel.forEach(function(friend){
    // image element
    var image = document.createElement('img');
    image.src = friend.image;
    image.classList.add('channel-image');

    // adds div to contain username and description
    var nameplate = document.createElement('div');
    nameplate.classList.add('nameplate');
    var name = document.createElement('div');
    name.classList.add('channel-name');
    name.append(friend.name);
    var description = document.createElement('div');
    description.classList.add('channel-description');
    description.append(friend.description);

    nameplate.append(name);
    nameplate.append(description);

    var channel = document.createElement('div');
    channel.classList.add('channel');
    channel.append(image);
    channel.append(nameplate);
    channelElArray.push(channel);
  });

  // channel container
  var container = document.getElementById('channel-container');
  container.appendChild(title);
  container.appendChild(description);
  channelElArray.forEach(channel => container.append(channel));
}

function loadNormalChannels(){
  var wallpaper = document.createElement('img');
  wallpaper.src = data[currentServer].wallpaper;
  wallpaper.classList.add('wallpaper');

  var channelElArray = [];
  data[currentServer].channel.forEach(function(chat){
    var chatroom = document.createElement('div');
    chatroom.classList.add('chatroom');
    chatroom.append(chat);

    var channel = document.createElement('div');
    channel.classList.add('channel');
    channel.appendChild(chatroom);
    channelElArray.push(channel);
  });

  var container = document.getElementById('channel-container');
  container.appendChild(wallpaper);
  channelElArray.forEach(channel => container.appendChild(channel));
}

function loadChannels(){
  var container = document.getElementById('channel-container');
  while(container.hasChildNodes())
    container.removeChild(container.firstChild);

  if(currentServer == 0)
    loadDirectChat();
  else
    loadNormalChannels();

  updateChannelStatus();
}

function clickButton(event){
  if(event.keyCode === 13)
    addMessageHandler(event);
}

function init(){
  // loads in servers
  data.forEach(function(server){
    createServerElement(server); // adds servers
    addServerEvents(server.id); // makes them functional
  });

  // triggers the update once
  document.getElementsByClassName('server-image')[0].click();
  
  // makes enter an update to messagebox
  document.getElementById('textbox').onkeydown = clickButton;

  // makes so every channel clicked, updates the main content
  addChannelEvents();
}

init();