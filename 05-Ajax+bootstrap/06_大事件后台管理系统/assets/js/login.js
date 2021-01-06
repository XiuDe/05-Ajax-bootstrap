$(function() {
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
        $.post("http://ajax.frontend.itheima.net/api/reguser", {
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
        layer.msg("已登录~");
        $.ajax({
            url: "http://ajax.frontend.itheima.net//api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                console.log('已登录')
            }
        });
    });
})