import React, { useState } from 'react';

const BurgerGame = () => {
    const [burger, setBurger] = useState([]);

    // Available options for the burger
    const options = {
        breads: ['Sesame Bun', 'Whole Wheat Bun', 'Lettuce Wrap', 'Brioche Bun'],
        patties: ['Beef Patty', 'Chicken Patty', 'Veggie Patty', 'Fish Patty'],
        vegetables: ['Lettuce', 'Tomato', 'Onions', 'Pickles'],
        condiments: ['Ketchup', 'Mustard', 'Mayo', 'BBQ Sauce', 'Cheese'], // Added Cheese option
    };

    // Function to handle adding ingredients to the burger
    const addIngredient = (ingredient) => {
        setBurger([...burger, ingredient]);
    };

    // Function to handle resetting the burger
    const resetBurger = () => {
        setBurger([]);
    };

    // Function to generate classes for each ingredient (for visual stacking), include different colors for ingredients
    const getIngredientStyle = (ingredient) => {
        switch (ingredient) {
            case 'Sesame Bun':
            case 'Whole Wheat Bun':
            case 'Lettuce Wrap':
            case 'Brioche Bun':
                return 'bg-yellow-500 w-40 h-8 rounded-full';
            case 'Beef Patty':
            case 'Chicken Patty':
            case 'Veggie Patty':
            case 'Fish Patty':
                return 'bg-yellow-900 w-36 h-8 rounded-full';
            case 'Lettuce':
                return 'bg-green-500 w-36 h-6 rounded-full';
            case 'Tomato':
                return 'bg-red-500 w-32 h-6 rounded-full';
            case 'Onions':
                return 'bg-purple-400 w-32 h-4 rounded-full';
            case 'Pickles':
                return 'bg-green-600 w-28 h-4 rounded-full';
            case 'Ketchup':
                return 'bg-red-600 w-32 h-3 rounded-full';
            case 'Mustard':
                return 'bg-yellow-600 w-32 h-3 rounded-full';
            case 'Mayo':
                return 'bg-white w-32 h-3 rounded-full';
            case 'BBQ Sauce':
                return 'bg-red-800 w-32 h-3 rounded-full';
            case 'Cheese': // Added Cheese style
                return 'bg-yellow-300 w-32 h-3 rounded-none'; // White square for Cheese
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Build Your Burger!</h1>

            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Select Your Ingredients:</h2>

                {/* Ingredient Selection */}
                <div className="space-y-4">
                    {/* Breads */}
                    <div>
                        <h3 className="text-lg font-semibold">Breads:</h3>
                        <div className="flex space-x-2">
                            {options.breads.map((bread) => (
                                <button
                                    key={bread}
                                    onClick={() => addIngredient(bread)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                                >
                                    {bread}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Patties */}
                    <div>
                        <h3 className="text-lg font-semibold">Patties:</h3>
                        <div className="flex space-x-2">
                            {options.patties.map((patty) => (
                                <button
                                    key={patty}
                                    onClick={() => addIngredient(patty)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                                >
                                    {patty}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Vegetables */}
                    <div>
                        <h3 className="text-lg font-semibold">Vegetables:</h3>
                        <div className="flex space-x-2">
                            {options.vegetables.map((vegetable) => (
                                <button
                                    key={vegetable}
                                    onClick={() => addIngredient(vegetable)}
                                    className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                                >
                                    {vegetable}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Condiments */}
                    <div>
                        <h3 className="text-lg font-semibold">Condiments:</h3>
                        <div className="flex space-x-2">
                            {options.condiments.map((condiment) => (
                                <button
                                    key={condiment}
                                    onClick={() => addIngredient(condiment)}
                                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                >
                                    {condiment}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Displayed Burger */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Your Burger:</h3>
                    <div className="bg-gray-200 p-4 mt-4 rounded-md flex flex-col items-center space-y-1">
                        {burger.length === 0 ? (
                            <p>Your burger is empty. Start adding ingredients!</p>
                        ) : (
                            // Reverse display for stacking effect (from bottom to top)
                            burger
                                .slice(0)
                                .reverse()
                                .map((ingredient, index) => (
                                    <div
                                        key={index}
                                        className={`${getIngredientStyle(ingredient)} flex items-center justify-center`}
                                    >
                                        {/* Remove the ingredient name from burger display */}
                                    </div>
                                ))
                        )}
                    </div>
                </div>

                {/* Reset Button */}
                <div className="mt-4">
                    <button
                        onClick={resetBurger}
                        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                    >
                        Reset Burger
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BurgerGame;