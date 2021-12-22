function viewCart(){
	let html="";
	let total= 0;
	for(let c = 0; c < app.cart.length; c++){
		const item = app.cart[c];
		let product;
		for (let i = 0; i < app.data.length; i++) {
			const elem = app.data[i];
			if (elem.id == item.id) {
				product = elem;
				break;
			}
			
		}
		// const product = app.data.find(function(elem){
		// 	return elem.id == item.id;
		// })``
		
		html += `
			<tr data-id="${item.id}">
				<td scope="row"><img src="/resources/list/${product.photo}" alt="" title="" class="sub__table-img"/></td>
				<td>${product.product_name}</td>
				<td>${product.brand}</td>
				<td>${product.price}</td>
				<td><input type="number" value="${item.cnt}"/></td>
				<td>${Number(product.price.replace(/,/g,"")) * item.cnt}</td>
				<td><button class="btn btn-danger cart__delete-btn">X</button></td>
			</tr> -->
			`
			total += Number(product.price.replace(/,/g,"")) * item.cnt;
	}
	$('#cart__table tbody').html(html);
	$('.totalPrice').html(total);
}




function choSearch(target, search){
	const searchArr = search.split("");
	let regExp = "";
	for(let i = 0; i < searchArr.length; i++){
		const keyword = searchArr[i];
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



function viewList(){
	let html = "";
	let searchKey = $("#search").val();
	for (var i = 0; i < app.data.length;i++) {
		const item = app.data[i];
		
		const nameReg = choSearch(item.product_name, searchKey);//
		const brandReg = choSearch(item.brand, searchKey);//
		let c = new RegExp(nameReg, 'i');
		let d = new RegExp(brandReg, 'i');
		
		if( nameReg === false && brandReg === false)continue;		

		let a = item.product_name.replace(c, `<span class="higthlight">${item.product_name.match(c)}</span>`);
		let b = item.brand.replace(d, `<span class="higthlight">${item.brand.match(d)}</span>`);
		// console.log(a);
		// console.log(item.match(c));


		// console.log(a);

		html+=`<div class="card store__item" data-id="${app.data[i].id}">
							<img src="./resources/list/${app.data[i].photo}" alt="" title="" class="card-img-top"/>
							<div class="card-body">
								<p class="card-text" style="font-weight: bold; margin-bottom: 10px;">상품명 : ${a}</p>
								<p class="card-text">브랜드명 : ${b}</p>
								<p class="card-text">가격 : ${app.data[i].price}</p>
							</div>
						</div>`;
	}
	$('#store__wrapper').html(html);
	jqery_ui();
}


// $(document).ready(function(){
// 	$('#search').keyup(function(){
// 		$('#store__wrapper > .card').hide();
// 		var s = $('#search').val();
// 		for(i=0 ; i < app.data.length; i++){
// 			if(app.data[i].product_name.includes(s) || app.data[i].brand.includes(s)){
// 				$('#store__wrapper > .card').eq(i).show();
// 			}
// 		}
// 	})
// })




function getData() {
	$.ajax({
		url:'/resources/store.json',
		dataType:'json',
		success :function(res){
			app.data = res;
			viewList();
		},
	})

	// fecth('/resources/store.json')
	// .then(res => res.json())
	// .then(res => console.log(res));
}

function changeCartCut(){
	const id = $(this).parents('tr').attr("data-id");
	const cnt = $(this).val(); 

	var aca = app.cart.find(aaa => aaa.id == id);

	if(cnt>aca.cnt){
		aca.cnt = cnt;
	}else if(cnt <= 0){
		aca.cnt ==1;	
	}else if(cnt<aca.cnt){
		aca.cnt = cnt;
	}




	viewCart();
}

function jqery_ui(){
	$(".store__item").draggable({revert:true});
	$( ".dropArea" ).droppable({
 		drop: function( event , ui ) {


 				const found = app.cart.find(function(cart){
 					return cart.id == ui.draggable.attr("data-id");
 				});
 				if(found !== undefined){
 					found.cnt+=1;
 				}else{
  					app.cart.push( {id:ui.draggable.attr("data-id"), cnt : 1 });
 				}

   			viewCart();

		}
})}

function deleteCartItem(){
	const id = $(this).parents('tr').attr("data-id");
	var vv = app.cart.findIndex(cart => cart.id == id);
	app.cart.splice(vv,1);

	viewCart();
}






	// var aa = app.cart.find(cart => cart.id == id);
	// for(i=0;i<app.cart.length;i++){
	// 	if (app.cart[i]==aa) {
	// 		app.cart.splice(i,1);
	// 	}
	// }


function init(){
	getData();
	event();
}

function event(){
	$(document)
	.on('change', "#cart__table input[type='number']", changeCartCut)
	.on('click',".cart__delete-btn", deleteCartItem)
	.on('keyup keydown', '#search', viewList)
  
}



			// var bbb = ui.draggable.attr("data-id");
 			// for(z = 0 ; z < app.cart.length ; z++){
  			// 	if(app.cart[z].id == bbb){
			// 	app.cart[z].cnt += 1;
			// 	break; 				
  			// 		}
 			// }

const app ={
	data : [],
	cart : []
}

$(function(){
	init();
})
