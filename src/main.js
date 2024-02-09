import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loaderContainer = document.querySelector('.loader');
const searchForm = document.querySelector('.search-form');

const apiKey = '42175181-9f2e4ea0c75ffabf50c3ef9f9';

function toastSuccess(message) {
    iziToast.success({
        title: 'Success',
        message: message,
        position: 'topRight'
    });
}   

function toastError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight'
    });
}

async function searchImages(query) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.hits;
}

document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const query = document.getElementById('query').value.trim();

    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search query.' });
        return;
    }

    try {
        loaderContainer.style.display = 'block';
        const images = await searchImages(query);
        if (images.length > 0) {
            displayImages(images);
            toastSuccess(`Was found: ${images.length} images`);
            initializeLightbox();
        } else {
            galleryContainer.innerHTML = '';
            toastError('Sorry, there are no images matching your search query. Please try again!');
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        toastError('Failed to fetch images.');
    } finally {
        loaderContainer.style.display = 'none';
    }
});

function displayImages(images) {
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

    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(fragment);
}

let lightbox;

function initializeLightbox() {
    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a');
    } else {
        lightbox.refresh();
    }
}