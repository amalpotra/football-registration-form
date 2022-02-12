let userData

const registerUser = (formData) => {
	fetch('/api/v1/form', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status === 201) showMessage(successMessage, data.message)
			else if (data.status === 409)
				showMessage(warningMessage, 'User already exists')
			else showMessage(warningMessage, 'Failed to register')
		})
		.catch((error) => {
			showMessage(warningMessage, 'Stupid network error')
		})
}

const getUser = (userName) => {
	fetch(`/api/v1/form/${userName}`)
		.then((response) => response.json())
		.then((data) => {
			if (!data.status) {
				userData = data
				getButton.removeAttribute('disabled')
			} else getButton.setAttribute('disabled', '')
		})
		.catch((error) => {
			console.warn(`Stupid network error - ${error}`)
			getButton.setAttribute('disabled', '')
		})
}

const fillDetails = () => {
	firstName.value = userData.firstName
	validate('firstName')

	lastName.value = userData.lastName ?? ''
	validate('lastName')

	countryCodes.value = userData.countryCode

	phone.value = userData.phone
	validate('phone')

	email.value = userData.email
	validate('email')

	ageGroup.value = userData.ageGroup
	validate('ageGroup')

	desiredTeam.find((team) => team.value === userData.desiredTeam).checked = true
	validate('desiredTeam')

	desiredPosition.forEach((position) => (position.checked = false))
	userData.desiredPosition.forEach((userPos) => {
		desiredPosition.find(
			(position) => position.value === userPos
		).checked = true
	})
	validate('desiredPosition')

	address.value = userData.address.address ?? ''

	pincode.value = userData.address.pincode ?? ''
	validate('pincode')

	countries.value = userData.address.country
	validate('country')

	// Fetch states accordingly
	fetch('https://countriesnow.space/api/v0.1/countries/states', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			country: countries.options[countries.selectedIndex].text,
		}),
		redirect: 'follow',
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.data.states.length) {
				data.data.states.map((state, index) => {
					const option = document.createElement('option')
					option.innerText = state.name
					option.setAttribute('value', index + 1)
					states.append(option)
				})
				states.value = userData.address.state
				states.removeAttribute('disabled')
				validate('state')

				// Fetch cities accordingly
				fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						country: countries.options[countries.selectedIndex].text,
						state: states.options[states.selectedIndex].text,
					}),
					redirect: 'follow',
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.data.length) {
							data.data.map((city, index) => {
								const option = document.createElement('option')
								option.innerText = city
								option.setAttribute('value', index + 1)
								cities.append(option)
							})
							cities.value = userData.address.city
							cities.removeAttribute('disabled')
							validate('city')
						}
					})
					.catch(() => showMessage(warningMessage, 'Stupid network error'))
			}
		})
		.catch(() => showMessage(warningMessage, 'Stupid network error'))
}

const updateUser = (userName, formData) => {
	fetch(`/api/v1/form/${userName}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status === 200) showMessage(successMessage, data.message)
			else showMessage(warningMessage, 'Failed to update')
		})
		.catch((error) => {
			showMessage(warningMessage, 'Stupid network error')
		})
}
