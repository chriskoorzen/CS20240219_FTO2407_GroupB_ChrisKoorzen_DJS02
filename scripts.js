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

  // Crash Program on text inputs
  try{
    if (containsText(dividend) || containsText(divider)){
      throw TypeError("NotANumberError");
    };
  } catch (error){
    console.error(error);
    document.body.innerHTML = "";
    document.body.append(
      Object.assign(
        document.createElement("h1"), 
        {innerText:"Something critical went wrong. Please reload the page"}
      )
    );
    return;
  };

  // Success - return the result
  result.innerText = Math.floor(dividend / divider);   // round down to nearest Integer
});



/**
 * Tests if a string is a complete, valid number.
 *
 * @param {string} numberString
 * @returns {boolean} True if string contains letters
 */
function containsText(numberString){
  /* 
    The project brief does not explicitly state whether or not
    decimal values may be used as inputs (eg. 3 / 1.5).
    Therefore we have to make allowance for the "." character
    without leaking loopholes like "....." as an input.
  */

  const number = Number.parseFloat(numberString);
  
  if(Number.isNaN(number)){ // Simple Case
    return true;
  };

  /* 
    Because Number.parse[Int|Float] itself silently ignores mixed inputs,
    we can do a length comparison after the conversion 
    to see if we have a valid number.
  */
  return !(String(number).length === numberString.length);
};