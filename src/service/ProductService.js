 require('/config.js');

export function getProducts() {
	return fetch(api_endpoint)
	  .then(data => data.json())
  }