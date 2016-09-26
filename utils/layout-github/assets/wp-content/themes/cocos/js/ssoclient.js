$(function() {
//    var client_id = $("#client_id").val();
//    var site_url = $("#base_url").val();
//    var sso_server_url = $("#sso_server_url").val();
    var client_id = 215;
    var site_url = 'http://wpcocos.yinshuiyu.com/';
    var sso_server_url = 'https://passport.cocos.com/';
	
    var sso_is_signin_url = sso_server_url+'sso/is_signin?client_id='+client_id;
    var sso_signin_url = $("#sso_signin_url").val();
    var sso_signup_url = $("#sso_signup_url").val();
    var audits=$('#audits').val();
    var client_js_logout_url = site_url+'login.php?action=logout';
    var client_savesession_url = site_url+'login.php?mode=js';
    //SSO登录状态
    $.getScript(sso_is_signin_url,
        function(){
            var oResult = '';
            var status = '';
            var st = '';
            if(result)
            {
                status = result.sign_status;
                st = result.st;
            }
            if(status == 'yes' && st !='')
            {
                //本地用户登录信息为空,保存用户登录信息
                client_savesession_url = client_savesession_url+'&st='+st;
                $.getScript(client_savesession_url,
                    function(){
                        if(userdata.status != false && userdata.update ){
                            data = userdata.data;

                            if($('#add_righttop').length > 0)
                            {
                                var audits = userdata.audits;
                                var next_url = '/app/index';
                                if(audits == 1){
                                    next_url = '/user/audits?show_welcome=none';
                                }else{
                                    if(audits != 2){
                                        next_url = '/user/audits?show_welcome=none';
                                    }
                                }
                                oResult = $('#add_righttop');
                                login_html = '<a href='+next_url+' class="logined">'+data.email+'</a>';
                                oResult.html(login_html);
                                $('#join_us_btn').attr("href",site_url+'app');

                            } else {
                                oResult = $("#sso_user");
                                if(audits==0||audits==3){
                                    login_html = '<a href="javascript:void(0)" id="user" class="clearfix" style="text-align:right">';
                                    login_html += '<img src="coco/img/userico.png" id="userico" class="userimg fl" alt="'+data.email+'" />';
                                    login_html += '<span class="fl">'+data.email+'</span>';
                                    login_html += '<i class="icon_drop fl"></i>';
                                    login_html += '</a>';
                                    login_html += '<ul>';
                                    login_html += '<li><a href="/user/index">成为认证开发者</a></li>';
                                    login_html += '<li><a href="/user/info?m=1">管理帐号</a></li>';
                                    login_html += '<li class="quitico"><a href="/sso_client/logout">退出登录</a></li>';
                                    login_html += '</ul>';
                                }else {
                                    login_html = '<a href="javascript:void(0)" id="user" class="clearfix" style="text-align:right">';
                                    login_html += '<img src="coco/img/userico.png" id="userico" class="userimg fl" alt="'+data.email+'" />';
                                    login_html += '<span class="fl">'+data.email+'</span>';
                                    login_html += '<i class="icon_drop fl"></i>';
                                    login_html += '</a>';
                                    login_html += '<ul>';
                                    login_html += '<li><a href="/user/info">管理帐号</a></li>';
                                    login_html += '<li class="quitico"><a href="/sso_client/logout">退出登录</a>';
                                    login_html += '</li>';
                                    login_html += '</ul>';
                                }
                                //显示下拉菜单
                                oResult.attr('class','fr usermenu');
                                oResult.html(login_html);
                                $(".usermenu").hover(function(){
                                    $(".usermenu ul").show();
                                },function(){
                                    $(".usermenu ul").hide();
                                })
                                $("#entry_app").show();
                                $("#userico").attr("src",userdata.icon_src);
                            }
                        }
                    });
                    //
                }else{
                    if($('#cocos_topi').length > 0)
                    {//index
                        login_html = '<a href="'+sso_signup_url+'" class="fr">注册</a><span class="fr shu"></span><a href="'+sso_signin_url+'" class="fr">登录</a>';
                        oResult = $('#sso_user');
                        oResult.html(login_html);
                        oResult.attr('class','');
                        //退出
                        $.getScript(client_js_logout_url,function(){});

                    } else {
                        var reg = new RegExp(/feedback|error/i);
                        if(reg.test(window.location)){
                            login_html = '<a href="'+sso_signin_url+'"  class="fr"><i class="icon_user icon_user_login"></i>登录</a><a href="'+sso_signup_url+'" class="fr"><i class="icon_user icon_user_register"></i>注册</a>';
                            oResult = $('#sso_user');
                            oResult.html(login_html);
                            //退出
                            $.getScript(client_js_logout_url,function(){});
                        }
                        else
                        {
                            //location.href = client_js_logout_url;
                        }
                    }
                }
            });
            //
        });

//logCount
function logCount(obj,id)
{
    //预留
}