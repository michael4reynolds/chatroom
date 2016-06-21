$(() => {
  const socket = io()
  const $users = $('#users')
  const $message = $('#message')
  const $messages = $('#messages')
  const $nickname = $('#nickname')

  const displayUsers = users => {
    let html = users.reduce((lines, user) => {
      return lines + `<li>${user}</li>`
    }, '')
    $users.html(html)
  }

  const displayConnInfo = info => {
    $messages.append(`<blockquote>${info}</blockquote>`)
  }

  const addMessage = data => {
    $messages.append(`<div><strong>${data.user}: </strong>${data.msg}</div>`)
  }

  let nickname = ''
  $nickname.on('keydown', event => {
    if(event.keyCode != 13) return

    socket.emit('new user', $nickname.val(), ok => {
      if (ok) {
        $nickname.hide()
        $users.show()
        $message.show()
      }
    })
    nickname = $nickname.val()
  })

  $message.on('keydown', event => {
    if (event.keyCode != 13) return

    const message = $message.val()
    addMessage({user: nickname, msg: message})
    socket.emit('send message', message)
    $message.val('')
  })

  socket.on('new conn', displayConnInfo)
  socket.on('disconnect conn', displayConnInfo)
  socket.on('get users', displayUsers)
  socket.on('message', addMessage)
})
