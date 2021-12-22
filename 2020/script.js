let json = [];
let a = [];
let b = [];

$(function () {

    let list_local = getData('data');
    let buy_local = getData('buy');
    if (list_local === null || list_local === undefined) {
        localStorage.data = JSON.stringify([]);
    }
    if (buy_local === null || buy_local === undefined) {
        localStorage.buy = JSON.stringify([]);
    }
    $.ajax({
        url: "./B모듈 선수제공파일/store/store.json",
        success: function (res) {
            json = res;
            viewList();
            Drag_Drop();
            cart_list();
            event();
        }
    });
});

function event() {
    $(document)
        .on('change', '.change input', changeValue)
        .on('click', '.delete input', Delete_cart)
        .on('click', '.modal-footer .btn-primary', buy_warning)
        .on('keyup keydown', '.search', viewList)

}

const getData = (storage) => {
    if (!localStorage[storage]) return null;
    return JSON.parse(localStorage[storage]);
}

function listSearch(target, search) {
            let arrSearch = search.split("");
            let regExp = "";
            for (let i = 0; i < arrSearch.length; i++){
                let keyword = arrSearch[i];
                switch(keyword){
                    case'ㄱ':
                        regExp += '[가-깋]';
                        break;
                    case'ㄴ':
                        regExp += '[나-닣]';
                        break;
                    case'ㄷ':
                        regExp += '[다-딯]';
                        break;
                    case'ㄹ':
                        regExp += '[라-맇]';
                        break;
                    case'ㅁ':
                        regExp += '[마-밓]';
                        break;
                    case'ㅂ':
                        regExp += '[바-빟]';
                        break;
                    case'ㅅ':
                        regExp += '[사-싷]';
                        break;
                    case'ㅇ':
                        regExp += '[아-잏]';
                        break;
                    case'ㅈ':
                        regExp += '[자-짛]';
                        break;
                    case'ㅊ':
                        regExp += '[차-칳]';
                        break;
                    case'ㅋ':
                        regExp += '[카-킿]';
                        break;
                    case'ㅌ':
                        regExp += '[타-팋]';
                        break;
                    case'ㅍ':
                        regExp += '[파-핗]';
                        break;
                    case'ㅎ':
                        regExp += '[하-힣]';
                        break;
                    default:
                        regExp+=`[${keyword}]`
                        break;
                }
            }
            if(target.search(regExp) >= 0){
                return regExp;
            }else{
                return false;
            }
        }

function viewList() {
    let searchVal = $(".search").val();
    let list = "";

    for (let i = 0; i < json.length; i++) {

        let listName = listSearch(json[i].product_name, searchVal);
        let listBrand = listSearch(json[i].brand, searchVal);

        let c = new RegExp(listName, 'i');
        let d = new RegExp(listBrand, 'i');

        if( listName === false && listBrand === false)continue;
        let a = json[i].product_name.replace(c, `<span class="higthlight">${json[i].product_name.match(c)}</span>`);
        let b = json[i].brand.replace(d, `<span class="higthlight">${json[i].brand.match(d)}</span>`);

        list += `
                <div class="marge" data-id="${i}">
                <img src="./B모듈 선수제공파일/store/상품사진/${json[i].photo}" alt="">
                <div class= "img_textbox">
                    <h3>상품명 : ${json[i].brand}</h3>
                    <p>브랜드 명 : ${json[i].product_name}</p>
                 <p>가격 : ${json[i].price.toString()} 원</p>
                </div>
</div>`;

    }
    $('.list-g').html(list);

}

function list_localstorage() {
    let getData = JSON.parse(localStorage.data);
    if (localStorage.data) {
        a = getData;
    }
    let id = $('.ui-draggable-dragging')[0].attributes[1].value;
    let local = {id: id, cnt: 1};
    let check = true;
    if (!a.id || a.id === id) {
        check = true;
    } else {
        check = false;
    }
    if (check === false) {
        return;
    }
    // a.forEach(e => {
    //     if (e.id === id) {
    //         e.cnt += 1;
    //     }
    // })
    // localStorage.data = JSON.stringify(a);
    if (check === true) {
        let arr_check = true;
        let get_data = JSON.parse(localStorage.data);
        a.forEach(e => {
            if (get_data.length === 0) {
                arr_check = true;
            } else if (e.id === id) {
                alert('이미 장바구니에 담긴 상품입니다.');
                arr_check = false;
            }
        })
        if (arr_check === false) {
            return;
        }
        if (arr_check === true) {
            a.push(local);
        }
        localStorage.data = JSON.stringify(a);
        buy_localstorage();
    }
}

