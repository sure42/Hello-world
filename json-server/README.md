搭建并启动json-server：
    1.创建文件夹json-server。在终端中，输入npm install，命名为json-server
    2.终端中输入npm install  --save -json-server
    3.修改json-server的启动方式为"test": "json-server --watch data.json"
    4.启动json-server，终端内输入npm run test
数据访问说明：增删改查相关操作均在main.js文件中。
显示为getinfo(string)和getinfo_new(string)，string为最终显示内容的控件ID，后者仅显示三组数据；
增加为add(string)，string为最终显示内容的控件ID，会从ID为name，id，amount，cost，salesman的控件中得到信息，审核状态默认为"待审核"；
删除为delete(string)，string为最终显示内容的控件ID，从ID为iddel控件中得到要删除的订单号；
查询分别为queryname(),queryid(),queryamount(),querycheck(),querycost()querysalesman(),根据查询的内容，向query()中传入不同的参数，从而得到相应信息，最终数据显示在ID为table的控件内。另一种查询方式是根据学号查询，信息从ID为idup的控件中得到，并显示在ID为nameup，idup，amountup，costup，salesmanup，radio1/radio2/radio3的控件中；
修改为update()，从ID为nameup，idup，amountup，rdup，costup，salesmanup的控件中得到信息，修改后的结果显示在ID为"table"的控件中。