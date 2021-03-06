const chatForm = document.getElementById('chat-form');
const textinput = document.getElementById('msg')
const chatMessages = document.querySelector('.chat-messages');
const socket = io()
// get username and room from URL
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })


// join chat room
socket.emit('joinRoom', { username, room })

socket.on('message', (message) => {
  outPutMessage(message)

  // scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight
})

socket.on('typing', (message) => {
  outPutTyping(message)
})

socket.on('typing_done', (message) => {
  outPutTyping('')
})

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;

  //emit message to server
  socket.emit('chatMessage', { username, room, text: msg })

  // clear input message
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

textinput.addEventListener('input', e => {
  //emit typing message to server
  socket.emit('typing', { username, room })
})

textinput.addEventListener('focusout', e => {
  //emit typing message to server
  socket.emit('typing_done', { username, room })
  const div = document.getElementById('typing')
  div.innerText = ``
})

//out message to dom

function outPutMessage(message) {
  console.log(message)
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>`
  document.querySelector('.chat-messages').appendChild(div)
}

function outPutTyping(message) {
  const div = document.getElementById('typing')
  div.innerText = `${message}`
}