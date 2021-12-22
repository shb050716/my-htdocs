// 이벤트
const setEvent = () => {
    $(document)
        .on("click", ".pageBtn", paging)
}
// 초기화
const init = () => {
    viewList();
    setEvent();
}
// 페이지버튼 클릭
function paging() {
    const page = $(this).attr("data-page");
    viewList(+page);
}
// ajax 데이터 가져오기
const getData = url => {
    return new Promise((res, rej) => {
        $.ajax({
            url,
            dataType: 'xml',
            success: data => {
                res(data);
            }
        })
    })
}
// 페이지버튼 만들기
const viewPagingBtn = (page, maxPage) => {
    $(".maxPageBtn").attr("data-page", maxPage);
    let html = "";
    for(let i = 1; i <= maxPage; i++){
        const btnClass = page === i ? 'btn-secondary' : 'btn-outline-secondary';
        html += `
            <button class="pageBtn btn ${btnClass}" data-page="${i}">${i}</button>
        `
    }

    $(".pageWrapper").html(html);
}
// 리스트 보여주기
const viewList = async (page = 1) => {
    const list = $(await getData('./xml/nihList.xml'));
    const totalCnt = list.find('totalCnt').text();
    const limit = 8;
    const start = (page-1)*limit;
    const maxPage = Math.ceil(totalCnt/limit);

    viewPagingBtn(page, maxPage);

    const data = list.find('item').slice(start, start+limit);
    let html = "";
    for(let i = 0; i < data.length; i++){
        const item = $(data[i]);
        const target = $(await getData(`./xml/detail/${item.find('ccbaKdcd').text()}_${item.find('ccbaCtcd').text()}_${item.find('ccbaAsno').text()}.xml`));
        html += `
            <div class="culturalItem col-3 mt-3">
                <div class="card">
                    <img class="card-img-top" src="./xml/nihcImage/${target.find('imageUrl').text()}" onerror="imgError(this)">
                    <div class="card-body">
                        <h5 class="card-title">${target.find('ccbaMnm1').text()}</h5>
                    </div>
                </div>
            </div>
        `
    }

    $(".culturalWrapper").html(html);
    $("#totalCnt").text(totalCnt);
    $("#curPage").text(page);
    $("#totalPage").text(maxPage);
}
// 이미지 에러 처리
const imgError = img => {
    img.src = './image/no_image.png';
}
// 실행
$(() => {
    init();
})