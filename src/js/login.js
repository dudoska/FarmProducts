const openLoginBtn = document.getElementById('openLogin');
const loginModal = document.getElementById('login');
const registerModal = document.getElementById('register');
const toRegisterBtn = document.getElementById('toRegisterBtn');
const toLoginBtn = document.getElementById('toLoginBtn');
const closeBtns = document.querySelectorAll('.close-btn');

const regEmail = document.getElementById('regEmail');
const regPass = document.getElementById('regPass');
const regSubmit = document.getElementById('regSubmit');

const loginEmail = document.getElementById('loginEmail');
const loginPass = document.getElementById('loginPass');
const loginSubmit = document.getElementById('loginSubmit');

const isLogged = sessionStorage.getItem("isLogged");

window.addEventListener("load", () => {
    if (isLogged !== null) {
        openLoginBtn.style = "background-image: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 45 45' xmlns='http://www.w3.org/2000/svg' width='45' height='45' fill='none'%3E%3Cpath d='M45 22.5C45 28.5388 42.6208 34.0221 38.7488 38.0634C34.6534 42.3384 28.8874 45 22.5 45C16.1126 45 10.3466 42.3384 6.25124 38.0634C2.37918 34.022 0 28.5388 0 22.5C0 10.0737 10.0737 0 22.5 0C34.9263 0 45 10.0737 45 22.5Z' fill='rgb(255,249,240)' fill-rule='nonzero'/%3E%3Ccircle cx='22.4999428' cy='14.5156898' r='9.19183731' fill='rgb(68,115,75)'/%3E%3Cpath d='M37.9864 36.2031C37.8062 36.4068 37.6219 36.6071 37.4335 36.8036C33.6696 40.7326 28.3705 43.1787 22.5 43.1787C16.6296 43.1787 11.3304 40.7326 7.56652 36.8036C7.37824 36.6072 7.19388 36.4068 7.01367 36.2031C9.78374 30.4388 15.6774 26.4597 22.5 26.4597C29.3226 26.4597 35.2164 30.4389 37.9864 36.2031Z' fill='rgb(68,115,75)' fill-rule='nonzero'/%3E%3C/svg%3E\");"
    }
});

openLoginBtn.addEventListener('click', (e) => {
    if (isLogged === null) {
        e.preventDefault();
        loginModal.classList.add('active');
    } else {
        sessionStorage.clear();
        location.reload();
    }
});
toRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); loginModal.classList.remove('active'); registerModal.classList.add('active'); });
toLoginBtn.addEventListener('click', (e) => { e.preventDefault(); registerModal.classList.remove('active'); loginModal.classList.add('active'); });
closeBtns.forEach(btn => btn.addEventListener('click', () => { loginModal.classList.remove('active'); registerModal.classList.remove('active'); }));

const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

regSubmit.addEventListener('click', () => {
    const email = regEmail.value.trim();
    const pass = regPass.value.trim();

    if (!email || !pass) return alert('Заполните все поля!');

    const users = getUsers();

    if (users.find(u => u.email === email)) {
        return alert('Пользователь с такой почтой уже существует!');
    }

    users.push({ email, pass });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Регистрация успешна! Теперь вы можете войти.');
    registerModal.classList.remove('active');
    loginModal.classList.add('active');

    regEmail.value = '';
    regPass.value = '';
});

loginSubmit.addEventListener('click', () => {
    const email = loginEmail.value.trim();
    const pass = loginPass.value.trim();

    const users = getUsers();

    const user = users.find(u => u.email === email && u.pass === pass);

    if (user) {
        alert(`Добро пожаловать, ${email}!`);
        sessionStorage.setItem('isLogged', 'true');
        loginModal.classList.remove('active');

        loginEmail.value = '';
        loginPass.value = '';

        location.reload();
    } else {
        alert('Неверная почта или пароль!');
    }
});