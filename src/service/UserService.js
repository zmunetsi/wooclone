require('/config.js');

export function login(data) {
  let formData = new FormData();
  formData.append('username', data.username)
  formData.append('password', data.password)
  formData.append('action', 'user_login')

	return fetch( ajax_url ,
		{
			method: 'POST',
			body: formData
			
		} )
	  .then(data => data.json())
  }

  export function Logout() {
	return fetch(api_endpoint)
	  .then(data => data.json())
  }

  export function register() {
	return fetch(api_endpoint)
	  .then(data => data.json())
  }

