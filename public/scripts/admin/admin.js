import { apiUrl, getUrl } from '../export/config.js';
import { getUserInfo } from '../export/cookies.js';
import { showMessage } from '../export/utils.js';

//dashboard menu
const dashboardMenu = {
    render: (props) => {
        return `
            <ul>
                <li class="${props.selected === 'dashboard' ? 'selected' : ''}">
                    <a href="/admin/dashboard"><span><i class="fa-solid fa-chart-simple"></i></span>Overview</a>
                </li> 
                <li class="${props.selected === 'users' ? 'selected' : ''}">
                    <a href="/admin/users-list"><span><i class="fa-solid fa-users"></i></span>Users</a>
                </li> 
                <li class="${props.selected === 'orders' ? 'selected' : ''}">
                    <a href="/admin/orders-list"><span><i class="fa-solid fa-list-ul"></i></span>Orders</a>
                </li> 
                <li class="${props.selected === 'listings' ? 'selected' : ''}">
                    <a href="/admin/listings-list"><span><i class="fa-solid fa-box"></i></span>Listings</a>
                </li> 
                <li class="${props.selected === 'banners' ? 'selected' : ''}">
                    <a href="/admin/banners-list"><span><i class="fa-solid fa-images"></i></span>Banners</a>
                </li> 
                <li class="${props.selected === 'profile' ? 'selected' : ''}">
                    <a href="/admin/profile"><span><i class="fa-solid fa-address-card"></i></span>Profile</a>
                </li> 
            </ul>
        `;
    }
};

if(getUrl == `${apiUrl}/admin/dashboard`){
    document.getElementById('dashboard-menu').innerHTML = `${dashboardMenu.render({selected: 'dashboard'})}`;
}else if(getUrl == `${apiUrl}/admin/order-list`){
    document.getElementById('dashboard-menu').innerHTML = `${dashboardMenu.render({selected: 'orders'})}`;
}else if(getUrl == `${apiUrl}/admin/user-list`){
    document.getElementById('dashboard-menu').innerHTML = `${dashboardMenu.render({selected: 'users'})}`;
}else if(getUrl == `${apiUrl}/admin/listings-list`){
    document.getElementById('dashboard-menu').innerHTML = `${dashboardMenu.render({selected: 'listings'})}`;
}else if(getUrl == `${apiUrl}/admin/banners-list`){
    document.getElementById('dashboard-menu').innerHTML = `${dashboardMenu.render({selected: 'banners'})}`;
}else if(getUrl == `${apiUrl}/admin/profile`){
    document.getElementById('dashboard-menu').innerHTML = `${dashboardMenu.render({selected: 'profile'})}`;
}


//create new listing
if(document.querySelector('#create-btn')) {
    //open and close create listing container
    const createListingBtn = document.getElementById('create-btn');
    const containerOverlay = document.getElementById('container-overlay');
    const closeListingCont = document.querySelector('.dashboard-form-close-btn');
    const body = document.querySelector('body');
        
    createListingBtn.addEventListener('click', () => {
        containerOverlay.style.display = 'flex';
        body.style.overflowY = 'hidden';
    });

    closeListingCont.addEventListener('click', () => {
        containerOverlay.style.display = 'none';
        body.style.overflowY = 'auto';
    });

    //post new listing
    const newListing = async ({ name, description, gender, category, type, image_main, image_1, image_2, image_3, image_4, price, count_in_stock }) => {
        try {
            const { token } = getUserInfo();
            const response = await axios ({
                url: `${apiUrl}/admin/listings-list`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    name, description, gender, category, type, image_main, image_1, image_2, image_3, image_4, price, count_in_stock
                }
            });
            if(response.statusText !== 'Created') {
                throw new Error(response.data.message);
            }
            return response.data;
        }catch(err) {
            console.log(err);
            return { error: err.response.data.message || err.message };
        }
    };
    
    if(document.querySelector('#new-listing-form')) {
        document.getElementById('new-listing-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = await newListing({
                name: document.getElementById('name').value, 
                description: document.getElementById('description').value, 
                gender: document.getElementById('gender').value, 
                category: document.getElementById('category').value, 
                type: document.getElementById('type').value, 
                image_main: document.getElementById('image_main').value, 
                image_1: document.getElementById('image_1').value, 
                image_2: document.getElementById('image_2').value, 
                image_3: document.getElementById('image_3').value, 
                image_4: document.getElementById('image_4').value, 
                price: document.getElementById('price').value, 
                count_in_stock: document.getElementById('count_in_stock').value
            });
            if(data.error) {
                showMessage(data.error);
            }else {
                location.href = '/admin/listings-list';
            }
        });
    }
}


