
window.addEventListener('DOMContentLoaded', () => {
  const modalHTML = `
    <div id="imageModal" class="modal">
      <span class="close-btn" onclick="closeModal()">&times;</span>
      <img class="modal-content" id="largeImage">
    </div>
  `;
 
  document.body.insertAdjacentHTML('beforeend', modalHTML);
});


function openModal(element) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("largeImage");
  const img = element.querySelector("img"); 
  
  modal.style.display = "block";
  modalImg.src = img.src;
}


function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}