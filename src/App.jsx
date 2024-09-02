import React, { useState } from 'react';
import { toppings } from './data'; 

export default function App() {
  const [toppingState, setToppingState] = useState(
    toppings.map(topping => ({ ...topping, checked: false }))
  );
  const [total, setTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleChange = (index) => {
    const newToppingState = [...toppingState];
    newToppingState[index].checked = !newToppingState[index].checked;

    const newTotal = newToppingState
      .filter(topping => topping.checked)
      .reduce((sum, topping) => sum + topping.price, 0);

    setToppingState(newToppingState);
    setTotal(newTotal);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBack = () => {
    setShowCheckout(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
        {showCheckout ? 'Checkout Summary' : 'Select Toppings'}
      </h2>
      
      {!showCheckout ? (
        <>
          {toppingState.map((topping, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={topping.checked}
                  onChange={() => handleChange(index)}
                  className="mr-2"
                />
                <span>{topping.name}</span>
              </label>
              <span className="font-semibold">${topping.price.toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-4 pt-2 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-2">Total: ${total.toFixed(2)}</h3>
            <button 
              onClick={handleCheckout}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="checkout-summary">
          {toppingState.filter(topping => topping.checked).map((topping, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{topping.name}</span>
              <span>${topping.price.toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-4 pt-2 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-2">Total: ${total.toFixed(2)}</h3>
            <button 
              onClick={handleBack}
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200"
            >
              Back to Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}