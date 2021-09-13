const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.className="product h-100"
    div.innerHTML = `<div id= "product-info" class="single-product h-100 w-100">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <div id = "product-details">
      <h3 class="h4">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2 class="mb-0">Price: $ ${product.price}</h2>
      <small class="bg-warning rounded-pill px-2 py-1 fw-bold"> Avg.Rating: ${product.rating.rate} (${product.rating.count}) </small>
      <div class="mt-2">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-success">add to cart</button>
      <button id="details-btn" onclick="showDetails()"  class="btn btn-outline-danger">Details</button>
      </div>
      </div>
     </div>
      `;
    document.getElementById("all-products").appendChild(div);
     
  }
  for (const product of allProducts) {
    const showDetails = () => {
      console.log(1)
      // const productDetailsDiv = document.getElementById('product-details');
      // productDetailsDiv.innerHTML = `
      // <h2> Details </h2>
      // <p> ${product.description} </p>
      // `
      // document.getElementById('product-info').appendChild(productDetailsDiv);
    };
  }
};
 // Add addEventListener in Details 
 

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();// Update total price
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +  getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
loadProducts();
