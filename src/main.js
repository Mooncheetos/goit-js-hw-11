import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

document.getElementById('search-form').addEventListener('submit', async function (event) {
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

const lightbox = new SimpleLightbox({ elements: '#gallery a' });

function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    const fragment = document.createDocumentFragment();

    images.forEach(image => {
        const a = document.createElement('a');
        a.href = image.largeImageURL;
        a.setAttribute('data-lightbox', 'image-set');
        a.setAttribute('data-title', image.tags);

        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;

        a.appendChild(img);

        const div = document.createElement('div');
        div.className = 'info';
        div.innerHTML = `Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}`;

        a.appendChild(div);

        const divCard = document.createElement('div');
        divCard.className = 'image-card';
        divCard.appendChild(a);

        fragment.appendChild(divCard);
    });

    gallery.appendChild(fragment);

    lightbox.refresh();
}
