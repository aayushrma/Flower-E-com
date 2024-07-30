document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const registerButton = document.getElementById("registerButton");
    const registrationModal = document.getElementById("registrationModal");
    const closeModal = document.querySelector(".modal .close");
    const registrationForm = document.getElementById("registrationForm");
    const flowerGrid = document.querySelector(".flower-grid");
    const detailsSection = document.getElementById("details");
    const cartSection = document.getElementById("cart");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutButton = document.getElementById("checkoutButton");
    const categoryButtons = document.querySelectorAll(".categories button");

    let cart = [];
    let flowers = [
        { name: "Rose", price: 299, img: "rose.jpg", category: "Birthday" },
        { name: "Tulip", price: 399, img: "tulip.jpg", category: "Birthday" },
        { name: "Lily", price: 499, img: "lily.jpg", category: "Anniversary" },
        { name: "Daisy", price: 199, img: "daisy.jpg", category: "Birthday" },
        { name: "Orchid", price: 599, img: "orchid.jpg", category: "Anniversary" },
        { name: "Sunflower", price: 299, img: "sunflower.jpg", category: "Others" },
        { name: "Peony", price: 699, img: "peony.jpg", category: "Anniversary" },
        { name: "Daffodil", price: 249, img: "daffodil.jpg", category: "Birthday" },
        { name: "Bluebell", price: 199, img: "bluebell.jpg", category: "Others" },
        { name: "Carnation", price: 349, img: "carnation.jpg", category: "Anniversary" },
        { name: "Hydrangea", price: 799, img: "hydrangea.jpg", category: "Anniversary" },
        { name: "Iris", price: 299, img: "iris.jpg", category: "Others" },
        { name: "Lavender", price: 399, img: "lavender.jpg", category: "Others" },
        { name: "Magnolia", price: 999, img: "magnolia.jpg", category: "Anniversary" },
        { name: "Marigold", price: 199, img: "marigold.jpg", category: "Birthday" },
        { name: "Pansy", price: 349, img: "pansy.jpg", category: "Birthday" },
        { name: "Petunia", price: 299, img: "petunia.jpg", category: "Others" },
        { name: "Snapdragon", price: 249, img: "snapdragon.jpg", category: "Others" },
        { name: "Zinnia", price: 299, img: "zinnia.jpg", category: "Others" },
        { name: "Violet", price: 399, img: "violet.jpg", category: "Birthday" }
    ];

    function renderFlowers(category = null) {
        flowerGrid.innerHTML = "";
        let filteredFlowers = flowers;
        if (category) {
            filteredFlowers = flowers.filter(flower => flower.category === category);
        }
        filteredFlowers.forEach(flower => {
            const flowerDiv = document.createElement("div");
            flowerDiv.classList.add("flower");
            flowerDiv.innerHTML = `
                <img src="${flower.img}" alt="${flower.name}">
                <p>${flower.name}</p>
                <p>INR ${flower.price}</p>
            `;
            flowerDiv.addEventListener("click", () => showDetails(flower));
            flowerGrid.appendChild(flowerDiv);
        });
    }

    function showDetails(flower) {
        detailsSection.style.display = "block";
        document.getElementById("flowerName").textContent = flower.name;
        document.getElementById("flowerPrice").textContent = flower.price;
    }

    function addToCart() {
        const flowerName = document.getElementById("flowerName").textContent;
        const flowerPrice = parseInt(document.getElementById("flowerPrice").textContent);
        const flower = flowers.find(f => f.name === flowerName);
        const cartItem = cart.find(item => item.name === flowerName);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ name: flowerName, price: flowerPrice, quantity: 1 });
        }

        updateCart();
        detailsSection.style.display = "none";
        cartSection.style.display = "block";
    }

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>INR ${item.price}</td>
                <td>${item.quantity}</td>
                <td>INR ${itemTotal}</td>
            `;
            cartItems.appendChild(row);
        });

        cartTotal.textContent = total;
    }

    function checkout() {
        alert("Thanks for buying!");
        cart = [];
        updateCart();
        cartSection.style.display = "none";
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    registerButton.addEventListener("click", () => {
        registrationModal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        registrationModal.style.display = "none";
    });

    registrationModal.addEventListener("click", (event) => {
        if (event.target === registrationModal) {
            registrationModal.style.display = "none";
        }
    });

    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Registration successful!");
        registrationModal.style.display = "none";
    });

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.textContent;
            renderFlowers(category);
        });
    });

    document.getElementById("addToCart").addEventListener("click", addToCart);
    checkoutButton.addEventListener("click", checkout);

    renderFlowers();
});