//upload images
if(document.querySelector('#create-edit-hidden')) {
    const uploadImageMain = async (formData) => {
        try {
            const { token } = getUserInfo();
            const response = await axios ({
                url: `${apiUrl}/upload/image_main`,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
                data: formData
            });
            if(response.statusText !== 'Created') {
                throw new Error(response.data.message);
            }
            return response.data;
        }catch(err) {
            console.log(err);
            return { error: err.response.data.message || err.message };
        }
    }

    //upload image_main
    document.getElementById('image_file_main').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image_main', file);
        const data = await uploadImageMain(formData);
        if(data.error) {
            showMessage(data.error);
        }else {
            document.getElementById('image_main').value = data.image_main;
        }
    });

    //upload image_1-4
    if(document.querySelector('#image_file_1')) {
        const uploadImage1 = async (formData) => {
            try {
                const { token } = getUserInfo();
                const response = await axios ({
                    url: `${apiUrl}/upload/image_1`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                    data: formData
                });
                if(response.statusText !== 'Created') {
                    throw new Error(response.data.message);
                }
                return response.data;
            }catch(err) {
                console.log(err);
                return { error: err.response.data.message || err.message };
            }
        }
        const uploadImage2 = async (formData) => {
            try {
                const { token } = getUserInfo();
                const response = await axios ({
                    url: `${apiUrl}/upload/image_2`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                    data: formData
                });
                if(response.statusText !== 'Created') {
                    throw new Error(response.data.message);
                }
                return response.data;
            }catch(err) {
                console.log(err);
                return { error: err.response.data.message || err.message };
            }
        }
        const uploadImage3 = async (formData) => {
            try {
                const { token } = getUserInfo();
                const response = await axios ({
                    url: `${apiUrl}/upload/image_3`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                    data: formData
                });
                if(response.statusText !== 'Created') {
                    throw new Error(response.data.message);
                }
                return response.data;
            }catch(err) {
                console.log(err);
                return { error: err.response.data.message || err.message };
            }
        }
        const uploadImage4 = async (formData) => {
            try {
                const { token } = getUserInfo();
                const response = await axios ({
                    url: `${apiUrl}/upload/image_4`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                    data: formData
                });
                if(response.statusText !== 'Created') {
                    throw new Error(response.data.message);
                }
                return response.data;
            }catch(err) {
                console.log(err);
                return { error: err.response.data.message || err.message };
            }
        }

        document.getElementById('image_file_1').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image_1', file);
            const data = await uploadImage1(formData);
            if(data.error) {
                showMessage(data.error);
            }else {
                document.getElementById('image_1').value = data.image_1;
            }
        });
        document.getElementById('image_file_2').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image_2', file);
            const data = await uploadImage2(formData);
            if(data.error) {
                showMessage(data.error);
            }else {
                document.getElementById('image_2').value = data.image_2;
            }
        });
        document.getElementById('image_file_3').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image_3', file);
            const data = await uploadImage3(formData);
            if(data.error) {
                showMessage(data.error);
            }else {
                document.getElementById('image_3').value = data.image_3;
            }
        });
        document.getElementById('image_file_4').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image_4', file);
            const data = await uploadImage4(formData);
            if(data.error) {
                showMessage(data.error);
            }else {
                document.getElementById('image_4').value = data.image_4;
            }
        });
    }
}


