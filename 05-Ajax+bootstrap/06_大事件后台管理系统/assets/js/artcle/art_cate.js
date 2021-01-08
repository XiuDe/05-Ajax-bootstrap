$(function() {
    var layer = layui.layer;
    var form = layui.form;
    // mockData
    mockData();
    // initArtCateList()
    initArtCateList();

    // 获取文章列表
    function initArtCateList() {
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/article/cates',
        //     success: function(res) {
        //         console.log(res);
        //     }
        // })
        let articleList = JSON.parse(localStorage.getItem("articleList"));
        console.log("articleList:", articleList);
        // 模板渲染数据
        var htmlStr = template("tpl-table", articleList);
        $("tbody").html(htmlStr);
    }

    // 添加类别按钮添加绑定按钮
    var indexAdd = null;
    $("#btnAddCate").on("click", function() {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            // 拿到html结构
            content: $("#dialog-add").html(),
        });
    });

    // 通过代理的形式，为form-add表单绑定submit事件
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault();
        console.log("添加文章ok");
        // $.ajax({
        //     method: 'POST',
        //     url: '/my/article/addcates',
        //     data: $(this).serialize(),
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg('新增分类失败！')
        //         }
        //         initArtCateList();
        //         layer.msg('新增分类成功！');
        //     }
        // })
        //获取表单区域所有值
        var data1 = $(this).serialize();
        console.log("获取表单区域所有值:", data1);
        dealDialogAdd(data1, false);
        initArtCateList();
        layer.close(indexAdd);
    });

    // 通过代理绑定编辑文章事件btn-edit
    var indexEdit = null;
    $("tbody").on("click", ".btn-edit", function(e) {
        console.log('编辑事件e', e);
        // 方法一：e.target.dataset.id 
        // console.log("e.target.dataset.id", e.target.dataset.id);
        // 方法二：
        var id = $(this).attr('data-id');
        // 弹出一个修改文章分类的信息弹出层
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            // 拿到html结构
            content: $("#dialog-edit").html(),
        });
        let articleList = JSON.parse(localStorage.getItem('articleList'));
        let articleItem = articleList.data.filter(item => {
            return Number(id) == item.Id;
        });
        console.log("artcleItem", articleItem);
        form.val("form-edit", articleItem[0]);
        // 
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/article/cates/' + id,
        //     success: function(res) {
        //         console.log(res)
        // form.val("form-edit", articleItem);
        //     }
        // })
    });

    // 通过代理的形式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        let str = $(this).serialize();
        let id = Number(str.split('&')[0].split("=")[1]);
        let tempstr =
            str.split("&")[1] + "&" + str.split("&")[2];
        console.log("tempstr", tempstr);
        dealDialogAdd(tempstr, id);
        initArtCateList();
        layer.close(indexEdit);
        // $.ajax({
        //     method: 'POST',
        //     url: '/my/article/updatecate',
        //     data: $(this).serialize(),
        //     success: function(res) {}
        // })
    })

    // 处理添加文章分类内容，并更新缓存
    function dealDialogAdd(str, edittrue) {
        if (edittrue) {
            let id = Number(edittrue);
            let articleList = JSON.parse(localStorage.getItem("articleList"));
            let index = articleList.data.findIndex(item => {
                return item.Id == id
            })
            let strArr = str.split("&");
            let tempObj = {};
            for (let i = 0; i < strArr.length; i++) {
                // for (let j = 0; j < strArr.length; i++) {}
                let strItem = strArr[i].split("=");
                if (i == 0) {
                    articleList.data[index].name = strItem[1];
                } else {
                    articleList.data[index].alias = strItem[1];
                }
            }
            // tempObj.Id =
            //     Number(articleList.data[0].id ? articleList.data[0].id : 0) +
            //     Number(articleList.data.length ? articleList.data.length + 1 : 1);
            // tempObj.is_delete = 0;
            // console.log("tempObj:", tempObj);
            // articleList.data.unshift(tempObj);
            console.log("articleList:", articleList);
            localStorage.setItem("articleList", JSON.stringify(articleList));
        } else {
            let articleList = JSON.parse(localStorage.getItem("articleList"));
            let strArr = str.split("&");
            let tempObj = {};
            for (let i = 0; i < strArr.length; i++) {
                // for (let j = 0; j < strArr.length; i++) {}
                let strItem = strArr[i].split("=");
                if (i == 0) {
                    tempObj.name = strItem[1];
                } else {
                    tempObj.alias = strItem[1];
                }
            }
            tempObj.Id =
                Number(articleList.data[0].id ? articleList.data[0].id : 0) +
                Number(articleList.data.length ? articleList.data.length + 1 : 1);
            tempObj.is_delete = 0;
            // console.log("Number(articleList.data[0].id ?articleList.data[0].id: 0)", Number(articleList.data[0].id ? articleList.data[0].id : 0));
            // console.log("Number(articleList.data.length ? articleList.data.length : 1))", Number(articleList.data.length ? articleList.data.length : 1))
            console.log("tempObj:", tempObj);
            articleList.data.unshift(tempObj);
            console.log("articleList:", articleList);
            localStorage.setItem("articleList", JSON.stringify(articleList));
        }
    }

    // 通过代理的形式，为删除按钮绑定点击事件
    $("tbody").on("click", ".btn-delete", function() {
        console.log("删除按钮", $(this).attr("data-id"));
        var id = $(this).attr("data-id");
        // 提示用户是否要删除
        layer.confirm("确认删除?", { icon: 3, title: "提示" }, function(index) {
            let articleList = JSON.parse(localStorage.getItem('articleList'));
            let findindex = articleList.data.findIndex(item => {
                return id == item.Id;
            })
            articleList.data.splice(findindex, 1);
            console.log('删除后的数据:', articleList);
            localStorage.setItem("articleList", JSON.stringify(articleList));
            initArtCateList();
            layer.close(index);
            // 
            // $.ajax({
            //     method: 'GET',
            //     url: '/my/article/deletecate' + id,
            //     success: function(res) {
            //         if (res.status !== 0) {
            //             return layer.msg('删除分类失败')
            //         }
            //         layer.msg('删除分类成功！');
            //         layer.close(index);
            //     }
            // })
        });
    });

    // mockData
    function mockData() {
        let artcleList = {
            status: 0,
            message: "获取文章分类列表成功！",
            data: [{
                    Id: 1,
                    name: "最新",
                    alias: "ZuiXin",
                    is_delete: 0,
                },
                {
                    Id: 2,
                    name: "科技",
                    alias: "KeJi",
                    is_delete: 0,
                },
                {
                    Id: 3,
                    name: "股市",
                    alias: "GuShi",
                    is_delete: 0,
                },
                {
                    Id: 4,
                    name: "历史",
                    alias: "LiShi",
                    is_delete: 0,
                },
                {
                    Id: 5,
                    name: "情感",
                    alias: "QingGan",
                    is_delete: 0,
                },
            ],
        };
        localStorage.setItem("articleList", JSON.stringify(artcleList));
    }
})