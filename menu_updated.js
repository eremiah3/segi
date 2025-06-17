const style = document.createElement("style");
style.innerHTML = `
body { font-family: Arial, sans-serif; margin: 0; padding: 0; font-size: 14px; }
.container { max-width: 1200px; margin: 20px auto; padding: 0 20px; }
.menu { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 15px; }
.menu-column { width: 30%; padding: 10px; background-color: #000; border: 1px solid #ddd; border-radius: 8px; font-size: 13px; }
.menu-column h2 { text-align: center; color: #fff; font-size: 16px; }
.menu-column .price { color: #007BFF; font-weight: bold; font-size: 14px; }
button { color: blue; border: none; padding: 8px; cursor: pointer; border-radius: 5px; font-size: 14px; }
.cart { margin-top: 20px; padding: 10px; background-color: #f4e2cc; border: 1px solid #ddd; border-radius: 8px; }
.cart-item { display: flex; justify-content: space-between; }
.cart-total { font-weight: bold; }
/* Responsive Design */
@media (max-width: 1024px) {
    .menu-column { width: 45%; } /* On tablets, two items per row */
}

@media (max-width: 768px) {
    .menu-column { width: 100%; } /* On mobile, one item per row */
    .container { padding: 0 10px; }
    body { font-size: 12px; } /* Slightly smaller text */
    button { padding: 6px; font-size: 12px; }
}
`;

document.head.appendChild(style);

console.log('Menu.js script is executing'); // Additional log for debugging
// Cart array to hold items

let cart = [];

// Function to display the menu
const menuItems = [
    {
        name: "Gold Service",
        price: 55.00,
        quantity: 0,
        minOrder: 50,
        menu: "Fried Rice, Jollof Rice, Moi-Moi, Boiled Rice, Pounded Yam, Eba, Amala, Beans, Porridge & Stew, Iyan, Vegetable Stew, Egusi Stew, Garnished Chicken, Garnished Beef, Garnished Fish, Puff-Puff, Chin-Chin, Meat Pie, Spring Rolls, Noodles, Lasagna, Pepper Soup, Assorted Soups, Ayamase, Ofada Stew, Gbegiri & Ewadu, Fried Plantain, Dodo & Gizzard, Meat on Skewers (Beef, Chicken or Gizzard)",
        starters: "Puff-puff, Spring roll, Chicken wings, Prawns",
        staffing: "x4 with Chafing Dishes & Fuels, Serving Spoons, Set Up & Serve (Excluding Transport charges)"
    },
    {
        name: "Silver Service",
        price: 42.50,
        quantity: 0,
        minOrder: 50,
        menu: "Jollof Rice, Fried Rice, Stir Fry Noodles, Pottage, Iyan & Vegetable Stew, Beef in Pepper Garnishing, Chicken in Pepper Garnishing, Fried Chicken, Fried Fish, Beans and Stew, Salad, Moi-Moi, Plantain",
        starters: "Puff-puff, Spring roll, Chicken wings",
        staffing: "x2 with Chafing Dishes, Fuels, Serving Spoons, Set Up & Serve (Excluding Transport charges)"
    },
    {
        name: "Bronze Service",
        price: 37.50,
        quantity: 0,
        minOrder: 50,
        menu: "Jollof Rice, Fried Rice, Stir Fry Noodles, Garnished Beef in Stew, Garnished Chicken in Stew, Iyan & Vegetable Stew, Fried Chicken, Salad, Plantain",
        starters: "Puff-puff, Spring roll, Chicken wings",
        staffing: "x2 with Chafing Dishes, Fuels, Serving Spoons, Set Up & Serve (Excluding Delivery charges)"
    },
    {
        name: "Children Party",
        price: 40.00,
        quantity: 0,
        minOrder: 30,
        menu: "Mini Burgers, Hot Dogs, Chicken Nuggets, Fries, Pizza Slices, Cupcakes, Juice Boxes",
        starters: "Fruit Skewers, Mini Sausages, Popcorn",
        staffing: "x2 with Disposable Plates & Cutlery, Set Up & Serve"
    },
    {
        name: "Breakfast 1",
        price: 25.00,
        quantity: 0,
        minOrder: 20,
        menu: "Pancakes, Scrambled Eggs, Bacon, Sausages, Toast, Baked Beans, Tea & Coffee",
        starters: "Fruit Salad, Yogurt Parfaits",
        staffing: "x1 with Chafing Dishes, Set Up & Serve"
    },
    {
        name: "Breakfast 2",
        price: 25.00,
        quantity: 0,
        minOrder: 20,
        menu: "Oatmeal, Waffles, Omelets, Hash Browns, Fresh Juice, Herbal Tea",
        starters: "Granola Bars, Smoothie Bowls",
        staffing: "x1 with Chafing Dishes, Set Up & Serve"
    },
    {
        name: "Caribbean Food",
        price: 40.00,
        quantity: 0,
        minOrder: 40,
        menu: "Jerk Chicken, Rice & Peas, Fried Plantains, Curried Goat, Callaloo, Roti, Saltfish & Ackee",
        starters: "Fried Dumplings, Patties",
        staffing: "x3 with Chafing Dishes, Fuels, Serving Spoons, Set Up & Serve"
    },
    {
        name: "Finger Foods and Cooler/Pot/Tray Service",
        price: 40.00,
        quantity: 0,
        minOrder: 40,
        menu: "Meat Pies, Spring Rolls, Chicken Wings, Puff-Puff, Mini Sandwiches, BBQ Skewers",
        starters: "Assorted Dips, Cheese Platter",
        staffing: "Self-service packaging, Trays & Pots Provided"
    },
    {
        name: "Extra Breakfast Menu",
        price: 25.00,
        quantity: 0,
