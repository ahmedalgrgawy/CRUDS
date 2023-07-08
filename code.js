// Selectors
let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let createBtn = document.querySelector(".create-btn");
let search = document.querySelector(".search");
let searchTitleBtn = document.querySelector("#search-title");
let searchCategoryBtn = document.querySelector("#search-category");
let tbody = document.querySelector(".tbody");
let deleteAllArea = document.querySelector(".delete-all");
let staute = "create";
let searchStaute = "title";
let temp;

// Total Function
function getTotal() {
    if (price.value != "") {
        let totalNumber = +price.value + +taxes.value + +ads.value - +discount.value; // String To Number
        total.innerHTML = totalNumber;
        total.style.background = "#019901";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

// Create Product Function
let data; // Array For The Products

// Check LocalStorage
if (localStorage.getItem('products') != null) {
    data = JSON.parse(localStorage.getItem('products'));
} else {
    data = [];
}

createBtn.addEventListener("click", () => {
    let product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    // Count + Update + Clean Data
    if (title.value != "" && price.value != "" && category.value != "") {
        if (staute === 'create') {
            if (product.count > 1) {
                for (let i = 0; i < product.count; i++) {
                    data.push(product);
                }
            } else {
                data.push(product);
            }
        } else {
            data[temp] = product;
            staute = 'create';
            createBtn.innerHTML = 'Create';
            count.style.diplay = "block";

            // Clear Data
            clearData();
        }
    }


    // Storge Data
    localStorage.setItem("products", JSON.stringify(data));

    // Show Data
    showData();
});

// Cleare Input Function
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// Read Data
function showData() {
    let table = "";

    for (let i = 0; i < data.length; i++) {
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateProduct(${i})" class='update'>Update</button></td>
                    <td><button onclick="deleteProduct(${i})" class='delete'>Delete</button></td>
                </tr>
        `;

        tbody.innerHTML = table;

        if (data.length > 0) {
            deleteAllArea.innerHTML = `
            <button onclick='deleteAll()'>Delete All (${data.length})</button>
            `;
        } else {
            deleteAllArea.innerHTML = "";
        }
    }

    getTotal();
}

// Delete Data
function deleteProduct(index) {
    data.splice(index, 1);
    localStorage.product = JSON.stringify(data);
    showData();
}

// Delete All
function deleteAll() {
    localStorage.clear();
    data.splice(0);
    showData();
}

// Upgrade Data
function updateProduct(index) {
    title.value = data[index].title;
    price.value = data[index].price;
    taxes.value = data[index].taxes;
    ads.value = data[index].ads;
    discount.value = data[index].discount;
    getTotal();
    count.style.diplay = "none";
    createBtn.innerHTML = "Update";
    category.value = data[index].category;
    staute = 'update';
    temp = index;
    scroll({
        top: 0,
        behavior: "smooth"
    });
}

// Search Data
function getSearchStaute(id) {
    if (id == "search-title") {
        searchStaute = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchStaute = 'category';
        search.placeholder = 'Search By Category';
    }

    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if (searchStaute === 'title') {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick="updateProduct(${i})" class='update'>Update</button></td>
                        <td><button onclick="deleteProduct(${i})" class='delete'>Delete</button></td>
                    </tr>
                `;
            } else {

            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick="updateProduct(${i})" class='update'>Update</button></td>
                        <td><button onclick="deleteProduct(${i})" class='delete'>Delete</button></td>
                    </tr>
                `;
            } else {

            }
        }
    }
    tbody.innerHTML = table;
}

// Clean Data


showData();