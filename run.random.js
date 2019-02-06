function generateRandomNumber(min_value , max_value) {
    
   let random_number = Math.random() * (max-min) + min;
    return Math.floor(random_number);
}

function randomElementInArray(array) {
    return array[generateRandomNumber(0,array.length)];
}
