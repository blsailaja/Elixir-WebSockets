import communication from "./communication.js";  // If you need to import a module named 'communication.js'

let Communication = {
  init(socket) {
    // Use the correct channel name
    let channel = socket.channel('communication:lobby', {})
    
    // Join the channel and listen for messages
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
    
    this.listenForChats(channel)
  },

  listenForChats(channel) {
    // Listening for form submission to send a message
    document.getElementById('chat-form').addEventListener('submit', function(e){
      e.preventDefault()

      // Grab username and message from the form
      let userName = document.getElementById('user-name').value
      let userMsg = document.getElementById('user-msg').value

      // Push the message to the channel
      channel.push('shout', {name: userName, body: userMsg})

      // Clear the form fields
      document.getElementById('user-name').value = ''
      document.getElementById('user-msg').value = ''
    })

    // Listening for incoming messages and displaying them
    channel.on('shout', payload => {
      let chatBox = document.querySelector('#chat-box')
      let msgBlock = document.createElement('p')

      // Insert the message HTML into the chat box
      msgBlock.insertAdjacentHTML('beforeend', `<b>${payload.name}:</b> ${payload.body}`)
      chatBox.appendChild(msgBlock)
    })
  }
}

export default Communication
