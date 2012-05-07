var options = {};


$(function(){
    options.init();
    $("#register").click(options.registerAccount);
    $("div#account").delegate("#changeAccount","click",options.changeAccount);
    $("div#account").delegate("#changeAccountSubmit","click",options.changeAccountSubmit);
    $("div#account").delegate("#addAccount","click",options.addAccount);
    $("#information").click(options.changeToInformation);
    $("#setting").click(options.changeToSetting);
});

options.init = function(){
    if(storage.accountNum() == 0){
	$("div#account").html("Username : <input type='text' size='30' id='registeredID'/><br>Password : <input type='password' size='30' id='registeredPass'/><br>Confirm : <input type='password' size='30'id='registeredPassConfirm'/><br><div id='explanation'>If you don't have any account, please make your own account.</div><br><input type='button' value='Register' id='register'/>");
    }
    else{
	var currentID = storage.getNameOfCurrentAccount();
	$("div#account").html("<div id='currentAccount'>Username : <strong>"+currentID+"</strong></div><br><div id='yourPoint'>Your point is <strong>"+storage.getPointOfCurrentAccount()+"</strong></div><br><input type='button' value='Change account' id='changeAccount'/><input type='button' value='Add account' id='addAccount'/>");
    }
}

options.registerAccount = function(){
    var id = $("#registeredID").val();
    var pass = $("#registeredPass").val();
    if(!id || !pass){
	alert("Please input your username and password!");
	return false;
    }
    var confirm_pass = $("#registeredPassConfirm").val();
    if(pass != confirm_pass){
	alert("Please your password");
	return false;
    }
    else{
	storage.addAccount(id,pass);
    }
    chrome.tabs.getSelected(null,options.reload);
}

options.changeAccount = function(){
    $("div#account").html("Please input your username and password.<br><br>Username :<input type='text' size='30' id='changeWithID' /><br>Password :<input type='password' size='30' id='changeWithPass'/><br><input type='button' value='change' id='changeAccountSubmit'/>");
}

options.changeAccountSubmit = function(){
    var id = $("#changeWithID").val();
    var pass = $("#changeWithPass").val();
    if(!id || !pass){
	alert("Please input your password");
	return false;
    }
    if(storage.changeCurrentAccount(id,pass)){
	$("div#account").html("アカウントを"+id+"に変更しました");
    }
    chrome.tabs.getSelected(null,options.reload);
}

options.addAccount = function(){
    $("div#account").html("Username : <input type='text' size='30' id='registeredID'/><br>Password : <input type='password' size='30' id='registeredPass'/><br>Confirm : <input type='password' size='30'id='registeredPassConfirm'/><br><div id='explanation'>If you don't have any account, please make your own account.</div><br><input type='button' value='Register' id='register'/>");
    $("#register").click(options.registerAccount);
}


options.reload = function(tab){
    var tabURL = tab.url;
    var tabID = tab.id;
    var updateProperties = {url : tabURL , selected : true};
    chrome.tabs.update(tabID,updateProperties,null);
}

options.changeToSetting = function(){
    $(".setting-contents").css("visibility","visible");
    $(".information-contents").css("visibility","hidden");
}

options.changeToInformation = function(){
    $(".setting-contents").css("visibility","hidden");
    $(".information-contents").css("visibility","visible");
}