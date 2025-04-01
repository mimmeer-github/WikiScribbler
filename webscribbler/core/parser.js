function parse(xml) {
	var rootElement = xml.getElementsByTagName("ws")[0];
	var infoElement = rootElement.getElementsByTagName("info")[0];
	var page = [];
	var title = infoElement.getElementsByTagName("title")[0];
	page.push({ "tag_name": "title", "contents": title.textContent });
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
