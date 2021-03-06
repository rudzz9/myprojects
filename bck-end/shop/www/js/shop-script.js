﻿$(document).ready(function(){		<!--функция чтения документов-->


loadcart();	<!--обновление строки количества товаров в корзине-->



	<!--функция гармошки для выпадения списка категории товаров-->
$('#block-category > ul > li > a').click(function(){
  if($(this).attr('class') != 'active'){
     $('#block-category > ul > li > ul').slideUp(400);
     $(this).next().slideToggle(400);

     $('#block-category > ul > li > a').removeClass('active');
     $(this).addClass('active');
     $.cookie('select_cat', $(this).attr('id'));
} else {
     $('#block-category > ul > li > a').removeClass('active');
     $('#block-category > ul > li > ul').slideUp(400);
     $.cookie('select_cat','');
}
});
if($.cookie('select_cat') != ''){
   $('#block-category > ul > li > #'+$.cookie('select_cat')).addClass('active').next().show();
}



<!--сортировка товара-->
$("#select-sort").click(function(){
   $("#sorting-list").slideToggle(200);
});






<!--функция отображения товара плитками-->
  $("#style-grid").click(function(){
	$("#block-tovar-list").hide();
	$("#block-tovar-grid").show();

	$("#style-grid").attr("src","/shop/www/images/icon-grid-activ.png");
	$("#style-list").attr("src","/shop/www/images/icon-list.png");

	$.cookie('select_style','grid');
  });


<!--функция отображения товара списком-->
    $("#style-list").click(function(){
	$("#block-tovar-grid").hide();
	$("#block-tovar-list").show();

	$("#style-list").attr("src","/shop/www/images/icon-list-activ.png");
	$("#style-grid").attr("src","/shop/www/images/icon-grid.png");

	$.cookie('select_style','list');
    });


	<!--проверка на наличие в файле cookie данных о отображение товара плитками и выполнение того или иного действия-->
if($.cookie('select_style') == 'grid'){
	$("#block-tovar-list").hide();
	$("#block-tovar-grid").show();

	$("#style-grid").attr("src","/shop/www/images/icon-grid-activ.png");
	$("#style-list").attr("src","/shop/www/images/icon-list.png");
} else {
	$("#block-tovar-grid").hide();
	$("#block-tovar-list").show();

	$("#style-list").attr("src","/shop/www/images/icon-list-activ.png");
	$("#style-grid").attr("src","/shop/www/images/icon-grid.png");
}




	<!--функция генерации паролей-->
$('#genpass').click(function(){
   $.ajax({
	type: "POST",
	url: "/shop/www/func/genpass.php",
	dataType: "html",
	cache: false,
	success: function(data){
		$('#reg_pass').val(data);
		}
   });
});



	<!--вход-->
$('.top-auth').toggle(
  function(){
    $(".top-auth").attr("id","active-button");
    $("#block-top-auth").fadeIn(400);
  },
  function(){
    $(".top-auth").attr("id","");
    $("#block-top-auth").fadeOut(400);
});




	<!--скрытие и отображение пароля-->
$('#button-pass-show-hide').click(function(){
  var statuspass = $('#button-pass-show-hide').attr("class");

if(statuspass == "pass-show"){

$('#button-pass-show-hide').attr("class","pass-hide");
  var $input = $("#auth_pass");
  var change = "text";
  var rep = $("<input placeholder='Пароль' type='" + change + "' id='auth_pass' />")
    .attr("id",$input.attr("id"))
    .attr("name",$input.attr("name"))
    .attr('class',$input.attr('class'))
    .val($input.val())
    .insertBefore($input);
  $input.remove();
  $input = rep;

} else {

$("#button-pass-show-hide").attr("class","pass-show");
  var $input = $("#auth_pass");
  var change = "password";
  var rep = $("<input placeholder='Пароль' type='" + change + "' id='auth_pass' />")
    .attr("id",$input.attr("id"))
    .attr("name",$input.attr("name"))
    .attr('class',$input.attr('class'))
    .val($input.val())
    .insertBefore($input);
  $input.remove();
  $input = rep;
}

});





	<!--запомнить пароль-->
$("#button-auth").click(function(){

  var auth_login = $("#auth_login").val();
  var auth_pass = $("#auth_pass").val();

if(auth_login == "" || auth_login.length > 30){
   $("#auth_login").css("borderColor","#CD5555");
   send_login = 'no';
} else {
   $("#auth_login").css("borderColor","#006400");
   send_login = 'yes';
}

if(auth_pass == "" || auth_pass.length > 15){
   $("#auth_pass").css("borderColor","#CD5555");
   send_pass = 'no';
} else {
   $("#auth_pass").css("borderColor","#006400");
   send_pass = 'yes';
}

if($("#rememberme").prop('checked')){
   auth_rememberme = 'yes';
} else {
   auth_rememberme = 'no';
}

if(send_login == 'yes' && send_pass == 'yes'){
   $("#button-auth").hide();
   $(".auth-loading").show();

$.ajax({
   type: "POST",
   url: "/shop/www/include/auth.php",
   data: "login="+auth_login+"&pass="+auth_pass+"&rememberme="+auth_rememberme,
   dataType: "html",
   cache: false,
   success: function(data){

if(data == 'yes_auth'){
   location.reload();
} else {
   $("#message-auth").slideDown(400);
   $(".auth-loading").hide();
   $("#button-auth").show();
}
}
});
}
});



	<!--блок выход-->
$('#auth-user-info').toggle(
  function(){
    $("#block-user").fadeIn(200);
  },
  function(){
    $("#block-user").fadeOut(200);
});



	<!--выход из профиля-->
$('#logout').click(function(){
$.ajax({
   type: "POST",
   url: "/shop/www/include/logout.php",
   dataType: "html",
   cache: false,
   success: function(data){

if(data == 'logout'){
   location.reload();
}

}
});
});






	<!--добавка в корзину-->
$('.add-cart-list,.add-cart-grid,.add-cart-view,.random-add-cart').click(function(){
var tid = $(this).attr("tid");
$.ajax({
   type: "POST",
   url: "/shop/www/include/addtocart.php",
   data: "id="+tid,
   dataType: "html",
   cache: false,
   success: function(data){
   loadcart();
}
});
});

function loadcart(){
$.ajax({
   type: "POST",
   url: "/shop/www/include/loadcart.php",
   dataType: "html",
   cache: false,
   success: function(data){

if(data == "0"){
   $("#block-step").hide();
   $("#block-basket > a").html("Корзина пуста");
}else{
$("#block-basket > a").html(data);
$(".itog-price > strong").html(fun_group_price(itogprice));
}
}
});
}







	<!--групировка цен по разрядам-->
function fun_group_price(intprice){
   var result_total = string(intprice);
   var lenstr = result_total.length;

switch(lenstr){
case 4: {
groupprice = result_total.substring(0,1)+" "+result_total.substring(1,4);
break;
}
case 5: {
groupprice = result_total.substring(0,2)+" "+result_total.substring(2,5);
break;
}
case 6: {
groupprice = result_total.substring(0,3)+" "+result_total.substring(3,6);
break;
}
case 7: {
groupprice = result_total.substring(0,1)+" "+result_total.substring(1,4)+" "+result_total.substring(5,7);
break;
}
default: {
groupprice = result_total;
}
}
return groupprice;
}








	<!--удаление товара в корзине-->
$('.count-minus').click(function(){
var iid = $(this).attr("iid");

$.ajax({
   type: "POST",
   url: "/shop/www/include/count-minus.php",
   data: "id="+iid,
   dataType: "html",
   cache: false,
   success: function(data){
      $("#input-id"+iid).val(data);
   loadcart();

var priceproduct = $("#tovar"+iid+" > p").attr("price");

result_total = Number(priceproduct) * Number(data);

$("#tovar"+iid+" > p").html(result_total+" грн.");
$("#tovar"+iid+" > h5 > .span-count").html(data);

itog_price();
}
});
});










	<!--добавка товара в корзине-->
$('.count-plus').click(function(){
var iid = $(this).attr("iid");

$.ajax({
   type: "POST",
   url: "/shop/www/include/count-plus.php",
   data: "id="+iid,
   dataType: "html",
   cache: false,
   success: function(data){
   $("#input-id"+iid).val(data);
   loadcart();

var priceproduct = $("#tovar"+iid+" > p").attr("price");

result_total = Number(priceproduct) * Number(data);

$("#tovar"+iid+" > p").html(result_total+" грн.");
$("#tovar"+iid+" > h5 > .span-count").html(data);

itog_price();
}
});
});


	<!--добавка товара в корзине с помощью ввода числа-->
$('.count-input').keypress(function(e){
if(e.keyCode == 13){

var iid = $(this).attr("iid");
var incount = $("#input-id"+iid).val();

$.ajax({
   type: "POST",
   url: "/shop/www/include/count-input.php",
   data: "id="+iid+"&count="+incount,
   dataType: "html",
   cache: false,
   success: function(data){
   $("#input-id"+iid).val(data);
   loadcart();

var priceproduct = $("#tovar"+iid+" > p").attr("price");
result_total = Number(priceproduct) * Number(data);

$("#tovar"+iid+" > p").html(result_total+" грн.");
$("#tovar"+iid+" > h5 > .span-count").html(data);

   itog_price();
}
});
}
});

	<!--итоговая цена-->
function itog_price(){

$.ajax({
   type: "POST",
   url: "/shop/www/include/itog_price.php",
   dataType: "html",
   cache: false,
   success: function(data){

$(".itog-price > strong").html(data);

}
});
}


	
	<!--лайк-->
$('#likegood').click(function(){
var tid = $(this).attr("tid");
$.ajax({
   type: "POST",
   url: "/shop/www/include/like.php",
   data: "id="+tid,
   dataType: "html",
   cache: false,
   success: function(data){

if(data == 'no'){
   alert('Вы уже голосовали');
} else {
   $("#likegoodcount").html(data);
}

}
});
});
	
	
	
	
	<!--поиск-->
$("#input-search").bind('textchange', function(){

var input_search = $("#input-search").val();
if(input_search.length >= 2 && input_search.length < 64){

$.ajax({
   type: "POST",
   url: "/shop/www/include/search.php",
   data: "text="+input_search,
   dataType: "html",
   cache: false,
   success: function(data){

	if(data > ''){
	   $("#result-search").show().html(data);
	} else {
	   $("#result-search").hide();
	}
   }
});
} else {
	$("#result-search").hide();
}
});


	
	
	

	
	
	<!--проверка ввода отзыва-->
$('#button-send-review').click(function(){

var name = $("#name_review").val();
var good = $("#good_review").val();
var bad = $("#bad_review").val();
var comment = $("#comment_review").val();
var iid = $("#button-send-review").attr("iid");

if(name != ""){
   name_review = '1';
   $("#name_review").css("borderColor","#DBDBDB");
} else {
   name_review = '0';
   $("#name_review").css("borderColor","#FDB6B6");
}

if(good != ""){
   good_review = '1';
   $("#good_review").css("borderColor","#DBDBDB");
} else {
   good_review = '0';
   $("#good_review").css("borderColor","#FDB6B6");
}

if(bad != ""){
   bad_review = '1';
   $("#bad_review").css("borderColor","#DBDBDB");
} else {
   bad_review = '0';
   $("#bad_review").css("borderColor","#FDB6B6");
}

if(name_review == '1' && good_review == '1' && bad_review == '1'){
   $("#button-send-review").hide();
   $("#reload-img").show();

$.ajax({
   type: "POST",
   url: "/shop/www/include/add_review.php",
   data: "id="+iid+"&name="+name+"&good="+good+"&bad="+bad+"&comment="+comment,
   dataType: "html",
   cache: false,
   success: function(){
	setTimeout("$.fancybox.close()", 1000);
   }
});
}
});
	
	

	
	
	
	
	<!--проверка ввода данных покупателя в корзине-->
function isValidEmailAddress(emailAddress){

var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
return pattern.test(emailAddress);
}

$('#confirm-button-next').click(function(e){
	var order_fio = $("#order_fio").val();
	var order_email = $("#order_email").val();
	var order_phone = $("#order_phone").val();
	var order_address = $("#order_address").val();
	
if(!$(".order_delivery").is(":checked")){
$(".label_delivery").css("color","#E07B7B");
send_order_delivery = '0';

}else{ $(".label_delivery").css("color","black"); send_order_delivery = '1';

if(order_fio == "" || order_fio.length > 50){
$("#order_fio").css("borderColor","#E07B7B");
send_order_fio = '0';

}else{ $("#order_fio").css("borderColor","#DBDBDB"); send_order_fio = '1';}

if(order_email == "" || isValidEmailAddress(order_email) == false){
$("#order_email").css("borderColor","#FDB6B6");
send_order_email = '0';

}else{ $("#order_email").css("borderColor","#DBDBDB"); send_order_email = '1';}

if(order_phone == "" || order_phone.length > 50){
$("#order_phone").css("borderColor","#FDB6B6");
send_order_phone = '0';

}else{ $("#order_phone").css("borderColor","#DBDBDB"); send_order_phone = '1';}

if(order_address == "" || order_address.length > 150){
$("#order_address").css("borderColor","#FDB6B6");
send_order_address = '0';

}else{ $("#order_address").css("borderColor","#DBDBDB"); send_order_address = '1';}

}

if(send_order_delivery == "1" && send_order_fio == "1" && send_order_email == "1" && send_order_phone == "1" && send_order_address == "1"){
   return true;
}
e.preventDefault();
});
	
	
	
	
	
	
});