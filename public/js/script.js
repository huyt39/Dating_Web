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
const alertAddPairSuccess = () => {
  const elementAlert = document.querySelector("[alert-add-pair-success]");
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

// Hiển thị thông báo ghép đôi thành công
const alertPairRequestSuccess = () => {
  const elementAlert = document.querySelector("[alert-pair-request-success]");
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

// Lưu thông tin vào local storage:
const saveToPairList = (partner) => {
  const pairList = JSON.parse(localStorage.getItem("pairList")) || [];
  pairList.push(partner);
  localStorage.setItem("pairList", JSON.stringify(pairList));
  alertAddPairSuccess();
};

// Thêm partner vào danh sách ghép đôi:
const formAddToPair = document.querySelector("[form-add-to-pair]");
if (formAddToPair) {
  formAddToPair.addEventListener("submit", (event) => {
    event.preventDefault();

    const partnerId = parseInt(formAddToPair.getAttribute("partner-id"));
    const partnerTitle = document.querySelector(".inner-title").textContent.trim();
    const partnerCode = document.querySelector(".inner-barcode").textContent.trim().split(": ")[1];
    const partnerImage = document.querySelector(".inner-image img").src;

    const partner = {
      id: partnerId,
      title: partnerTitle,
      code: partnerCode,
      image: partnerImage,
    };

    saveToPairList(partner);
  });
}

// Xóa partner khỏi danh sách ghép đôi:
const removeFromPairList = (partnerId) => {
  let pairList = JSON.parse(localStorage.getItem("pairList")) || [];
  pairList = pairList.filter(partner => partner.id !== partnerId);
  localStorage.setItem("pairList", JSON.stringify(pairList));
  loadPairList();
};

// Hiển thị danh sách ghép đôi từ local storage:
const loadPairList = () => {
  const pairList = JSON.parse(localStorage.getItem("pairList")) || [];
  const pairListContainer = document.querySelector("[pair-list-container]");

  if (pairListContainer) {
    pairListContainer.innerHTML = ''; // Clear existing content
    if (pairList.length > 0) {
      pairList.forEach(partner => {
        const partnerRow = document.createElement("tr");
        partnerRow.innerHTML = `
          <td>${partner.title}</td>
          <td>${partner.code}</td>
          <td><img src="${partner.image}" alt="Partner Image" width="100"></td>
          <td>
            <button class="btn btn-danger" onclick="removeFromPairList(${partner.id})">Xóa</button>
            <button class="btn btn-primary" onclick="alertPairRequestSuccess()">Ghép đôi</button>
          </td>
        `;
        pairListContainer.appendChild(partnerRow);
      });
    } else {
      pairListContainer.innerHTML = "<p>Bạn chưa chọn partner nào.</p>";
    }
  }
};

// Gọi hàm loadPairList khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  loadPairList();
});
