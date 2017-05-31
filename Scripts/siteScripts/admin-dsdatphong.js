
$(function () {
    var currIndex = 1, count = 0, pages = 0;
    var keyword = $("#ipt-searchBookinglst").val();
    //page index
    $(".btn-BkPage").click(function (event) {
        currIndex = parseInt($("#spn-pageIndex").text());
        count = parseInt($("#spn-pageIndex").attr("data-count"));
        pages = Math.ceil(count / 10);
        if (event.target.id == "btn-leftBkPage") {
            if (currIndex < 2) {
                return false;
            };
            currIndex--;
        } else if (event.target.id == "btn-rightBkPage") {
            if (currIndex >= pages) {
                return false;
            };
            currIndex++;
        }
        $("#spn-pageIndex").text(currIndex);

        var mData = {
            request: "search",
            keyWord: keyword,
            pageIndex: currIndex
        };

        $.ajax({
            type: "post",
            url: "/admin/dsdatphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    });
    // search
    $('#ipt-searchBookinglst').on('keyup', function (e) {
        if (e.which == 13) {
            $('#btn-searchBookinglst').trigger('click');
        }
    });
    // search
    $("#btn-searchBookinglst").click(function () {
        keyword = $("#ipt-searchBookinglst").val();
        currIndex = 1;
        var mData = {
            request: "search",
            keyWord: keyword,
            pageIndex: currIndex
        };

        $.ajax({
            type: "post",
            url: "/admin/dsdatphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    });
    // reset
    $("#isearchReset").click(function (e) {
        e.preventDefault();
        keyword = "";
        currIndex = 1;

        var mData = {
            request: "search",
            keyWord: keyword,
            pageIndex: currIndex
        };
        $.ajax({
            type: "post",
            url: "/admin/dsdatphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    });
    //status
    $(".iBookingsts").click(function () {
        loading("Đang tải", 500);
        var status = $(this).attr("data-status");
        console.log(status, typeof (status));
        var removingClass = "";
        var addingClass = ""; 
        switch (parseInt(status)) {
            case 0:
                status = 2;
                break;
            case 1:
                status = 2;
                break;
            case 2:
                status = 0;
                break;
        };
        var mData = {
            request: "update-status",
            id: $(this).data("id"),
            status: status,
            keyWord: keyword,
            pageIndex: currIndex
        }      

        $.ajax({
            type: "POST",
            url: "/admin/dsdatphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    });
    // edit
    $(".iEdit").click(function () {
        var isEditing = ($(this).data("isEditing") == true);
        var thisRow = $(this).parents("tr");
        var thisEditableCells = $(thisRow).children(".editableCell");
        if (isEditing) {
            var thisRowID = $(thisRow).data("id");
            var mData = {
                request: 'edit',
                name: '',
                phone: '',
                email: '',
                arrDate: '',
                depDate: '',
                room: '',
                cost: '',
                adult: 0,
                child: 0,
                id: thisRowID,
            };
            thisEditableCells.each(function (index, element) {
                var columnName = $(element).data("col");
                var eEvalue = $.trim($(element).text());                
                switch (columnName) {
                    case "name":
                        mData.name = eEvalue;
                        break;
                    case "phone":
                        mData.phone = eEvalue;
                        break;
                    case "email":
                        mData.email = eEvalue;
                        break;
                    case "arrDate":
                        mData.arrDate = eEvalue;
                        break;
                    case "depDate":
                        mData.depDate = eEvalue;
                        break;
                    case "room":
                        mData.room = eEvalue;
                        break;
                    case "cost":
                        mData.cost = eEvalue;
                        break;
                    case "adult":
                        mData.adult = (eEvalue);
                        break;
                    case "child":
                        mData.child = (eEvalue);
                        break;
                };
            });          
            $.each(mData, function (key, value) {
                //console.log(key, value);
                if (value == null || value == '') {
                    alert('Vui lòng nhập đầy đủ thông tin');
                    return false;
                };
            });
            $.ajax({
                type: "post",
                url: "/admin/dsdatphong",
                data: mData,
                datatype: "html",
                success: function (data) {
                    //var thisRowContent = $(data).filter('tr[data-id="' + thisRowID + '"]');
                    //$(thisRow).html(thisRowContent);
                    $('body').html(data);
                }
            });            
            
        } else {
            !isEditing ? $(thisRow).addClass("selectedRow") : $(thisRow).removeClass("selectedRow");// styling for editrow
            $(thisEditableCells).attr("contenteditable", !isEditing);
            
            $(this).data("isEditing", !isEditing);
            $(this).attr("data-isEditing", !isEditing);

            var addingClass = !isEditing ? "fa-check" : "fa-pencil";
            var removingClass = isEditing ? "fa-check" : "fa-pencil";
            $(this).addClass(addingClass).removeClass(removingClass);
        }
    });
    // delete
    $("#btn-delBookinglst").click(function (e) {
        e.preventDefault();
        var $boxes = $('input[name=iBkselect]:checked');
        //alert($boxes.length);
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Xóa mục đã chọn": function () {
                    var mData = {
                        request: 'delete',
                        keyWord: keyword,
                        pageIndex: currIndex,
                        "delItemIds": []
                    };
                    $boxes.each(function (index, element) {
                        mData.delItemIds.push($(element).data("id"));
                    })
                    //console.log(JSON.stringify(mData.delItemIds));
                    $.ajax({
                        type: "post",
                        url: "/admin/dsdatphong",
                        data: mData,
                        datatype: "html",
                        success: function (data) {                            
                            $('body').html(data);
                        }
                    });
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
    // highlight seletected row
    $('input[name=iBkselect]').click(function () {
        var thisRow = $(this).parents('tr');
        $(this).is(":checked") ? $(thisRow).addClass('selectedRow') : $(thisRow).removeClass('selectedRow');
    });    
    // upcoming events
    $("#btn-today").click(function () {
        var todayAsString = dateAsString(new Date());

        keyword = todayAsString;
        currIndex = 1;
        var mData = {
            request: "today-event",
            keyWord: keyword,
            pageIndex: currIndex
        };

        $.ajax({
            type: "post",
            url: "/admin/dsdatphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    });
    $("#btn-tomorrow").click(function () {
        var tomorrowAsString = dateAsString(new Date((new Date()).valueOf() + 1000 * 3600 * 24));
        
        keyword = tomorrowAsString;
        currIndex = 1;
        var mData = {
            request: "upcoming-event",
            keyWord: keyword,
            pageIndex: currIndex
        };

        $.ajax({
            type: "post",
            url: "/admin/dsdatphong",
            data: mData,
            datatype: "html",
            success: function (data) {
                $('body').html(data);
            }
        });
    });    

    function dateAsString(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        month = (month < 10) ? "0" + month : month;
        var year = date.getFullYear();

        return day + "/" + month + "/" + year;
    }

})
