const loader = document.getElementById('loader');

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

document.getElementById('search-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  toggleLoader(true);

  // Fetch request...

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    toggleLoader(false);
    // Display images...
  } catch (error) {
    toggleLoader(false);
    console.error('Error fetching data:', error);
    iziToast.error({ title: 'Error', message: 'An error occurred while fetching data. Please try again later.' });
  }
});
