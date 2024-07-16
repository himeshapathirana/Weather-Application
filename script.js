document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const location = document.getElementById('location').value;

    try {
        const response = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, location }),
        });

        if (response.ok) {
            localStorage.setItem('location', location);
            window.location.href = 'weather.html';
        } else {
            const data = await response.json();
            alert(data.errors.map(error => error.msg).join('\n'));
        }
    } catch (err) {
        alert('Error registering user.');
    }
});
