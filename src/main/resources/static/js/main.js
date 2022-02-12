// Wait for DOM to load before fetching API
document.addEventListener('DOMContentLoaded', () => {
	fetch('https://countriesnow.space/api/v0.1/countries/codes', {
		method: 'GET',
		redirect: 'follow',
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.error) throw new Error('Something went wrong!')

			data.data
				.filter((country) => !country.dial_code.includes(' '))
				.map((country, index) => {
					const optionCode = document.createElement('option')
					const optionCountry = document.createElement('option')

					optionCode.innerText = `${country.dial_code.padEnd(7, '\u2002')} - ${
						country.name
					}`
					optionCode.setAttribute('value', index + 1)
					countryCodes.append(optionCode)

					optionCountry.innerText = country.name
					optionCountry.setAttribute('value', index + 1)
					countries.append(optionCountry)
				})

			countryCodes.removeAttribute('disabled')
			countries.removeAttribute('disabled')

			// Setting +91 as default and carry usual event triggering
			countryCodes.value = '90'
			countryCodes.dispatchEvent(new Event('change'))
		})
		.catch((error) => {
			showMessage(warningMessage, 'Stupid network error')
		})

	// Focus firstName
	firstName.focus()
})

countryCodes.addEventListener('change', () => {
	countries.value = countryCodes.value
	countries.dispatchEvent(new Event('change'))
})

countries.addEventListener('change', () => {
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
			if (data.error) throw new Error('Something went wrong!')

			if (!data.data.states.length) {
				resetSelect(states, '-1')
				resetSelect(cities, '-1')
				states.setAttribute('disabled', '')
			} else {
				resetSelect(states)

				data.data.states.map((state, index) => {
					const option = document.createElement('option')
					option.innerText = state.name
					option.setAttribute('value', index + 1)
					states.append(option)
				})
				states.removeAttribute('disabled')
			}
		})
		.catch((error) => {
			showMessage(warningMessage, 'Stupid network error')
		})
		.finally(() => {
			states.value === '0' && resetSelect(cities)
			cities.setAttribute('disabled', '')

			validate('country')
		})
})

states.addEventListener('change', () => {
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
			if (data.error) throw new Error('Something went wrong!')

			if (!data.data.length) {
				resetSelect(cities, '-1')
				cities.setAttribute('disabled', '')
			} else {
				resetSelect(cities)

				data.data.map((city, index) => {
					const option = document.createElement('option')
					option.innerText = city
					option.setAttribute('value', index + 1)
					cities.append(option)
				})
				cities.removeAttribute('disabled')
			}
		})
		.catch((error) => {
			showMessage(warningMessage, 'Stupid network error')
		})
		.finally(() => {
			validate('state')
		})
})

//! Event listeners

document.querySelectorAll('.btn-close').forEach((btn) => {
	btn.addEventListener('click', () => {
		btn.parentElement.classList.remove('show')
	})
})

const debouncedUserName = debounce(() => getUser(userName.value), 700)
userName.addEventListener('input', () => {
	updateButton.setAttribute('hidden', '')
	submitButton.removeAttribute('hidden')

	validate('userName')
		? debouncedUserName()
		: getButton.setAttribute('disabled', '')
})

firstName.addEventListener(
	'input',
	debounce(() => validate('firstName'))
)

lastName.addEventListener(
	'input',
	debounce(() => validate('lastName'))
)

phone.addEventListener(
	'input',
	debounce(() => validate('phone'))
)

emailSwitch.addEventListener('change', () => {
	email.hasAttribute('disabled')
		? email.removeAttribute('disabled')
		: email.setAttribute('disabled', '')
})

email.addEventListener(
	'input',
	debounce(() => validate('email'))
)

ageGroup.addEventListener('change', () => validate('ageGroup'))

desiredTeam.forEach((team) =>
	team.addEventListener('change', () => validate('desiredTeam'))
)

desiredPosition.forEach((position) =>
	position.addEventListener('change', () => validate('desiredPosition'))
)

pincode.addEventListener(
	'input',
	debounce(() => validate('pincode'))
)

cities.addEventListener('change', () => validate('city'))

form.addEventListener('submit', (event) => {
	event.preventDefault()
	registerUser(collectFormDetails())
})

getButton.addEventListener('click', () => {
	fillDetails()
	updateButton.removeAttribute('hidden')
	submitButton.setAttribute('hidden', '')
})

updateButton.addEventListener('click', () => {
	updateUser(userName.value, collectFormDetails())
})
