window.addEventListener('DOMContentLoaded', () => {
  const modalHTML = `
    <div id="imageModal" class="modal">
      <span class="close-btn" onclick="closeModal()">&times;</span>
      <img class="modal-content" id="largeImage">
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
});

// ÅPNER BILDEMODAL (Polaroidene)
function openModal(element) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("largeImage");
  const img = element.querySelector("img"); 
  
  if (modal && modalImg && img) {
    modal.style.display = "block";
    modalImg.src = img.src;
  }
}

// LUKKER BILDEMODAL
function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// ÅPNER VIDEOMODAL (Podcasten)
function openVideoModal() {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("modal-video");
  if (modal && video) {
    modal.style.display = "flex";
    video.play();
  }
}

// LUKKER VIDEOMODAL
function closeVideoModal() {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("modal-video");
  if (modal && video) {
    modal.style.display = "none";
    video.pause();
    video.currentTime = 0;
  }
}

// LUKK MED ESCAPE (Lukker både video og bilder hvis de er åpne)
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeVideoModal();
    closeModal();
  }
});