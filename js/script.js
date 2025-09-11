


// Search Functionality
document.querySelector('.search-box input').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.download-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? 'block' : 'none';
    });
});

// Category Filtering
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filter cards based on category
        const category = this.dataset.category;
        document.querySelectorAll('.download-card').forEach(card => {
            const cardCategory = card.dataset.category;
            card.style.display = (category === 'all' || cardCategory === category) ? 'block' : 'none';
        });
    });
});

// Card Animation
document.querySelectorAll('.download-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100 * i);
});

//passord
function checkPassword(url) {
    const userInput = prompt("Please enter the password:");
    if (userInput === null) {
        alert("Password entry cancelled.");
        return;
    }
    fetch('/password.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch password file');
            }
            return response.text();
        })
        .then(storedPassword => {
            if (userInput === storedPassword.trim()) {
                alert("Password correct! Redirecting...");
                window.location.href = url;
            } else {
                alert("Incorrect password!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error fetching password file. Please try again later.");
        });
}