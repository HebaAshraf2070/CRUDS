

// 
var prodNameInput = document.getElementById('prodName');
var prodCategoryInput = document.getElementById('prodCategory');
var prodPriceInput = document.getElementById('prodPrice');
var prodDescInput = document.getElementById('prodDesc');
var updateBtnInput = document.getElementById('updatebtn');
var addBtnInput = document.getElementById('addbtn');


// we write the array out of func as eveytime func work it will empty the array and that is not we want as we want to 
// save the values we get everytime from users in somewhere in the local storage
var productlist = [];


//if this is our first time and we have not estalished any data yet, this means that the array is = null 
// to avoid this we will make if condition, as we are saying don't put any thing to the array if the value is null or
// if the user didn't put any data , don't put null from your head as this will make a problem as there is no array
// could equal null
if (localStorage.getItem('products') != null) {
    //if not null or if there is data convert the data that have been put in the localstorage as string
    //  in the key products to array and put it in the array called productlist
    productlist = JSON.parse(localStorage.getItem('products'))

    // we call func here again to retrive the data everytime we refresh the page otherwise the data will show only  
    // when we click the button as we want our user input data to be saved in his device so he does not have to 
    // enter all the inputs again and agin, once the user enter the data it's saved on his device forever so he can 
    // go back to it any time he wants
    displayproducts()
}


function getInputsValue() {
    var product = {
        name: prodNameInput.value,
        category: prodCategoryInput.value,
        price: parseFloat(prodPriceInput.value),
        description: prodDescInput.value,

    }
    //go to the array which is called productlist and add to its start the new object we made    
    productlist.push(product);


    // the array will be available all the time unless the device shut down,so we need place to save our data from
    //  being removed when device is closed and this thing is the localstorage where we will store our data in the 
    // harddesk -which is long memory- instead of the RAM -which is short memory-
    // to access localstorage===> localstorage.setitem(key, value)
    // so key here is==>'products',,, any name we choose 
    // and value is ===> json.stringfy(productlist),,,we made json.stringfy to convert array to string as localstorage
    // key and value only accept strings,,, so we say to device to establish key in local storage to store in it the
    // array value in string shape
    localStorage.setItem('products', JSON.stringify(productlist))

    // call the func to which we assign values to be put in the html element
    // we call it here so every time getinputsvalue func work and empty itself it go and also empty the 
    // displayproducts func agin to be filled with new data from user 
    displayproducts();
    clearInput()


}



// out of single-responsiblity princile we will put the loop code in a seperate func 
function displayproducts() {
    var bag = "";
    for (var i = 1; i < productlist.length; i++) {
        bag +=
            `
        <tr>
        <td>${i}</td>
        <td>${productlist[i].name}</td>
        <td>${productlist[i].category}</td>
        <td>${productlist[i].price}</td>
        <td>${productlist[i].description}</td>
        <td><button class="btn btn-primary" onclick="preUpdate(${i})">update</button></td>
        <td><button onclick="deleteInput(${i})" class="btn btn-danger ">delete</button></td>
    </tr>
        `
    }

    document.getElementById('tbody').innerHTML = bag;

}
// 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// delete button func
function deleteInput(deleteditemnum) {
    //  go to the array and delete one item by its index ${i}
    // this code only will delete items from localstorage and will not show to the
    // user any update in the productlist {array } and to show the updated array we 
    // need to call the func of bag to go and loop again on the array after deletion and 
    // show only the remaining items in the loop 
    productlist.splice(deleteditemnum, 1);
    // save the updated array after deletion of item in the localstorage 
    // we make this as if it doesn't exist when refresh the productlist will be gotten from the 
    // localstorage which still is not updated so this to update the array in the localstorage
    localStorage.setItem('products', JSON.stringify(productlist));
    // 
    displayproducts();

}

// var searchinput = document.getElementById('search')
function search(value) {
    bag = "";
    for (var i = 0; i < productlist.length; i++) {

        if (productlist[i].name.toLowerCase().includes(value.toLowerCase())) {
            bag +=
                `
                <tr>
                <td>${i}</td>
                <td>${productlist[i].name}</td>
                <td>${productlist[i].category}</td>
                <td>${productlist[i].price}</td>
                <td>${productlist[i].description}</td>
                <td><button class="btn btn-primary">update</button></td>
                <td><button onclick="deleteInput(${i})" class="btn btn-danger ">delete</button></td>
            </tr>

                `
        }
    }
    document.getElementById('tbody').innerHTML = bag;

}



// clear input values
function clearInput() {
    prodNameInput.value = "";
    prodCategoryInput.value = "";
    prodPriceInput.value = "";
    prodDescInput.value = "";

}

// update

function preUpdate(index) {
    prodIndex = index;
    prodNameInput.value = productlist[index].name;
    prodCategoryInput.value = productlist[index].category;
    prodPriceInput.value = productlist[index].price;
    prodDescInput.value = productlist[index].description;
    updateBtnInput.classList.remove('d-none');
    addBtnInput.classList.add('d-none');
}


function updateprod() {

    var updateprods = {
        name: prodNameInput.value,
        category: prodCategoryInput.value,
        price: parseFloat(prodPriceInput.value),
        description: prodDescInput.value,
    };

    productlist.splice(prodIndex, 1, updateprods);
    localStorage.setItem('products', JSON.stringify(productlist));
    displayproducts()
    updateBtnInput.classList.add('d-none');
    addBtnInput.classList.remove('d-none');
}



// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

// validation 

