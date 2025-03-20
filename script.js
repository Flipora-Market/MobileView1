// Sample product data (could be replaced with a server call)
const products = [
  {
    id: 1,
    title: "Gaming Laptop",
    image: "https://source.unsplash.com/300x200/?laptop",
    price: 1299.99,
    description: "High performance gaming laptop with advanced graphics and a fast processor. Ideal for gaming and professional work.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?laptop,1",
      "https://source.unsplash.com/500x300/?laptop,2",
      "https://source.unsplash.com/500x300/?laptop,3"
    ]
  },
  {
    id: 2,
    title: "Smartphone",
    image: "https://source.unsplash.com/300x200/?smartphone",
    price: 999.99,
    description: "Latest smartphone with cutting-edge technology, 5G support, and a stunning display.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?smartphone,1",
      "https://source.unsplash.com/500x300/?smartphone,2",
      "https://source.unsplash.com/500x300/?smartphone,3"
    ]
  },
  {
    id: 3,
    title: "Wireless Headphones",
    image: "https://source.unsplash.com/300x200/?headphones",
    price: 199.99,
    description: "Noise-canceling wireless headphones with superior sound quality and long battery life.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?headphones,1",
      "https://source.unsplash.com/500x300/?headphones,2",
      "https://source.unsplash.com/500x300/?headphones,3"
    ]
  },
  {
    id: 4,
    title: "DSLR Camera",
    image: "https://source.unsplash.com/300x200/?camera",
    price: 799.99,
    description: "Professional DSLR camera with high resolution, versatile lenses, and excellent low-light performance.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?camera,1",
      "https://source.unsplash.com/500x300/?camera,2",
      "https://source.unsplash.com/500x300/?camera,3"
    ]
  },
  {
    id: 5,
    title: "Smart Watch",
    image: "https://source.unsplash.com/300x200/?watch",
    price: 299.99,
    description: "Feature-rich smart watch with health tracking, customizable watch faces, and long battery life.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?watch,1",
      "https://source.unsplash.com/500x300/?watch,2",
      "https://source.unsplash.com/500x300/?watch,3"
    ]
  },
  {
    id: 6,
    title: "Tablet",
    image: "https://source.unsplash.com/300x200/?tablet",
    price: 499.99,
    description: "Portable tablet with a high-resolution display, fast processor, and long-lasting battery.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?tablet,1",
      "https://source.unsplash.com/500x300/?tablet,2",
      "https://source.unsplash.com/500x300/?tablet,3"
    ]
  },
  {
    id: 7,
    title: "Smart TV",
    image: "https://source.unsplash.com/300x200/?tv",
    price: 899.99,
    description: "4K Ultra HD Smart TV with voice control, streaming apps, and immersive sound.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?tv,1",
      "https://source.unsplash.com/500x300/?tv,2",
      "https://source.unsplash.com/500x300/?tv,3"
    ]
  },
  {
    id: 8,
    title: "Mechanical Keyboard",
    image: "https://source.unsplash.com/300x200/?keyboard",
    price: 149.99,
    description: "RGB mechanical keyboard with tactile feedback, customizable keys, and a sleek design.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?keyboard,1",
      "https://source.unsplash.com/500x300/?keyboard,2",
      "https://source.unsplash.com/500x300/?keyboard,3"
    ]
  },
  {
    id: 9,
    title: "Gaming Mouse",
    image: "https://source.unsplash.com/300x200/?mouse",
    price: 79.99,
    description: "High precision gaming mouse with adjustable DPI and an ergonomic design for long hours of play.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?mouse,1",
      "https://source.unsplash.com/500x300/?mouse,2",
      "https://source.unsplash.com/500x300/?mouse,3"
    ]
  },
  {
    id: 10,
    title: "Bluetooth Speaker",
    image: "https://source.unsplash.com/300x200/?speaker",
    price: 129.99,
    description: "Portable Bluetooth speaker with powerful bass, water-resistant design, and long battery life.",
    sliderImages: [
      "https://source.unsplash.com/500x300/?speaker,1",
      "https://source.unsplash.com/500x300/?speaker,2",
      "https://source.unsplash.com/500x300/?speaker,3"
    ]
  }
];

