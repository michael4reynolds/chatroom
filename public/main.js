$(() => {
  console.log('hello')
  const input = $('input')
  const messages = $('#messages')

  const addMessage = (message) => {
    messages.append(`<div>${message}</div>`)
  }

  input.on('keydown', (event) => {
    if (event.keyCode != 13) return

    const message = input.val()
    addMessage(message)
    input.val('')
  })
})