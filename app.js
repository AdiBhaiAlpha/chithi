// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDOMfizL6pjT40qisJqI14o5R5IiK27OQ",
    authDomain: "social-6e0ee.firebaseapp.com",
    projectId: "social-6e0ee",
    storageBucket: "social-6e0ee.appspot.com",
    messagingSenderId: "246903005794",
    appId: "1:246903005794:web:8951084e46924a5551273b"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get Elements
const letterInput = document.getElementById("letter-input");
const submitBtn = document.getElementById("submit-btn");
const charCount = document.getElementById("char-count");

// Character count live update
letterInput.addEventListener("input", function() {
    charCount.textContent = letterInput.value.length;
});

// Submit Letter to Firebase
submitBtn.addEventListener("click", function() {
    const letter = letterInput.value.trim();
    if (letter) {
        // Save the letter to Firebase Firestore
        db.collection("letters").add({
            letter: letter,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            geoLocation: "City/Region", // You can implement geo-location functionality here
        }).then(() => {
            alert("Your letter has been submitted!");
            letterInput.value = ''; // Clear textarea
            charCount.textContent = '0';
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    } else {
        alert("Please write something before submitting!");
    }
});
