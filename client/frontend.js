const form = document.getElementById("form");
const display = document.getElementById("response");
const question = document.getElementById("question");
const prompt = document.getElementById("prompt");

var text;

prompt.addEventListener("change", async function (e) {
  text = await e.target.value;
});

form.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    const data = await response.json();

    sessionStorage.setItem("res", data.res.message.content);
    sessionStorage.setItem("question", text);
    prompt.value = " "

    const questionT = sessionStorage.getItem("question");
    display.innerHTML = `<p class="p">GPT:</p> <p class="response">${sessionStorage.getItem(
      "res"
    )}</p>`;
    question.innerHTML = `<p class="p">You:</p> <p class="response">${questionT}</p>`;
  } catch (err) {
    console.log(err);
  }
});
prompt.addEventListener("keyup", (e) => {
  prompt.style.height = "44px";
  let height = e.target.scrollHeight;
  prompt.style.height = `${height}px`;
});

console.log(sessionStorage.getItem("res"));
console.log(sessionStorage.getItem("question"));
