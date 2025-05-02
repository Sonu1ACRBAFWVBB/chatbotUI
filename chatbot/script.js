function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBody = document.getElementById("chat-body");

    if (input.value.trim() === "") return;

    const userMsg = document.createElement("div");
    userMsg.textContent = input.value;
    userMsg.className = "user-message";
    chatBody.appendChild(userMsg);

    // Dummy bot response
    const botMsg = document.createElement("div");
    botMsg.textContent = "I'm looking that up for you!";
    botMsg.className = "bot-message";
    chatBody.appendChild(botMsg);

    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
}

function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        const voiceText = event.results[0][0].transcript;
        document.getElementById("user-input").value = voiceText;
        sendMessage();
    };

    recognition.onerror = function(event) {
        alert('Voice recognition error: ' + event.error);
    };
}
