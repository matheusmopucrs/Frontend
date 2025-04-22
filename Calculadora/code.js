const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const teclas = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "%", "/", "*", "-", "+", "Enter", "Backspace", "Escape", "Shift", "="];
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
const maxLength = 18;

// Função para verificar se o último número já contém um ponto
const ultimoNumeroTemPonto = () => {
  const partes = output.split(/[\+\-\*\/]/); // divide por operadores
  const ultimo = partes[partes.length - 1];
  return ultimo.includes(".");
};

const calculate = (inputValue) => {
  display.focus();

  if (inputValue === ".") {
    // Impede múltiplos pontos no mesmo número
    if (output === "" || ultimoNumeroTemPonto()) return;
  }

  if (inputValue === "=" && output !== "") {
    if (output.includes("/0")) {
      output = "∞";
    } else {
      try {
        output = eval(output.replace('%', "/100")).toString();
      } catch (error) {
        output = "Error";
      }
    }
  } else if (inputValue === "AC") {
    output = "";
  } else if (inputValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    if (output === "" && specialChars.includes(inputValue) && inputValue !== "-" && inputValue !== "%") return;
    if (output.length >= maxLength) return; // Limite máximo de caracteres
    output += inputValue;
  }

  display.value = output;
};

// Eventos de clique nos botões
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Evento de teclado
document.addEventListener('keydown', (e) => {
  if (teclas.includes(e.key)) {
    e.preventDefault();
  }

  if (!teclas.includes(e.key)) {
    output = "Error";
    display.value = output;
    return;
  }

  switch (e.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
    case '%':
    case '/':
    case '*':
    case '-':
    case '+':
      calculate(e.key);
      break;
    case 'Enter':
      calculate('=');
      break;
    case 'Backspace':
      calculate('DEL');
      break;
    case 'Escape':
      calculate('AC');
      break;
  }
});
