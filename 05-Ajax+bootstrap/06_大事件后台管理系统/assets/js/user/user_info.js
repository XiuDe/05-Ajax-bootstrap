$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })

    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo() {
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/userinfo',
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg('获取用户信息失败！')
        //         }
        //         console.log(res)
        //     }
        // })
        console.log('initUserInfo--', JSON.parse(localStorage.getItem('userinfo')));
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));
        // 调用form.val()快速为表单赋值
        form.val("formUserInfo", userinfo.data);
    }
    // 重置表单数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    });
    // 监听表单的提交事件
    form.on("submit(formUserInfo)", function(e) {
        // 阻止表单的默认提交行为
        // e.preventDefault();
        // 发起ajax请求
        // $.ajax({
        //     method: 'POST',
        //     url: '/my/userinfo',
        //     data: $(this).serialize(),
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg('更新用户信息失败!')
        //         }
        //         layer.msg('更新用户信息成功！')
        //  // 调用副页面的方法，重新渲染用户的信息
        // window.parent.getUserInfo()
        //     }
        // })
        var data1 = form.val("formUserInfo");
        console.log("-data1-", data1);
    });

})