// File URL Configuration
const fileURLs = {
    'netscan-pro.zip': 'https://example.com/hackertools/netscan-pro.zip',
    'cryptoshield.py': 'https://example.com/scripts/cryptoshield.py'
};

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
    btn.addEventListener('click', function() {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.dataset.category;
        document.querySelectorAll('.download-card').forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
    });
});

// Download Manager
document.querySelectorAll('.download-button').forEach(btn => {
    btn.addEventListener('click', function() {
        const fileName = this.dataset.file;
        const fileURL = fileURLs[fileName];
        
        if (!fileURL) {
            alert('File not available!');
            return;
        }

        // Trigger download
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Update download count
        const countElement = this.closest('.download-card').querySelector('.fa-download').parentNode;
        countElement.textContent = parseInt(countElement.textContent) + 1 + 'K';
    });
});

// Floating Download Button
document.querySelector('.floating-download').addEventListener('click', () => {
    document.querySelectorAll('.download-card:not([style*="none"]) .download-button').forEach(btn => btn.click());
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