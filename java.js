var btnAdd = document.querySelectorAll(".card-footer button:last-child")  //Lấy toàn bộ button giỏ hàng

btnAdd.forEach(function (button) { //duyệt vòng lặp để gán sự kiện cho từng button
    button.addEventListener("click",function(event){ //khi click vào sẽ chạy 1 hàm
        var btnEvent=event.target //Khi người dùng click vào
        var content = btnEvent.parentElement //Di chuyển sang thẻ cha
        var allContent = content.parentElement //Lại di chuyển ra ngoài thẻ cha 1 lần nữa để lấy toàn bộ nội dung
        var productImage = allContent.querySelector('.card-header img').src //Lấy hình ảnh
        var productName = allContent.querySelector('.card-body h3').innerText //Lấy tên
        var productPrice = allContent.querySelector('.card-header .price span').innerText //Lấy giá
        addCart(productImage, productName, productPrice) //Sau đó thực hiện hàm thệm
    })
})
function addCart(productImage, productName, productPrice) { //Hàm thêm
    var table = document.getElementById('total') //select tới vị trí chứa nơi cần thệm
    var displayCart = document.getElementById('cart')
    onLoad()
    displayCart.style.display='block'
    var tableCheck=document.querySelectorAll('#total tr') //select tới vị trí cần thêm

    for(var i = 0; i<tableCheck.length; i++){ //Duyệt vòng lặp tất cả các thẻ trong vị trí cần thêm
        var productCheck = document.querySelectorAll(".nameProd") //Lấy ra thẻ Tên
        var inputNumber=tableCheck[i].querySelector('.number').value //Lấy ra giá trị số lượng
        if(productCheck[i].innerHTML==productName){  //Nếu 2 tên cần thêm giống nhau
            setTimeout(() =>{
                totalNumber=inputNumber*1+1 //cộng số lượng
                tableCheck[i].querySelector('.number').setAttribute("value",totalNumber)//Thay đổi giá trị ô số lượng
                totalBuy() //Hàm tính tổng
            },3000)
            return
        }
    }

    //Nếu 2 tên không trùng nhau
    var creTable = document.createElement("tr") //Tạo ra 1 thẻ <tr></tr>
    var tableContent = '<td style="text-align: center; width: 30%;"><img src="'+productImage+'" width="30%"></td><td style="text-align: center;"><span class="nameProd">'+productName+'</span></td><td style="text-align:center;"><input type="number" class="number" value="1" max="100" min="1" style="width:50%;"></td><td style="text-align: center;" class="price-number"><p>'+productPrice+'</p></td><td style="text-align: center;"><button type="button">Xoá</button></td>'
    creTable.innerHTML = tableContent //Thêm nội dung cần thêm vào thẻ <tr></tr>
    var screenLoad=document.getElementById("loading")
    setTimeout(() => {
        screenLoad.style.display='none'
        table.append(creTable) //Từ thẻ <tr></tr> vừa thêm ta sẽ thêm nó vào cuối vào nơi chứa nó
        cartDelete() //Gọi hàm xoá
        totalBuy() //Gọi hàm tính tổng
    },3000);
    screenLoad.style.display='flex'
    // table.append(creTable)
}
function buy(){ //Hiển thị giỏ hàng
    var displayCart = document.getElementById('cart')
    onLoad()
    displayCart.style.display = 'flex'
}
function showCart() {//Tắt giỏ hàng
    var displayCart = document.getElementById('cart')
    onLoad()
    displayCart.style.display = 'none'
}

function cartDelete(){ //Hoá sản phẩm
    var tableCheck=document.querySelectorAll('#total tr') //select tới nơi cần xoá
    for(var i = 0;i<tableCheck.length;i++){ //duyệt vòng lặp tắt cả các nơi cần xoá
        var btnDelete=document.querySelectorAll('#total tr td:last-child button') //Trỏ vào từng nút xoá trong thẻ <tr></tr>
        btnDelete[i].addEventListener("click",function(event){ //Thêm sự kiện xoá cho từng nút
            btnDelete=event.target //Khi nhấn vào xoá
            var btnWrap=btnDelete.parentElement.parentElement //Di chuyển ra ngoài thẻ bao quát
            var screenLoad=document.getElementById("loading") 
            setTimeout(() => {
            screenLoad.style.display='none'
            btnWrap.remove() //Xoá thẻ bao quát đó
            totalBuy()//tỉnh lại tổng tiền
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

function totalBuy(){ //Hàm tính tổng
    var tableCheck=document.querySelectorAll('#total tr') //Di chuyển tới nơi chứa của 1 sản phẩm
    var sum = 0 //cho 1 biến bằng 0
    for(var i=0;i<tableCheck.length;i++){ //Vòng lặp duyệt qua tất cả sản phẩm
        var inputNumber=tableCheck[i].querySelector('.number').value //Lấy số lượng
        var priceTotal=tableCheck[i].querySelector('.price-number').innerText //Lấy giá
        Total = priceTotal * inputNumber //Nhân lại
        sum=sum+Total //sau mỗi lần lặp sẽ cộng lại các giá trị vào biến sum
    }
    var totalSum=sum.toLocaleString('de-DE') //Chuyển giá trị của sum thành giá trị tiền tệ
    var infoTotal = document.querySelector('#info-total span') //Trỏ đến nơi cần hiển thị tiền tệ
    if(totalSum===undefined){ //Nếu giá trị = undefined (là 1 giá trị rỗng hoặc không xác định) tức là giỏ hàng đang rỗng
        infoTotal.innerText="0" //Thêm vào thẻ thành tiền có giá trị là 0
    }else{ //Ngược lại
        infoTotal.innerText=totalSum //Thêm giá trị của sum vào thẻ chứa thành tiền
    }
}