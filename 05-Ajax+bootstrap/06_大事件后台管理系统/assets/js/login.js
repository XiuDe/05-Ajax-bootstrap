$(function() {
    // 先清缓存
    localStorage.clear();
    // 点击 去注册 的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show()
        })
        // 点击 去登陆 的链接
    $("#link_login").on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide()
    });


    // 从layui获取form对象进行校验
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个pwd的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行判断
            // 如果判断失败return一个错误消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });
    // 监听注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
        e.preventDefault()
        layer.msg("只想弱弱提示");
        // 成功后模拟人的点击行为
        $("#link_login").click();
        $.post("/api/reguser", {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val(),
        }, function(res) {
            console.log('res:', res);
        });
    });
    // 监听登录表单的提交事件
    // $("#form_login").on('submit', function(e) {
    //     e.preventDefault()
    //     layer.msg('已登录~');
    // });
    $("#form_login").submit(function(e) {
        e.preventDefault();
        let logininfo = $(this).serialize().split("&");
        let userinfo = {};
        for (let i = 0; i < logininfo.length; i++) {
            let tempArr = logininfo[i].split("=");
            for (let j = 0; j < logininfo[i].length; j++) {
                let temp = tempArr[0];
                userinfo[temp] = tempArr[1];
            }
        }
        console.log("userinfo:", userinfo);
        console.log("userinfo.password:", userinfo.password);
        localStorage.setItem("userinfo", JSON.stringify(userinfo));
        localStorage.setItem("password", userinfo.password);
        layer.msg("已登录~");
        location.href =
            "/test_5/05-Ajax+bootstrap/06_大事件后台管理系统/index.html";
        // $.ajax({
        //     url: "/api/login",
        //     method: "POST",
        //     // 快速获取表单中的数据
        //     data: $(this).serialize(),
        //     success: function(res) {
        //         console.log('已登录');
        //         // 保存token值，每次有权限请求都要保存
        //         // 跳转到后台主页
        //         location.href = '/index.html'
        //     }
        // });
    });
})