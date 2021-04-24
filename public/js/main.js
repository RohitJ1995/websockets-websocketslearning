const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io()
// get username and room from URL
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
socket.on('message', (message) => {
  outPutMessage(message)

  // scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight
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