function generateMeme(
  img,
  topText,
  bottomText,
  topTextSize,
  bottomTextSize,
  topTextColor,
  bottomTextColor
) {
  const canvas = document.getElementById("meme-canvas");
  const ctx = canvas.getContext("2d");

  // Size canvas to image
  canvas.width = img.width;
  canvas.height = img.height;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw main image
  ctx.drawImage(img, 0, 0);

  // Text style: white with black borders
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";

  // Top text font size and color
  let fontSize = canvas.width * topTextSize;
  ctx.font = `${fontSize}px Impact`;
  ctx.lineWidth = fontSize / 20;
  ctx.fillStyle = topTextColor; // Set top text color

  // Draw top text
  ctx.textBaseline = "top";
  topText.split("\n").forEach((t, i) => {
    ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
    ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
  });

  // Bottom text font size and color
  fontSize = canvas.width * bottomTextSize;
  ctx.font = `${fontSize}px Impact`;
  ctx.lineWidth = fontSize / 20;
  ctx.fillStyle = bottomTextColor; // Set bottom text color

  // Draw bottom text
  ctx.textBaseline = "bottom";
  bottomText
    .split("\n")
    .reverse()
    .forEach((t, i) => {
      // .reverse() because it's drawing the bottom text from the bottom up
      ctx.fillText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize,
        canvas.width
      );
      ctx.strokeText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize,
        canvas.width
      );
    });
}

window.addEventListener("DOMContentLoaded", () => {
  // Initialize variables
  const topTextInput = document.getElementById("top-text");
  const bottomTextInput = document.getElementById("bottom-text");
  const topTextSizeInput = document.getElementById("top-text-size-input");
  const bottomTextSizeInput = document.getElementById("bottom-text-size-input");
  const topTextColorPicker = document.getElementById("top-text-color-picker");
  const bottomTextColorPicker = document.getElementById(
    "bottom-text-color-picker"
  );
  const imageInput = document.getElementById("image-input");
  const generateBtn = document.getElementById("generate-btn");
  const downloadBtn = document.querySelector(".download-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const deleteBtn = document.querySelector(".delete-btn");
  // Default/Demo text
  topTextInput.value = "Top\nValue";
  bottomTextInput.value = "Bottom\nValue";

  function clearCanvasAndImageInput() {
    const canvas = document.getElementById("meme-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    topTextInput.value = "";
    bottomTextInput.value = "";
    imageInput.value = null;
    document
      .querySelector(".canvas-container")
      .classList.remove("meme-generated");
  }

  function generateImage() {
    // Check if an image is selected
    if (!imageInput.files || !imageInput.files[0]) {
      let errorMessage = document.querySelector(".error-message");
      if (!errorMessage) {
        errorMessage = document.createElement("span");
        errorMessage.className = "error-message";
        errorMessage.style.display = "block";
        errorMessage.style.color = "#DF4661";
        errorMessage.style.marginTop = "5px";
        errorMessage.style.fontSize = "13px";
        errorMessage.innerHTML = "Please Upload an Image";
        imageInput.insertAdjacentElement("afterend", errorMessage);
      }
      return;
    }

    // If image input is not empty, remove any existing error message
    const errorMessage = document.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }

    // Read image as DataURL using the FileReader API
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        generateMeme(
          img,
          topTextInput.value,
          bottomTextInput.value,
          topTextSizeInput.value,
          bottomTextSizeInput.value,
          topTextColorPicker.value,
          bottomTextColorPicker.value
        );
        // Add class to container to show buttons
        document
          .querySelector(".canvas-container")
          .classList.add("meme-generated");
      };
    };
    reader.readAsDataURL(file);
  }

  function downloadMeme() {
    const canvas = document.getElementById("meme-canvas");
    const dataURL = canvas.toDataURL("image/png"); // Convert canvas to data URL
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "meme.png"; // Set the file name for download
    document.body.appendChild(link);
    link.click(); // Simulate click to trigger download
    document.body.removeChild(link); // Clean up after download
  }
  // Generate button click listener
  generateBtn.addEventListener("click", generateImage);

  downloadBtn.addEventListener("click", downloadMeme);

  resetBtn.addEventListener("click", () => {
    topTextInput.value = "";
    bottomTextInput.value = "";
    generateImage();
  });

  deleteBtn.addEventListener("click", clearCanvasAndImageInput);

  document.getElementById("page-footer").innerHTML = `Work of Mick Nixon Manuit - &copy; ${new Date(Date.now()).getFullYear()}`
});
