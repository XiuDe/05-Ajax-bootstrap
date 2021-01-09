$(function() {
    var layer = layui.layer;
    var form = layui.form;
    // 定义一个查询的参数对象，
    // 请求参数时该对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类Id
        state: '', // 文章的发布状态
    };
    // 初始化数据
    mockData();
    // 初始化页面渲染
    initTable();

    // 获取文章列表数据的方法
    function initTable() {
        // 使用模板引擎渲染数据
        var htmlStr = template(
            "tpl-table",
            JSON.parse(localStorage.getItem("articlePageList"))
        );
        $('tbody').html(htmlStr)
            // $.ajax({
            //     method: 'GET',
            //     url: '/my/article/list',
            //     data: q,
            //     success: function(res) {
            //         if (res.status !== 0) {
            //             return layer.msg('请求数据失败！');
            //         }
            //         layer.msg("请求数据成功！");
            //         // 使用模板引擎渲染数据
            //         var htmlStr = template(
            //             "tpl-table",
            //             JSON.parse(localStorage.getItem("articlePageList"))
            //         );
            //         console.log('htmlStr:', htmlStr);
            //         $('tbody').html(htmlStr)
            //     }
            // })
    };


    // mockData
    function mockData() {
        let articlePageList = {
            status: 0,
            message: "获取文章列表成功！",
            data: [{
                    Id: 1,
                    title: "abab",
                    pub_date: "2020-01-03 12:19:57.690",
                    state: "已发布",
                    cate_name: "最新",
                },
                {
                    Id: 2,
                    title: "666",
                    pub_date: "2020-01-03 12:20:19.817",
                    state: "已发布",
                    cate_name: "股市",
                },
            ],
            total: 5,
        };
        localStorage.setItem("articlePageList", JSON.stringify(articlePageList));
    }
})