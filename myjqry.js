$(document).ready(function () {


    $("#content").keyup(function () {
        if (event.keyCode == 13) {
            addJob();

        }
    });
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
 var addjob = $("#js-add");
    addjob.click(function(){
        var inputValue = $("#my-input").val();
        if (inputValue == "") {
            alert("ban chua nhap noi dung");
            return false;
        }

        $("#my-job").append("<li>"+inputValue+"</li>");
        $("#my-job").value = "";
        $("li").append("<span>\u00D7</span>")
        $("li span").addClass("close");
        // gán lại sự kiện cho các nút xóa
        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                // $(this).parent().style.display = "none";
                var div = $(this).parent();
                div.style.display = "none";
                // var value_delete = div.innerText.replace('\u00D7', '');
                // deleteFromStorage(value_delete);
            };
        };
        var all = $("#all");
        all.html(number.length + " all-item");

        var datas = Storage.getStorage('todo');
        datas.forEach(function (item) {
            if (inputValue == item.title) {
                alert("job da ton tai")
            }
            ;

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
        data.each(function (item, key) {
            if (value == item.title) {
                data[key].check = true;
                return false;
            }
        });
        Storage.setStorage('todo', data);
    }

    // lay gia tri khi click check
    $('#my-job').onclick = function (event) {
        var target = event.target;
        var value = event.target.text.replace("\u00D7", '');
        updateToStorage(value.trim());
    };

    // Thêm class checked vào thẻ li nào được click
    $('#my-job').on('click', function (check) {
            if (check.target.tagName === "LI") {
                check.target.classList.toggle("checked");
                dem(complete);
            }
        },
        false
    );

// xóa giá trị trong local storega
    function deleteFromStorage(text) {
        var datas = Storage.getStorage('todo');
        datas.each(function (item, i) {
            if (item.title == text) {
                datas.splice(i, 1);
                Storage.setStorage('todo', datas);
                return false;
            }
        });
    }

// reload
    $("#all").onclick = function () {
        window.location.reload();
    };

// Render the li
    function renderLi(ntext) {
        var z = $("#my-job").add("li");
        z.html(ntext.title);
        if (ntext.check) {
            z.addClass("checked");
        }
        return z;
    }

    var job = Storage.getStorage("todo");
    job.forEach(function (datas) {
        $("#my-job").append(renderLi(datas));
    });
    // tạo nút xóa sau thẻ li
    var myNodelist = $("li");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = $("#my-job span");
        $("span").text("\u00D7");
        span.addclassName = "close";
        myNodelist[i].append(span);
    }
    ;


    //Khi button xóa được click thì ẩn phần tử li chứa nó
    var close = $(".close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
            var value_delete = div.text.replace('\u00D7', '');
            deleteFromStorage(value_delete);
            var datas = Storage.getStorage('todo');
            var number = datas.length;

            $("#all").text(number + " all-item");

            var sum = 0;
            datas.forEach(function (item) {
                if (item.check == true) {
                    sum += 1;

                } else return 1;
            });
            console.log(sum);
            $("#complete").html(sum + "  complete");
        };


    }
    ;


    // dem job complete
    function dem(complete) {
        var complete = $("#complete");
        var numbercp = $(".checked");
        if (numbercp.length != 0) {
            complete.html(numbercp.length + "  complete");
        } else complete.text(0 + "  complete");
    };
    dem(complete);

    var number = myNodelist.length;
    var all = $("#all");
    all.text(number + " all-item");


// xoa all
    var myclear = $("#clear");
    var jobclear = $("#my-job");
    var ar = [];
    myclear.onclick = function () {
        Storage.setStorage('todo', ar);
        jobclear.style.display = "none";
        number = 0;
        all.text(number + " all-item");
        var complete = $("#complete");
        complete.text(0 + "  complete");

    };


});















