$(function(){

$(window).scroll(function () {
           if($('body').scrollTop()>=30){

            $('header').addClass('fix-top');
            $('header').css('top',0);
             $('.document-nav').addClass('fix-top');
             $('.document-nav').css('top',0);
           
           }else{

            $('header').removeClass('fix-top');
            var h=30-$('body').scrollTop();
            $('header').css('top',h);
            $('.document-nav').removeClass('fix-top');
            $('.document-nav').css('top',h);
           }
 
        });

	$('.m-menu').click(function(){
		if($("body").hasClass('half')){

			$("body").removeClass('half');
			// $('header').css('width','100%');
		}else{
			$("body").addClass('half');
			// $('header').css('width','52.5%');
		}

	});

	$('.now-tab').click(function(){
		if($(this).siblings().hasClass('show')){
			$(this).siblings().removeClass('show');
		}else{
			$(this).siblings().addClass('show');
		}


	})	

		$('.document-all a').click(function(e){
		var url=$(this).attr('href');
			if(url.indexOf('github.com')>=0){
			return true;
		}
		if($(this).hasClass('iframe-max')){
			$('#iframepage').css("height",6000);
		}
		if($(this).hasClass('iframe-max2')){
			$('#iframepage').css("height",7500);
		}

		if($(this).hasClass('iframe-nofooter')){
			$('#iframepage').css({"height":2200,"width":1300});
			// $('#iframepage .footer').css("display",none);
		}

		$('#iframepage').addClass('show');
		$('#iframepage')[0].src=url;
		$('.document-all').addClass('hide');
		var i=$(this).parent().index();
		replaceUrl(i);
		$('body').scrollTop(0);
		var j=$(this).index();
		if(j==1){j=0}else if(j==3){j=1}
			if(i==1){
				if(j>2){j=1;}


			}
		j<3&&$('.document-nav .fr a').eq(j).addClass('current').siblings().removeClass('current');
		
		$('.document-nav .fl').eq(i).addClass('current').siblings().removeClass('current');



		return false;
	});

	$('.document-nav .fr a').click(function(){

		var url=$(this).attr('href');
		$('#iframepage').addClass('show');
		$('#iframepage')[0].src=url;
		$('.document-all').addClass('hide');
		$(this).addClass('current').siblings().removeClass('current');
		$('body').scrollTop(0);
		return false;
	})

	$('.document-nav .fl a').click(function(){
		if($(this).hasClass('creator')){
			$('body').scrollTop(0);
		}
		if($(this).hasClass('cocos2d')){
			$('body').scrollTop(335);
		}
		var me=$(this).parent();
		me.addClass('current').siblings().removeClass('current');
		$('#iframepage').removeClass('show');

		$('.document-all').removeClass('hide');
		var i=me.index()-1;
		replaceUrl(i);
	});
	$('.comment-form-comment textarea').focus(function(){
		$(this).addClass('foc');
		$('#commentform .form-submit').addClass('foc');
	});
	$('#commentform .form-submit').click(function(){
		$(this).removeClass('foc');
		$('.comment-form-comment textarea').removeClass('foc');
	})
});
window.onload=function(){
	$('.banner-container a').addClass('show-ani');
	$('.banner-container img').addClass('show-ani');
}

function replaceUrl(i){
 	var a=$('.document-all').eq(i).find('a');
		$('.document-nav .fr a').removeClass('current');
		if(i==2||i==1){
			$('.document-nav .fr a').eq(0)[0].href=a[0].href;
			$('.document-nav .fr a').eq(1).css('display','none');
			$('.document-nav .fr a').eq(2)[0].href=a[1].href;
		}else{
			$('.document-nav .fr a').eq(1).css('display','inline-block');
		$('.document-nav .fr a').eq(0)[0].href=a[0].href;
		$('.document-nav .fr a').eq(1)[0].href=a[2].href;
		$('.document-nav .fr a').eq(2)[0].href=a[1].href;
		}
 }

(function() {
    /**
     * 动态加载js文件
     * @param  {string}   url      js文件的url地址
     * @param  {Function} callback 加载完成后的回调函数
     */
    var _getScript = function(url, callback) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');
        js.setAttribute('type', 'text/javascript'); 
        js.setAttribute('src', url); 

        head.appendChild(js);

        //执行回调
        var callbackFn = function(){
                if(typeof callback === 'function'){
                    callback();
                }
            };

        if (document.all) { //IE
            js.onreadystatechange = function() {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn();
                }
            }
        } else {
            js.onload = function() {
                callbackFn();
            }
        }
    }

    //如果使用的是zepto，就添加扩展函数
    if(Zepto){
        $.getScript = _getScript;
    }
    
})();