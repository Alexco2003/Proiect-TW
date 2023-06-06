const button = document.getElementById('press-button');

// Function to change button color
const changeButtonColor = () => {
  const colors = ['#FF6384', '#36A2EB', '#F0D43A', '#4BC0C0', '#9966FF', '#FF9F40', '#42D9C8', '#FFCC', '#36A2EB', '#FF6384', '#FFFF00'];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  button.style.backgroundColor = randomColor;
};

// Function to compare RGB values
const compareColors = (color1, color2) => {
  const rgb1 = color1.replace(/[^\d,]/g, '').split(',');
  const rgb2 = color2.replace(/[^\d,]/g, '').split(',');

  for (let i = 0; i < 3; i++) {
    if (parseInt(rgb1[i]) !== parseInt(rgb2[i])) {
      return false;
    }
  }
  return true;
};

// Function to handle button click
const handleButtonClick = (event) => {
  const computedStyle = getComputedStyle(event.currentTarget);
  const backgroundColor = computedStyle.backgroundColor;

  if (compareColors(backgroundColor, 'rgba(240, 212, 58, 1)')) {
    alert('Congratulations! You won free rides with our taxi for life!');
  } else {
    alert('Sorry, you did not win. Try again!');
  }
};

// Set interval to change button color every 1 second
setInterval(changeButtonColor, 1000);

// Add event listener to button click
button.addEventListener('click', handleButtonClick);
