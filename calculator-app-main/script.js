class Calculator {
  constructor(displayedAnswer) {
    this.displayedAnswer = displayedAnswer;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let prevNum = Number(this.prevOperand);
    let currentNum = Number(this.currentOperand);
    switch (this.operation) {
      case "+":
        this.displayedAnswer.innerText = prevNum + currentNum;
        break;
      case "-":
        this.displayedAnswer.innerText = prevNum - currentNum;
        break;
      case "x":
        this.displayedAnswer.innerText = prevNum * currentNum;
        break;
      case "/":
        this.displayedAnswer.innerText = prevNum / currentNum;
        break;
    }
    this.operation = undefined;
    this.currentOperand = this.displayedAnswer.innerText.toString();
  }

  updateDisplay() {
    this.displayedAnswer.innerText = this.currentOperand;
  }
}

const numberKeys = document.getElementsByClassName("num-key");
const opKeys = document.getElementsByClassName("op-key");
const equalsKey = document.getElementsByClassName("equal-key")[0];
const resetKey = document.getElementsByClassName("reset-key")[0];
const deleteKey = document.getElementsByClassName("delete-key")[0];
const displayedAnswer = document.getElementsByClassName("answer")[0];

const calculator = new Calculator(displayedAnswer);

Array.from(numberKeys).forEach((key) => {
  key.addEventListener("click", () => {
    calculator.appendNumber(key.innerText);
    calculator.updateDisplay();
  });
});

Array.from(opKeys).forEach((key) => {
  key.addEventListener("click", () => {
    if (calculator.operation !== undefined) {
      calculator.compute();
      calculator.chooseOperation(key.innerText);

      return;
    }
    calculator.chooseOperation(key.innerText);
    calculator.updateDisplay();
  });
});

equalsKey.addEventListener("click", () => {
  calculator.compute();
});

deleteKey.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

resetKey.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

function swapStyleSheet(sheet) {
  document.getElementById("pagestyle").setAttribute("href", sheet);
}
