const menu = {
    pizza: [
        { name: "Margherita", price: 200, description: "Classic cheese pizza with fresh tomatoes and basil.", image: "./images/pizzaMargarita.jpg" },
        { name: "Pepperoni", price: 300, description: "Topped with spicy pepperoni and mozzarella cheese.", image: "./images/pizza2.jpg" },
        { name: "BBQ Chicken", price: 350, description: "Grilled chicken with tangy BBQ sauce and red onions.", image: "./images/bbq.jpg" }
    ],
    drinks: [
        { name: "Coke", price: 50, description: "Chilled classic Coca-Cola.", image: "./images/coke.jpeg" },
        { name: "Sprite", price: 50, description: "Refreshing lemon-lime soda.", image: "./images/spritw.jpeg" },
        { name: "Water", price: 20, description: "Bottled still water.", image: "./images/water.jpg" }
    ],
    others: [
        { name: "Garlic Bread", price: 100, description: "Crispy garlic bread topped with butter and herbs.", image: "./images/garlic.jpeg" },
        { name: "Fries", price: 80, description: "Golden fries with a sprinkle of salt.", image: "./images/fries.jpeg" }
    ]
};

let order = {};
let totalPrice = 0;

// Display menu based on category
function showMenu(category) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = ''; // Clear previous items

    menu[category].forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-details">
                <h3>${item.name} - ₹${item.price}</h3>
                <p>${item.description}</p>
            </div>
            <button onclick="addItemToOrder('${item.name}', ${item.price})">Add</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}

// Add item to order or increase quantity if it already exists
function addItemToOrder(name, price) {
    if (order[name]) {
        order[name].quantity += 1;
        order[name].totalPrice += price;
    } else {
        order[name] = {
            quantity: 1,
            price: price,
            totalPrice: price
        };
    }
    updateOrderSummary();
}

// Update order summary with quantity and total price for each item
function updateOrderSummary() {
    const orderList = document.getElementById('order-list');
    const totalPriceElement = document.getElementById('total-price');
    orderList.innerHTML = ''; // Clear previous order list
    totalPrice = 0; // Reset total price

    for (const [name, details] of Object.entries(order)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${name} x ${details.quantity} = ₹${details.totalPrice}`;
        orderList.appendChild(listItem);
        totalPrice += details.totalPrice;
    }

    totalPriceElement.textContent = totalPrice;
}

// Confirm order and send back to WhatsApp bot
function confirmOrder() {
    const note = document.getElementById('notes').value;
    let orderDetails = "Your order:\n";
    
    for (const [name, details] of Object.entries(order)) {
        orderDetails += `${name} x ${details.quantity} = ₹${details.totalPrice}\n`;
    }
    
    orderDetails += `Total: ₹${totalPrice}\nNote: ${note}`;

    // Redirect to WhatsApp with order details
    const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodeURIComponent(orderDetails)}`;
    window.location.href = whatsappUrl;
}
