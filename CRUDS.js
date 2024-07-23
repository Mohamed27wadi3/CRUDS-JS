let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let mood = 'create';
let tmp;
//get total 
function getTotal() {
if(price.value != ''){
    let result = ( +price.value + +taxes.value + +ads.value ) 
    - +discount.value;
    total.innerHTML = result;
    total.style.background= 'green';
} else{

    total.innerHTML = '';
    total.style.background='red';
}
}

// creat product 
let dataPro;
if(localStorage.product != null){
    dataPro= JSON.parse(localStorage.product)
} 
else {
    dataPro =[];
}

//function creat product  
submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: +price.value,
        taxes: +taxes.value,
        ads: +ads.value,
        count: +count.value,
        discount: +discount.value,
        total: +total.innerHTML,
        category: category.value.toLowerCase(),
    }

    if(title.value !='' && price.value !='' && category.value !=''){

    if(mood ==='create'){
    if (newPro.count > 1){
        for (let i = 0 ; i < newPro.count ; i++){
        dataPro.push(newPro);   }
       
       }
    else{        dataPro.push(newPro);
}
}else{
    dataPro[tmp] = newPro;
    mood='create';
    submit.innerHTML='create';
    count.style.display='block';
}
clearData()
}


// save localStorage
localStorage.setItem('product',JSON.stringify(dataPro)  )


showData()
}

//clear input 

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    count.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
}


 // read (show data)
 function showData(){

    getTotal()

    let table = ''; 
for (let i=0 ; i<dataPro.length ; i++) {
table+=`
<tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td id="update" onclick="updateData(${i})"><button id"update" onclick="updateData(${i})">update</button></td>
        <td><button id"delet" onclick="deleteData(${i})">Delete</button></td>

</tr> ` ;

    }

 document.getElementById('tbody').innerHTML=table
 let btnDelete=document.getElementById('deleteALL');
if(dataPro.length > 0 ){
btnDelete.innerHTML=`<button onclick="deleteAll()" id="deletAll">DeleteAll  ( ${dataPro.length} ) </button> `
}else{
    btnDelete.innerHTML='';
}

}
showData()


// delete

function deleteData(index) {
    dataPro.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
} 
// delete all
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// update
function updateData(i){
  
    title.value = dataPro[i].title;
    price.value =dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood='update';
    tmp = i;
    //الصعود للأعلى
    scroll ({
        top:0,
        behavior:'smooth'
    })
}

//search by mood
let searchMood ='title';
function getSearchMood(id) {
    let search = document.getElementById('search');
if (id == 'searchTitle'){
    searchMood = 'title';
    search.placeholder = 'Search by Title';
}else{
    searchMood = 'Category';
    search.placeholder = 'Search by category';
}
search.focus()
search.value='';
showData();
}

//search
function searchData(value) {
    let table ='';
    //search title 
if (searchMood='title'){
for (let i=0; i< dataPro.length; i++) {
if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
    table+=`
<tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td id="update" onclick="updateData(${i})"><button id"update" onclick="updateData(${i})">update</button></td>
        <td><button id"delet" onclick="deleteData(${i})">Delete</button></td>

</tr> `
}
}  
}
//search category
else{
    for (let i=0; i< dataPro.length; i++) {
        if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
            table+=`
        <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td id="update" onclick="updateData(${i})"><button id"update" onclick="updateData(${i})">update</button></td>
                <td><button id"delet" onclick="deleteData(${i})">Delete</button></td>
        </tr> `;
        }
        }
}
document.getElementById('tbody').innerHTML=table
}


//clear data 

let clear = document.getElementById('clear');
clear.onclick = function() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}



