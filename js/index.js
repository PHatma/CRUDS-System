var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var update = document.getElementById("btnUpdate");
var add = document.getElementById("btnAdd");
var i = 0;
var itemsList = [];
if (localStorage.getItem("container") !== null) {
  itemsList = JSON.parse(localStorage.getItem("container"));
  display();
}
function addItem() {
  if (
    validation(productName, "msgName") &&
    validation(productPrice, "msgPrice") &&
    validation(productDescription, "msgDesc") &&
    validation(productImage, "msgIMG") &&
    validation(productCategory, "msgCategory")
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      image: `assets/${productImage.files[0]?.name}`,
    };
    itemsList.push(product);
    localStorage.setItem("container", JSON.stringify(itemsList));
    display();
    clear();
    console.log(itemsList);
  }
}
function updateItem() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    image: productImage.files[0]?.name
      ? `assets/${productImage.files[0]?.name}`
      : "assets/1.jpg",
  };
  itemsList.splice(i, 1, product);
  localStorage.setItem("container", JSON.stringify(itemsList));
  display();
  clear();
  console.log(itemsList);
}
function display() {
  var cartona = "";
  for (var i = 0; i < itemsList.length; i++) {
    cartona += `<tr>
            <td>${i}</td>
            <td>${itemsList[i].name}</td>
            <td>${itemsList[i].price}</td>
            <td>${itemsList[i].category}</td>
            <td>${itemsList[i].description}</td>
            <td>
              <img width="100px" src="${itemsList[i].image}" alt="product">
            </td>

            <td>
              <button onclick="setFormData(${i})" class="btn btn-outline-info btn-sm">Update</button>
              <button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
  </tr>`;
  }
  document.getElementById("bdy").innerHTML = cartona;
}
function searchItem() {
  var term = searchInput.value;
  var cartona = " ";
  for (var i = 0; i < itemsList.length; i++) {
    if (itemsList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      cartona += `
  <tr>
            <td>${i}</td>
            <td>${itemsList[i].name}</td>
            <td>${itemsList[i].price}</td>
            <td>${itemsList[i].category}</td>
            <td>${itemsList[i].description}</td>
            <td>
              <img width="100px" src="${itemsList[i].image}" alt="product">
            </td>

            <td>
              <button onclick="setFormData(${i})" class="btn btn-outline-info btn-sm">Update</button>
              <button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>`;
    }
  }
  document.getElementById("bdy").innerHTML = cartona;
}

function deleteItem(indexItem) {
  itemsList.splice(indexItem, 1);
  localStorage.setItem("container", JSON.stringify(itemsList));
  display();
  console.log(itemsList);
}
function setFormData(index) {
  (productName.value = itemsList[index].name),
    (productPrice.value = itemsList[index].price),
    (productCategory.value = itemsList[index].category),
    (productDescription.value = itemsList[index].description);
  add.classList.add("d-none");
  update.classList.remove("d-none");

  i = index;
}

function clear() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
  productImage.value=null;
  productName.classList.remove('is-valid') ;
  productPrice.classList.remove('is-valid') ;
  productCategory.classList.remove('is-valid') ;
  productDescription.classList.remove('is-valid') ;
  productImage.classList.remove('is-valid') ;

}
function validation(element, msgId) {
  var text = element.value.trim();
  var regex = {
    productName: /^[A-Za-z ]{3,30}$/,
    productPrice: /^[1-9]\d{1,8}$/, 
    productDescription: /^.{3,}$/m, 
    productImage: /^.+(\.svg|\.jpg|\.jpeg|\.png|\.avif)$/i, 
    productCategory: /^(tv|mobile|screens|electronic)$/i,
  };
  var msg = document.getElementById(msgId);
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true ;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    msg.classList.remove("d-none");
    return false;
  }
}
