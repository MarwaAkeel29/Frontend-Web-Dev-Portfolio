// --------------------
// Alan Partridge Soundboard - Extended Version
// My JS file with audio playback, text-to-speech, and pagination
// --------------------

// Get all the sound card elements from the page
const soundCards = document.querySelectorAll('.sound-card');

// Loop through each sound card to add click events for audio playback
soundCards.forEach(card => {
  const audio = card.querySelector('audio'); // Each card has an <audio> inside it

  // When the card is clicked
  card.addEventListener('click', () => {
    // Remove the glowing effect from all cards
    soundCards.forEach(c => c.classList.remove('playing'));

    // Reset audio to the beginning and play
    audio.currentTime = 0;
    audio.play();

    // Add the glowing animation class to this card
    card.classList.add('playing');

    // When the audio ends, remove the glowing effect
    audio.addEventListener('ended', () => {
      card.classList.remove('playing');
    });
  });
});

// --------------------
// Text-to-Speech Feature
// --------------------

// Get the Speak button and the textarea
const speakButton = document.getElementById('speak-button');
const speechInput = document.getElementById('speech-input');

// When Speak button is clicked
speakButton.addEventListener('click', () => {
  const text = speechInput.value; // Get what the user typed

  if (text.trim() !== '') {
    const speech = new SpeechSynthesisUtterance(text); // Create speech from text
    speechSynthesis.speak(speech); // Speak it
  }
});

// --------------------
// Pagination Feature
// --------------------

// Convert NodeList to array to work easily with indexing
const cards = Array.from(document.querySelectorAll('.sound-card'));

// Pagination variables
let currentPage = 0;
const cardsPerPage = 9;
const totalPages = Math.ceil(cards.length / cardsPerPage);

// Get the arrow buttons
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Function to update which sound cards are visible
function updatePagination() {
  // First hide all cards
  cards.forEach(card => {
    card.style.display = 'none';
  });

  // Calculate the range of cards to show for current page
  const start = currentPage * cardsPerPage;
  const end = start + cardsPerPage;

  for (let i = start; i < end && i < cards.length; i++) {
    cards[i].style.display = 'block';
  }

  // Show or hide arrows based on the current page
  prevBtn.classList.toggle('hidden', currentPage === 0);
  nextBtn.classList.toggle('hidden', currentPage >= totalPages - 1);
}

// When user clicks the "Next" arrow
nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updatePagination();
  }
});

// When user clicks the "Previous" arrow
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updatePagination();
  }
});

// Show the first set of cards when the page loads
updatePagination();


