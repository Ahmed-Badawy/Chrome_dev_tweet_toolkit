// alert('hi');

// function twitter_share(text){
// 	var share_text = "http://twitter.com/share?text="+text;
// 	chrome.tabs.create({url:share_text});
// }


// function selection_click(text){
// 	console.log(text);
// 	alert("Selection Text: "+text.selectionText);
// 	twitter_share(text.selectionText);
// }
// chrome.contextMenus.create({
// 	title 		: "twitter social Toolkit",
// 	contexts 	: ['selection'],
//    	onclick		: selection_click
// })


var contextList = ['selection','link','image','page','audio','video','editable'];

contextList.forEach(function(context){
	var title = "Sharing: "+context;
	chrome.contextMenus.create({
		title		: title,
		contexts 	: [context],
		onclick 	: share_it,
		id 			: context
	});
});



function share_it(data,tab){
	var tab_obj = chrome.windows; //it can be [ chrome.tabs OR chrome.windows ] means in a new tab or a new window
	var type = "panel"; //this can be eigther null or panel ( if you choose chrome.tabs you can't define type property)

	var t_share = "https://twitter.com/intent/tweet?";
	var create_obj = {};

	switch(data.menuItemId){
		case "selection":
			create_obj.url = t_share+"text="+encodeURIComponent(data.selectionText);
			if(type!=null && (tab_obj==chrome.windows)) create_obj.type = type;
			tab_obj.create(create_obj);
			break;
		case "link":
			create_obj.url = t_share+"url="+encodeURIComponent(data.linkUrl);
			if(type!=null && (tab_obj==chrome.windows)) create_obj.type = type;
			tab_obj.create(create_obj);
			break;
		case "image":
			create_obj.url = t_share+"url="+encodeURIComponent(data.srcUrl);
			if(type!=null && (tab_obj==chrome.windows)) create_obj.type = type;
			tab_obj.create(create_obj);
			break;
		case "page":
			create_obj.url = t_share+"text="+encodeURIComponent(tab.title)+"&url="+encodeURIComponent(data.pageUrl);
			if(type!=null && (tab_obj==chrome.windows)) create_obj.type = type;
			tab_obj.create(create_obj);
			break;
		case "video":
			create_obj.url = t_share+"url="+data.pageUrl
			if(type!=null && (tab_obj==chrome.windows)) create_obj.type = type;
			tab_obj.create(create_obj);
			break;	
		case "audio":
			create_obj.url = t_share+"url="+data.srcUrl
			if(type!=null && (tab_obj==chrome.windows)) create_obj.type = type;
			tab_obj.create(create_obj);
			break;	
		case "editable":
			create_obj.url = t_share+"url="+data.pageUrl
			if(type!=null && (tab_obj==chrome.windows)) create_obj.type = type;
			tab_obj.create(create_obj);
			break;	
		default:
			console.log(data);
			break;	
	}

}