//edit listing
if(document.querySelector('#edit-listing-container')) {
    const editlisting = async ({ name, description, gender, category, type, image_main, image_1, image_2, image_3, image_4, price, count_in_stock }) => {
        try {
            const { token } = getUserInfo();
            const response = await axios ({
                url: `${getUrl}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    name, description, gender, category, type, image_main, image_1, image_2, image_3, image_4, price, count_in_stock
                }
            });
            if(response.statusText !== 'OK') {
                throw new Error(response.data.message);
            }
            return response.data;
         }catch(err) {
            console.log(err);
            return { error: err.response.data.message || err.message };
         }
    };

    document.getElementById('edit-listing-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = await editlisting({
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            gender: document.getElementById('gender').value, 
            category: document.getElementById('category').value, 
            type: document.getElementById('type').value, 
            image_main: document.getElementById('image_main').value, 
            image_1: document.getElementById('image_1').value, 
            image_2: document.getElementById('image_2').value, 
            image_3: document.getElementById('image_3').value, 
            image_4: document.getElementById('image_4').value, 
            price: document.getElementById('price').value, 
            count_in_stock: document.getElementById('count_in_stock').value
        });
        if(data.error) {
            showMessage(data.error);
        }else {
            location.href = '/admin/listings-list';
        }
    });
}


//delete listing
if(document.querySelectorAll('.delete-btn')) {
    const deletelisting = async () => {
        try {
            const { token } = getUserInfo();
            const response = await axios ({
                url: `${getUrl}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.statusText !== 'OK') {
                throw new Error(response.data.message);
            }
            return response.data;
        }catch(err) {
            return { error: err.response.data.message || err.message };
        }
    };

    const deleteBtn = document.querySelectorAll('.delete-btn');
    deleteBtn.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            if(!confirm('Are you sure you want to delete this listing?')) {
                e.preventDefault();
            }else {
                const data = await deletelisting(deleteBtn.id);
                if(data.error) {
                    showMessage(data.error);
                }else {
                    location.href = '/admin/listings-list';
                }
            }
        });
    });
}


//create new banner
if(document.querySelector('#new-banner-form')) {
    const newBanner = async ({ image_main, image_description, text }) => {
        try {
            const { token } = getUserInfo();
            const response = await axios ({
                url: `${apiUrl}/admin/banners-list`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    image_main, image_description, text
                }
            });
            if(response.statusText !== 'Created') {
                throw new Error(response.data.message);
            }
            return response.data;
        }catch(err) {
            console.log(err);
            return { error: err.response.data.message || err.message };
        }
    };

    document.getElementById('new-banner-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = await newBanner({
            image_main: document.getElementById('image_main').value,
            image_description: document.getElementById('image_description').value,
            text: document.getElementById('text').value
        });
        if(data.error) {
            showMessage(data.error);
        }else {
            location.href = '/admin/banners-list';
        }
    });
}


//edit banner 
if(document.querySelector('#edit-banner-container')) {
    const editBanner = async ({ image_main, image_description, text }) => {
        try {
            const { token } = getUserInfo();
            const response = await axios ({
                url: `${getUrl}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    image_main, image_description, text
                }
            });
            if(response.statusText !== 'OK') {
                throw new Error(response.data.message);
            }
            return response.data;
        }catch(err) {
            console.log(err);
            return { error: err.response.data.message || err.message };
        }
    }

    document.getElementById('edit-banner-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = await editBanner({
            image_main: document.getElementById('image_main').value,
            image_description: document.getElementById('image_description').value,
            text: document.getElementById('text').value
        });
        if(data.error) {
            showMessage(data.error);
        }else {
            location.href = '/admin/banners-list';
        }
    });
}