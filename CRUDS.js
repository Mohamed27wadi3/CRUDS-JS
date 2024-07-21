let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

//get total 
function getTotal() {
if(price.value != ''){
    let result = ( +price.value + +taxes.value + +ads.value ) 
    - +discount.value;
    total.innerHTML = result;
    total.style.background= 'green';
} else{

    total.innerHTML = 'Please enter a valid price';
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
submit.onclick = function(){
    let newPro = {
        title: title.value,
        price: +price.value,
        taxes: +taxes.value,
        ads: +ads.value,
        count: +count.value,
        discount: +discount.value,
        total: +total.innerHTML,
        category: category.value,
    }
    if (newPro.count > 1){
        for (let i = 0 ; i < newPro.count ; i++){
        dataPro.push(newPro);   }
       
       }
    else{        dataPro.push(newPro);
}


// save localStorage
localStorage.setItem('product',JSON.stringify(dataPro)  )

clearData()
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


 // read 
 function showData(){
    let table = ''; 
for (let i=0 ; i<dataPro.length ; i++) {
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
        <td id="update"><button id"update" onclick="updateData(${i})"   >update</button></td>
        <td><button id"delet" onclick="deleteData(${i})">Delete</button></td>

</tr>
        `
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



