function whatIf(type) {
  const params = new URLSearchParams(window.location.search);

  if (type === "lowBudget") {
    params.set("budget", "low");
  }

  if (type === "addDay") {
    const days = parseInt(params.get("duration") || 5);
    params.set("duration", days + 1);
  }

  window.location.href = "/search?" + params.toString();
}


const chatForm = document.getElementById("chatForm");
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");

chatForm.addEventListener("submit", () => {
  const text = userInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = text;
  chatWindow.appendChild(userMsg);

  const aiThinking = document.createElement("div");
  aiThinking.className = "ai-msg";
  aiThinking.innerText = "🤖Got it 👍 Let me find the best trips for you...";
  chatWindow.appendChild(aiThinking);

  chatWindow.scrollTop = chatWindow.scrollHeight;
});

function typeAIMessage(text) {
  const aiMsg = document.createElement("div");
  aiMsg.className = "ai-msg";
  chatWindow.appendChild(aiMsg);

  let i = 0;
  const interval = setInterval(() => {
    aiMsg.innerText += text.charAt(i);
    i++;
    chatWindow.scrollTop = chatWindow.scrollHeight;

    if (i >= text.length) clearInterval(interval);
  }, 20);
}


const voiceBtn = document.getElementById("voiceBtn");

if ("webkitSpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";
  recognition.continuous = false;

  voiceBtn.onclick = () => {
    recognition.start();
  };

  recognition.onresult = event => {
    userInput.value = event.results[0][0].transcript;
  };
}
