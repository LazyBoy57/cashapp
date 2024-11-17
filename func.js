// Declare initial variables
let walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 55.50;
let schoolBalance = parseFloat(localStorage.getItem('schoolBalance')) || 55.50;
let categories = JSON.parse(localStorage.getItem('categories')) || []; // Categories are stored as an array
let expenseHistory = JSON.parse(localStorage.getItem('expenseHistory')) || {
    wallet: [],
    school: []
}; // History for wallet and school

let selectedBalance = 'wallet'; // Default selected balance

// Update balance display
function updateBalanceDisplay() {
    document.getElementById('walletAmount').textContent = walletBalance.toFixed(2);
    document.getElementById('schoolAmount').textContent = schoolBalance.toFixed(2);
}

// Handle balance selection
document.getElementById('walletBtn').addEventListener('click', function() {
    selectedBalance = 'wallet';
    document.getElementById('walletBtn').classList.add('selected');
    document.getElementById('schoolBtn').classList.remove('selected');
    updateBalanceDisplay();
});

document.getElementById('schoolBtn').addEventListener('click', function() {
    selectedBalance = 'school';
    document.getElementById('schoolBtn').classList.add('selected');
    document.getElementById('walletBtn').classList.remove('selected');
    updateBalanceDisplay();
});

// Handle expense counter
let counterValue = 0.50;
document.getElementById('increase').addEventListener('click', function() {
    counterValue += 0.50;
    document.getElementById('counterValue').textContent = counterValue.toFixed(2);
});

document.getElementById('decrease').addEventListener('click', function() {
    if (counterValue > 0.50) {
        counterValue -= 0.50;
        document.getElementById('counterValue').textContent = counterValue.toFixed(2);
    }
});

// Handle new category addition
document.getElementById('addCategoryBtn').addEventListener('click', function () {
    const newCategory = document.getElementById('newCategoryInput').value.trim();
    if (newCategory !== "" && !categories.includes(newCategory)) {
        // Add category to the array
        categories.push(newCategory);

        // Create and append the new option in the dropdown
        const newOption = document.createElement("option");
        newOption.textContent = newCategory;
        newOption.value = newCategory;
        document.getElementById('categorySelect').appendChild(newOption);

        // Save the updated categories to local storage
        localStorage.setItem('categories', JSON.stringify(categories));

        // Clear the input field
        document.getElementById('newCategoryInput').value = "";
    }
});

// Handle submitting expense
document.getElementById('submitBtn').addEventListener('click', function() {
    const amount = counterValue;
    const selectedCategory = document.getElementById('categorySelect').value || "Uncategorized";

    let historyEntry = {
        category: selectedCategory,
        amount: amount.toFixed(2),
        date: new Date().toLocaleString() // Add a timestamp
    };

    if (selectedBalance === 'wallet') {
        walletBalance -= amount;

        // Save history entry for wallet
        expenseHistory.wallet.push(historyEntry);

        // Update wallet history UI
        const historyDiv = document.createElement('div');
        historyDiv.classList.add('history-entry');
        historyDiv.innerHTML = `<div>${selectedCategory} - ${amount.toFixed(2)} KM</div><div>${historyEntry.date}</div>`;
        document.getElementById('walletHistory').appendChild(historyDiv);

        // Save updated wallet balance and history to local storage
        localStorage.setItem('walletBalance', walletBalance.toFixed(2));
        localStorage.setItem('expenseHistory', JSON.stringify(expenseHistory));

    } else {
        schoolBalance -= amount;

        // Save history entry for school
        expenseHistory.school.push(historyEntry);

        // Update school history UI
        const historyDiv = document.createElement('div');
        historyDiv.classList.add('history-entry');
        historyDiv.innerHTML = `<div>${selectedCategory} - ${amount.toFixed(2)} KM</div><div>${historyEntry.date}</div>`;
        document.getElementById('schoolHistory').appendChild(historyDiv);

        // Save updated school balance and history to local storage
        localStorage.setItem('schoolBalance', schoolBalance.toFixed(2));
        localStorage.setItem('expenseHistory', JSON.stringify(expenseHistory));
    }

    // Update balance display
    updateBalanceDisplay();
});
