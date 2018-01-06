//****************************
//功能名称：wTab
//编写人  ：邬畏畏
//博客    :www.cnblogs.com/wsoft
//描述    :生成Tab控制所有功能
//时间    :2013-12
//生成的元素基本结构：
/*   代码布局示例
	var divContent = '<div id="wTab" class="wTab">' + 
						'<ul id="Tabs">' +
							'<li id="Tab1" class="tabs">tab1</li>'+
							'<li id="Tab2" class="tabs">tab1</li>'+
						'</ul>'+
						'<ul id="tabContent" class="tabContent">'+
							'<li id="tabContent1">tab1content</li>'+
							'<li id="tabContent2">tab1content</li>'+
						'</ul>'+
					'</div>';
*/

//****************************
var wTab = function(){
	this.version="1.0";
	this.tabHeight=30;
	this.tabwidth=50;
	this.contentStyle="";/*所有content的样式*/
	this.tabCount=0;     /*标签的个数*/
	this.tabCaptionAr=[];/*Tab标签的数组*/
	this.tabContentAr=[];/*Tab内容的数组*/

	this.parent=null;
	this.autoHeight=false;/*自动适应页面大小，但需要一个固定值*/
	this.Diff=0;/*在使用自动满屏高度时，如果高度超出的话，设置Diff*/
	this.addNew=false; /*是否是后来新添加页面，在addNewTab()方法设置为true*/
	this.refresh=[];/*表示单击Tab标签是否需要刷新当前页面，-1=表示不刷新，1=表示刷新，此数值在addTab()方法中初始化*/
	this.onclick=null; /*回调函数*/
	this.isdivtab=false;/*tab标签是否含有DIV，可以通过设置类样式 .tablef和.tabright来实现复杂的tab标签效果*/
};

/*根据tab的索引删除索引出的标签页*/
wTab.prototype.doClose = function(index){
	if(this.tabCount==1)
	{
		return;
	}
	var tabs = $(this.parent).find(".Tabs").find("li");
	var tabContents = $(this.parent).find(".tabContent").find("li");
	tabs[index].parentNode.removeChild(tabs[index]);
	tabContents[index].parentNode.removeChild(tabContents[index]);

	this.tabCaptionAr.splice(index,1);
	this.tabContentAr.splice(index,1);
	this.tabCount--;
	this.initEvent(this.parent);
	if(index>0)
	{
		this.hideAllContent(this.containerId,index-1);

	}
	else if(index==0 && this.tabCount>1)
	{
		this.hideAllContent(this.containerId,index+1);
	}
}

/*
#对外接口
*/
wTab.prototype.closeTabIndex = function(index){
	this.prototype.doClose(index);
}
/*
#对外接口
*/
wTab.prototype.closeTab = function(options){
	/*
	options.id,options.caption
	*/
	var tabs = this.tabCaptionAr;
	var v;
	for(var i=0,len=tabs.length;i<len;i++)
	{
		for(v in options)
		{
			if(tabs[i][v]==options[v])
			{
				this.doClose(i);
			}
		}
	}
}

/*
首次添加Tab选项卡,然后再调用initTab
#对外接口
*/
wTab.prototype.addTab=function(options){
	this.tabCaptionAr.push(options);
	this.tabContentAr.push(options.id);
	this.tabCount++;

};

/*
运行时动态添加Tab选项卡
#对外接口
*/
wTab.prototype.addNewTab=function(options){
	var child = this.parent.children[0].children[1];
	var childTab = this.parent.children[0].children[0];
	this.tabCaptionAr.push(options);
	this.tabContentAr.push(options.id);
	this.tabCount++;
	this.addNew=true;
	
	var tabli;
	if(this.isdivtab)
	{
		tabli = '<li id="{id}" class="tab"><div class="tabLeft" style="float:left"></div><div style="float:left">{caption}{close}</div><div class="tabRight" style="float:left"></div></li>';
	}
	else
	{
		tabli = '<li id="{id}" class="tab">{caption}{close}</li>';
	}
	var tabContentli ='';
	var tmp = "",strA="",strB="";
	var i,dom;

	tmp = tabli.replace("{id}",this.name + (this.tabCaptionAr.length-1));
	tmp = tmp.replace("{caption}",this.tabCaptionAr[this.tabCaptionAr.length-1].caption);
	if(this.tabCaptionAr[this.tabCaptionAr.length-1].isClose)
	{
		tmp = tmp.replace("{close}","<span class='wTabClose'>&nbsp;X</span>");
	}
	else
	{
		tmp = tmp.replace("{close}","");
	}
	strA = strA + tmp;

	tabContentli = document.createElement("li");
	tabContentli.className = "tabContent" + (this.tabContentAr.length-1);
	contentDom = document.getElementById(this.tabContentAr[this.tabContentAr.length-1]);
	contentDom.style.display = "block";
	tabContentli.appendChild(contentDom);
	
	strB = strB + tmp;

	childTab.innerHTML = childTab.innerHTML + strA;
	child.appendChild(tabContentli);
	this.initEvent(this.parent);
	this.hideAllContent(this.parent,this.tabContentAr.length-1);

};

