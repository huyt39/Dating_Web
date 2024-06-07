// Slider Partner Detail 
var imagesThumb = new Swiper(".imagesThumb", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var imagesMain = new Swiper(".imagesMain", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {  //lien ket main va thumb
      swiper: imagesThumb,
    },
  });
// End Slider Partner Detail 

//in ra thong bao da them thanh cong
const alertAddCartSuccess=()=>{
  const elementAlert=document.querySelector("[alert-add-cart-success]");
  if(elementAlert){
      elementAlert.classList.remove("alert-hidden");
      setTimeout(()=>{
          elementAlert.classList.add("alert-hidden");
      },3000); //sau 3s thi add lai class

      const closeAlert=elementAlert.querySelector("[close-alert]");
      closeAlert.addEventListener("click",()=>{
          elementAlert.classList.add("alert-hidden");
      });
  }
}

//Carts
const cart = localStorage.getItem("cart"); //check xem co key "card" trong localStorage khong
if(!cart){ //neu chua co gio hang thi tao gio hang moi
    localStorage.setItem("cart",JSON.stringify([]));
}
//Them partner vao list:
const formAddToCart=document.querySelector("[form-add-to-cart]");
if(formAddToCart){
    formAddToCart.addEventListener("submit", (event)=>{
        event.preventDefault(); //ngan chan hanh vi mac dinh la load lai trang khi submit

        const quantity=parseInt(event.target.elements.quantity.value); //chuyen chuoi thanh number
        const partnerId=parseInt(formAddToCart.getAttribute("partner-id"));

        if(quantity>0 && partnerId){ //neu so luong>0 va ton tai partId moi cho them vao list
            const cart = JSON.parse(localStorage.getItem("cart"));

            //check xem partner da ton tai trong cart chua:
            const indexExistPartner=cart.findIndex(item=>item.partnerId==partnerId); //tim ra vi tri partner da ton tai trong cart
            if(indexExistPartner==-1){
                cart.push({ //add them phan tu
                    partnerId: partnerId,
                    quantity: quantity
                });
            }else{  //update phan tu
                cart[indexExistPartner].quantity=cart[indexExistPartner].quantity+quantity;
            }
            //luu vao local storage:
            localStorage.setItem("cart",JSON.stringify(cart)); //update item cart=gia tri cart moi
            alertAddCartSuccess();
        }
    });
}
//End Carts