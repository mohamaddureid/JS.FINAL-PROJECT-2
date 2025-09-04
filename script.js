const cars = [
  {
    name: "Bugatti Chiron",
    brand: "Bugatti",
    price: 3000000,
    img: "./chiron.jpg",
    hp: "1500 HP",
    colors: "Blue, Black, Red, Silver",
    design: "Ultra aerodynamic with luxury interior",
  },
  {
    name: "Mercedes S600",
    brand: "Mercedes-Benz",
    price: 170000,
    img: "./s600.jpg",
    hp: "523 HP",
    colors: "Black, White, Silver",
    design: "Executive sedan with luxury comfort",
  },
  {
    name: "Ferrari SF90",
    brand: "Ferrari",
    price: 625000,
    img: "./laferrari.jpg",
    hp: "986 HP",
    colors: "Red, Yellow, Black",
    design: "Aggressive sports car with hybrid power",
  },
  {
    name: "Porsche 911 Turbo S",
    brand: "Porsche",
    price: 204000,
    img: "./prosche.jpg",
    hp: "640 HP",
    colors: "White, Blue, Black",
    design: "Iconic coupe with timeless design",
  },
  {
    name: "Pagani Huayra",
    brand: "Pagani",
    price: 3400000,
    img: "./pagani.jpg",
    hp: "720 HP",
    colors: "Gold, Silver, Black",
    design: "Handcrafted hypercar with artistic details",
  },
];

let cart = [];

$("#loginForm").on("submit", function (e) {
  e.preventDefault();
  let user = $("#username").val().trim();
  let pass = $("#password").val().trim();

  if (user === "" || pass === "") {
    alert("All fields are required!");
  } else if (user === "admin" && pass === "1234") {
    $("#loginPage").addClass("d-none");
    $("#productPage").removeClass("d-none");
    $("#welcomeMsg").text("Welcome Back, Mr. Dureid");
    loadCars();
  } else {
    alert("Invalid username or password!");
  }
});

$("#logoutBtn").on("click", function () {
  $("#productPage").addClass("d-none");
  $("#loginPage").removeClass("d-none");
  $("#loginForm")[0].reset();
  cart = [];
  updateCartUI();
});

function loadCars() {
  $("#productList").empty();
  $.each(cars, function (index, car) {
    let card = `
      <div class="col-md-4 mb-4">
        <div class="card product-card">
          <img src="${car.img}" class="card-img-top" alt="${car.name}">
          <div class="card-body">
            <h5 class="card-title">${car.name}</h5>
            <p class="card-text">${car.brand}</p>
            <p class="text-danger fw-bold">$${car.price.toLocaleString()}</p>
            <button class="btn btn-sm btn-primary addCartBtn" data-index="${index}">Add to Cart</button>
            <button class="btn btn-sm btn-info detailsBtn" data-index="${index}">Details</button>
          </div>
        </div>
      </div>`;
    $("#productList").append(card);
  });
}


$(document).on("click", ".addCartBtn", function () {
  let index = $(this).data("index");
  cart.push(cars[index]);
  updateCartUI();
  alert(cars[index].name + " added to cart!");
});

function updateCartUI() {
  $("#cartCount").text(cart.length);
  $("#cartItems").empty();
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    $("#cartItems").append(`
      <tr>
        <td>${item.name}</td>
        <td>$${item.price.toLocaleString()}</td>
        <td><button class="btn btn-sm btn-danger removeBtn" data-index="${i}">Remove</button></td>
      </tr>
    `);
  });

  $("#cartTotal").text(total.toLocaleString());
}

$(document).on("click", ".removeBtn", function () {
  let index = $(this).data("index");
  cart.splice(index, 1);
  updateCartUI();
});

$(document).on("click", ".detailsBtn", function () {
  let index = $(this).data("index");
  let car = cars[index];

  $("#carName").text(car.name);
  $("#carImg").attr("src", car.img).attr("alt", car.name);
  $("#carDesc").text(`The ${car.name} is a masterpiece from ${car.brand}.`);
  $("#carHP").text(car.hp);
  $("#carColors").text(car.colors);
  $("#carDesign").text(car.design);

  let modal = new bootstrap.Modal(document.getElementById("detailsModal"));
  modal.show();
});

$("#cartBtn").on("click", function () {
  let modal = new bootstrap.Modal(document.getElementById("cartModal"));
  modal.show();
});


const music = document.getElementById("backgroundMusic");
const musicBtn = $("#musicBtn");

musicBtn.on("click", function () {
  if (music.paused) {
    music.play().catch(err => console.log("Playback blocked:", err));
    $(this).text("🔇 Mute Music");
  } else {
    music.pause();
    $(this).text("🔊 Play Music");
  }
});
