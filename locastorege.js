window.onload = function () {

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

// xử lí nút button //
    var myadd = document.getElementById('js-add');

    myadd.onclick = function () {
        //tạo thẻ li mới
        var li = document.createElement("li");
        // lấy giá trị người dùng nhập
        var inputValue = document.getElementById("my-input").value;
        // lưu nội dung
        var newtext = document.createTextNode(inputValue);
        // gán nội dung vừa lấy cho thẻ li vừa tạo
        li.appendChild(newtext);
        // kiểm tra nếu newtext rỗng thì thông báo,không thì thêm vào trong thẻ ul
        if (inputValue === "") {
            alert("Bạn chưa nhập nội dung!");
        } else {
            document.getElementById("my-job").appendChild(li);
        }
        // xóa giá trị đã nhâp trong thẻ input
        document.getElementById("my-input").value = "";
        // thêm nút xóa vào thẻ li mới tạo
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        // gán lại sự kiện cho các nút xóa
        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                var div = this.parentElement;
                div.style.display = "none";
                var value_delete = div.innerText.replace('\u00D7', '');
                deleteFromStorage(value_delete);
            };
        }

        var number = document.getElementsByTagName("li");
        var all = document.getElementById("all");
        all.innerHTML = number.length + " all-item";

        var datas = Storage.getStorage('todo');
        datas.forEach(function (item) {
            if (inputValue == item.title) {
                alert("job da ton tai")
            }
            ;

        });
        addToStorage(inputValue);
    };

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
        data.forEach(function (item, key) {
            if (value == item.title) {
                data[key].check = true;
                return false;
            }
        });
        Storage.setStorage('todo', data);
    }

// lay gia tri khi click check
    var ul = document.getElementById('my-job');
    ul.onclick = function (event) {
        var target = event.target;
        var value = event.target.innerText.replace("\u00D7", '');
        updateToStorage(value.trim());
    };

// Thêm class checked vào thẻ li nào được click
    var list = document.getElementById("my-job");
    list.addEventListener('click', function (check) {
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
        datas.forEach(function (item, i) {
            if (item.title == text) {
                datas.splice(i, 1);
                Storage.setStorage('todo', datas);
                return false;
            }
        });
    }

    // reload
    var reaload = document.getElementById("all");
    reaload.onclick = function () {
        window.location.reload();
    };

// Render the li
    function renderLi(ntext) {
        var z = document.createElement('li');
        z.innerHTML = ntext.title;
        if (ntext.check) {
            z.classList.add("checked");
        }
        return z;
    }

    var job = Storage.getStorage("todo");
    job.forEach(function (datas) {
        document.getElementById("my-job").appendChild(renderLi(datas));
    });

// tạo nút xóa sau thẻ li
    var myNodelist = document.getElementsByTagName("li");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    };


    //Khi button xóa được click thì ẩn phần tử li chứa nó
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
            var value_delete = div.innerText.replace('\u00D7', '');
            deleteFromStorage(value_delete);


            var all = document.getElementById("all");


            var datas = Storage.getStorage('todo');
            var number = datas.length;

            all.innerText = number + " all-item";

            var sum = 0;
            datas.forEach(function (item) {
                if (item.check == true)
                {
                    sum += 1;

                } else return 1;
            });
            console.log(sum);
            var complete = document.getElementById("complete");
            complete.innerHTML = sum + "  complete";
        };


    };
// // click an cac job chua complete
// var checkcp = document.getElementById("complete");
//
//
// checkcp.onclick = function () {
//
//     var li = document.getElementsByClassName("checked");
//     console.log(li);
//     li.forEach(function (item) {
//         console.log(key);
//         key.style.display = 'none';
//     });
//
//
// };

// dem job complete
function dem(complete) {
    var complete = document.getElementById("complete");
    var numbercp = document.getElementsByClassName("checked");
    if (numbercp.length != 0) {
        complete.innerHTML = numbercp.length + "  complete";
    } else complete.innerText = 0 + "  complete";
};
dem(complete);

var number = myNodelist.length;
var all = document.getElementById("all");
all.innerText = number + " all-item";


// xoa all
var myclear = document.getElementById("clear");
var jobclear = document.getElementById("my-job");
var ar = [];
myclear.onclick = function () {
    Storage.setStorage('todo', ar);
    jobclear.style.display = "none";
    number = 0;
    all.innerText = number + " all-item";
    var complete = document.getElementById("complete");
    complete.innerText = 0 + "  complete";

};
}
;




