let email = '';
let countdown = 600;
let inbox = document.getElementById("inbox");
let emailDisplay = document.getElementById("email");

function generateEmail() {
    let name = Math.random().toString(36).substring(2, 11);
    email = name + "@1secmail.com";
    emailDisplay.innerText = email;
    countdown = 600;
    fetchInbox();
}

function fetchInbox() {
    if (!email) return;
    let [login, domain] = email.split("@");
    fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
        .then(res => res.json())
        .then(data => {
            inbox.innerHTML = '';
            if (data.length === 0) {
                inbox.innerHTML = "<p>No messages yet.</p>";
                return;
            }
            data.forEach(msg => {
                inbox.innerHTML += `<div><strong>${msg.from}</strong>: ${msg.subject}</div>`;
            });
        });
}

function refreshInbox() {
    fetchInbox();
}

function startTimer() {
    setInterval(() => {
        if (countdown > 0) {
            countdown--;
            document.getElementById("timer").innerText = countdown + "s left";
        } else {
            generateEmail();
        }
    }, 1000);
}

generateEmail();
startTimer();
