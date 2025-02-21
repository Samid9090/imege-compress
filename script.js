const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const compressLevel = document.getElementById('compress-level');
const compressValue = document.getElementById('compress-value');
const compressBtn = document.getElementById('compress-btn');
const compressedImg = document.getElementById('compressed-img');
const downloadLink = document.getElementById('download-link');

compressLevel.addEventListener('input', () => {
    compressValue.textContent = compressLevel.value;
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.borderColor = '#007bff';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = '#ccc';
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.borderColor = '#ccc';
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFile(file);
});

compressBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        compressImage(file, compressLevel.value);
    } else {
        alert('Please select an image first.');
    }
});

function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            compressedImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file.');
    }
}

function compressImage(file, quality) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                const compressedUrl = URL.createObjectURL(blob);
                compressedImg.src = compressedUrl;
                downloadLink.href = compressedUrl;
                downloadLink.download = `compressed-${file.name}`;
            }, 'image/jpeg', quality);
        };
    };
    reader.readAsDataURL(file);
}
