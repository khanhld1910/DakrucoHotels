$(function () {
    // guest - booking
    $.datepicker.regional["vi-VN"] =
        {
            closeText: "Đóng",
            prevText: "Trước",
            nextText: "Sau",
            currentText: "Hôm nay",
            monthNames: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng sáu", "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"],
            monthNamesShort: ["Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Mười hai"],
            dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
            dayNamesShort: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            weekHeader: "Tuần",
            dateFormat: "dd/mm/yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
    $.datepicker.setDefaults($.datepicker.regional["vi-VN"]);
    var nDen = null;
    var nDi = null;
    var nMoc = new Date();
    var diffDays = 0;

    $("#ngayden").click(function (e) {
        $("#ngayden").datepicker(
            "dialog",
            Date.now,
            function (txt) {
                $("#ngayden").text(txt);
                nDen = $.datepicker.parseDate("dd/mm/yy", $("#ngayden").text());
            },
            {
                minDate: 0,
                dateFormat: 'dd/mm/yy',
            },
            [e.pageX - e.offsetX, e.pageY - e.offsetY]
        );
    });
    $("#ngaydi").click(function (e) {

        if (nDen == null) {
            alert("Bạn chưa chọn ngày đến!");
            return;
        }

        diffDays = parseInt(2 + (nDen - nMoc) / (1000 * 60 * 60 * 24));
        //console.log(nDen + "---\n");
        //console.log(diffDays);
        $("#ngaydi").datepicker(
            "dialog",
            nDen,
            function (txt) {
                $("#ngaydi").text(txt);
                nDi = $.datepicker.parseDate("dd/mm/yy", $("#ngaydi").text());
            },
            {
                minDate: diffDays,
                dateFormat: 'dd/mm/yy',
            },
            [e.pageX - e.offsetX, e.pageY - e.offsetY]
        );
    });
    var num = 1;
    var childnum = 0;
    $("#ng-up").click(function () {
        num = $("#nguoilon").text();
        num++;
        $("#nguoilon").text(num);
    })
    $("#ng-down").click(function () {
        num = $("#nguoilon").text();
        if (num == 0) {
            return;
        }
        num--;
        $("#nguoilon").text(num);
    })
    $("#child-up").click(function () {
        childnum = $("#treem").text();
        childnum++;
        $("#treem").text(childnum);
    })
    $("#child-down").click(function () {
        childnum = $("#treem").text();
        if (childnum == 0) {
            return;
        }
        childnum--;
        $("#treem").text(childnum);
    })

    var isBooking = false;
    var nights = 0;
    $("#booking-submit").click(function () {
        if (nDi == null) {
            alert("Bạn chưa chọn ngày đến và đi!");
            return;
        }
        $("#book-result").removeClass("not-display");
        nights = parseInt(1 + (nDi - nDen) / (1000 * 60 * 60 * 24));
        //console.log(nDi + "\n" + nDen + "\n" + nights);
        var html = 'Giá phòng cho &nbsp;<span class="rt"> ' + nights + '&nbsp;</span> đêm, từ &nbsp;<span class="rt">' + $("#ngayden").text() + ' </span>&nbsp; đến &nbsp;<span class="rt">' + $("#ngaydi").text() + "</span>:";
        $("#room-request h3").html(html);
        isBooking = true;

    })
    var total = 0;
    var dsPhong = "";
    $(".room-add").click(function () {
        if (nDen == null || nDi == null) {
            alert("Vui lòng chọn ngày đến và đi!");
            return false;
        }
        $("#book-result").removeClass("not-display");
        nights = parseInt(1 + (nDi - nDen) / (1000 * 60 * 60 * 24));
        //console.log(nDi + "\n" + nDen + "\n" + nights);
        var html = 'Giá phòng cho &nbsp;<span class="rt"> ' + nights + '&nbsp;</span> đêm, từ &nbsp;<span class="rt">' + $("#ngayden").text() + ' </span>&nbsp; đến &nbsp;<span class="rt">' + $("#ngaydi").text() + "</span>:";
        $("#room-request h3").html(html);
        isBooking = true;
        var ten = "";
        ten = $(this).attr("data-roomname");
        var dongia = $(this).attr("data-roomcost");

        var html = '<li class="item-details"> ' + ten + ': $' + dongia * nights + ' (' + nights + ' đêm) </li > ';
        dsPhong += "-" + ten + "\n";
        $("#booking-details").append(html);
        total += dongia * nights;
        $("#total-cost").html('Tổng cộng: &nbsp;<span class="rt">$' + total + '</span>');

        if (total > 0) {
            $("#send-request").removeClass("not-display");
        }

        return false;
    });

    $("#send-request").click(function () {
        $("#form-booking").removeClass("not-display").fadeIn();
        return false;
    });

    $("#btn-smbr").click(function () {

        $("#respond-field").removeClass("not-display");
        var name = $.trim($("#iName").val());
        var tel = $.trim($("#iTel").val());
        var eMail = $.trim($("#eMail").val());

        if (name == "" || tel == "" || eMail == "" || name == null || tel == null || eMail == null) {
            //console.log("name", name);
            //console.log("tel", tel);
            $("#respond-field span").text("Vui lòng điền đầy đủ thông tin");
            return false;
        };

        var Bookingdata = {
            name: name,
            tel: tel,
            email: eMail,
            adult: num,
            child: childnum,
            ngayden: $("#ngayden").text(),
            ngaydi: $("#ngaydi").text(),
            dsPhong: dsPhong,
            cost: total,
        };

        $.ajax({
            type: "post",
            url: "/Rooms",
            data: Bookingdata,
            datatype: "html",
            success: function (data) {
                $("#btn-smbr").removeAttr("id");
                $("#respond-field span").removeClass("err").addClass("suc");
                $("#respond-field span").text("Gửi thông tin thành công!\n Chúng tôi sẽ sớm liên lạc lại, cám ơn quý khách.");
                $("#form-booking").delay(2000).fadeOut();
                setTimeout(function () {
                    $('body').html(data);
                }, 3000);
                
            }
        });  
    })
    // guest - booking

});