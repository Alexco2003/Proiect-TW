document.addEventListener('DOMContentLoaded', function() {
    const taxiTypeSelect = document.getElementById('taxi-type');
    const comfortOptionRadios = document.querySelectorAll('input[name="comfort-option"]');
    const nameInput = document.getElementById('name');
    const bookNowButton = document.getElementById('book-now');
    const commandsContainer = document.getElementById('commands-container');
  
    // Define an array of predefined colors
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#42D9C8', '#FFCD56', '#36A2EB', '#FF6384'];
  
    // Retrieve commands from localStorage
    let commands = JSON.parse(localStorage.getItem('commands')) || [];
  
    // Function to display commands
    function displayCommands() {
      // Clear commands container
      commandsContainer.innerHTML = '';
  
      // Display commands in reverse order (newest first)
      for (let i = commands.length - 1; i >= 0; i--) {
        const command = commands[i];
        const commandDiv = document.createElement('div');
        commandDiv.classList.add('command');
        commandDiv.style.backgroundColor = command.color;
  
        const commandText = document.createElement('span');
        commandText.textContent = command.content;
        commandDiv.appendChild(commandText);
  
        const commandPrice = document.createElement('span');
        commandPrice.textContent = ` - Price: ${command.price}€`;
        commandDiv.appendChild(commandPrice);
  
        commandDiv.addEventListener('click', function() {
            event.stopPropagation();
          // Remove clicked command
          commands.splice(i, 1);
          localStorage.setItem('commands', JSON.stringify(commands));
          displayCommands();
        });
        commandsContainer.appendChild(commandDiv);
      }
    }
  
    // Display initial commands
    displayCommands();
  
    // Function to handle booking
    function bookTaxi() {
      const taxiType = taxiTypeSelect.value;
      const comfortOption = document.querySelector('input[name="comfort-option"]:checked').value;
      const name = nameInput.value.trim();
  
      if (name === '') {
        alert('Please enter your name.');
        return;
      }
  
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();
  
      // Retrieve the selected taxi option's price
      const price = retrieveTaxiPrice(taxiType, comfortOption);
  
      const command = {
        content: `${taxiType} - ${comfortOption} - ${name} (${formattedDate})`,
        price: price, // Add price to command object
        color: null // Assign null color initially
      };
  
      // Generate random color from the predefined colors
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      command.color = randomColor;
  
      // Add command to commands array
      commands.push(command);
  
      // Save commands in localStorage
      localStorage.setItem('commands', JSON.stringify(commands));
  
      // Display updated commands
      displayCommands();
  
      // Clear input fields
      taxiTypeSelect.selectedIndex = 0;
      comfortOptionRadios[0].checked = true;
      nameInput.value = '';
    }
  
    // Add event listener to Book Now button
    bookNowButton.addEventListener('click', bookTaxi);
  
    // Add event listener to nameInput for Enter key press
    nameInput.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        bookTaxi();
      }
    });
  
    // Function to remove commands after 10 seconds
    function removeCommands() {
      if (commands.length > 0) {
        const commandDivs = document.querySelectorAll('.command');
        const lastCommandDiv = commandDivs[commandDivs.length - 1];
        lastCommandDiv.classList.add('fade-out');
        setTimeout(function() {
          // Remove the oldest command
          commands.shift();
          localStorage.setItem('commands', JSON.stringify(commands));
          displayCommands();
        }, 1000);
      }
    }
  
    // Set interval to remove commands every 10 seconds
    setInterval(removeCommands, 10000);
  
    // Function to retrieve the taxi price based on the selected options
    function retrieveTaxiPrice(taxiType, comfortOption) {
      // Define the prices based on the taxi type and comfort option
      const prices = {
        Audi: { Normal: 20, Luxury: 40 },
        McLaren: { Normal: 30, Luxury: 60 },
        Mercedes: { Normal: 25, Luxury: 50 },
        BMW: { Normal: 20, Luxury: 40 },
        Lamborghini: { Normal: 35, Luxury: 70 },
        Ferrari: { Normal: 30, Luxury: 60 }
      };
  
      return prices[taxiType][comfortOption];
    }
  });
  