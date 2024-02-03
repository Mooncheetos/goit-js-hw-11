document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const query = document.getElementById('query').value.trim();

    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search query.' });
        return;
    }

    searchImages(query);
});

async function searchImages(query) {
    const apiKey = '42175181-9f2e4ea0c75ffabf50c3ef9f9';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

    iziToast.info({ title: 'Searching', message: 'Fetching images...', timeout: false, overlay: true, id: 'loading' });

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hits.length > 0) {
            displayImages(data.hits);
        } else {
            iziToast.info({ title: 'No results', message: 'Sorry, there are no images matching your search query. Please try again!' });
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        iziToast.error({ title: 'Error', message: 'Failed to fetch images.' });
    } finally {
        iziToast.destroy(document.querySelector('.iziToast-overlay'));
    }
}

function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    const fragment = document.createDocumentFragment();

    images.forEach(image => {
        const div = document.createElement('div');
        div.className = 'image-card';
        div.innerHTML = `<a href="${image.largeImageURL}" data-lightbox="image-set" data-title="${image.tags}">
                            <img src="${image.webformatURL}" alt="${image.tags}">
                         </a>
                         <div class="info">Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}</div>`;
        fragment.appendChild(div);
    });

    gallery.appendChild(fragment);

    new SimpleLightbox({ elements: '#gallery a' }).refresh();
}
