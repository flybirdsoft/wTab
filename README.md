# wTab

example:
var tab = new wTab();
tab.addTab({
	caption:"默认首页",
	id:"tab3"
});
tab.addTab({
	caption : "JavaScript简介",
	id:"tab4",
	isClose:true
});
tab.autoHeight=true;
tab.isdivtab=true;

tab.oncloseclick = function(index,tabObject){
	console.log(tabObject);
}
tab.onclick=function(index,tabObject){
	console.log("你单击了tab索引是（"+index+"）的标签页");
};

tab.initTab({
	containerId : "myTab",
	name : "myTab"
});

添加新页签：
	tab.addNewTab({
		caption : "new tab",
		id : "tab1",
		isClose : true
	});
