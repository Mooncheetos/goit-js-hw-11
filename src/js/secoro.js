function displayImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear previous results

  images.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    card.appendChild(img);

    gallery.appendChild(card);
  });

  // Initialize SimpleLightbox
  new SimpleLightbox('.gallery .card img');
}
