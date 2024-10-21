const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  // Values may not be empty
  if(dividend === "" || divider === ""){
    result.innerText = "Division not performed. Both values are required in inputs. Try again";
    return;
  };

  // Do not divide by Zero
  try{
    if (divider === "0"){
      result.innerText = "Division not performed. Invalid number provided. Try again";
      throw RangeError("DivideByZeroError");
    };
  } catch (error){
    console.error(error);
    return;
  };

  result.innerText = Math.floor(Number.parseFloat(dividend / divider));   // round down to nearest Integer
});