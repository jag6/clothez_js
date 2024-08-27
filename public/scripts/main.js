import { getUserInfo, getCartItems } from './export/cookies.js';
import { parseRequestUrl } from './export/utils.js';

const { first_name, isAdmin } = getUserInfo();
const { value } = parseRequestUrl();
const cartItems = getCartItems();

//search bar
const searchBar = document.querySelectorAll('.search-form');
searchBar.forEach((form) => {
    form.innerHTML = `
        <input type="text" name="q" value="${value || ''}">
        <button type="submit" aria-label="Search Button"><i class="fa fa-search"></i></button>
    `;
});
searchBar.forEach((form) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    const searchKeyword = document.querySelectorAll('q').value;
    document.location.href = `/search/?q=${searchKeyword}`;
    });
});


//cart details

//header
const headerOther = document.getElementById('header-other');
headerOther.innerHTML = `
    <ul id="user-links" class='user-links'>
        <li>
            <a href='/favorites'>
                <div class='header-cf'>
                    <i class="fa-solid fa-heart"></i>
                </div>
            </a>
        </li>
        <li>
            <a id='cart-icon' href='/cart'>
                <div class='header-cf'>
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>${cartItems.reduce((a, c) => a + c.qty, 0)}</p>
                </div>
            </a>
        </li>
    </ul>
`;

//cart page
if(document.querySelector('#cart-subtotal')) {
    const cartSubTotal = document.getElementById('cart-subtotal');
    cartSubTotal.innerHTML = `
        <h2>
            Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items):
            $${cartItems.reduce((a, c) => a + c.price* c.qty, 0)}
        </h2>
    `;
}

if(document.querySelector('#cart-list-container')) {
    const cartList = document.getElementById('cart-list-container');
    if(cartItems.length === 0) {
        cartList.innerHTML = `
            <h3>Cart is Empty. Click <a href="/"><b>HERE</b></a> to Start Shopping!'</h3?
        `;
    }
    else {
        cartList.innerHTML = `
            ${cartItems.map(item => `
                <li>
                    <ul class="item-details">
                        <li>
                            <a href="/listing/${item.slug}"}>
                                <div class="cart-img">
                                    <img src="/images/${item.image_main}" alt="${item.name}">
                                </div>
                            </a>
                        </li>
                        <li class="cart-name">
                            <a href="/listing/${item.slug}"}>${item.name}</a>
                        </li>
                        <li>
                            Qty: 
                            <select class="qty-select" id="">
                                ${
                                    [...Array(item.count_in_stock).keys()].map((x) => item.qty === x + 1
                                    ? `<option selected value="${x + 1}">${x + 1}</option>`
                                    : `<option value="${x + 1}">${x + 1}</option>`
                                )}
                            </select>
                            <button type="button" class="delete-btn" id="">
                            Delete</button>
                        </li>
                        <li class="cart-price">
                            $${item.price}
                        </li>
                    </ul>
                </li>
                `).join('\n')
            }
        `;
    }
}


//user details
const userLinks = document.getElementById('user-links');
const dashboardLink = document.createElement('li');
const registerLink = document.createElement('li');
const loginLink = document.createElement('li');

if(isAdmin == 'true') {
    dashboardLink.innerHTML = `
        <a href='/admin/dashboard'>
            <div class='header-cf'>
                <i class="fa-solid fa-user"></i>
            </div>
        </a>
    `;
    userLinks.insertBefore(dashboardLink, userLinks.children[0]);
}else if(isAdmin == 'false') {
    dashboardLink.innerHTML = `
        <a href='/users/profile'>
            <div class='header-cf'>
                <i class="fa-solid fa-user"></i>
            </div>
        </a>
    `;
    userLinks.insertBefore(dashboardLink, userLinks.children[0]);
}else {
    registerLink.innerHTML = `
        <a href='/users/register'>REGISTER</a>
    `;
    loginLink.innerHTML = `
        <a href='/users/login'>LOGIN</a>
    `;
    userLinks.insertBefore(registerLink, userLinks.children[0]);
    userLinks.insertBefore(loginLink, userLinks.children[1]);
}


//user dashboard
if(document.querySelector('#dashboard-header')) {
    const userName = document.getElementById('dashboard-header');
    userName.innerHTML = `
        <h1>Welcome ${first_name}</h1>
    `;
}


//toggle dashboard menu
const dashPU = document.getElementById('dashboard-popup');
const dashMenu = document.getElementById('dashboard-menu');
const dashOverlay = document.getElementById('dashboard-overlay');
const sidebar = document.getElementById('sidebar-container');
const sidebarOBtn = document.getElementById('sidebar-open-btn');
const sidebarCBtn = document.getElementById('sidebar-close-btn');
const body = document.querySelector('body');

if(dashPU) {
    dashPU.addEventListener('click', () => {
        //close dashboard menu if open
        if(dashMenu.style.display === 'flex') {
            dashMenu.style.display = 'none';
            dashOverlay.style.display = 'none';
            body.style.overflowY = 'auto';
        //open dashboard menu
        }else {
            dashMenu.style.display = 'flex';
            dashOverlay.style.display = 'flex';
            body.style.overflowY = 'hidden';
        }
    });
    window.addEventListener('click', (e) => {
        if(e.target == dashOverlay) {
            dashMenu.style.display = 'none';
            dashOverlay.style.display = 'none';
            body.style.overflowY = 'auto';
        }
    });
}


//toggle sidebar
sidebarOBtn.addEventListener('click', () => {
    //close sidebar if open
    if(sidebar.style.display === 'flex') {
        sidebar.style.display = 'none';
        body.style.overflowY = 'auto';
    }else {
        //open sidebar
        sidebar.style.display = 'flex';
        body.style.overflowY = 'hidden';
        //close dashboard menu if sidebar is open
        if(dashPU) {
            dashPU.style.display = 'none';
            dashMenu.style.display = 'none';
            dashOverlay.style.display = 'none';
            body.style.overflowY = 'hidden';
        }
    }
});
sidebarCBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';  
    body.style.overflowY = 'auto';
    if(dashPU) {
        dashPU.style.display = 'flex';
    }
});
window.addEventListener('click', (e) => {
    if(e.target == sidebar) {
        sidebar.style.display = 'none';
        body.style.overflowY = 'auto';
        if(dashPU) {
            dashPU.style.display = 'flex';
        }
    }
});


//chatbox
const openPU = document.getElementById('open-popup');
const chatPU = document.getElementById('chat-popup');
const closePU = document.getElementById('close-popup');

openPU.addEventListener('click', () => {
    chatPU.style.display = 'flex';
    openPU.style.display = 'none';
});
closePU.addEventListener('click', () => {
    chatPU.style.display = 'none';
    openPU.style.display = 'flex';
});

if(isAdmin) {
    openPU.style.display = 'none';
}

if(document.querySelector('.listings-header')) {
    const header = document.querySelector('.listings-header');
    header.style.width = 'none';
}