 require('/config.js');

export function getProducts() {
	return fetch('https://my-json-server.typicode.com/zmunetsi/wooclone/products')
	  .then(data => data.json())
  }