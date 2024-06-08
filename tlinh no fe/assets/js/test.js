async function fetchUserData() {
    try {
        const response = await fetch('http://localhost:8081/user');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched user data:', data);
        return data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
}

function createCard(user, index) {
    const card = document.createElement('div');
    card.classList.add('tinder--card');
    card.innerHTML = `
        <img src="${user.images[0]}" alt="Profile Picture">
        <div class="info">
            <h3>${user.name}, ${user.age}</h3>
            <p>${user.location}</p>
            <p>${user.distance}</p>
            <div class="nav-buttons">
                <button class="next"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="feedback like">LIKE</div>
            <div class="feedback nope">NOPE</div>
        </div>
    `;
    card.dataset.index = index;
    return card;
}

function updateCardImage(card, images, currentIndex) {
    const imgElement = card.querySelector('img');
    imgElement.src = images[currentIndex];
}

function showFeedback(card, feedbackType) {
    const feedbackElement = card.querySelector(`.feedback.${feedbackType}`);
    feedbackElement.style.opacity = 1;
    setTimeout(() => {
        feedbackElement.style.opacity = 0;
    }, 1000);
}

function initCard(card, user) {
    const images = user.images;
    let currentImageIndex = 0;

    card.querySelector('.next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateCardImage(card, images, currentImageIndex);
    });

    const hammertime = new Hammer(card);

    hammertime.on('pan', function (event) {
        card.style.transition = 'none';
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;
        card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
    });

    hammertime.on('panend', function (event) {
        card.style.transition = 'transform 0.3s ease';
        const moveOutWidth = document.body.clientWidth;
        const threshold = moveOutWidth / 4;
    
        if (Math.abs(event.deltaX) > threshold) {
            const direction = event.deltaX > 0 ? 1 : -1;
            card.style.transform = `translate(${direction * moveOutWidth}px, ${event.deltaY}px) rotate(${direction * 30}deg)`;
            card.style.opacity = 0;
            setTimeout(() => {
                console.log(direction > 0 ? 'like' : 'nope');
                card.remove();
                requestAnimationFrame(() => {
                    showNextCard();
                });
            }, 300); // Đảm bảo thẻ hiện tại được xoá sau khi chuyển đổi hoàn tất
            showFeedback(card, direction > 0 ? 'like' : 'nope');
        } else {
            card.style.transform = '';
        }
    });
    
    
    
}

async function initialize() {
    const users = await fetchUserData();
    if (users && users.length > 0) {
        const mainElement = document.getElementById('main');

        users.forEach((user, index) => {
            const card = createCard(user, index);
            mainElement.appendChild(card);
            initCard(card, user);
        });
    }
}

function showNextCard() {
    const cards = document.querySelectorAll('.tinder--card');
    if (cards.length > 0) {
        const currentCard = cards[cards.length - 1];
        if (currentCard) {
            currentCard.classList.add('removed');
            setTimeout(() => {
                const remainingCards = document.querySelectorAll('.tinder--card');
                if (remainingCards.length > 0) {
                    remainingCards[remainingCards.length - 1].classList.remove('removed');
                }
            }, 100); // Đảm bảo thẻ hiện tại được xoá sau khi chuyển đổi hoàn tất
        }
    }
}



function handleButtonAction(action) {
    const cards = document.querySelectorAll('.tinder--card');
    if (cards.length > 0) {
        const currentCard = cards[cards.length - 1];
        if (currentCard) {
            const direction = action === 'like' ? 1 : -1;
            currentCard.style.transition = 'transform 0.3s ease';
            currentCard.style.transform = `translate(${direction * document.body.clientWidth}px, 0) rotate(${direction * 30}deg)`;
            currentCard.style.opacity = 0;
            setTimeout(() => {
                console.log(action);
                currentCard.remove();
                requestAnimationFrame(() => {
                    showNextCard();
                });
            }, 100); // Đảm bảo thẻ hiện tại được xoá sau khi chuyển đổi hoàn tất
            showFeedback(currentCard, action);
        }
    }
}






document.querySelector('.nope').addEventListener('click', () => handleButtonAction('nope'));
document.querySelector('.like').addEventListener('click', () => handleButtonAction('like'));

initialize();

document.getElementById('matchesTab').addEventListener('click', function() {
    document.getElementById('matchesList').style.display = 'flex';
    document.getElementById('messagesList').style.display = 'none';
    this.classList.add('active');
    document.getElementById('messagesTab').classList.remove('active');
});

document.getElementById('messagesTab').addEventListener('click', function() {
    document.getElementById('matchesList').style.display = 'none';
    document.getElementById('messagesList').style.display = 'flex';
    this.classList.add('active');
    document.getElementById('matchesTab').classList.remove('active');
});
