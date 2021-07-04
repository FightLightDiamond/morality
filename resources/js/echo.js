import Echo from "laravel-echo"

window.EchoApp = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});

EchoApp.channel('laravel_database_chatroom')
    .listen('.message_send', (res) => {
        console.log(res)
        alert(res.message.message)
    })

EchoApp.channel('message')
    .listen('.sent', (res) => {
        console.log(res)
        alert('chatroom' + res.message.message)
    })

if(userId) {
    EchoApp.private(`message.${userId}`)
        .listen('.sent', (e) => {
            alert(12355)
            console.log(e.order);
        });
}

EchoApp.join(`room_message.${roomId}`)
    .here((users) => {
        //
    })
    .joining((user) => {
        console.log(user.name);
    })
    .leaving((user) => {
        console.log(user.name);
    })
    .error((error) => {
        console.error(error);
    }).listen('.sent', (e) => {
        alert("ROOM")
    });