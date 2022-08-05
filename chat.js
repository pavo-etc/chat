connect();

let username = "NAMELESS"
let allMsgs = "";

function connect() {
    var websocket = new WebSocket("wss://cits3200api.zachmanson.com:8765")
}

function submitName(name) {
    username = name;
    chatBox.placeholder = "Send message as " + username;
    websocket.send("New chatroom user: " + username);
    document.getElementById("enterroom").classList.add("hidden");
    document.getElementById("chatinterface").classList.remove("hidden");
    chatBox.focus();
}

function sendMsg() {
    if (chatBox.value !== "") {
        websocket.send(`<${username}> ${chatBox.value}`);
        chatBox.value = "";
    }
}

let nameBox = document.getElementById("name-box");
let enterButton = document.getElementById("enter-button");

let chatBox = document.getElementById("chat-box");
let messages = document.getElementById("messages");
let sendButton = document.getElementById("send-button");

let chatInterface = document.getElementById("chatinterface");

nameBox.addEventListener("keypress", (event)=>{
    if (event.key === "Enter") {
        event.preventDefault();
        if (nameBox.value !== "") {
            submitName(nameBox.value);
        }
    }
});

enterButton.addEventListener("click", ()=>{
    if (nameBox.value !== "") {
        submitName(nameBox.value);
    }
})

chatBox.addEventListener("keypress", (event)=>{
    if (event.key === "Enter") {
        event.preventDefault();
        if (nameBox.value !== "") {
            sendMsg();
        }
    }
});

sendButton.addEventListener("click", ()=>{
    if (nameBox.value !== "") {
        sendMsg();
    }
})

websocket.onmessage = (event) => {
    console.log("Received: ",event.data);
    allMsgs += "\n"+event.data
    messages.innerText = allMsgs;
    chatInterface.scrollIntoView(false);
}

websocket.onclose = function(e) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(function() {
      connect();
    }, 1000);
};