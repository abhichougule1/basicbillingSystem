// Function to populate menu items in a select element
function populateMenuSelect(selectElement) {
    const menuItems = Array.from(document.querySelectorAll('#menu ul li'));
    menuItems.forEach(item => {
        const price = item.getAttribute('data-price');
        const option = document.createElement('option');
        option.value = price;
        option.textContent = item.textContent;
        selectElement.appendChild(option);
    });
}

// Function to add a customer to a table
function addCustomer(tableId) {
    const table = document.getElementById(tableId);
    const customerNameInput = table.querySelector('.customer-name');
    const customerName = customerNameInput.value.trim();

    if (!customerName) {
        alert("Please enter a customer name.");
        return;
    }

    // Create a new customer section
    const customerDiv = document.createElement('div');
    customerDiv.classList.add('customer');
    customerDiv.innerHTML = `
        <h4>${customerName}</h4>
        <ul class="order-list"></ul>
        <p>Total: ₹<span class="total">0</span></p>
        <select class="menu-select" onchange="toggleOtherInput(this)">
            <option value="">Select an item</option>
        </select>
        <input type="text" class="other-input" placeholder="Specify other item" style="display:none;" />
        <input type="number" class="other-price" placeholder="Price" style="display:none;" min="0" />
        <button onclick="addOrder(this)">Add Order</button>
    `;

    // Populate the menu select for the customer
    const menuSelect = customerDiv.querySelector('.menu-select');
    populateMenuSelect(menuSelect);

    // Append the new customer section to the table
    const customersDiv = table.querySelector('.customers');
    customersDiv.appendChild(customerDiv);

    // Clear the input field
    customerNameInput.value = '';
}

// Function to toggle the visibility of the other input fields
function toggleOtherInput(select) {
    const otherInput = select.parentElement.querySelector('.other-input');
    const otherPriceInput = select.parentElement.querySelector('.other-price');
    if (select.value === 'other') {
        otherInput.style.display = 'block';
        otherPriceInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
        otherPriceInput.style.display = 'none';
        otherInput.value = ''; // Clear the input if not selected
        otherPriceInput.value = ''; // Clear the price input if not selected
    }
}

// Function to add an order for a customer
function addOrder(button) {
    const customerDiv = button.parentElement;
    const orderList = customerDiv.querySelector('.order-list');
    const totalElement = customerDiv.querySelector('.total');
    const select = customerDiv.querySelector('.menu-select');
    const otherInput = customerDiv.querySelector('.other-input');
    const otherPriceInput = customerDiv.querySelector('.other-price');
    const selectedPrice = select.value;

    let orderItemText = '';
    let orderItemPrice = 0;

    if (selectedPrice === 'other') {
        orderItemText = otherInput.value.trim();
        orderItemPrice = parseFloat(otherPriceInput.value);
        if (!orderItemText || isNaN(orderItemPrice) || orderItemPrice < 0) {
            alert("Please specify the other item and its price.");
            return;
        }
    } else if (!selectedPrice) {
        alert("Please select an item.");
        return;
    } else {
        orderItemText = select.options[select.selectedIndex].textContent;
        orderItemPrice = parseFloat(selectedPrice);
    }

    const orderItem = document.createElement('li');
    orderItem.textContent = `${orderItemText} - ₹${orderItemPrice.toFixed(2)}`;
    orderList.appendChild(orderItem);

    // Update total
    const currentTotal = parseFloat(totalElement.textContent);
    const newTotal = currentTotal + orderItemPrice;
    totalElement.textContent = newTotal.toFixed(2); // Format to 2 decimal places

    // Clear the selection and other inputs
    select.value = '';
    otherInput.style.display = 'none';
    otherPriceInput.style.display = 'none';
    otherInput.value = '';
    otherPriceInput.value = '';
}

// Parcel Order Functions
function toggleParcelOtherInput(select) {
    const otherInput = document.querySelector('.parcel-other-input');
    const otherPriceInput = document.querySelector('.parcel-other-price');
    if (select.value === 'other') {
        otherInput.style.display = 'block';
        otherPriceInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
        otherPriceInput.style.display = 'none';
        otherInput.value = ''; // Clear the input if not selected
        otherPriceInput.value = ''; // Clear the price input if not selected
    }
}

function addParcelOrder() {
    const parcelCustomerNameInput = document.querySelector('.parcel-customer-name');
    const parcelCustomerName = parcelCustomerNameInput.value.trim();
    const select = document.querySelector('.parcel-menu-select');
    const otherInput = document.querySelector('.parcel-other-input');
    const otherPriceInput = document.querySelector('.parcel-other-price');
    const selectedPrice = select.value;

    if (!parcelCustomerName) {
        alert("Please enter a customer name for the parcel order.");
        return;
    }

    let orderItemText = '';
    let orderItemPrice = 0;

    if (selectedPrice === 'other') {
        orderItemText = otherInput.value.trim();
        orderItemPrice = parseFloat(otherPriceInput.value);
        if (!orderItemText || isNaN(orderItemPrice) || orderItemPrice < 0) {
            alert("Please specify the other item and its price.");
            return;
        }
    } else if (!selectedPrice) {
        alert("Please select an item.");
        return;
    } else {
        orderItemText = select.options[select.selectedIndex].textContent;
        orderItemPrice = parseFloat(selectedPrice);
    }

    const parcelOrderList = document.querySelector('.parcel-order-list');
    const parcelTotalElement = document.querySelector('.parcel-total');

    const orderItem = document.createElement('li');
    orderItem.textContent = `${parcelCustomerName}: ${orderItemText} - ₹${orderItemPrice.toFixed(2)}`;
    parcelOrderList.appendChild(orderItem);

    // Update total
    const currentTotal = parseFloat(parcelTotalElement.textContent);
    const newTotal = currentTotal + orderItemPrice;
    parcelTotalElement.textContent = newTotal.toFixed(2); // Format to 2 decimal places

    // Clear the selection and other inputs
    select.value = '';
    otherInput.style.display = 'none';
    otherPriceInput.style.display = 'none';
    otherInput.value = '';
    otherPriceInput.value = '';
    // Do not clear the customer name input to allow adding more items
}

// Populate the parcel menu select on page load
window.onload = function() {
    const parcelMenuSelect = document.querySelector('.parcel-menu-select');
    populateMenuSelect(parcelMenuSelect);
};