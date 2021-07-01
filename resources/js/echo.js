import Echo from "laravel-echo"

const EchoApp = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});

EchoApp.channel('laravel_database_chatroom')
    .listen('.message_send', (res) => {
        console.log(res)
        alert(res.message.message)
    })