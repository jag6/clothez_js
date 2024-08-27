//CART INFO

export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
    return cartItems;
};

export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};


//USER INFO

export const setUserInfo = ({
    _id = '',
    first_name = '',
    last_name = '',
    email = '',
    password = '',
    token = '',
    isAdmin = false
}) => {
    localStorage.setItem('userInfo', JSON.stringify({
        _id,
        first_name,
        last_name,
        email,
        password,
        token,
        isAdmin
    }));
};

export const getUserInfo = () => {
    return localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }
};

export const clearUser = () => {
    localStorage.removeItem('userInfo');
};