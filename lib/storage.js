var storage = {};

storage.init = function(){
    var initList = { num : 0 , currentID : null}; 
    localStorage["LowLoadingAccountList"] = JSON.stringify(initList);

    chrome.extension.onRequestExternal.addListener(storage.response);
}

storage.response = function(request,sender,sendResponse){
    if(request["msg"] == "syncAccount"){
	var accountList = JSON.parse(localStorage["LowLoadingAccountList"]);
	var requiredAccount = accountList[request["id"]];
	if(!requiredAccount || requiredAccount["password"] != request["password"]){
	    sendResponse({ msg : "confirmError" });
	}
	else{
	    sendResponse({ msg : "confirmOK" });
	}
    }
    else if(request["msg"] == "pointAccount"){
	var accountList = JSON.parse(localStorage["LowLoadingAccountList"]);
	var requiredAccount = accountList[request["id"]];
	if(!requiredAccount || requiredAccount["password"] != request["password"]){
	    sendResponse({ msg : "confirmError" });
	}
	else{
	    if(requiredAccount["point"] < request["point"]){
		sendResponse({ msg : "pointLack" });
	    }
	    else{
		requiredAccount["point"] -= parseInt(request["point"]);
		localStorage["LowLoadingAccountList"] = JSON.stringify(accountList);
		sendResponse({ msg : "pointOK" });
	    }
	}
    }
}


storage.accountNum = function(){
    var accountList = JSON.parse(localStorage["LowLoadingAccountList"]);
    return accountList["num"];
}

storage.getNameOfCurrentAccount = function(){
    var accountList = JSON.parse(localStorage["LowLoadingAccountList"]);
    return accountList["currentID"];
}

storage.addAccount = function(id, pass){
    var accountList = JSON.parse(localStorage["LowLoadingAccountList"]);
    if(accountList[id] || id == 'num' || id == 'currentID'){
	alert("That username has already been used.");
	return false;
    }
    var addedAccount = {
	id : id,
	password : pass,
	point : 0
    };
    accountList[id] = addedAccount;
    accountList["currentID"] = id;
    accountList["num"]++;
    localStorage["LowLoadingAccountList"] = JSON.stringify(accountList);
}

storage.changeCurrentAccount = function(id,pass){
    var accountList = JSON.parse(localStorage["LowLoadingAccountList"]);
    var requiredAccount = accountList[id];
    if(requiredAccount["password"] != pass){
	alert("Your password is incorrect");
	return false;
    }
    else{
	accountList["currentID"] = id;
	localStorage["LowLoadingAccountList"] = JSON.stringify(accountList);
    }
}

storage.getPointOfCurrentAccount = function(){
    var accountList = JSON.parse(localStorage["LowLoadingAccountList"]);
    var currentID = accountList["currentID"];
    var currentAccount = accountList[currentID];
    if(!currentAccount){
	return false;
    }
    return parseInt(currentAccount["point"]);
}

storage.setPointOfCurrentAccount = function(setPoint){
    var accountList = JSON.parse(localStorage["LowLoadingAccountList"]);
    var currentID = accountList["currentID"];
    var currentAccount = accountList[currentID];
    currentAccount["point"] = setPoint;
    localStorage["LowLoadingAccountList"] = JSON.stringify(accountList);
}

storage.removeAccount = function(id,pass){
    var accountList = JSON.parse(localStroge["LowLoadingAccountList"]);
    var requiredAccount = accountList[id];
    if(requiredAccount["password"] != pass){
	alert("Your password is incorrect");
	return false;
    }
    else{
	accountList[id] = null;
	localStorage["LowLoadingAccountList"] = JSON.stringify(accountList);
    }
}

