$(document).ready(function () {

    var Storage = {
        getStorage(name) {
            return JSON.parse(localStorage.getItem(name)) || [];
        },
        setStorage(name, data = []) {
            localStorage.setItem(name, JSON.stringify(data));
        },
        delStorage(name) {
            localStorage.removeItem(name);
        }
    };
    $("#content").keyup(function () {
        if (event.keyCode == 13) {
        }
    });
    $("#js-add").click(function () {
        var inputValue = $("#my-input").val();
        if (inputValue == "") {
            alert("ban chua nhap noi dung");
            return false;
        }
        $("#my-job").append("<li>" + inputValue + "</li>");
        $("#my-input").val('');
        $("li").append("<span>\u00D7</span>");
        $("li span").addClass("close");
        // gán lại sự kiện cho các nút xóa
        $('.close').on('click', function () {
            $(this).parent().hide();
            var b = $(this).text();
            var value_delete = b.replace('×', '');
            deleteFromStorage(value_delete.trim());
        });
        $("#all").html($("li").length + " all-item");

        var datas = Storage.getStorage('todo');
        datas.forEach(function (item) {
            if (inputValue == item.title) {
                alert("job da ton tai");
            }
        });
        addToStorage(inputValue);
    });

    // local
    function addToStorage(inputValue) {
        var datas = Storage.getStorage('todo');
        var data_add = {
            title: inputValue,
            check: false
        };
        datas.push(data_add);
        Storage.setStorage('todo', datas);
    }

    //  gan giá tri khi click checked
    function updateToStorage(value) {
        var data = Storage.getStorage('todo');
        $.each(data, function (key,item) {
            if (value == item.title) {
                data[key].check = true;
                return false;
            }
        });
        Storage.setStorage('todo', data);
    }

    // lay gia tri khi click check
    $("#my-job").on('click', 'li', function () {
        var text = $(this).text();
        var value =text.replace("\u00D7", '');
        updateToStorage(value.trim());
    });

    // Thêm class checked vào thẻ li nào được click
    $("#my-job").on('click', 'li', function () {
        $(this).toggleClass("checked");
        dem(complete);
    });

// xóa giá trị trong local storega
    function deleteFromStorage(text) {
        var datas = Storage.getStorage('todo');

        $.each(datas, function (i,item) {
            if (item.title == text) {
                datas.splice(i, 1);
                Storage.setStorage('todo', datas);
                return false;
            }
        });
    }
    // click hide phan tu chua complete
    $("#complete").click(function () {
        $("li:not(.checked)").hide();
    });
// reload
    $("#all").click(function () {
        window.location.reload();
    });

// Render the li
    function renderLi(item) {
        let name_class = item.check ? 'checked' : '';
        return "<li class='"+ name_class +"'>" + item.title + "</li>";
    }

    var job = Storage.getStorage("todo");
    $.each(job, function (i, item) {
        $("#my-job").append(renderLi(item));

    });

    // tạo nút xóa sau thẻ li
    var myNodelist = $("li");
    $("#my-job li").append("<span></span>");
    $("span").not(':first').text('\u00D7');
    $("span").not(':first').addClass("close");
    //Khi button xóa được click thì ẩn phần tử li chứa nó
    $('.close').on('click', function () {
        var b = $(this).parent().text();
        $(this).parent().hide();
        var value_delete = b.replace('×', '');
        deleteFromStorage(value_delete.trim());
        var datas = Storage.getStorage('todo');
        var number = datas.length;
        $("#all").text(number + " all-item");
        var sum = 0;
        datas.forEach(function (item) {
            if (item.check) {
                sum += 1;
            } else return 1;
        });
        $("#complete").html(sum + "  complete");
    });

    // dem job complete
    function dem(complete) {
        var complete = $("#complete");
        var numbercp = $(".checked");
        if (numbercp.length != 0) {
            complete.html(numbercp.length + "  complete");
        } else {
            complete.text(0 + "  complete");
        }
    };
    dem(complete);
    var number = myNodelist.length;
    var all = $("#all");
    all.text(number + " all-item");
// xoa all
    var ar = [];
    $("#clear").click(function () {
        Storage.setStorage('todo', ar);
        $("#my-job").hide();
        number = 0;
        all.text(number + " all-item");
        var complete = $("#complete");
        complete.text(0 + "  complete");
    });
});