/*
生成tab控件的入口
#对外接口
*/
wTab.prototype.initTab = function(options){  /*parent是ID，string类型*/
	this.parent = document.getElementById(options.containerId);
	this.name = options.name;
	this.containerId = options.containerId;
	var tabli,contentDom;
	if(this.isdivtab)
	{
		tabli = '<li id="{id}" class="tab"><div class="tabLeft" style="float:left"></div><div style="float:left">{caption}{close}</div><div class="tabRight" style="float:left"></div></li>';
	}
	else
	{
		tabli = '<li id="{id}" class="tab">{caption}{close}</li>';
	}
	var tabContentli ='<li id="tabContent{id}"></li>';
	
	var divContent = '<div id="{wTab}" class="wTab">' + 
						'<ul class="Tabs">{nr}' +
						'</ul>'+
						'<ul id="tabContent" class="tabContent" style="{style}">'+
						'</ul>'+
					'</div>';
	var tmp = "",strA="",strB="";
	var i,dom;
	for(i=0;i<this.tabCaptionAr.length;i++)
	{
		tmp = tabli.replace("{id}",options.name + i);
		tmp = tmp.replace("{caption}",this.tabCaptionAr[i].caption);
		if(this.tabCaptionAr[i].isClose)
		{
			tmp = tmp.replace("{close}","<span class='wTabClose'>&nbsp;X</span>");
		}
		else
		{
			tmp = tmp.replace("{close}","");
		}
		

		strA = strA + tmp;

		tmp = tabContentli.replace("{id}",i);

		strB = strB + tmp;		
	}
	divContent = divContent.replace("{wTab}", options.name||"wTab");
	divContent = divContent.replace("{nr}",strA);
	divContent = divContent.replace("{style}",this.contentStyle);
	this.parent.innerHTML=divContent;

	for(i=0;i<this.tabContentAr.length;i++)
	{
		tabContentli = document.createElement("li");
		tabContentli.className = "tabContent" + i;
		contentDom = document.getElementById(this.tabContentAr[i]);
		contentDom.style.display = "block";
		tabContentli.appendChild(contentDom);
		$(this.parent).find(".tabContent").append(tabContentli);
	}
	
	this.hideAllContent(options.containerId,0);

	this.initEvent(this.parent);
}

wTab.prototype.initEvent = function(){
	var t = this.parent;
	var This=this;
	var child = t.children[0].children[0].children;
	var childTab = t.children[0].children[0].children;
	var i;
	var diff,docHeight;

	for(i=0;i<child.length;i++)
	{
		child[i].onclick = function(index){
			return function(e){
				var target = e.target||e.srcElement;
				if(target.className=="wTabClose")
				{
					This.oncloseclick.call(This,index,This.tabCaptionAr[index]);
				}
				This.click(index,e);
				if(This.onclick!=null)
				{
					This.onclick.call(This,index,This.tabCaptionAr[index]);
				}
			}
		}(i);
	}
	
	if(this.addNew)/*如果是后添加的tab,即通过addNewTab()方法调用的*/
	{
		childTab[this.tabCount-1].className="tabH";
	}
	else
	{
		childTab[0].className="tabH";
	}
	
	/*setTimeout(function(){*/
		if(this.autoHeight)
		{
			$("#" + this.containerId + " .tabContent")[0].style.height="auto";
			diff=$("#" + this.containerId +" #Tabs li").height();
			docHeight = document.documentElement.clientHeight;
			$("#" + this.containerId +" .tabContent > li").height(docHeight-this.Diff-diff-3);
		}
	/*},100)*/
}

wTab.prototype.click = function(index,e){

	var t = this.parent;
	var child = t.children[0].children[1].children;
	var childTab = t.children[0].children[0].children;
	var i;
	var that;
	this.hideAllContent(1,index);
	var target = e.target || e.srcElement;
	if(target.className=="wTabClose")
	{
		this.doClose(index);
	}
}

wTab.prototype.hideAllContent = function(p,n){
	/*
	p参数已经不在使用
	n=-1表示content全部隐藏，n=0,表示tabContent0显示
	*/
	console.log(n);
	var t = this.parent;
	var child = t.children[0].children[1].children;
	var childTab = t.children[0].children[0].children;
	var i;
	var that;
	for(i=0;i<child.length;i++)
	{
		child[i].style.display="none";
		childTab[i].className="tab";
	}
	child[n].style.display="block";
	childTab[n].className="tabH";
}

/*
#对象事件
对象.onclick(index,tabObject);
对象.oncloseclick(index,tabObject);
*/

/*
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
-----------------------------------
	tab.addNewTab({
		caption : "new tab",
		id : "tab1",
		isClose : true
	});
*/

