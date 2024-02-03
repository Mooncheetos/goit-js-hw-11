import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.getElementById('search-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const query = document.getElementById('query').value.trim();

  if (query === '') {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search query.' });
    return;
  }

  const apiKey = '42175181-9f2e4ea0c75ffabf50c3ef9f9';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits.length > 0) {
      // Process and display images
      displayImages(data.hits);
    } else {
      iziToast.info({ title: 'Info', message: 'Sorry, there are no images matching your search query. Please try again.' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    iziToast.error({ title: 'Error', message: 'An error occurred while fetching data. Please try again later.' });
  }
});
