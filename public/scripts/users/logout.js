import { clearUser } from '../export/cookies';

document.getElementById('logout').addEventListener('click', () => {
    clearUser();
    location.href = '/users/login';
});