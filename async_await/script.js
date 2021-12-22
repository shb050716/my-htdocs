$(async function () {
    event();
    pings = [
        await ping_1('ping')
    ];



})

function event() {
    $(document)
        .on('click', '.btn', imgDown)
}

async function imgDown() {
    let find = $(this).parents('.content_box').find('img');
    let imgUrl = find.attr('src');
    const data = await Base64(imgUrl);
    console.log(data);
    $('.url').attr('href', data);
    $('.url').get(0).click();
}

function ping_1(type) {
    return new Promise(res => {
        const img = new Image;
        img.onload = () => {
            res(img);
        }
        img.src = `./map/${type}.png`;
    })
}

async function Base64(url) {
    let location = await fetch('./store_location.json').then(res => res.json())
        .then(e => {
            return new Promise((resolve) => {
                let canvas = $('<canvas>')[0];
                let ctx = canvas.getContext('2d');
                let size;
                let pingSizeX = 75;
                let pingSizeY = 128;
                let image = new Image();
                let ping = new Image();
                    image.onload = async () => {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0);
                    if (url === './map/1.png') {
                        size = 4;
                        pingSizeX = 30;
                        pingSizeY = 50;
                    } else if (url === './map/2.png') {
                        size = 2;
                        pingSizeX = 30 * 2;
                        pingSizeY = 50 * 2
                    } else {
                        size = 1;
                        pingSizeX = 30 * 4;
                        pingSizeY = 50 * 4;

                    }
                    for (let i = 0; i < e[0].length; i++) {
                        ctx.drawImage(pings[0], e[0][i].x / size, e[0][i].y / size, pingSizeX, pingSizeY);
                    }
                    let uri = canvas.toDataURL('image/png');
                    await resolve(uri);
                }
                image.src = url;
                ping.src = './map/ping.png';
            });
        });
    return location;
}

