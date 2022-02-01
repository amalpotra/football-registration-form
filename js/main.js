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

const countryData = []

const validFields = [
	{ name: 'firstName', isValid: false },
	{ name: 'lastName', isValid: true },
	{ name: 'phone', isValid: false },
	{ name: 'email', isValid: false },
	{ name: 'ageGroup', isValid: false },
	{ name: 'desiredTeam', isValid: false },
	{ name: 'desiredPosition', isValid: false },
	{ name: 'address', isValid: true },
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
				.map((country) => {
					const optionCode = document.createElement('option')
					const optionCountry = document.createElement('option')

					countryData.push({ name: country.name, dial_code: country.dial_code })

					optionCode.innerText = `${country.dial_code.padEnd(7, '\u2002')} - ${
						country.name
					}`
					optionCode.setAttribute('value', country.dial_code)
					countryCodes.append(optionCode)

					optionCountry.innerText = country.name
					countries.append(optionCountry)
				})

			countryCodes.removeAttribute('disabled')
			countries.removeAttribute('disabled')

			// Setting +91 as default and carry usual event triggering
			countryCodes.value = '+91'
			countryCodes.dispatchEvent(new Event('change'))
		})
		.catch((error) => {
			console.warn(`Stupid network error! - ${error.message}`)
		})

	// Focus firstName
	firstName.focus()
})

countryCodes.addEventListener('change', () => {
	countries.value = countryData.find(
		(country) => country.dial_code === countryCodes.value
	).name
	countries.dispatchEvent(new Event('change'))
})

countries.addEventListener('change', () => {
	fetch('https://countriesnow.space/api/v0.1/countries/states', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ country: countries.value }),
		redirect: 'follow',
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.error) throw new Error('Something went wrong!')

			resetSelect(states)

			data.data.states.map((state) => {
				const option = document.createElement('option')
				option.innerText = state.name
				states.append(option)
			})
			states.removeAttribute('disabled')
		})
		.catch((error) => {
			console.warn(`Stupid network error! - ${error.message}`)
		})
		.finally(() => {
			if (!cities.hasAttribute('disabled')) {
				resetSelect(cities)
				cities.setAttribute('disabled', '')
			}
		})
})

states.addEventListener('change', () => {
	fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ country: countries.value, state: states.value }),
		redirect: 'follow',
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.error) throw new Error('Something went wrong!')

			resetSelect(cities)

			data.data.map((city) => {
				const option = document.createElement('option')
				option.innerText = city
				cities.append(option)
			})
			cities.removeAttribute('disabled')
		})
		.catch((error) => {
			console.warn(`Stupid network error! - ${error.message}`)
		})
})

const resetSelect = (node) => {
	while (node.children.length > 1) {
		node.lastChild.remove()
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

// Validation functions
const checkUsername = () => {
	// Some db magic
}

const validateFirstName = () =>
	firstName.value.match(/^[a-zA-Z]+$/)
		? setValid(firstName)
		: setInvalid(firstName)

const validateLastName = () =>
	lastName.value.match(/^[a-zA-Z\s]*$/)
		? setValid(lastName)
		: setInvalid(lastName)

const validatePhone = () =>
	phone.value.match(/^[1-9]\d{9}$/) ? setValid(phone) : setInvalid(phone)

const validateEmail = () =>
	email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
		? setValid(email)
		: setInvalid(email)

const validateAgeGroup = () =>
	ageGroup.value ? setValid(ageGroup) : setInvalid(ageGroup)

const validateDesiredTeam = () => {
	Array.from(desiredTeam).find((team) => team.checked)
		? desiredTeam.forEach((team) => setValid(team))
		: desiredTeam.forEach((team) => setInvalid(team))
}

const validateDesiredPosition = () => {
	Array.from(desiredPosition).find((position) => position.checked)
		? desiredPosition.forEach((position) => setValid(position))
		: desiredPosition.forEach((position) => setInvalid(position))
}

const validatePincode = () =>
	pincode.value.length === 0 || pincode.value.match(/^[1-9]\d{5}$/)
		? setValid(pincode)
		: setInvalid(pincode)

const validateCountry = () =>
	countries.value ? setValid(countries) : setInvalid(countries)

const validateState = () =>
	states.value ? setValid(states) : setInvalid(states)

const validateCity = () =>
	cities.value ? setValid(cities) : setInvalid(cities)

// Helpers for setting valid/invalid class to elements
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

// Event listeners for validations
userName.addEventListener('input', () => {
	// Left off as per backend implementation
})

firstName.addEventListener(
	'input',
	debounce(() => validateFirstName())
)

lastName.addEventListener(
	'input',
	debounce(() => validateLastName())
)

phone.addEventListener(
	'input',
	debounce(() => validatePhone())
)

email.addEventListener(
	'input',
	debounce(() => validateEmail())
)

ageGroup.addEventListener('change', validateAgeGroup)

desiredTeam.forEach((team) =>
	team.addEventListener('change', validateDesiredTeam)
)

desiredPosition.forEach((position) =>
	position.addEventListener('change', validateDesiredPosition)
)

pincode.addEventListener(
	'input',
	debounce(() => validatePincode())
)

countries.addEventListener('change', validateCountry)

states.addEventListener('change', validateState)

cities.addEventListener('change', validateCity)

// Event listener for form submission
form.addEventListener('submit', (event) => {
	event.preventDefault()
})
