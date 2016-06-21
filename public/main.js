$(() => {
  const socket = io()
  const input = $('input')
  const messages = $('#messages')

  const displayConnInfo = info => {
    messages.append(`<blockquote>${info}</blockquote>`)
  }

  const addMessage = message => {
    messages.append(`<div>${message}</div>`)
  }

  input.on('keydown', event => {
    if (event.keyCode != 13) return

    const message = input.val()
    addMessage(message)
    socket.emit('message', message)
    input.val('')
  })

  // Display new connection info
  socket.on('new conn', displayConnInfo)
  socket.on('disconnect conn', displayConnInfo)

  socket.on('message', addMessage)
})
