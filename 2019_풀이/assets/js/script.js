const app = {
    data: []
}
const view = {
    cart: function () {
        const carts = getData("cart");

        let total = {
            money: 0,
            cnt: 0
        }
        let html = "";
        carts.forEach(cart => {
            const
                id = cart.id,
                cnt = cart.cnt,
                item = app.data.find(data => data.id == id),
                sum = Number(item.price.replace('원', '')) * cnt;
            console.log(cnt);
            html += `
				<tr data-id=${id}>
                    <td class="albuminfo">
                        <img src="images/${item.albumJaketImage}">
                        <div class="info">
                            <h4>${item.albumName}</h4>
                            <span>
                                <i class="fa fa-microphone"> 아티스트</i> 
                                <p>${item.artist}</p>
                            </span>
                            <span>
                                <i class="fa  fa-calendar"> 발매일</i> 
                                <p>${item.release}</p>
                            </span>
                        </div>
                    </td>
                    <td class="albumprice">
                        ${parseM(item.price)}
                    </td>
                    <td class="albumqty">
                        <input type="number" class="form-control" value="${cnt}">
                    </td>
                    <td class="pricesum">
                        ${parseM(sum)}
                    </td>
                    <td>
                        <button class="btn btn-default deleteCart">
                            <i class="fa fa-trash-o"></i> 삭제
                        </button>
                    </td>
                </tr>
			`;

            total.money += sum;
            total.cnt += cnt;
        })

        $("#myModal tbody").html(html);
        $(".totalprice span").text(parseM(total.money));
        $("[data-target='#myModal']").html(`
			<i class="fa fa-shopping-cart"></i> 쇼핑카트 <strong>${total.cnt}</strong> 개 금액 ${parseM(total.money)}원
		`);
    },
    list() {
        const
            category = getData('category'),
            search = getData('search'),
            cart = getData('cart');

        let html = "";
        for (let i = 0; i < app.data.length; i++) {
            const item = app.data[i];
            if (category !== 'ALL' && category !== item.category) continue;
            if (item.albumName.search(search) === -1 && item.artist.search(search) === -1) continue;

            const
                image = item.albumJaketImage,
                albumName = item.albumName.replace(search, `<b style="background-color: yellow;">${search}</b>`),
                artist = item.artist.replace(search, `<b style="background-color: yellow;">${search}</b>`),
                date = item.release,
                price = parseM(item.price),
                cnt = cart.find(cart => cart.id == item.id)?.cnt;

            html += `
				<div class="col-md-2 col-sm-2 col-xs-2 product-grid" data-id=${item.id}>
                    <div class="product-items">
                            <div class="project-eff">
                                <img class="img-responsive" src="images/${image}" alt="${albumName}">
                            </div>
                        <div class="produ-cost">
                            <h5>${albumName}</h5>
                            <span>
                                <i class="fa fa-microphone"> 아티스트</i> 
                                <p>${artist}</p>
                            </span>
                            <span>
                                <i class="fa  fa-calendar"> 발매일</i> 
                                 
                                <p>${date}</p>
                            </span>
                            <span>
                                <i class="fa fa-money"> 가격</i>
                                <p>${price}</p>
                            </span>
                            <span class="shopbtn">
            `
            if (!cnt) {
                html += `
                                <button class="btn btn-default btn-xs addCart">
                                    <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
                                </button>
				`;
            } else {
                html += `
                                <button class="btn btn-default btn-xs plusCart">
                                    <i class="fa fa-shopping-cart"></i> 추가하기 (${cnt}개)
                                </button>
				`;
            }

            html += `
                            </span>
                        </div>
                    </div>
                </div>
			`
        }
        html ||= '<h3>검색된 앨범이 없습니다.</h3>';
        // view list
        $("#page-inner .contents").html(html);
        // view title
        $("#page-inner h2").text(category);
        // view category select
        for (let i = 0; i < $("#main-menu li:not(.text-center)").length; i++) {
            const elem = $($("#main-menu li:not(.text-center)")[i]);
            elem.find('a').removeClass('active-menu');
            if (elem.find('span').text() === category) {
                elem.find('a').addClass('active-menu');
            }
        }
        // view search value
        $(".search input").val(search);
    },
    category() {
        $("#main-menu li").eq(-1).remove();

        const cateArr = [];
        app.data.forEach(data => {
            if (!cateArr.includes(data.category)) {
                cateArr.push(data.category)
                $("#main-menu").append(`
					<li>
                        <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>${data.category}</span></a>
                    </li>
				`)
            }
            ;
        })
    }
}
const click = {
    category() {
        const category = $(this).find('span').text();
        setData(category, 'category');
        view.list();
    },
    addCart() {
        const id = $(this).parents('.product-grid').attr("data-id");
        const obj = {id, cnt: 1};

        setData(obj, 'cart', true);

        view.list();
        view.cart();
    },
    plusCart() {
        const id = $(this).parents('.product-grid').attr("data-id");
        const arr = getData('cart');

        arr.find(cart => cart.id == id).cnt += 1;

        setData(arr, 'cart');

        view.list();
        view.cart();
    },
    deleteCart() {
        if (!confirm('정말 삭제 하시겠습니까?')) return;

        const id = $(this).parents('tr').attr("data-id");
        const arr = getData('cart')
        const idx = arr.findIndex(cart => cart.id == id);
        arr.splice(idx, 1);

        setData(arr, 'cart');

        view.list();
        view.cart();
    },
    buy() {
        alert('결제가 완료되었습니다.');
        setData([], 'cart');
        view.list();
        view.cart();
        $("#myModal").modal("hide");
    }
}

