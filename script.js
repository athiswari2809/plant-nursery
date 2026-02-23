// Cart Logic
let cart = JSON.parse(localStorage.getItem('nurseryCart')) || [];

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    localStorage.setItem('nurseryCart', JSON.stringify(cart));
    alert(`🌿 ${name} added to cart!`);
    if(window.location.pathname.includes("cart.html")) updateCartDisplay();
}

// Search Logic
function searchPlant() {
    let input = document.getElementById('search').value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "inline-block" : "none";
    });
}

// Filter Logic
function filterPlants(category) {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = "inline-block";
        } else {
            card.style.display = "none";
        }
    });
}

// Cart Page Display
function updateCartDisplay() {
    const list = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    if(!list) return;

    list.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `<li style="list-style:none; padding:10px; background:#eee; margin:5px; border-radius:5px;">
            ${item.name} - ₹${item.price} 
            <button onclick="removeItem(${index})" style="background:red; color:white; border:none; float:right;">X</button>
        </li>`;
    });
    totalSpan.innerText = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('nurseryCart', JSON.stringify(cart));
    updateCartDisplay();
}

window.onload = updateCartDisplay;
