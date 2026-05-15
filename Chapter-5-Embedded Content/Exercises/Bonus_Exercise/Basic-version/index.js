// Select all elements with the class 'sound-card'
const soundCards = document.querySelectorAll('.sound-card');

// Loop through each sound card
soundCards.forEach(card => {
  // Get the audio element inside this specific card
  const audio = card.querySelector('audio');

  // Added a click event listener to the whole card
  card.addEventListener('click', () => {
    // First, remove the 'playing' class from all cards to reset any active glowPulse animations
    soundCards.forEach(c => c.classList.remove('playing'));

    // Reset the audio so it starts from the beginning even if it was already playing
    audio.currentTime = 0;

    // Play the audio file
    audio.play();

    // Add the 'playing' class to trigger the glowPulse animation
    card.classList.add('playing');

    // Once the audio finishes playing, remove the 'playing' class so the glow stops
    audio.addEventListener('ended', () => {
      card.classList.remove('playing');
    });
  });
});






  
  
