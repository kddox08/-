const messagesEl = document.getElementById("messages");
const composer = document.getElementById("composer");

const now = () =>
  new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

const addMessage = ({ user, text, own = false }) => {
  const item = document.createElement("li");
  item.className = `message${own ? " you" : ""}`;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${user} • ${now()}`;

  const body = document.createElement("div");
  body.textContent = text;

  item.append(meta, body);
  messagesEl.append(item);
  messagesEl.scrollTop = messagesEl.scrollHeight;
};

const starterMessages = [
  { user: "System", text: "Welcome to ChattingApp 👋" },
  { user: "System", text: "Try posting a message below." },
];

starterMessages.forEach(addMessage);

const botReplies = [
  "Nice to meet you!",
  "That sounds great 🚀",
  "I am a demo reply bot for now.",
  "Could you tell me more?",
];

composer.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(composer);
  const username = (formData.get("username") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();

  if (!username || !message) {
    return;
  }

  addMessage({ user: username, text: message, own: true });
  composer.reset();

  const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
  window.setTimeout(() => {
    addMessage({ user: "ChatBot", text: reply });
  }, 500);
});
