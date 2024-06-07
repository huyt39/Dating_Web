document.addEventListener('DOMContentLoaded', function() {
    const frame = document.getElementById('frame');
    const data = [
        { imgs: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'], name: 'Example 1', price: '20', distance: '2' },
        { imgs: ['https://example.com/image3.jpg', 'https://example.com/image4.jpg'], name: 'Example 2', price: '25', distance: '5' }
    ];

    data.forEach(datum => appendCard(datum));

    function appendCard(data) {
        const newCard = document.createElement('div');
        newCard.className = 'swiper-container';
        newCard.innerHTML = `
            <div class="swiper-wrapper">
                ${data.imgs.map(img => `<div class="swiper-slide" style="background-image: url('${img}');"></div>`).join('')}
            </div>
        `;
        frame.appendChild(newCard);

        const swiper = new Swiper(newCard, {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });

        const bottomDiv = document.createElement('div');
        bottomDiv.className = 'bottom';
        bottomDiv.innerHTML = `<div class="title">${data.name} - $${data.price}</div><div class="info">${data.distance} miles away</div>`;
        newCard.appendChild(bottomDiv);
    }
});
