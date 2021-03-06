require('/config.js');

export function login(data) {
	let formData = new FormData();
	formData.append('username', data.username)
	formData.append('password', data.password)
	formData.append('action', 'user_login')

	return fetch(ajax_url,
		{
			method: 'POST',
			body: formData

		})
		.then(data => data.json())
}

export function logout() {
	let formData = new FormData();
	formData.append('action', 'user_logout')

	return fetch(ajax_url,
		{
			method: 'POST',
			body: formData

		})
		.then(data => data.json())
}

export function register( data ) {
	let formData = new FormData();
	formData.append('firstname', data.firstname)
	formData.append('username', data.username)
	formData.append('password', data.password)
	formData.append('action', 'user_register')

	return fetch(ajax_url,
		{
			method: 'POST',
			body: formData

		})
		.then(response => response.json())
}

