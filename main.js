// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

// Function to Validate a Card
const validateCred = arr => {
  // Make a copy of the array to avoid modifying the original array
  let arrCopy = arr.slice();
  
  // Iterate through the array from right to left
  for (let i = arrCopy.length - 2; i >= 0;  i -= 2) {
    let doubled = arrCopy[i] * 2; // Double the digit
    if (doubled > 9) {
      doubled -= 9; // If the result is greater than 9, subtract 9
    }
    arrCopy[i] = doubled; // Replace the original value with the doubled or adjusted value
  }

  // Calculate the sum of all digits in the array
  let sumUp = arrCopy.reduce((acc, curr) => acc + curr);

  // Check if the sum modulo 10 equals 0 (valid)
  return sumUp % 10 === 0;
}

// Function to find invalid credit cards
const findInvalidCards = nestedArr  => {
  let invalidCards = [];
  for (let i = 0; i < nestedArr.length; i++) {
    const card  = nestedArr[i];
    if (!validateCred(card)) {
      invalidCards.push(card);
    }
  }
  return invalidCards;
}


// Function to identify invalid credit card companies
const idInvalidCardCompanies = nestedArr => {
  let nameCompanies = [];
  nestedArr.forEach(card => {
    if (card[0] === 3) {
      nameCompanies.push(`Amex (American Express)`);
    } else if (card[0] === 4) {
      nameCompanies.push(`Visa`);
    } else if (card[0] === 5) {
      nameCompanies.push(`Mastercard`);
    } else if (card[0] === 6) {
      nameCompanies.push(`Discover`);
    } else {
      nameCompanies.push(`Company not found`);
    }
  });
  return nameCompanies;
}

// Function to run all the necessary functions and log card information
const logCardInfo = (cards, condition) => {
  // Find invalid cards
  const invalidCards = findInvalidCards(cards);

  // Filter cards based on the specified condition
  const filteredCards = condition === 'valid' ? cards.filter(card => !invalidCards.includes(card)) : invalidCards;

  // Log card information
  filteredCards.forEach((card, index) => {
    console.log(`Card: ${index + 1}`);
    console.log(`Company: ${idInvalidCardCompanies([card])[0]}`);
    console.log(`Status: ${condition}`);
    console.log(`Number: ${card}`);
    console.log('----------------------------------------');
    console.log('');
  });

  // Log list of unique company names at the end
  const uniqueCompanies = new Set(filteredCards.map(card => idInvalidCardCompanies([card])[0]));
  console.log(`Unique Companies:`);
  console.log(`${[...uniqueCompanies].join(', ')}`);
};

// Run all functions and log card information
const runAndLog = (condition) => {
  console.log(`Showing ${condition} cards:`);
  logCardInfo(batch, condition);
};

// Run the raw information
const rawLog = () => {
  console.log(`Invalid Numbers:`)
  console.log(findInvalidCards(batch))
  console.log('')
  console.log(idInvalidCardCompanies(findInvalidCards(batch)))
}

// Show raw information
// rawLog();

// Show valid or invalid cards
runAndLog('valid'); 
