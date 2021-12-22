// 이벤트
const setEvent = () => {
    $(document)
        .on("click", ".tabItem", clickTab)
}
// 초기화
const init = () => {
    viewList();
    setEvent();
}
// 탭 클릭
function clickTab() {
    const depth = $(this).attr("data-depth");
    viewList(depth);
}
// 데이터 에러 처리
const viewError = data => {
    alert(`error code : ${data.statusCd} / error msg : ${data.statusMsg}`);
    $(`<a href="./index.html"></a>`)[0].click();
}
// 리스트 보여주기
const viewList = async (depth = '전체') => {
    const data = await getData();
    $(".tabWrapper").html("");
    $(".contentsBox").html('');

    if (+data.statusCd !== 200) {
        viewError(data);
        return;
    }

    let tabHtml = `<div class="tabItem btn btn-outline-primary">전체</div>`;
    if (depth === '전체') tabHtml = `<div class="tabItem btn btn-primary">전체</div>`;

    for (const depthItem in data.items) {
        tabHtml += `
            <div class="btn tabItem
        `;
        if (depthItem === depth) tabHtml += 'btn-primary';
        else tabHtml += 'btn-outline-primary'
        tabHtml += `
            " data-depth="${depthItem}">${depthItem}</div>
        `
    }
    $(".tabWrapper").html(tabHtml);

    let listHtml = "";
    for (const depthItem in data.items) {
        if (depth !== '전체' && depth !== depthItem) continue;

        listHtml += `
            <div class="contentsItem mt-4">
                <h4 class="text-left">${depthItem}</h4>
                <div class="telWrapper row">
        `
        data.items[depthItem].forEach(item => {
            listHtml += `
                    <div class="telItem fe fm col-2 mb-2">
                        <div class="box">
                            <span>${item.name}</span>
                            <span>| ${item.telNo}</span>
                        </div>
                    </div>
            `
        })
        listHtml += `
                </div>
            </div>
        `;
    }
    $(".contentsBox").html(listHtml);

}
// 데이터 가져오기
const getData = () => {
    return new Promise((res, rej) => {
        $.ajax({
            url: './restAPI/phone.php',
            success: data => {
                data = JSON.parse(data);
                const items = {};
                Array.from(new Set(data.items.map(item => item.deptNm))).forEach(item => items[item] = []);

                data.items.forEach(item => {
                    items[item.deptNm].push(item);
                });
                data.items = items;

                res(data);
            }
        })
    })
}
// 실행
$(() => {
    init();
})