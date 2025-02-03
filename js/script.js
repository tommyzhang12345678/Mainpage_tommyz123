// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.download-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.dataset.category;
        const cards = document.querySelectorAll('.download-card');
        
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Real download functionality
document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.download-card');
        const progressBar = card.querySelector('.download-progress-bar');
        const progressContainer = card.querySelector('.download-progress');
        const fileName = this.dataset.file;
        
        // Show progress bar
        progressContainer.style.display = 'block';
        
        // Simulate download progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Trigger actual file download
                const blob = new Blob(['Simulated file content'], { type: 'application/octet-stream' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                
                // Update UI
                progressContainer.style.display = 'none';
                progressBar.style.width = '0%';
                this.innerHTML = `<i class="fas fa-check"></i> Downloaded!`;
                this.disabled = true;
                
                // Update download count
                const downloadCount = card.querySelector('.fa-download').parentNode;
                const count = parseInt(downloadCount.textContent) + 1;
                downloadCount.innerHTML = `<i class="fas fa-download"></i> ${count.toLocaleString()}`;
            }
        }, 200);
    });
});

// Floating download button (downloads all visible items)
document.querySelector('.floating-download').addEventListener('click', () => {
    const visibleCards = document.querySelectorAll('.download-card[style="display: block;"]');
    visibleCards.forEach(card => {
        const downloadButton = card.querySelector('.download-button');
        if (!downloadButton.disabled) {
            downloadButton.click();
        }
    });
});

// Initialize cards with animation
document.querySelectorAll('.download-card').forEach((card, index) => {
    card.style.transform = `translateY(${20 * (index + 1)}px)`;
    card.style.opacity = '0';
    setTimeout(() => {
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, 300 * index);
});