const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io()

socket.on('message', (message) => {
  console.log('Message ===>', message)
  outPutMessage(message)

  // scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', e => {
	e.preventDefault();
	const msg = e.target.elements.msg.value;

	//emit message to server
	socket.emit('chatMessage', msg)
	
  // clear input message
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})


//out message to dom

function outPutMessage(message) {
	const div = document.createElement('div')
	div.classList.add('message')
	div.innerHTML = `<p class="meta">Brad <span>${new Date()}</span></p>
						<p class="text">
							${message}
						</p>`
  document.querySelector('.chat-messages').appendChild(div)
}