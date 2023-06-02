window.addEventListener("load", () => {
  const entry = document.querySelector("#entryValue");
  const customTip = document.querySelector("#customTip");
  const tipsBtn = document.querySelectorAll(".tipsBtn");
  const numberOfPeople = document.querySelector("#numberOfPeople");
  const tipAmount = document.querySelector("#tipAmount");
  const total = document.querySelector("#total");
  const reset = document.querySelector(".reset");
  let tipValue = 0;

  // entry
  entry.addEventListener("input", () => {
    checkEntry(entry);
    calculate();
  });

  // tipsBtn
  tipsBtn.forEach((tip) => {
    tip.addEventListener("click", () => {
      tip.classList.toggle("activeBtn");
      if (tip.classList.contains("activeBtn")) {
        tipsBtn.forEach((tip) => tip.classList.remove("activeBtn"));
        tip.classList.add("activeBtn");
      }
      if (tip.classList.contains("activeBtn")) {
        tipValue = parseInt(tip.innerHTML);
      } else {
        tipValue = 0;
      }
      calculate();
    });
  });

  customTip.addEventListener("click", () => {
    tipValue = customTip.value;
    tipsBtn.forEach((tip) => tip.classList.remove("activeBtn"));
    calculate();
  });

  customTip.addEventListener("input", () => {
    tipValue = customTip.value;
    calculate();
  });

  // numberOfPeople
  numberOfPeople.addEventListener("input", () => {
    checkNumberOfPeople(numberOfPeople);
    calculate();
  });

  function calculate() {
    let sumAmount = 0;
    let sumTotal = 0;
    const entryInt = isNaN(parseFloat(entry.value))
      ? 0
      : parseFloat(entry.value);
    tipValue = Number(tipValue);
    const numberOfPeopleInt = isNaN(parseInt(numberOfPeople.value))
      ? 0
      : parseInt(numberOfPeople.value);
    if (entryInt >= 0) {
      sumAmount = entryInt.toFixed(2);
      sumTotal = entryInt.toFixed(2);
    }
    if (entryInt >= 0 && tipValue >= 0) {
      sumAmount = ((entryInt * tipValue) / 100).toFixed(2);
      sumTotal = (entryInt + (entryInt * tipValue) / 100).toFixed(2);
    }
    if (entryInt >= 0 && tipValue >= 0 && numberOfPeopleInt >= 1) {
      sumAmount = ((entryInt * tipValue) / 100 / numberOfPeopleInt).toFixed(2);
      sumTotal = (
        (entryInt + (entryInt * tipValue) / 100) /
        numberOfPeopleInt
      ).toFixed(2);
    }

    if (
      entry.value.length >= 1 ||
      tipValue >= 1 ||
      numberOfPeople.value.length >= 1
    ) {
      reset.classList.add("enable");
    }

    if (reset.classList.contains("enable")) {
      reset.addEventListener("click", () => {
        entry.value = "";
        setUpdateSuccess(entry);
        customTip.value = "";
        tipsBtn.forEach((tip) => tip.classList.remove("activeBtn"));
        numberOfPeople.value = "";
        setUpdateSuccess(numberOfPeople);
        tipAmount.innerHTML = "$0.00";
        total.innerHTML = "$0.00";
        reset.classList.remove("enable");
      });
    }

    tipAmount.innerHTML = `$${sumAmount}`;
    total.innerHTML = `$${sumTotal}`;
  }
});

function checkEntry(input) {
  if (Number(input.value) < 0) {
    setUpdateError(input, "only positive numbers");
  } else {
    setUpdateSuccess(input);
  }
}

function checkNumberOfPeople(input) {
  if (input.value === "") {
    setUpdateError(input, "cannot be empty");
  } else if (Number(input.value) === 0) {
    setUpdateError(input, "can't be zero");
  } else if (Number(input.value) < 0) {
    setUpdateError(input, "only positive numbers");
  } else {
    setUpdateSuccess(input);
  }
}

function setUpdateError(input, msg) {
  const formControl = input.parentNode;
  const message = formControl.querySelector(".message");
  formControl.classList.add("invalid");
  message.innerHTML = msg;
}

function setUpdateSuccess(input) {
  const formControl = input.parentNode;
  const message = document.querySelector(".message");
  formControl.classList.remove("invalid");
  message.innerHTML = "";
}
