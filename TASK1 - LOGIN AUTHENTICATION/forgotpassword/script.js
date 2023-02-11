const codes = document.querySelectorAll('.code')

codes[0].focus()

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(e.key >= 0 && e.key <=9) {
            codes[idx].value = ''
            setTimeout(() => codes[idx + 1].focus(), 10)
        } else if(e.key === 'Backspace') {
            setTimeout(() => codes[idx - 1].focus(), 10)
        }
    })
})

function submit() {
    document.getElementById("submit");
    alert("A new password sent on your email. Please change it once you Login !!!");
    window.location.href="index.html";
}

function resent() {
    document.getElementById("resent");
    alert("New OTP sent on your registered E-mail");
}