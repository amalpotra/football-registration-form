const id = (id) => document.getElementById(id)

const userName = id('userName')
const firstName = id('firstName')
const lastName = id('lastName')
const countryCodes = id('countryCode')
const phone = id('phone')
const emailSwitch = id('emailSwitch')
const email = id('email')
const ageGroup = id('ageGroup')
const desiredTeam = document.getElementsByName('desiredTeam')
const desiredPosition = document.getElementsByName('desiredPosition')
const address = id('address')
const pincode = id('pincode')
const countries = id('country')
const states = id('state')
const cities = id('city')
const form = id('form')
const submitButton = id('submitButton')

const validFields = [
	{ name: 'firstName', isValid: false },
	{ name: 'lastName', isValid: true },
	{ name: 'phone', isValid: false },
	{ name: 'email', isValid: false },
	{ name: 'ageGroup', isValid: false },
	{ name: 'desiredTeam', isValid: false },
	{ name: 'desiredPosition', isValid: false },
	{ name: 'pincode', isValid: true },
	{ name: 'country', isValid: false },
	{ name: 'state', isValid: false },
	{ name: 'city', isValid: false },
]

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
			console.warn(`Stupid network error! - ${error.message}`)
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
			console.warn(`Stupid network error! - ${error.message}`)
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
			console.warn(`Stupid network error! - ${error.message}`)
		})
		.finally(() => {
			validate('state')
		})
})

const resetSelect = (node, to = '0') => {
	node.value = to
	node.length = 2

	// Update their status flags after changing the values, showing no invalid message
	if (to === '0') {
		validFields.find((field) => field.name === node.id).isValid = false
		submitButton.setAttribute('disabled', '')
	} else {
		validFields.find((field) => field.name === node.id).isValid = true
		!validFields.find((field) => field.isValid === false) &&
			submitButton.removeAttribute('disabled')
	}
}

emailSwitch.addEventListener('change', () => {
	email.hasAttribute('disabled')
		? email.removeAttribute('disabled')
		: email.setAttribute('disabled', '')
})

// Debounce user inputs
const debounce = (func, timeout = 500) => {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

// Validator
const validate = (id) => {
	switch (id) {
		case 'username':
			// Some db magic
			return
		case 'firstName':
			return firstName.value.match(/^[a-zA-Z]+$/)
				? setValid(firstName)
				: setInvalid(firstName)
		case 'lastName':
			return lastName.value.match(/^[a-zA-Z\s]*$/)
				? setValid(lastName)
				: setInvalid(lastName)
		case 'phone':
			return phone.value.match(/^[1-9]\d{9}$/)
				? setValid(phone)
				: setInvalid(phone)
		case 'email':
			return email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
				? setValid(email)
				: setInvalid(email)
		case 'ageGroup':
			return ageGroup.value ? setValid(ageGroup) : setInvalid(ageGroup)
		case 'pincode':
			return pincode.value.length === 0 || pincode.value.match(/^[1-9]\d{5}$/)
				? setValid(pincode)
				: setInvalid(pincode)
		case 'country':
			return countries.value !== '0'
				? setValid(countries)
				: setInvalid(countries)
		case 'state':
			return states.value !== '0' ? setValid(states) : setInvalid(states)
		case 'city':
			return cities.value !== '0' ? setValid(cities) : setInvalid(cities)
		case 'desiredTeam':
			return Array.from(desiredTeam).find((team) => team.checked)
				? desiredTeam.forEach((team) => setValid(team))
				: desiredTeam.forEach((team) => setInvalid(team))
		case 'desiredPosition':
			return Array.from(desiredPosition).find((position) => position.checked)
				? desiredPosition.forEach((position) => setValid(position))
				: desiredPosition.forEach((position) => setInvalid(position))
	}
}

// Helpers for setting valid/invalid class to elements and flag the fields
const setValid = (node) => {
	node.classList.replace('is-invalid', 'is-valid') &&
		setTimeout(() => {
			node.classList.remove('is-valid')
		}, 3000)

	validFields.find(
		(field) => field.name === node.id || field.name === node.name
	).isValid = true
	!validFields.find((field) => field.isValid === false) &&
		submitButton.removeAttribute('disabled')

	return true
}

const setInvalid = (node) => {
	node.classList.add('is-invalid')

	validFields.find(
		(field) => field.name === node.id || field.name === node.name
	).isValid = false
	submitButton.setAttribute('disabled', '')

	return false
}

// HTML encoder
const htmlEncode = (str) => {
	return String(str).replace(/[^\w. ]/gi, (c) => {
		return '&#' + c.charCodeAt(0) + ';'
	})
}

// Event listeners for validations
userName.addEventListener('input', () => {
	// Left off as per backend implementation
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

// Event listener for form submission
form.addEventListener('submit', (event) => {
	event.preventDefault()
})
