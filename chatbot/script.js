async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBody = document.getElementById("chat-body");

    if (input.value.trim() === "") return;

    // Display user message
    const userMsg = document.createElement("div");
    userMsg.textContent = input.value;
    userMsg.className = "user-message";
    chatBody.appendChild(userMsg);

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input.value })
        });

        const data = await response.json();

        // Display bot reply
        const botMsg = document.createElement("div");
        botMsg.textContent = data.reply;
        botMsg.className = "bot-message";
        chatBody.appendChild(botMsg);
    } catch (error) {
        const errorMsg = document.createElement("div");
        errorMsg.textContent = "Error connecting to the chatbot.";
        errorMsg.className = "bot-message";
        chatBody.appendChild(errorMsg);
    }

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