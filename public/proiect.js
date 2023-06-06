// Select the elements to animate
const imgElement = document.querySelector('.poza img');
const h1Element = document.querySelector('.poza h1');

// Options for the Intersection Observer
const options = {
  threshold: 0.5 // Adjust the threshold as needed (0.5 means when 50% of the element is visible)
};

// Function to handle the intersection
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    // Check if the element is in the viewport and entry is intersecting
    if (entry.isIntersecting) {
      // Start the animation for the image and the heading
      imgElement.style.animationPlayState = 'running';
      h1Element.style.animationPlayState = 'running';
    } else {
      // Pause the animation if the element is out of view
      imgElement.style.animationPlayState = 'paused';
      h1Element.style.animationPlayState = 'paused';
    }
  });
}

// Create a new Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, options);

// Observe the section containing the image
const sectionElement = document.querySelector('.poza');
observer.observe(sectionElement);


document.getElementById("homeLink").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default link behavior
  location.reload(); // Refresh the page
});



const slideshow = document.querySelector('.partners-slideshow .slideshow');
const slides = slideshow.querySelectorAll('img');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let slideIndex = 0;

function showSlide(index) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[index].style.display = 'block';
}

function showNextSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

function showPreviousSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide(slideIndex);
}

prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

showSlide(slideIndex);
setInterval(showNextSlide, 7000); // Change slide every 7 seconds


