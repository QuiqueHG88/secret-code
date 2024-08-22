const textArea = document.getElementById('text-area');
const encodeButton = document.getElementById('encode-btn');
const decodeButton = document.getElementById('decode-btn');
const h2Container = document.getElementById('h2-container');

class SecretCodeConverter{
    
    static generateRandomDigits(){
        let digits = [];

        for(let i = 0; i < 4; i++){
            digits[i] = Math.floor(Math.random() * 4) + 1;
        }
        return digits;
    }
    
    static generateRandomLetters(excludeIndex){

        let letters = '';

        for (let i = 0; i < 3; i++){
            let letter;
            do {
                letter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(Math.random() * 26));
            } while (letter.charCodeAt(0) == 'A'.charCodeAt(0) + excludeIndex);

            letters += letter;
        }

        return letters;
    
    }
    
    static encode(letter){
        const randomDigits = SecretCodeConverter.generateRandomDigits();
        const thirdDigit = randomDigits[2];
        let  randomLetters = SecretCodeConverter.generateRandomLetters(letter.charCodeAt(0) - 'A'.charCodeAt(0));

        let encoderLetter = String.fromCharCode('A'.charCodeAt(0) + letter.charCodeAt(0) - 'A'.charCodeAt(0));

        randomLetters = randomLetters.slice(0, thirdDigit - 1) + encoderLetter + randomLetters.slice(thirdDigit - 1 );

        return `${randomDigits[0]}${randomDigits[1]}${thirdDigit}${randomDigits[3]}${randomLetters}`;
    }

    static decode(code){
        const thirdDigit = parseInt(code[2]);
        const index = thirdDigit;
        return code[4 + index - 1];
    
    }
}

encodeButton.addEventListener('click', function(){
    let codeStatus = "Encode";
    const textToEncode = textArea.value.toUpperCase();
    let encodedText = '';

    for(const letter of textToEncode){
        if (letter.match(/[A-Z]/)) {
            encodedText += SecretCodeConverter.encode(letter) + ' ';
        }
    }

    textArea.value = encodedText;

    printH2(codeStatus);
});

decodeButton.addEventListener('click', function(){
    let codeStatus = "Decode"
    const textToDecode = textArea.value;
    let decodedText = "";

    const encodedCodes = textToDecode.split(' ');
    for (const code of encodedCodes) {
        if (code.length === 8) {
            decodedText += SecretCodeConverter.decode(code);
        }
    }
    printH2(codeStatus);
    textArea.value = decodedText;

});

function printH2(codeStatus){
    if(codeStatus == "Encode"){
        h2Container.innerHTML  = `<h2>${codeStatus}<h2/>`;
    } else if (codeStatus == "Decode"){
        h2Container.innerHTML = `<h2>${codeStatus}<h2`;
    }
}