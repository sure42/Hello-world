function isEmpty(string) {
    if(string == null || string == undefined || string == "") {
        return true;
    }else {
        return false;
    }
}

function getinfo_new(string) {
    $.ajax({
        url: "http://localhost:3000/info",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var i;
            var html="";//用一个变量来存储json中的数据
            for (i = 0; i < 3; i++) { //用for循环遍历数组将数据存入html变量中
                if(isEmpty(data[i].name||isEmpty(data[i].amount))||isEmpty(data[i].check)||isEmpty(data[i].cost)||isEmpty(data[i].salesman)) {
                }else {
                    html += `<tr class="tr">
                        <td>${data[i].id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].amount}</td>
                        <td>${data[i].check}</td>
                        <td>${data[i].cost}</td>
                        <td>${data[i].salesman}</td>
                        </tr>`;
                } 
            }
            document.getElementById(string).innerHTML += html;
        },
        error: function () {
            alert("数据申请失败");
        }
    })
}

//获取json信息并显示在表格上
function getinfo(string) {
    $.ajax({
        url: "http://localhost:3000/info",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var i;
            var html="";//用一个变量来存储json中的数据
            for (i = 0; i < data.length; i++) { //用for循环遍历数组将数据存入html变量中
                if(isEmpty(data[i].name||isEmpty(data[i].amount))||isEmpty(data[i].check)||isEmpty(data[i].cost)||isEmpty(data[i].salesman)) {
                }else {
                    html += `<tr class="tr">
                        <td>${data[i].id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].amount}</td>
                        <td>${data[i].check}</td>
                        <td>${data[i].cost}</td>
                        <td>${data[i].salesman}</td>
                        </tr>`;
                } 
            }
            document.getElementById(string).innerHTML += html;
        },
        error: function () {
            alert("数据申请失败");
        }
    })
}

function add() {
    var name=$("#name").val();
    var id=$("#id").val();
    var amount=$("#amount").val();
    var types="待审核";
    var cost=$("#cost").val();
    var salesman=$("#salesman").val();
    var re=/^[1-9]+[0-9]*]*$/;   //正则表达式判断输入的是否为正整数
    if(isEmpty(name) || isEmpty(id) || isEmpty(amount) || isEmpty(types) || isEmpty(cost) || isEmpty(salesman)) {
        alert("请填写完整信息!");
    }else if(!re.test(amount)) {
        alert("数量一栏请输入正整数！");
    }else if(!re.test(cost)) {
        alert("总花费一栏请输入正整数！");
    }else {
        var newData = {    //要添加的数据
            "name": name,
            "id": id,
            "amount": amount,
            "check": types,
            "cost": cost,
            "salesman":salesman
        };
        $.ajax({   //发送到json
            url: "http://localhost:3000/info",
            type: "POST",
            dataType: "json",
            data: newData,
            success: function(data) {
                alert("数据添加成功!");
                //发送之后在网页上显示出来
                getinfo("table_add");
            },
            error: function () {
                alert("数据添加失败!");
            }
        })
        
    }
    
}

function Delete() {
    var id=$("#iddel").val();   //要删除信息的订单号
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/info/"+id,
        dataType: "json",
        success: function(e) {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:3000/info/"+id,
                dataType: "json",
                success:function(data) {
                    alert("删除成功！");
                    getinfo("table");  //删除成功后重新请求json数据并显示在表格上
                },
                error: function(data) {
                    alert(data.responseJSON.message);
                }
            })
        },
        error: function(e) {
            alert("该数据不存在，无法删除");
        }
    })
}


function upquery() {
    var id=$("#idup").val();
    if(isEmpty(id)) {
        alert("请先输入要修改数据的学号!!");
    }else {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/info/"+id,
            dataType: "json",
            success: function(data) {    //该信息存在就先显示出来方便修改
                $("#nameup").val(data.name);
                $("#idup").val(data.id);
                $("#amountup").val(data.amount);
                if(data.check=="待审核") {
                    $("input[id='radio1']").prop("checked","checked");
                }else if(data.check=="通过"){
                    $("input[id='radio2']").prop("checked","checked");
                }else if(data.check=="不通过"){
                    $("input[id='radio3']").prop("checked","checked");
                }
                $("#costup").val(data.cost);
                $("#salesmanup").val(data.salesman);
            },
            error:function(err) {
                alert("该用户不存在，不能修改，请重新输入学号!!");
            }
        })
    }
}


function update() {     //用户修改完成后开始更新
    var name=$("#nameup").val();
    var id=$("#idup").val();
    var amount=$("#amountup").val();
    var types=$("input[name='rdup']:checked").val();
    var cost=$("#costup").val();
    var salesman=$("#salesmanup").val();
    var re=/^[1-9]+[0-9]*]*$/;   //正则表达式判断输入的是否为正整数
    if(isEmpty(name) || isEmpty(id) || isEmpty(amount) || isEmpty(types) || isEmpty(cost) || isEmpty(salesman)) {
        alert("请填写完整信息!");
    }else if(!re.test(amount)) {
        alert("数量一栏请输入正整数！");
    }else if(!re.test(cost)) {
        alert("总花费一栏请输入正整数！");
    }else {
        var newData = {    //要添加的数据
            "name": name,
            "id": id,
            "amount": amount,
            "check": types,
            "cost": cost,
            "salesman":salesman
        };
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/info/"+id,
            data: newData,
            success: function(data) {
                alert("修改成功!!");
                getinfo("table");
            },
            error: function(err) {
                alert(err);
            }
        })
    }
}

var query_i=0;
//查询操作
function query(str) {
    const map={
        "name": "产品",
        "id": "订单号",
        "amount": "数量",
        "check": "状态",
        "cost": "总花费",
        "salesman": "业务员"
    }
    var value;
    if(query_i==0)
    {
        value=$("#"+"query_"+str).val();
    }
    else if(query_i==1)
    {
        value=$("input[name='query_rd']:checked").val();
    }
    
    if(isEmpty(value)) {
        alert("请输入要查询的"+map[str]);
    }else {
        fetch("http://localhost:3000/info")
        .then((res) => res.json())
        .then(data => {
            let output = '';
            data.forEach((user) => {
                if(user[str]==value) {
                    output += `<tr class="tr">
                    <td>${user.name}</td>
                    <td>${user.id}</td>
                    <td>${user.amount}</td>
                    <td>${user.check}</td>
                    <td>${user.cost}</td>
                    <td>${user.salesman}</td>
                    </tr>`;
                }
            })
            if(isEmpty(output)) {
                alert("该信息不存在!!");
            }else {
                document.getElementById("table").innerHTML = "";
                let html;
                html += `<tr>
                    <th>订单号</th>
                    <th>产品</th>
                    <th>数量</th>
                    <th>总金额</th>
                    <th>状态</th>
                    <th>业务员</th>
                </tr>`;
                $("#table").append(html);
                document.getElementById("table").innerHTML += output;
                alert("查询成功");
            } 
        }).catch(err => console.log(err));
    }
}

//按照姓名查询
function queryname() {
    query_i=0;
    query("name");
}

//按照订单号查询
function queryid() {
    query_i=0;
    query("id");
}

//按照数量查询
function queryamount() {
    query_i=0;
    query("amount");
}

//按照状态查询
function querycheck() {
    query_i=1;
    query("check");
}

//按照总花费查询
function querycost() {
    query_i=0;
    query("cost");
}

//按照业务员查询
function querysalesman() {
    query_i=0;
    query("salesman");
}