function cart_list() {
    let shopping_cart = ``
    let cnt_result = 0;
    const a_data = JSON.parse(localStorage.data);
    a_data.forEach(e => {
        let id = e.id;
        let cnt = e.cnt;
        let Data = json[id];
        let result = parseInt(Data.price.replace(/,/g, '')) * e.cnt;
        shopping_cart += `<tr data-id = "${id}">
                    <td><img src="./B모듈 선수제공파일/store/상품사진/${Data.photo}" alt=""></td>
                    <td>${Data.brand}</td>
                    <td>${Data.product_name}</td>
                    <td>${Data.price.toString()} 원</td>
                    <td class = "change" colspan ='2'><input type="number" value = "${cnt}" min = "1"></td>
                    <td class = "delete">${result.toString()} 원 <input type="button" value = "삭제"></td>
                </tr>`
        cnt_result += cnt;
    })
    $('.ta tbody').html(shopping_cart);
    $('.buy p').html(`<p>총합계 : ${cnt_result}</p>`);
}

function changeValue() {
    let id = $(this).parents('tr').attr('data-id');
    let val = $(this).val();
    a.forEach(e => {
        if (e.id === id) {
            if (val > e.cnt) {
                e.cnt += 1;
            } else if (val < e.cnt) {
                e.cnt -= 1;
            }
        }
    })
    localStorage.data = JSON.stringify(a);
    cart_list();
    buy_localstorage();
}

function Delete_cart() {
    let id = $(this).parents('tr').attr('data-id');
    a.forEach(function (e, idx) {
        if (e.id === id) {
            a.splice(idx, 1);
        }
    })
    localStorage.data = JSON.stringify(a);
    cart_list();
}

var road_time = function setTime() {
    let a = new Date;
    var getMonth = a.getMonth() + 1;
    let getDay = a.getDay();
    let Day = ["일", "월", "화", "수", "목", "금", "토"];
    if (getMonth < 10) {
        var getMonth = "0" + getMonth;
    }
    return a.getFullYear() + "-" + getMonth + "-" + a.getDate() + "-" + Day[getDay] + "," + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
};

function buy_warning() {
    let value1 = $('.modal-body .input_name').val();
    let value2 = $('.modal-body .input_juso').val();
    let check = true;
    let time = '';
    if (value1.length > 0 || value2.length > 0) {
        check = true;
    }
    if (value1.length === 0 || value2.length === 0) {
        check = false;
    }
    if (check === true) {
        time = road_time();
        $('.fade').modal("hide");
        let buy_local = JSON.parse(localStorage.buy);
        let buy_html = ``;
        let Time = ``;
        if (localStorage.data.length > 0) {
            localStorage.data = JSON.stringify([]);
            cart_list();
            $('.Mo').modal("show");
            buy_local.forEach(e => {
                let id = e.id;
                let cnt = e.cnt;
                let Data = json[id];
                let result = parseInt(Data.price.replace(/,/g, '')) * e.cnt;
                buy_html += `<tr>
                                <td><img src="./B모듈 선수제공파일/store/상품사진/${Data.photo}" alt=""></td>
                                <td>${Data.brand}</td>
                                <td>${Data.product_name}</td>
                                <td>${Data.price.toString()} 원</td>
                                <td class="change" colspan='2'>${cnt}</td>
                                <td class="delete">${result} 원</td>
                            </tr>`

            })
            $('.cart_list tbody').html(buy_html);
            $('.cart_time').html(`<h3>${time}</h3>`);
        }
        return;
    }
    if (check === false) {
        alert('값을 입력해주세요.');
    }
}

function buy_localstorage() {
    let buy_local = localStorage.buy = JSON.stringify(a);
    let b = JSON.parse(localStorage.buy);
}


function Drag_Drop() {
    let check = true;
    $('.marge').draggable({
        start: function (event, ui) {
            let element = $('.ui-draggable-dragging');
            let id = element[0].attributes[1].value;
            let local = {id: id, cnt: 1};
        },
        drag: function (event, ui) {
        },
        revert: true
    });
    $('.drop').droppable({
        drop: function (event, ui) {
            list_localstorage();
            cart_list();
        }
    });
}
