function Gallery (gallery) {
    if(!gallery) {
        throw new Error("No gallery found!");
    }
    // Selecting elements that I need
    const images = Array.from(gallery.querySelectorAll("img"));
    const modal = document.querySelector(".modal");
    const prevButton = modal.querySelector(".prev");
    const nextButton = modal.querySelector(".next");
    let currentImage;
    
function openModal () {
    if (modal.matches(".open")){
        console.log("Modal is already open");
        return;
    } else {
        modal.classList.add("open");
        window.addEventListener("keyup", handleKey);
        nextButton.addEventListener("click", showNextImage);
        prevButton.addEventListener("click", showPreviousImage);
    }
}

    function showNextImage(){
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }
    function showPreviousImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function handleClickOutside (e) {
        if(e.target === e.currentTarget){
            closeModal()
        }
    }
    function closeModal() {
        modal.classList.remove("open");
        window.addEventListener("keyup", handleKey);
        nextButton.removeEventListener("click", showNextImage);
        prevButton.removeEventListener("click", showPreviousImage);

    }
    function handleKey(e){
        if(e.key === "Escape") return closeModal();
        if(e.key === "ArrowRight") return showNextImage();
        if(e.key === "ArrowLeft") return showPreviousImage();
    }

    function showImage(el) {
        if(!el) {
            console.info("There is no image to show");
            return;
        }
        modal.querySelector("img").src = el.src;
        modal.querySelector("h4").textContent = el.title;
        modal.querySelector("figure p").textContent = el.dataset.description;
        currentImage = el;
        openModal();

    }
// Event Listeners
    images.forEach(image=> image.addEventListener("click", (e)=> showImage(e.currentTarget)))
   //Looping over each image
    images.forEach(image=> image.addEventListener("keyup", e=> {
        if(e.key === "Enter"){
            showImage(e.currentTarget)
        }
    }))


    modal.addEventListener("click", handleClickOutside);
}



const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));