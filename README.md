# wTab

example:

	var tab = new wTab();

	tab.addTab({
		caption:"默认首页",
		id:"tab3"
	});  //添加一个页签

	tab.addTab({
		caption : "JavaScript简介",
		id:"tab4",
		isClose:true
	});  //添加一个页签
	
	tab.autoHeight=true; //参数可选
	tab.isdivtab=true;   //参数可选

	tab.oncloseclick = function(index,tabObject){
		console.log(tabObject);
	}
	
	tab.onclick=function(index,tabObject){
		console.log("你单击了tab索引是（"+index+"）的标签页");
	};

	tab.initTab({
		containerId : "myTab",  //初始化组件的DOM容器
		name : "myTab"
	});  //初始化Tab组件
	


	添加新页签：
	tab.addNewTab({
		caption : "new tab",
		id : "tab1",
		isClose : true
	});
