

chrome.storage.sync.get("toastValue", function (val) {

	var toastValue = 11;

	if (val.toastValue){
		toastValue = Number(val.toastValue);
	}

	walk(document.body, toastValue);

});



function walk(node, toastValue) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	// if (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea') {
	// 	return;
	// }

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child, toastValue);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node, toastValue);
			break;
	}
}


function handleText(textNode, toastValue) 
{

	var text = textNode.nodeValue;
	var money = 0;
	var avocados = 0;
	var avocadoCost = toastValue;


	var currency = text.match(/\$[\$^0-9\.\,]+ trillion|\$[\$^0-9\.\,]+ billion|\$[\$^0-9\.\,]+ million|\$[\$^0-9\.\,]+/g);

	if (currency){

		for (var i = 0; i<currency.length; i++){

			money = Number(currency[i].replace(/[^0-9\.]+/g,""));
			if (currency[i].includes("million")){
				money *= 1000000
			}
			else if (currency[i].includes("billion")){
				money *= 1000000000
			}
			else if (currency[i].includes("trillion")){
				money *= 1000000000000
			}

			avocados = money / avocadoCost;

			avocados = avocados.toLocaleString(undefined, {maximumFractionDigits:3});

			newString = avocados + " avocado toasts ";
			text = text.replace(currency[i], newString);
		}
	}
	
	textNode.nodeValue = text;
}


