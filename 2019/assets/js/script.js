let json_data = [];
let keyword = null;
let val = '';
let a = [];
let cnt = 1;


function c(e, a) {
    console.log(e, a);
    if (a) {
        console.log(a);
    } else {
        console.log('sad');
    }
}

function menuClick() {
    $('#main-menu li a').removeClass('active-menu');
    $(this).addClass('active-menu');
    keyword = $('.active-menu')[0].innerText;
    keyword = $.trim(keyword);
    $.ajax({
        url: './music_data.json',
        success: function (res) {
            write();
            console.log(res);
        }
    })
}

function write() {
    json_data.data.sort(function (a, b) {
        var a_release = new Date(a.release).getTime();
        var b_release = new Date(b.release).getTime();
        return b_release - a_release;
    })
    var html = ``;
    for (var i = 0; i < json_data.data.length; i++) {
        let check = true;
        let str = json_data.data[i].albumName + json_data.data[i].artist;
        let albumName = json_data.data[i].albumName.replace(val, `<b style = "background-color : yellow" >${val}</b>`);
        let artist = json_data.data[i].artist.replace(val, `<b style = "background-color : yellow" >${val}</b>`);
        if (json_data.data[i].category !== keyword) check = false;
        if (keyword == null) check = true;

        if (str === str.replace(val, '') && keyword === 'ALL') {
            check = false;
        }

        if (keyword === 'ALL') {
            check = true;
        }

        if (str.indexOf(val) === -1) {
            check = false;
        }

        if (check === false) continue;
        html +=
            `<div class="col-md-2 col-sm-2 col-xs-2 product-grid">
                            <div class="product-items" data-id="${i}">
                                    <div class="project-eff">
                                        <img class="img-responsive" src="images/${json_data.data[i].albumJaketImage}" alt="${json_data.data[i].albumName}">
                                    </div>
                                <div class="produ-cost">
                                    <h5>${albumName}</h5>
                                    <span>
                                        <i class="fa fa-microphone"> 아티스트</i>
                                        <p>${artist}</p>
                                    </span>
                                    <span>
                                        <i class="fa  fa-calendar"> 발매일</i>
                                        <p>${json_data.data[i].release}</p>
                                    </span>
                                    <span>
                                        <i class="fa fa-money"> 가격</i>
                                        <p>${json_data.data[i].price}</p>
                                    </span>
                                    <span class="shopbtn">`
        let add_cart = JSON.parse(localStorage.data);
        let find = [];
        add_cart.forEach(e => {
            if (e.id == i) {
                find = e;
            }
        });
        if (!find.cnt) {
            html += `<button class="btn btn-default btn-xs">
                                            <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
                                        </button>`
        } else if (find.id == i) {
            html += `<button class="btn btn-default btn-xs">
                                            <i class="fa fa-shopping-cart"></i> 추가하기(${find.cnt})개
                                        </button>`
        }
        html += `</span>
                                </div>
                            </div>
                        </div>`
    }
    $('.contents').html(html);
    view();
}

function view() {
    let shopping_cart = ``;
    let totalPrice_html = ``;
    let shopping_num = ``;
    let totalPrice = 0;
    let cnt_result = 0;
    let cart = getData('data');
    cart.forEach(ele => {
        let id = ele.id;
        let cnt = ele.cnt;
        let idData = json_data.data[id];
        let money = parseInt(idData.price) * ele.cnt;
        shopping_cart += ` <tr data-id = "${id}">
                    <td class="albuminfo">
                        <img src="./images/${idData.albumJaketImage}">
                        <div class="info">
                            <h4>${idData.albumName}</h4>
                            <span>
                                <i class="fa fa-microphone"> 아티스트</i>
                                <p>${idData.artist}</p>
                            </span>
                            <span>
                                <i class="fa  fa-calendar"> 발매일</i>
                                <p>${idData.release}</p>
                            </span>
                        </div>
                    </td>
                    <td class="albumprice">
                        ￦ ${idData.price}
                    </td>
                    <td class="albumqty">
                        <input type="number" class="form-control" value="${cnt}" min ="1">
                    </td>
                    <td class="pricesum">
                        ￦ ${money}
                    </td>
                    <td>
                        <button class="btn btn-default">
                            <i class="fa fa-trash-o"></i> 삭제
                        </button>
                    </td>
                    </tr>`;
        cnt_result += ele.cnt;
        totalPrice += money;
    })
    shopping_num += `<i class="fa fa-shopping-cart"></i> 쇼핑카트 <strong>${cnt_result}</strong> 개 금액 ￦ ${totalPrice}원`;
    totalPrice_html = ` <div class="totalprice text-right">
                                <h3>총 합계금액 : <span>￦${totalPrice}</span> 원</h3>
                            </div>`;
    $('tbody').html(shopping_cart);
    $('.totalprice').html(totalPrice_html);
    $('#wrapper .panel-body > button').html(shopping_num);
}

