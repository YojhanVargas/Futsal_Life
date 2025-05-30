import Message from '../models/Message.js';

let currentChatUser = "";
const messages = [];

function openChat(user) {
    currentChatUser = user;
    document.getElementById("chatUser").textContent = `Chat con ${user}`;
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = ""; // Limpiar mensajes anteriores

    // Mostrar mensajes previos con este usuario
    const filteredMessages = messages.filter(message => message.receiver === currentChatUser || message.sender === currentChatUser);
    filteredMessages.forEach(message => {
        const newMessage = document.createElement("div");
        newMessage.classList.add("chat-message");
        newMessage.innerHTML = `<strong>${message.sender}:</strong> ${message.content}`;
        chatMessages.appendChild(newMessage);
    });
}

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
        const newMessage = new Message('Tú', currentChatUser, messageText);
        messages.push(newMessage);

        const chatMessages = document.getElementById("chatMessages");
        const newMessageDiv = document.createElement("div");
        newMessageDiv.classList.add("chat-message");
        newMessageDiv.innerHTML = `<strong>Tú:</strong> ${messageText}`;
        chatMessages.appendChild(newMessageDiv);

        messageInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

export { openChat, sendMessage };