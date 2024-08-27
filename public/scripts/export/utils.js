export const parseRequestUrl = () => {
    const address = document.location.href.slice(1).split('?')[0];
    const queryString = document.location.href.slice(1).split('?').length === 2 
        ? document.location.href.slice(1).split('?')[1]
        : '';
    const url =address.toLowerCase() || '/';
    const r = url.split('/');
    const q = queryString.split('=');
    return {
        resource: r[1], 
        id: r[2],
        verb: r[3],
        name: q[0],
        value: q[1]
    };
};

export const showMessage = (message, callback) => {
    document.getElementById('message-overlay').innerHTML =
    `
        <div>
            <div id="message-overlay-content">
                <p>${message}</p>
            </div>
            <button id="message-overlay-close-btn" class="message-overlay-close-btn">OK</button>
        </div>
    `;
    document.getElementById('message-overlay').classList.add('active');
    document.getElementById('message-overlay-close-btn').addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active');
        if(callback) {
            callback();
        }
    });
};