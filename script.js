// script.js
const nameInput = document.getElementById('name-input');
const fontSelect = document.getElementById('font-select');
const colorPicker = document.getElementById('color-picker');
const generateButton = document.getElementById('generate');
const downloadButton = document.getElementById('download');
const output = document.getElementById('output');

generateButton.addEventListener('click', generateSignature);
downloadButton.addEventListener('click', downloadSignature);

function generateSignature() {
    const name = nameInput.value;
    const font = fontSelect.value;
    const color = colorPicker.value;

    if (name.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    // Set the font family and color
    output.style.fontFamily = font;
    output.style.color = color;
    output.innerHTML = name;

    // Adjust font size to fit the output div
    adjustFontSize(output, name);

    // Apply text shadow for 3D effect
    output.style.textShadow = `2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000`;

    downloadButton.style.display = 'inline-block';
}

function adjustFontSize(element, text) {
    const parentWidth = element.clientWidth;
    let fontSize = 100; // Start with a large font size
    let textWidth;

    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontFamily = element.style.fontFamily;
    tempSpan.innerHTML = text;
    document.body.appendChild(tempSpan);

    do {
        tempSpan.style.fontSize = `${fontSize}px`;
        textWidth = tempSpan.offsetWidth;
        fontSize -= 1;
    } while (textWidth > parentWidth && fontSize > 0);

    document.body.removeChild(tempSpan);
    element.style.fontSize = `${fontSize}px`;
}

function downloadSignature() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const font = window.getComputedStyle(output).fontFamily;
    const fontSize = window.getComputedStyle(output).fontSize;
    const color = window.getComputedStyle(output).color;

    ctx.font = `${fontSize} ${font}`;
    const textWidth = ctx.measureText(output.innerHTML).width;
    const textHeight = parseInt(fontSize, 10) * 1.2;  // Adding some padding

    canvas.width = textWidth + 20;  // Adding some padding
    canvas.height = textHeight + 20;  // Adding some padding

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize} ${font}`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';

    // Apply 3D effect using text shadow on the canvas
    ctx.shadowColor = '#000';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 0;

    ctx.fillText(output.innerHTML,5, 30);

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    link.click();
}
