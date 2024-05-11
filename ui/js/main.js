var chatform = document.getElementById("chat-form");
var inputvalue = document.getElementById("msg");

const {username , room} = Qs.parse(window.location.search,{
    ignoreQueryPrefix:true
});


const socket = io();

// message from server
socket.on("message" , msg => {
    console.log(msg);
    outputMessage(msg);
})

chatform.addEventListener('submit',(e) => {
    e.preventDefault();
    const message = (e.target.elements.msg.value);
    //send the message to server
    socket.emit("chatMsg",username,message);
    //clear input after sent the message
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

function outputMessage(msg,e){
    var div = document.createElement("div");
    div.classList.add('message');
    div.innerHTML= `
    <p class="meta">${msg.username} <span>${msg.time}</span></p>
	<p class="text">
		${msg.text}
	</p>
    `

    document.getElementsByClassName("chat-messages")[0].appendChild(div);
}