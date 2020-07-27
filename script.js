const val1 = document.getElementById("currency-one");
const val2 = document.getElementById("currency-two");
const amount1 = document.getElementById("amount-one");
const amount2 = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const btn = document.getElementById("rate_btn");
function calc(cur) {
  var currency_one = val1.value;
  var currency_two = val2.value;
  var result;
  fetch(
    `https://v6.exchangerate-api.com/v6/0b4241a274b3dcc368c71bc0/latest/${currency_one}`
  ).then((res) =>
    res.json().then((data) => {
      console.log(data);
      result = data.conversion_rates[currency_two];
      console.log(result);
      rate.innerHTML = `Курс обмена на ${data.time_last_update_utc.substr(
        0,
        17
      )} <br> составляет  1 ${currency_one} = ${result} ${currency_two}`;
      amount2.value = (+amount1.value * +result).toFixed(2);
    })
  );
}

function sendError() {
  $.toast({
    text: "We're Sorry but RUB is not supported in Base configuration.",
    showHideTransition: "slide", // It can be plain, fade or slide
    bgColor: "red", // Background color for toast
    textColor: "#000", // text color
    allowToastClose: false, // Show the close button or not
    hideAfter: 5000, // `false` to make it sticky or time in miliseconds to hide after
    stack: 5, // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
    textAlign: "center", // Alignment of text i.e. left, right, center
    position: "top-center", // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
  });
}
val1.addEventListener("change", calc);
val2.addEventListener("change", calc);
amount1.addEventListener("input", calc);
amount2.addEventListener("input", calc);
rate_btn.addEventListener("click", () => {
  if (val2.value == "RUB") {
    sendError();
  } else {
    const temp = val1.value;

    val1.value = val2.value;
    val2.value = temp;
    calc();
  }
});
calc();
