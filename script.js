const form = document.querySelector('form');
const pass_error = document.querySelector('#passerror');
const confirm_pass_error = document.querySelector('#confirm_passerror');
const name_error = document.querySelector('#namerror');
const submit = document.querySelector('#submit_message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let is_ok = true;

    // Clear previous error messages and submit message
    name_error.textContent = '';
    pass_error.textContent = '';
    confirm_pass_error.textContent = '';
    submit.textContent = '';

    // Get form data
    const formData = new FormData(e.target);
    const data = {
        username: formData.get('username'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password')
    };

    // Username validation
    if (data.username) {
        if (data.username.length < 3) {
            is_ok = false;
            name_error.textContent = 'Username must be at least 3 characters long';
        }
    } else {
        is_ok = false;
        name_error.textContent = 'Username is required';
    }

    // Password validation
    if (data.password) {
        if (data.password.length < 8) {
            is_ok = false;
            pass_error.textContent = 'Password must be at least 8 characters long';
        }
        // Password strength validation (optional, can be improved)
        else if (!/[A-Za-z]/.test(data.password) || !/\d/.test(data.password)) {
            is_ok = false;
            pass_error.textContent = 'Password must contain letters and numbers';
        }
    } else {
        is_ok = false;
        pass_error.textContent = 'Password is required';
    }

    // Confirm password validation
    if (data.password !== data.confirm_password) {
        is_ok = false;
        confirm_pass_error.textContent = 'Passwords do not match';
    }

    // If all validations pass, show success
    if (is_ok) {
        form.reset();
        submit.textContent = 'Signup successful!';
        setTimeout(() => {
            submit.textContent = ''; // Clear success message after a few seconds
        }, 3000);
    } else {
        // Focus the first invalid field to improve UX
        if (!is_ok) {
            if (name_error.textContent) {
                document.querySelector('#username').focus();
            } else if (pass_error.textContent) {
                document.querySelector('#password').focus();
            } else if (confirm_pass_error.textContent) {
                document.querySelector('#confirm_password').focus();
            }
        }
    }
});
