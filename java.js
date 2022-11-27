var btnAdd = document.querySelectorAll(".card-footer button:last-child")

btnAdd.forEach(function (button) {
    button.addEventListener("click",function(event){
        var btnEvent=event.target
        var content = btnEvent.parentElement
        var allContent = content.parentElement
        var productImage = allContent.querySelector('.card-header img').src
        var productName = allContent.querySelector('.card-body h3').innerText
        var productPrice = allContent.querySelector('.card-header .price span').innerText
        addCart(productImage, productName, productPrice)
    })
})
function addCart(productImage, productName, productPrice) {
    var table = document.getElementById('total')
    var displayCart = document.getElementById('cart')
    onLoad()
    displayCart.style.display='block'
    var tableCheck=document.querySelectorAll('#total tr')
    for(var i = 0; i<tableCheck.length; i++){
        var productCheck = document.querySelectorAll(".nameProd")
        if(productCheck[i].innerHTML==productName){
           alert("Sản phẩm đã tồn tại trong giỏ hàng. Vui Lòng kiểm tra lại")
           return
        }
    }
    var creTable = document.createElement("tr")
    var tableContent = '<td style="text-align: center; width: 30%;"><img src="'+productImage+'" width="30%"></td><td style="text-align: center;"><span class="nameProd">'+productName+'</span></td><td style="text-align:center;"><input type="number" class="number" value="1" max="100" min="1" style="width:25%;"></td><td style="text-align: center;" class="price-number"><p>'+productPrice+'</p></td><td style="text-align: center;"><button type="button">Xoá</button></td>'
    creTable.innerHTML = tableContent
    var screenLoad=document.getElementById("loading")
    setTimeout(() => {
        screenLoad.style.display='none'
        table.append(creTable)
        cartDelete()
        totalBuy()
    },3000);
    screenLoad.style.display='flex'
    // table.append(creTable)
}
function buy(){
    var displayCart = document.getElementById('cart')
    onLoad()
    displayCart.style.display = 'flex'
}
function showCart() {
    var displayCart = document.getElementById('cart')
    onLoad()
    displayCart.style.display = 'none'
}

function cartDelete(){
    var tableCheck=document.querySelectorAll('#total tr')
    for(var i = 0;i<tableCheck.length;i++){
        var btnDelete=document.querySelectorAll('#total tr td:last-child button')
        btnDelete[i].addEventListener("click",function(event){
            btnDelete=event.target
            var btnWrap=btnDelete.parentElement.parentElement
            var screenLoad=document.getElementById("loading")
            setTimeout(() => {
            screenLoad.style.display='none'
            btnWrap.remove()
            totalBuy()
            // if(totalBuy()===undefined){
            //     var infoTotal = document.querySelector('#info-total span')
            //     infoTotal.innerText="0"
            // }
            },3000);
            screenLoad.style.display='flex'
            // btnWrap.remove()
        })
    }
}

function onLoad(){
    var screenLoad=document.getElementById("loading")
    setTimeout(() => {
        screenLoad.style.display='none'
    },3000);
    screenLoad.style.display='flex'
}

function totalBuy(){
    var tableCheck=document.querySelectorAll('#total tr')
    var sum = 0
    for(var i=0;i<tableCheck.length;i++){
        var inputNumber=tableCheck[i].querySelector('.number').value
        var priceTotal=tableCheck[i].querySelector('.price-number').innerText
        Total = priceTotal * inputNumber
        console.log(Total)
        sum=sum+Total
    }
    var totalSum=sum.toLocaleString('de-DE')
    var infoTotal = document.querySelector('#info-total span')
    if(totalSum===undefined){
        infoTotal.innerText="0"
    }else{
        infoTotal.innerText=totalSum
    }
}