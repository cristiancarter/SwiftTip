const input = document.getElementById("input");
let billAmount = document.getElementById("amount");
let customTip = document.getElementById("custom-tip");
const resetBtn = document.getElementById("reset-btn");
const calculateBtn = document.getElementById("calculate-btn");
const percentageDrop = document.getElementById("percentage");

resetBtn.addEventListener("click", function () {
  input.value = "";
  customTip.value = "";
  billAmount.value = "";
  percentageDrop.value = 0;
});

calculateBtn.addEventListener("click", function () {
  const amount = parseFloat(billAmount.value);

  if (isNaN(amount) || amount <= 0) {
    input.value = "Please provide a valid amount";
    return;
  }

  const percentage = parseFloat(percentageDrop.value);
  const customTipValue = parseFloat(customTip.value) / 100;

  let tipAmount;

  if (customTip.value && customTipValue > 0) {
    tipAmount = (amount * customTipValue).toFixed(2);
    percentageDrop.value = 0;
  } else {
    tipAmount = (amount * percentage).toFixed(2);
    customTip.value = "";
  }

  input.value = `£${tipAmount}`;
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateBtn.click();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key == "R" || event.key === "r") {
    resetBtn.click();
  }
});
