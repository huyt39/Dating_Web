// Thêm CSS trực tiếp vào JavaScript
const style = document.createElement('style');
style.innerHTML = `
  .alert-hidden {
    display: none;
  }
  .alert {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: green;
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
  }
`;
document.head.appendChild(style);

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
  thumbs: {
    swiper: imagesThumb,
  },
});
// End Slider Partner Detail 

// Hiển thị thông báo đã thêm thành công
const alertAddCartSuccess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-success]");
  if (elementAlert) {
    elementAlert.classList.remove("alert-hidden");
    elementAlert.classList.add("alert");
    setTimeout(() => {
      elementAlert.classList.remove("alert");
      elementAlert.classList.add("alert-hidden");
    }, 3000); // Sau 3s thì thêm lại class

    const closeAlert = elementAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
      elementAlert.classList.remove("alert");
      elementAlert.classList.add("alert-hidden");
    });
  }
};

// Carts
const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Hiển thị thêm số lượng vào mini-cart:
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if (miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    miniCart.innerHTML = totalQuantity;

    console.log(totalQuantity);
  }
};
showMiniCart();

// Thêm partner vào danh sách:
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();

    const quantity = parseInt(event.target.elements.quantity.value);
    const partnerId = parseInt(formAddToCart.getAttribute("partner-id"));

    if (quantity > 0 && partnerId) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      // Kiểm tra xem partner đã tồn tại trong giỏ hàng chưa
      const indexExistPartner = cart.findIndex(item => item.partnerId == partnerId);
      if (indexExistPartner == -1) {
        cart.push({
          partnerId: partnerId,
          quantity: quantity
        });
      } else {
        cart[indexExistPartner].quantity += quantity;
      }
      
      // Lưu vào local storage:
      localStorage.setItem("cart", JSON.stringify(cart));
      alertAddCartSuccess();
      showMiniCart();
    }
  });
}
// End Carts

// Script to hide login error message after 3 seconds
document.addEventListener('DOMContentLoaded', function() {
  const loginError = document.getElementById('login-error');
  if (loginError) {
    setTimeout(() => {
      loginError.style.display = 'none';
    }, 3000); // 3000 milliseconds = 3 seconds
  }
});

