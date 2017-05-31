
$(function () {
    var title = "";
    var status = 1;
    var text = "";
    var filter = "";
    keyword = $("#ipt-searchPage").val();
    var pageIndex = 1;

    //show style heading
    $(document).mouseup(function (e) {
        var $container = $("ul.format-ul");
        // if the target of the click isn't the container nor a descendant of the container
        if (!$container.is(e.target) && $container.has(e.target).length === 0) {
            if ($container.is(":visible")) $container.hide();
        };
    });
    $("#font-format").click(function (e) {
        $("ul.format-ul").show();
    });
    // loadPage - search - pageIndex
    function loadPages() {
        var mData = {
            request: "search",
            filter: filter,
            keyword: keyword,
            pageIndex: pageIndex
        };
        $.ajax({
            type: "post",
            url: "/admin/pages",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    };
    // pageindex
    $(".btn-BkPage").click(function (event) {
        pageIndex = parseInt($("#spn-pageIndex").text());
        count = parseInt($("#spn-pageIndex").attr("data-count"));
        filter = $("#page-filter span").text();
        pages = Math.ceil(count / 10);
        if (event.target.id == "btn-leftBkPage") {
            if (pageIndex < 2) {
                return false;
            };
            pageIndex--;
        } else if (event.target.id == "btn-rightBkPage") {
            if (pageIndex >= pages) {
                return false;
            };
            pageIndex++;
        }
        loadPages();
    });
    // get data from edit page
    function getData() {
        title = $.trim($("#ipt-title").val());
        text = $.trim($("#txt-Content").val());

        if (title.length < 1 || title.length > 200) {
            alert("Tiêu đề phải từ 1 đến 200 ký tự!");
            return false;
        } else if (text.length < 1) {
            alert("Bạn chưa nhập nội dung bài viết!");
            return false;
        };
        text = '@{PageData["Title"] = "' + title + '";'
            + '}@section main {<main><div class="row title-bar"><h2>'
            + title + '</h2></div><section style="padding: 20px;">' + text + '</section></main>' + '}';

    };
    // if success
    function success(data) {
        var i = 3;
        var result = $(data).find('#spn-status').text();
        setInterval(function () {
            if (i == 0) {
                window.location.replace("/admin/pages");
                return false;
            };
            $("#spn-status").text(result + ". Trở lại trang quản lý trong " + i + " giây ...");
            i--;
        }, 1000);
    };
    // create new post
    $("#btn-postPage").click(function () {
        getData();
        var mData = {
            request: "new-page",
            title: title,
            text: text,
            status: 1
        };
        $.ajax({
            type: "post",
            url: "/admin/pages/newpage",
            data: mData,
            datatype: "html",
            success: function (data) {
                success(data);
            }
        });
    });
    // create a draft
    $("#btn-draft").click(function () {
        getData();
        var mData = {
            request: "new-page",
            title: title,
            text: text,
            status: 2
        };
        $.ajax({
            type: "post",
            url: "/admin/pages/newpage",
            data: mData,
            datatype: "html",
            success: function (data) {
                success(data);
            }
        });
    });
    // page filter
    $("#page-filter").click(function () {
        $("ul#filter-select").show();
    });
    $("#page-filter li").click(function () {
        filter = $(this).text();
        pageIndex = 1;
        $("#page-filter span").text(filter);
        $("ul#filter-select").hide();
        //console.log(filter, filter.length);
        loadPages();
    });
    // search
    $('#ipt-searchPage').on('keyup', function (e) {
        if (e.which == 13) {
            $('#btn-searchPage').trigger('click');
        }
    });
    // search
    $("#btn-searchPage").click(function () {
        keyword = $("#ipt-searchPage").val();
        pageIndex = 1;
        var mData = {
            request: "search",
            keyWord: keyword,
            pageIndex: pageIndex
        };

        $.ajax({
            type: "post",
            url: "/admin/pages",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    });
    // reset 
    $("#isearchReset").click(function () {
        keyword = "";
        pageIndex = 1;
        filter = "";
        loadPages();
    });
    // page-action
    $(".page-action").click(function (e) {
        e.preventDefault();
        var status = parseInt($(this).data("status"));
        var id = parseInt($(this).data("id"));
        //alert(status);
        var mData = {
            request: "",
            rowID: id,
            filter: filter,
            keyword: keyword,
            pageIndex: pageIndex
        };

        mData.request = status == 3 ? "delete" : "2Trash";
        $.ajax({
            type: "post",
            url: "/admin/pages",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    });
    // page-edit: edit buttons     
    $(".update-btns").click(function (e) {
        e.preventDefault();
        getData();
        var mData = {
            request: "update",
            title: title,
            text: text,
        };
        switch ($(this).attr("id")) {
            case "btn-updateDraft":
                //alert("updateDraft");
                mData.request = "update-draft";
                break;
            case "btn-updatePage":
                //alert("updatePage");
                mData.request = "update";
                break;
            case "btn-updatePost":
                //alert("updatePost");
                mData.request = "update-post";
                break;
        }
        $.ajax({
            type: "post",
            url: "/admin/pages/edit/" + $("#adminbox").data("id"),
            data: mData,
            datatype: "html",
            success: function (data) {
                success(data);
            }
        });
    });

    //-----------------
    // page default edit click
    $(".btn-editPage").click(function () {
        var id = $(this).data("id");
        var url = $(this).data("source");
        var title = "";
        var content = "";
        $.ajax({
            type: "post",
            url: "/admin/pages/edit/"+id,
            data: {},
            datatype: "html",
            success: function (data) {
                $('body').html(data);
                $.ajax({
                    type: "post",
                    url: url,
                    data: {},
                    datatype: "html",
                    success: function (result) {
                        title = $(result).find('.title-bar h2').text();
                        content = $(result).find('section').text();
                    }
                });
            }
        });

        



    });
})
