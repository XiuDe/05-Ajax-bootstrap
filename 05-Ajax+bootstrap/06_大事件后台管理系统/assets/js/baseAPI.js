//  每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    console.log(options.url);
    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || "",
        };
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // console.log('用户执行了complete:', res);
        if (res.responseJSON && res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.clear();
            location.href =
                "http://127.0.0.1:5500/test_5/05-Ajax%2Bbootstrap/06_%E5%A4%A7%E4%BA%8B%E4%BB%B6%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/login.html";
        }
    }
})