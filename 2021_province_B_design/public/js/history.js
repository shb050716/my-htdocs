// localStorage 가져오기
const get = storage => {
    const data = localStorage[storage];
    if (data) return JSON.parse(data);
    return null;
}
// localStorage 저장하기
const set = (storage, data, push = false) => {
    if (push) {
        const tmp_data = get(storage) ?? [];
        tmp_data.push(data);
        localStorage[storage] = JSON.stringify(tmp_data);
    } else {
        localStorage[storage] = JSON.stringify(data);
    }
}
// 리스트 보여주기
const viewContents = () => {
    const list = get('list');
    console.log(list);
    if(!list) return;

    const tabs = Array.from(new Set(list.map(item => item.year))).sort((a,b) => b-a);
    console.log(tabs);
    let tab = get('tab');
    tab = !tabs.includes(tab) ? null : tab;
    const activeTab = tab ?? tabs[0];

    let tabHtml = "";
    tabs.forEach(tab => {
        tabHtml += `
            <button type="button" class="tabItem btn 
        `;
        if (activeTab === tab) {
            tabHtml += `btn-primary`;
        }else{
            tabHtml += `btn-outline-primary`;
        }
        tabHtml += `
            " data-year="${tab}">${tab}년</button>
        `;
    })
    $(".tabWrapper").html(tabHtml);
    $(".contentsBox h3").text(activeTab + "년");

    let listHtml = "";
    list.forEach((item, idx) => {
        if( item.year !== activeTab ) return;
        const date_ = new Date(item.date);
        const date = String(date_.getMonth()+1).padStart(2,0)+". "+ String(date_.getDate()).padStart(2,0);

        listHtml += `
            <li data-idx="${idx}" class="fe pr-3">${date}&nbsp;&nbsp;${item.contents}
                <div>
                    <button class="btn badge badge-warning ml-3 modifyBtn">수정</button>
                    <button class="btn badge badge-danger deleteBtn">삭제</button>
                </div>
            </li>
        `;
    })
    $(".textWrapper").html(listHtml);
}
// 연혁 추가
const addList = () => {
    const
        contents = $('#addContents').val(),
        date = $('#addDate').val();

    const date_ = new Date(date);
    const year = date_.getFullYear();

    set('list', {contents, date, year}, true);
    viewContents();

    $('#addModal').modal("hide");
}
// 년도 클릭
function clickYear() {
    const year = $(this).attr('data-year');

    set('tab', +year);

    viewContents();
}
// 연혁 수정 모달
function modifyModal() {
    const idx = $(this).parents('li').attr("data-idx");
    const item = get('list')[+idx];

    $("#modifyContents").val(item.contents);
    $("#modifyIdx").val(+idx);
    $("#modifyDate").val(item.date);
    $("#modifyModal").modal("show");
}
// 연혁 수정
const modifyList = () => {
    const
        contents = $("#modifyContents").val(),
        date = $("#modifyDate").val(),
        idx = $("#modifyIdx").val();

    const year = new Date(date).getFullYear();

    const list = get('list');
    list.splice(idx, 1, {contents, date, year});

    set('list', list);

    $("#modifyModal").modal('hide');
    viewContents();
}
// 연혁 삭제
function clickDelete() {
    if(!confirm('연혁을 삭제하시겠습니까?')) return;

    const idx = $(this).parents('li').attr('data-idx');
    const list = get('list');
    list.splice(+idx, 1);
    set('list', list);

    alert('연혁을 삭제하였습니다.');
    viewContents();
}
// 이벤트
const setEvent = () => {
    $(document)
        .on("click", ".addSaveBtn", addList)
        .on("click", ".tabItem", clickYear)
        .on("click", ".modifyBtn", modifyModal)
        .on("click", ".modifySaveBtn", modifyList)
        .on("click", ".deleteBtn", clickDelete)
}
// 초기화
const init = () => {
    viewContents();
    setEvent();
}
// 실행
$(() => {
    init();
});