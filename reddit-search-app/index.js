import reddit from './reddit-api';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
// Form Event Listener
searchForm.addEventListener('submit', (e) => {
    
    // Get search term
    const searchTerm = searchInput.value;
    // Get sort 
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    
    // Get limit
    const searchLimit = document.getElementById('limit').value;
    // console.log(searchLimit)

    // Validate input 
    if(searchTerm == ''){
        // Show message
        showMessage('Please add a search term', 'alert-danger');
    }

    // Clear input 
    searchInput.value = '';

    // Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        console.log(results)

        let output = '<div class="card-columns">';
        // Loop through posts
        results.forEach(post => {
            // Check for image 
            const image = post.preview ? post.preview.images[0].source.url : 'https://wearesocial-net.s3.amazonaws.com/uk/wp-content/uploads/sites/2/2015/07/2A326ECA00000578-3148329-California_based_Reddit_logo_shown_has_fired_an_employee_called_-a-6_1435919411902.jpg';
            output += `
            <div class="card">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100)}</p>
    <a href="${post.url}" target="blank" class="btn btn-primary">Read More</a>
    
    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
    <span class="badge badge-dark">Score: ${post.score}</span>
  </div>
</div>

            `;
        })
        output += '</div>';
        document.getElementById('results').innerHTML = output;
        

    })


    e.preventDefault();
    
});

// Show Message 
function showMessage(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get the parent container
    const searchContainer = document.getElementById('search-container');
    // Get search
    const search = document.getElementById('search');

    // Insert message 
    searchContainer.insertBefore(div, search);

    // Timeout
    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 4000);
}

// Truncate Text
function truncateText(text, limit){
    const shortened = text.indexOf(' ', limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened);
}