import { toppings } from './data'; // Importing toppings data from a local file
import { useState } from 'react'; // Importing useState hook from React

function App() {
  // Initialize state for toppings and total
  // toppingState holds the state of each topping, including its checked status
  // total holds the sum of the prices of the checked toppings
  const [toppingState, setToppingState] = useState(
    toppings.map(topping => ({ ...topping, checked: false }))
  );
  const [total, setTotal] = useState(0);

  // Handle checkbox change
  const hldChange = (index) => {
    // Create a copy of the current topping state
    const newToppingState = [...toppingState];
    // Toggle the checked status of the topping at the given index
    newToppingState[index].checked = !newToppingState[index].checked;

    // Calculate new total by summing the prices of all checked toppings
    const newTotal = newToppingState
      .filter(topping => topping.checked)
      .reduce((sum, topping) => sum + topping.price, 0);

    // Update the state with the new topping states and the new total
    setToppingState(newToppingState);
    setTotal(newTotal);
  };

  return (
    <>
      <h2>Select Topping</h2>
      {/* Render a list of checkboxes for each topping */}
      {toppingState.map((el, index) => (
        <form key={index}>
          <input
            onChange={() => hldChange(index)} // Attach the change handler to each checkbox
            type='checkbox'
            checked={el.checked} // Set the checked status based on the state
          />
          {el.name} ${el.price} {/* Display the name and price of the topping */}
        </form>
      ))}
      {/* Display the total price of the checked toppings, formatted to two decimal places */}
      <h3>Total: ${total.toFixed(2)}</h3>
    </>
  );
}

export default App;