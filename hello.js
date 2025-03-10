const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log("Hello, World!");
  
  function getUserName() {
    return new Promise((resolve) => {
      const ask = () => {
        readline.question("Please enter your name: ", (name) => {
          if (name.trim() === "") {
            console.log("Error: Name cannot be empty. Please try again.");
            ask();
          } else {
            readline.close();
            resolve(name.trim());
          }
        });
      };
      ask();
    });
  }
  
  (async () => {
    const userName = await getUserName();
    console.log(`Hello, ${userName}! Welcomeee !!!`);
    const now = new Date();
    console.log(`Current date and time: ${now.toLocaleString()}`);
  })();