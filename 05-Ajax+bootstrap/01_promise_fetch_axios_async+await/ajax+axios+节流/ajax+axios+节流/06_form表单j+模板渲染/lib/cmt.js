function getCommentList() {
    $.ajax({
        method: "GET",
        url: "http://www.liulongbin.top:3006/api/cmtlist",
        success: function(res) {
            if (res.status !== 200) return alert("获取评论列表失败！");
            console.log("获取评论列表成功", res);
            var rows = [];
            $.each(res.data, function(i, item) {
                rows.push('<li class="list-group-item"> <span class="badge" style = "background-color: #f0AD4e;" > 评论时间：' + item.time + '</span> <span class= "badge" style="background-color: #5bc0de;" > 评论人：' + item.username + "</span> " + item.content + "</li>");
            });
            console.log("rows", rows);
            $('#cmt-list').empty().append(rows.join(''));
        },
    });
}

getCommentList();

$(function() {
    $("#formAddCmt").submit(function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        console.log('form', data);
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function(res) {
            if (res.status !== 201) {
                return alert('发表评论失败！')
            }
            getCommentList();
            // 表单重置固定写法
            $("#formAddCmt")[0].reset();
        })
    });
})