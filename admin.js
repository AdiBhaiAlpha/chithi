// Firebase Configuration (Same as in app.js)
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
const letterList = document.getElementById("letter-list");

// Fetch Letters from Firebase Firestore
db.collection("letters").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    letterList.innerHTML = ''; // Clear existing letters
    snapshot.forEach(doc => {
        const data = doc.data();
        const letterItem = document.createElement("div");
        letterItem.className = "letter-item";
        letterItem.innerHTML = `
            <p>${data.letter}</p>
            <button onclick="editLetter('${doc.id}')">Edit</button>
            <button onclick="deleteLetter('${doc.id}')">Delete</button>
        `;
        letterList.appendChild(letterItem);
    });
});

// Edit Letter (Admin only)
function editLetter(id) {
    const newLetter = prompt("Edit the letter:");
    if (newLetter) {
        db.collection("letters").doc(id).update({
            letter: newLetter,
        }).then(() => {
            alert("Letter updated successfully!");
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }
}

// Delete Letter (Admin only)
function deleteLetter(id) {
    if (confirm("Are you sure you want to delete this letter?")) {
        db.collection("letters").doc(id).delete().then(() => {
            alert("Letter deleted successfully!");
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    }
}
