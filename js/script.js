// File URL Configuration
const fileURLs = {
    // Add actual file URLs here if needed
    // Example: 'example-file.zip': 'https://example.com/path/to/file.zip'
};

// Universal Click Handler for Download Buttons
document.querySelectorAll('.download-button').forEach(btn => {
    btn.addEventListener('click', function () {
        const card = this.closest('.download-card');

        // Update usage counter
        const counter = card.querySelector('.stat-item .fa-external-link-alt, .stat-item .fa-download').parentNode;
        const currentCount = parseInt(counter.textContent) || 0;
        counter.textContent = `${(currentCount + 1).toLocaleString()}`;

        // Handle different types (URL or File)
        if (this.dataset.url) {
            // Open external link in new tab
            window.open(this.dataset.url, '_blank');
        } else if (this.dataset.file) {
            // Handle file download
            const fileName = this.dataset.file;
            const fileURL = fileURLs[fileName];

            if (!fileURL) {
                alert('File not available!');
                return;
            }

            const a = document.createElement('a');
            a.href = fileURL;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
});

// Floating Button - Open All Visible Links
document.querySelector('.floating-download').addEventListener('click', () => {
    document.querySelectorAll('.download-card:not([style*="none"]) .download-button').forEach(btn => {
        btn.click();
    });
});

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