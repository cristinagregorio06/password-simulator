
const passwordInput = document.getElementById('password-input');
const strengthText = document.getElementById('strength-text');
const progressFill = document.getElementById('progress-fill');

const lengthCheck = document.getElementById('length-check');
const upperCheck = document.getElementById('upper-check');
const lowerCheck = document.getElementById('lower-check');
const numberCheck = document.getElementById('number-check');
const symbolCheck = document.getElementById('symbol-check');

const lengthSlider = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const generatedResult = document.getElementById('generated-result');
const generatedPassword = document.getElementById('generated-password');


function checkPassword() {
    const password = passwordInput.value;
    if (password === '') {
        resetDisplay();
        return;
    }
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
    updateRequirement(lengthCheck, hasLength, 'At least 8 characters');
    updateRequirement(upperCheck, hasUpper, 'Uppercase letters (A-Z)');
    updateRequirement(lowerCheck, hasLower, 'Lowercase letters (a-z)');
    updateRequirement(numberCheck, hasNumber, 'Numbers (0-9)');
    updateRequirement(symbolCheck, hasSymbol, 'Symbols (!@#$)');
    let score = 0;
    if (hasLength) score += 20;
    if (hasUpper) score += 20;
    if (hasLower) score += 20;
    if (hasNumber) score += 20;
    if (hasSymbol) score += 20;
    let level = '';
    if (score < 40) {
        level = 'weak';
        strengthText.textContent = 'WEAK password';
    } else if (score < 80) {
        level = 'medium';
        strengthText.textContent = 'MEDIUM password';
    } else {
        level = 'strong';
        strengthText.textContent = 'STRONG password';
    }
    progressFill.style.width = score + '%';
    progressFill.className = level;
    strengthText.className = level;
    showTips(hasLength, hasUpper, hasLower, hasNumber, hasSymbol);
}

function updateRequirement(element, isValid, text) {
    if (isValid) {
        element.textContent = '✅ ' + text;
        element.style.color = 'green';
    } else {
        element.textContent = '❌ ' + text;
        element.style.color = 'red';
    }
}

function showTips(hasLength, hasUpper, hasLower, hasNumber, hasSymbol) {
    const tipText = document.getElementById('tip-text');
    const tips = [];
    if (!hasLength) tips.push('Use at least 8 characters');
    if (!hasUpper) tips.push('Add uppercase letters');
    if (!hasLower) tips.push('Add lowercase letters');
    if (!hasNumber) tips.push('Include numbers');
    if (!hasSymbol) tips.push('Add special symbols');
    if (tips.length === 0) {
        tipText.textContent = 'Excellent! Your password is very secure 🎉';
        tipText.style.color = 'green';
    } else {
        tipText.textContent = tips.join(', ');
        tipText.style.color = 'orange';
    }
}

function resetDisplay() {
    strengthText.textContent = 'Type a password to start';
    strengthText.className = '';
    progressFill.style.width = '0%';
    progressFill.className = '';
    lengthCheck.textContent = '❌ At least 8 characters';
    upperCheck.textContent = '❌ Uppercase letters (A-Z)';
    lowerCheck.textContent = '❌ Lowercase letters (a-z)';
    numberCheck.textContent = '❌ Numbers (0-9)';
    symbolCheck.textContent = '❌ Symbols (!@#$)';
    lengthCheck.style.color = 'gray';
    upperCheck.style.color = 'gray';
    lowerCheck.style.color = 'gray';
    numberCheck.style.color = 'gray';
    symbolCheck.style.color = 'gray';
    document.getElementById('tip-text').textContent = 'Type a password to get tips';
}


function togglePassword() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}


function updateLength() {
    lengthValue.textContent = lengthSlider.value;
}

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const includeUpper = document.getElementById('include-upper').checked;
    const includeLower = document.getElementById('include-lower').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    let characters = '';
    if (includeUpper) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (characters === '') {
        alert('Please select at least one character type');
        return;
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    generatedPassword.value = password;
    generatedResult.style.display = 'block';
}

function copyPassword() {
    generatedPassword.select();
    document.execCommand('copy');
    alert('Password copied!');
}

function usePassword() {
    passwordInput.value = generatedPassword.value;
    checkPassword();
    alert('Password applied! Check how secure it is.');
}