function buttonClick() {
    let parent = $(this).parents('.product-items');
    let id = parent.attr('data-id');
    let obj = {id: id, cnt: cnt};
    let check = true;

    let get_data = getData('data');

    var store = JSON.parse(localStorage.data);
    store.forEach(ele => {
        if (ele.id === id) {
            check = false;
        }
    });

    if (check === true) {
        setData(obj, 'data', true);
    } else {
        let find = get_data.find(e => {
            if (e.id === obj.id) {
                e.cnt += 1;
            }
        });
        setData(get_data, 'data');
    }
    write();
    view();
}

function deleteCilck() {
    let id = $(this).parents('tr').attr('data-id');
    let data = JSON.parse(localStorage.data);
    let cnt = 0;
    data.forEach(e => {
        if (e.id === id) {
            data.splice(cnt, 1);
        }
        cnt++;
    })
    localStorage.data = JSON.stringify(data);
    view();
    write();
}


function search(e) {
    val = $('.search input').val();
    console.log(val);
    $.ajax({
        url: './music_data.json',
        success: function (res) {
            write(res);
        }
    });
}

function changevalue() {
    let id = $(this).parents('tr').attr('data-id');
    let value = $(this).val();
    let changeData = getData('data');
    changeData.forEach(e => {
        if (e.id === id) {
            if (value > e.cnt) {
                e.cnt += 1;
            } else if (value < e.cnt) {
                e.cnt -= 1;
            }

        }
    });
    setData(changeData, 'data');

    view();

}

function payment() {
    localStorage.data = JSON.stringify([]);
    view();
    write();
}


function event() {
    $(document)
        .on("click", "#main-menu li a", menuClick)
        .on("click", '.product-items button', buttonClick)
        .on("click", '#myModal tbody button', deleteCilck)
        .on("change", '.albumqty input', changevalue)
        .on("click", ".search button", search)
        .on("click", ".modal-footer .btn-primary", payment)

}

function menuWrite(res) {
    var a = [];
    for (var i = 0; i < res.data.length; i++) {
        var object = res.data[i].category;
        a.push(object);
    }
    a.sort();
    var arr = [];
    var check = '';
    for (i = 0; i < a.length; i++) {
        if (check == '' || check != a[i]) {
            arr.push(a[i]);
            check = a[i];
        }
    }
    var text = ``;
    for (var i = 0; i < arr.length; i++) {
        text += ` <li>
                <a href="#"><i class="fa fa-youtube-play fa-2x"></i>
                <span>${arr[i]}</span></a>
                </li>  `
    }
    $('#main-menu').append(text)

}

$(function () {
    $.ajax({
        url: './music_data.json',
        success: function (res) {
            res.data.sort(function (a, b) {
                var a_release = new Date(a.release).getTime();
                var b_release = new Date(b.release).getTime();
                return b_release - a_release;
            });
            json_data = res;
            write();
            menuWrite(res);
        }
    });
    event();
})

// const data = [
//     {id: 1},2,5,9
// ];
// const text = JSON.stringify(data);
//
// console.log(JSON.stringify(data));
// console.log(JSON.parse(text));
const getData = (storage) => {
    if (!localStorage[storage]) return null;
    return JSON.parse(localStorage[storage]);
}


//setData({asnflkjasnf},'data',true)
const setData = (data, storage, push = false) => {
    let local = getData(storage);
    //3번쨰 인자가 트루일때
    if (push) local.push(data);

    else local = data;

    localStorage[storage] = JSON.stringify(local);
}

//data는 객체 또는 배열

//data =[1,2] ,data , ture 'a'
//data ={id:1 , cnt:1},data ,true // push
//data = [{id:1 , cnt:2}] ,data


$(function () {
    var local = getData('data')
    if (local === null || local === undefined) {
        setData([], 'data');
    }
    // view();
    // let check = true;
    // if (a.length === 0) {
    //     check = true;
    // }
    // if (a === []) {
    //     a.push({id: id, cnt: cnt});
    // }
    // if (a.length !== 0) {
    //     check = false;
    // }
    // if (check === false) {
    //     return;
    // }
    // if (check === true) {
    //     setData(a, 'data');
    // }
})
