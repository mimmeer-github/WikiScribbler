/*
 ______     ______   ______     __  __     ______     ______   
/\  ___\   /\  == \ /\  == \   /\ \/\ \   /\  ___\   /\  ___\  
\ \___  \  \ \  _-/ \ \  __<   \ \ \_\ \  \ \ \____  \ \  __\  
 \/\_____\  \ \_\    \ \_\ \_\  \ \_____\  \ \_____\  \ \_____\
  \/_____/   \/_/     \/_/ /_/   \/_____/   \/_____/   \/_____/
                                                               
 ______   ______     ______     ______     ______     ______   
/\  == \ /\  __ \   /\  == \   /\  ___\   /\  ___\   /\  == \  
\ \  _-/ \ \  __ \  \ \  __<   \ \___  \  \ \  __\   \ \  __<  
 \ \_\    \ \_\ \_\  \ \_\ \_\  \/\_____\  \ \_____\  \ \_\ \_\
  \/_/     \/_/\/_/   \/_/ /_/   \/_____/   \/_____/   \/_/ /_/

Version 1.0.0
Made by Mimmeer
*/
function parseChild(child, parentArray, rootXml) {
  const rootElement = rootXml.getElementsByTagName("ws")[0];
  const articleElement = rootElement.getElementsByTagName("article")[0];
  const elementData = { //create a new object
    tag_name: child.tagName,
    contents: "", // Start with empty content
    children: [] // Array for children
  };

  if (child.nodeType === 3) { // 3 is Node.TEXT_NODE
    elementData.contents = child.textContent;
  }

  if (child.nodeType === 3 && parentArray != articleElement) {
  }
  else {
	  parentArray.push(elementData); // Add to the parent
	  for (let i = 0; i < child.childNodes.length; i++) { //childNodes
    		parseChild(child.childNodes[i], elementData.children); // Recursive call
  	  }
  }
}

function parse(xml) {
	var rootElement = xml.getElementsByTagName("ws")[0];
	var infoElement = rootElement.getElementsByTagName("info")[0];
	var articleElement = rootElement.getElementsByTagName("article")[0];
	var pageContents = [];
	for (let i = 0; i < articleElement.childNodes.length; i++) {
		var element = articleElement.childNodes[i];
		parseChild(element, pageContents, xml);
	}
	var title = infoElement.getElementsByTagName("title")[0];
	var page = { "title": title.textContent, "contents": pageContents };
	
	console.log(page);
}

// START OF RUN
// This fetches the code, then parses it.
fetch('./wiki/pages/index.xml') //  path to your WikiScriber file
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text(); // Get the content of the file as text
  })
  .then(data => {
    //  'data' will contain the content of your index.ws file
    console.log(data);
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(data,"text/xml");
	const parsedData = parse(xmlDoc);
    
  })
  .catch(error => {
    //  error occurred during the fetch
    console.error('Fetch error:', error);
  });
