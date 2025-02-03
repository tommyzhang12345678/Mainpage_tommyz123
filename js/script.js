// File URL Configuration
// File URL Configuration
const fileURLs = {
    // Add actual files here if needed
};

// Universal Click Handler
document.querySelectorAll('.download-button').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.download-card');
        
        // Update usage counter
        const counter = card.querySelector('.fa-external-link-alt').parentNode;
        const currentCount = parseInt(counter.textContent) || 0;
        counter.textContent = `${(currentCount + 1).toLocaleString()}`;

        // Handle different types
        if (this.dataset.url) {
            window.open(this.dataset.url, '_blank');
        } else if (this.dataset.file) {
            const a = document.createElement('a');
            a.href = fileURLs[this.dataset.file];
            a.download = this.dataset.file;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
});

// Floating Button - Open All Visible
document.querySelector('.floating-download').addEventListener('click', () => {
    document.querySelectorAll('.download-card:not([style*="none"]) .download-button').forEach(btn => {
        btn.click();
    });
});

// Rest of filtering and search code remains the same

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

// Modified Download Manager
document.querySelectorAll('.download-button').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.download-card');
        
        // Update download count regardless of type
        const countElement = card.querySelector('.fa-download').parentNode;
        let count = parseInt(countElement.textContent);
        countElement.textContent = (count + 1) + 'K';

        // Handle either URL or File download
        if (this.dataset.url) {
            // Open external link in new tab
            window.open(this.dataset.url, '_blank');
        } else if (this.dataset.file) {
            // Existing file download logic
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