const search = {
    list(e) {
        const keyword = $(".search input").val();
        setData(keyword, 'search');
        if (e.type === 'keydown' && e.keyCode !== 13) return;
        view.list();
    }
}

const change = {
    cartCnt() {
        const val = $(this).val();
        const id = $(this).parents('tr').attr("data-id");
        const carts = getData('cart');

        if (val < 1) val = 1;

        const cartItem = carts.find(cart => cart.id == id);
        cartItem.cnt = val;

        setData(carts, 'cart');

        view.list();
        view.cart();
    }
}

const getData = (storage) => {
    if (!localStorage[storage]) return null;
    return JSON.parse(localStorage[storage]);
}
const setData = (data, storage, push = false) => {
    let local = getData(storage);
    if (push) local.push(data);
    else local = data;

    localStorage[storage] = JSON.stringify(local);
}
const parseM = (money) => {
    return "\\" + Number(String(money).replace("원", "")).toLocaleString();
}

const init = () => {
    // default localStorage
    if (!getData('category')) setData('ALL', 'category');
    if (!getData('search')) setData('', 'search');
    if (!getData('cart')) setData([], 'cart');
    // fetch json data
    fetch('./music_data.json')
        .then(res => res.json())
        .then(json => {
            app.data = json.data;
            app.data.sort(function (a, b) {
                return Number(b.release.replaceAll('.', "")) - Number(a.release.replaceAll('.', ""));
            })
            app.data.forEach((data, id) => data.id = id);
            view.category();
            view.list();
            view.cart();
        })
    // set event
    setEvent();
}
const setEvent = () => {
    $(document)
        .on("click", "#main-menu li:not(.text-center)", click.category)
        .on("click", ".search button", search.list)
        .on("keydown", ".search input", search.list)
        .on("click", ".addCart", click.addCart)
        .on("click", ".plusCart", click.plusCart)
        .on("click", ".deleteCart", click.deleteCart)
        .on("change", "#myModal tr input", change.cartCnt)
        .on("click", "#myModal > div > div > div.modal-footer > button.btn.btn-primary", click.buy)
}

$(() => {
    init();
})