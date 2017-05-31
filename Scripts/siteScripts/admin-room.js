$(function () {
    //show filter select
    $(document).mouseup(function (e) {
        var $container = $("#filter-select");
        // if the target of the click isn't the container nor a descendant of the container
        if (!$container.is(e.target) && $container.has(e.target).length === 0) {
            if ($container.is(":visible")) $container.hide();
        };
    });
    $("#room-filter").click(function (e) {
        $("#filter-select").show();
    });
    // loading
    function loading(message, milisecond) {
        var over = '<div id="overlay">' +
            '<div id="loading"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>' +
            '<span class="sr-only">' + message + '</span></div>' +
            '</div>';
        $(over).appendTo('body');
        setTimeout(function () {
            $('#overlay').remove();
        }, milisecond);
    };
    // set status
    $(".phong i").click(function () {
        var id = $(this).data("roomid");
        var isAvailable = ($(this).attr("data-status") == 1);// vi trang thai se bi thay doi
        // 0 la chua co nguoi dat
        var mData = {
            id: id,
            filter: $("#room-filter span").text(),
            isAvaiable: isAvailable
        };
        //loading("Đang cập nhật", 800);
        $.ajax({
            type: "post",
            url: "/admin/qlphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });

    });
    // filter 
    $("#filter-select li").click(function () {
        var filter = $(this).text();
        //alert(filter);        
        var mData = {
            filter: filter,
        };
        $.ajax({
            type: "post",
            url: "/admin/qlphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    });
    //select edit room
    $(".room-edit-item").click(function () {
        var roomID = $(this).data("maphong");
        var mData = {
            request: "load-room-to-edit",
            roomID: roomID,
        };
        $.ajax({
            type: "post",
            url: "/admin/qlphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });

    });
    // submit room's editing
    $("#submit-edit-room").click(function (e) {
        e.preventDefault();

        var mData = {
            request: "edit-room",
            maphong: 0,
            tenphong: "",
            mota: "",
            soluong: 0,
            canhquan: "",
            trangtri: "",
            phongngu: "",
            phongtam: "",
            dientich: "",
            giaphong: "",
            khua: 0,
            linkanh: ""
        };
        mData.khua = $("#khuA").is(":checked") ? 1 : 0;
        mData.maphong = $(this).data("maphong"); 
        $.each($(".editable"), function (index, element) {
            var itemID = $(element).attr("id");
            var eEvalue = $.trim($(element).text());
            switch (itemID) {
                case "spn-tenphong":
                    mData.tenphong = eEvalue;
                    break;
                case "spn-linkanh":
                    mData.linkanh = eEvalue;
                    break;
                case "spn-giaphong":
                    mData.giaphong = eEvalue;
                    break;
                case "spn-soluong":
                    mData.soluong = eEvalue;
                    break;
                case "spn-canhquan":
                    mData.canhquan = eEvalue;
                    break;
                case "spn-trangtri":
                    mData.trangtri = eEvalue;
                    break;
                case "spn-phongngu":
                    mData.phongngu = eEvalue;
                    break;
                case "spn-phongtam":
                    mData.phongtam = (eEvalue);
                    break;
                case "spn-mota":
                    mData.mota = (eEvalue);
                    break;
                case "spn-dientich":
                    mData.dientich = (eEvalue);
                    break;
            };
        });
        
        $.ajax({
            type: "post",
            url: "/admin/qlphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
        
        //console.log(mData);
    });
});