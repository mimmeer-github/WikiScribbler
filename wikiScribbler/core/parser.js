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

Version 1.0.0-rc.5
Made by Mimmeer
*/
function parseChild(child, parentArray, parentObject = null) {
  var elementData = {
    type: child.tagName, // Use 'type' instead of 'tag_name'
    content: "", // Changed from 'contents' to 'content'
    children: []
  };

  if (child.nodeType === 3) {
    //handle text
    if (parentObject != null) {
      //if has parent
      if (child.textContent.trim() != null && child.textContent.trim() != "\n") {
        parentObject.children.push({  //add to parent's children
            type: "sys.text",
            content: child.textContent
        });
      }
    } else {
      //if no parent, make para
      elementData.type = 'para';
      elementData.content = child.textContent;
      parentArray.push(elementData);
    }
  } else if (child.nodeType === 1) {
    //handle element
    parentArray.push(elementData);
    if (child.tagName === "code") {
      elementData.content = child.textContent;
    } else {
      for (let i = 0; i < child.childNodes.length; i++) {
        parseChild(child.childNodes[i], elementData.children, elementData);
      }
    }
  }
}

function parse(xml) {
  var rootElement = xml.getElementsByTagName("ws")[0];
  var infoElement = rootElement.getElementsByTagName("info")[0];
  var articleElement = rootElement.getElementsByTagName("article")[0];
  var pageContents = [];
  for (let i = 0; i < articleElement.childNodes.length; i++) {
    const child = articleElement.children[i];
    parseChild(child, pageContents);
  }
  var title = infoElement.getElementsByTagName("title")[0];
  var page = {
    title: title.textContent,
    contents: pageContents
  };

  console.log(page);
  return page;
}

// START OF RUN
// This fetches the code, then parses it.
fetch('./wiki/pages/index.xml')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "text/xml");
    const parsedData = parse(xmlDoc);
    console.log(parsedData);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

