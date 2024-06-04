let cropper;
let currentPhotoIndex;

function openCropper(event, index) {
    currentPhotoIndex = index;
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('cropperImage').src = e.target.result;
            const modal = document.getElementById('cropperModal');
            modal.style.display = 'block';
            cropper = new Cropper(document.getElementById('cropperImage'), {
                aspectRatio: 2 / 3, // Aspect ratio of the photo upload element (width:height = 2:3)
                viewMode: 1,
                autoCropArea: 1, // Ensures the crop box covers the entire image initially
                ready() {
                    cropper.setCropBoxData({
                        width: cropper.getContainerData().width,
                        height: cropper.getContainerData().height,
                        left: 0,
                        top: 0
                    });

                    document.getElementById('zoom-range').oninput = function() {
                        cropper.zoomTo(parseFloat(this.value));
                    };
                },
            });
        };
        reader.readAsDataURL(file);
    }
}

function closeCropper() {
    const modal = document.getElementById('cropperModal');
    modal.style.display = 'none';
    cropper.destroy();
    cropper = null;
}

function cropImage() {
    const canvas = cropper.getCroppedCanvas({
        width: 100, // Width of the photo upload element
        height: 150 // Height of the photo upload element
    });
    const imgElement = document.getElementById('photo' + currentPhotoIndex);
    imgElement.src = canvas.toDataURL();
    imgElement.classList.add('preview');
    closeCropper();
}

function rotateImage() {
    cropper.rotate(90);
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('cropperModal');
    if (event.target === modal) {
        closeCropper();
    }
};
