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
    feedbackElement.style.display = 'block';  // Hiển thị phần tử phản hồi
    feedbackElement.style.opacity = 1;
    setTimeout(() => {
        feedbackElement.style.opacity = 0;
        feedbackElement.style.display = 'none';  // Ẩn phần tử phản hồi sau khi hiển thị
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

        // Hiển thị phản hồi khi đang quẹt
        if (event.deltaX > 0) {
            showFeedback(card, 'like');
        } else {
            showFeedback(card, 'nope');
        }
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
            }, 300);
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
            }, 300); // Đảm bảo thẻ hiện tại được xoá sau khi chuyển đổi hoàn tất
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
            }, 300); // Đảm bảo thẻ hiện tại được xoá sau khi chuyển đổi hoàn tất
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

// Function to fetch chat data for a user
async function fetchChatData(userId) {
    try {
        const response = await fetch(`http://localhost:8081/chat/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const chatData = await response.json();
        console.log('Fetched chat data:', chatData);
        return chatData;
    } catch (error) {
        console.error('Failed to fetch chat data:', error);
    }
}

// Mock data for testing purposes
const mockChatData = {
    1: {
        messages: [
            {
                avatar: 'data:image/jpeg;base64,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',
                user: 'Trịnh trần phương tuấn',
                text: 'em có chiếc đít sáng nhất a từng thấy',
                sentByMe: false
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'Thank you!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            },
            {
                avatar: './assets/img/283a7ffd-768f-41d2-84c2-c5ce011fdeda.jpg',
                user: 'Me',
                text: 'alo!',
                sentByMe: true
            }
        ]
    },
    2: {
        messages: [
            {
                avatar: './assets/img/back.png',
                user: 'Hank',
                text: 'What are you up to this weekend...',
                sentByMe: false
            },
            {
                avatar: './assets/img/back.png',
                user: 'Me',
                text: 'Not much, how about you?',
                sentByMe: true
            }
        ]
    }
};

// Function to fetch chat data for a user (using mock data for testing)
async function fetchChatData(userId) {
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        if (!mockChatData[userId]) {
            throw new Error('User not found');
        }
        return mockChatData[userId];
    } catch (error) {
        console.error('Failed to fetch chat data:', error);
    }
}



// Function to display chat data in the chat interface
function displayChatData(chatData) {
    const chatBody = document.querySelector('.chat-body');
    chatBody.innerHTML = ''; // Clear previous chat messages
    chatData.messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(message.sentByMe ? 'sent' : 'received');
        messageElement.innerHTML = `
            <div class="avatar"><img src="${message.avatar}" alt="${message.user}"></div>
            <div class="info">
                <div class="user">${message.user}</div>
                <div class="text">${message.text}</div>
            </div>
        `;
        chatBody.appendChild(messageElement);
    });

    
}

// Function to handle message click
async function handleMessageClick(event) {
    const messageElement = event.currentTarget;
    const userId = messageElement.getAttribute('data-user-id');
    const chatData = await fetchChatData(userId);
    const chatBody = document.querySelector('.chat-body');
    if (chatData) {
        displayChatData(chatData);
        document.getElementById('main').style.display = 'none';  // Hide swipe section
        document.getElementById('chat').style.display = 'block';  // Show chat sectio
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Add event listener to each message item
document.querySelectorAll('.message').forEach(messageElement => {
    messageElement.addEventListener('click', handleMessageClick);
});

// Event listeners for tab switching
document.getElementById('matchesTab').addEventListener('click', function() {
    document.getElementById('matchesList').style.display = 'flex';
    document.getElementById('messagesList').style.display = 'none';
    document.getElementById('main').style.display = 'flex';  // Show swipe section
    document.getElementById('chat').style.display = 'none';  // Hide chat section
    this.classList.add('active');
    document.getElementById('messagesTab').classList.remove('active');
});

document.getElementById('messagesTab').addEventListener('click', function() {
    document.getElementById('matchesList').style.display = 'none';
    document.getElementById('messagesList').style.display = 'flex';
    document.getElementById('main').style.display = 'none';  // Hide swipe section
    document.getElementById('chat').style.display = 'none';  // Ensure chat section is hidden
    this.classList.add('active');
    document.getElementById('matchesTab').classList.remove('active');
});