// Update header cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countSpan = document.getElementById("cart-count");
  if (countSpan) {
    countSpan.innerText = cart.length;
  }
}

// Navigation: When a product is clicked on home page
function viewProduct(productId) {
  localStorage.setItem("selectedProductId", productId);
  window.location.href = "product.html";
}

// On product.html: load product details and slider images
function loadProductDetails() {
  const prodId = localStorage.getItem("selectedProductId");
  if (!prodId) return;
  const product = products.find(p => p.id == prodId);
  if (!product) return;

  document.getElementById("prod-title").innerText = product.title;
  document.getElementById("prod-desc").innerText = product.description;
  document.getElementById("prod-price").innerText = product.price.toFixed(2);

  const slider = document.querySelector(".slider");
  if (slider) {
    slider.innerHTML = "";
    product.sliderImages.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = product.title;
      slider.appendChild(img);
    });
  }
}

// Image slider functions
let slideIndex = 0;
function showSlide(index) {
  const slider = document.querySelector(".slider");
  if (!slider) return;
  const totalSlides = slider.children.length;
  if (index >= totalSlides) slideIndex = 0;
  if (index < 0) slideIndex = totalSlides - 1;
  slider.style.transform = `translateX(${-slideIndex * 100}%)`;
}
function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}
function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}
setInterval(nextSlide, 3000);

// Add to cart from product details page
function addToCartFromDetails() {
  const prodId = localStorage.getItem("selectedProductId");
  const product = products.find(p => p.id == prodId);
  if (!product) return;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.title + " added to cart!");
  updateCartCount();
}

// On cart.html: load cart items and total
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  let total = 0;
  cartItemsDiv.innerHTML = "";
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `<p>${item.title} - $${item.price.toFixed(2)}</p>
      <button onclick="removeCartItem(${index})" class="btn">Remove</button>`;
    cartItemsDiv.appendChild(div);
  });
  document.getElementById("cart-total").innerText = total.toFixed(2);
  updateCartCount();
}

// Remove item from cart
function removeCartItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// On payment.html: load total amount
function loadPaymentAmount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("payment-amount").innerText = total.toFixed(2);
}

// Simulated UPI Payment
function payWithUPI() {
  const amount = document.getElementById("payment-amount").innerText;
  // Build the UPI URL with the dynamic amount
  const upiURL = `upi://pay?ver=01&mode=19&pa=shivashakthi107014.rzp@icici&pn=ShivaShakthi&tr=RZPPaGE7dr2rsDsOjqrv2&cu=INR&mc=5651&qrMedium=04&tn=PaymenttoShivaShakthi&am=${amount}`;
  
  // Save transaction details for confirmation
  const txnID = "TXN" + new Date().getTime();
  localStorage.setItem("transactionID", txnID);
  localStorage.setItem("paidAmount", amount);
  
  // Inform the user and redirect after a short delay
  alert("Redirecting to UPI for payment of $" + amount);
  setTimeout(() => {
    window.location.href = upiURL;
  }, 2000);
}

// On confirmation.html: load transaction details
function loadConfirmation() {
  document.getElementById("transaction-id").innerText = localStorage.getItem("transactionID") || "N/A";
  document.getElementById("paid-amount").innerText = localStorage.getItem("paidAmount") || "0.00";
}

// Run functions based on the page
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  if (document.body.contains(document.getElementById("prod-title"))) {
    loadProductDetails();
  }
  if (document.body.contains(document.getElementById("cart-items"))) {
    loadCart();
  }
  if (document.body.contains(document.getElementById("payment-amount"))) {
    loadPaymentAmount();
  }
  if (document.body.contains(document.getElementById("transaction-id"))) {
    loadConfirmation();
  }
});
