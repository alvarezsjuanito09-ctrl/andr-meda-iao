const robot = document.getElementById("robot");
const message = document.getElementById("message");
const label = document.getElementById("expressionLabel");
const speakButton = document.getElementById("speakButton");
const buttons = [...document.querySelectorAll(".expression")];

const expressions = {
  happy: {
    label: "ALEGRE",
    text: "¡Bienvenido de nuevo al estudio, Pancho! ¿Qué cocinaremos hoy?"
  },
  laugh: {
    label: "RIENDO",
    text: "¡Jajaja! ¡Vamos a cocinar un buen beat, jefe!"
  },
  surprised: {
    label: "SORPRENDIDA",
    text: "¡Uy! Eso no me lo esperaba."
  },
  thinking: {
    label: "PENSANDO",
    text: "Mmm... dame un momento, jefe."
  },
  focused: {
    label: "CONCENTRADA",
    text: "Estoy revisando los detalles."
  },
  listening: {
    label: "ESCUCHANDO",
    text: "Te escucho, jefe. ¿Qué sonido quieres conseguir?"
  }
};

function setExpression(name, customText) {
  const data = expressions[name] || expressions.happy;

  robot.dataset.expression = name;
  robot.className = "robot idle " + name;

  label.textContent = data.label;
  message.textContent = customText || data.text;

  buttons.forEach(btn =>
    btn.classList.toggle("active", btn.dataset.expression === name)
  );
}

function speak() {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance(message.textContent);
  voice.lang = "es-CL";
  voice.rate = 1.02;
  voice.pitch = 1.12;

  robot.classList.add("speaking");

  voice.onend = () => robot.classList.remove("speaking");
  voice.onerror = () => robot.classList.remove("speaking");

  window.speechSynthesis.speak(voice);
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    setExpression(btn.dataset.expression);
    if (btn.dataset.expression === "laugh") speak();
  });
});

speakButton.addEventListener("click", speak);

document.getElementById("helloButton").addEventListener("click", () => {
  setExpression("happy");
  speak();
});

document.getElementById("thinkButton").addEventListener("click", () => {
  setExpression("thinking", "A ver, jefe... muéstrame tu idea.");
  speak();
});

document.getElementById("laughButton").addEventListener("click", () => {
  setExpression("laugh");
  speak();
});

const idleExpressions = [
  "happy",
  "listening",
  "happy",
  "thinking"
];

let index = 0;

setInterval(() => {
  if (document.hidden || robot.classList.contains("speaking")) return;

  index = (index + 1) % idleExpressions.length;
  setExpression(idleExpressions[index]);
}, 8500);

setExpression("happy");
