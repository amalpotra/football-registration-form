//! Constants

const id = (id) => document.getElementById(id)

const userName = id('userName')
const firstName = id('firstName')
const lastName = id('lastName')
const countryCodes = id('countryCode')
const phone = id('phone')
const emailSwitch = id('emailSwitch')
const email = id('email')
const ageGroup = id('ageGroup')
const desiredTeam = Array.from(document.getElementsByName('desiredTeam'))
const desiredPosition = Array.from(
	document.getElementsByName('desiredPosition')
)
const address = id('address')
const pincode = id('pincode')
const countries = id('country')
const states = id('state')
const cities = id('city')
const form = id('form')
const submitButton = id('submitButton')
const getButton = id('getButton')
const updateButton = id('updateButton')
const warningMessage = id('alert-warning-message')
const successMessage = id('alert-success-message')

const validFields = [
	{ name: 'userName', isValid: false },
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

//! Helper functions

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
		case 'userName':
			return userName.value.match(/^[a-zA-Z]+$/)
				? setValid(userName)
				: setInvalid(userName)
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
			return desiredTeam.find((team) => team.checked)
				? desiredTeam.forEach((team) => setValid(team))
				: desiredTeam.forEach((team) => setInvalid(team))
		case 'desiredPosition':
			return desiredPosition.find((position) => position.checked)
				? desiredPosition.forEach((position) => setValid(position))
				: desiredPosition.forEach((position) => setInvalid(position))
	}
}

// Setting valid/invalid class to elements and flag the fields
const setValid = (node) => {
	node.classList.replace('is-invalid', 'is-valid') &&
		setTimeout(() => {
			node.classList.remove('is-valid')
		}, 3000)

	validFields.find(
		(field) => field.name === node.id || field.name === node.name
	).isValid = true
	if (!validFields.find((field) => field.isValid === false)) {
		submitButton.removeAttribute('disabled')
		updateButton.removeAttribute('disabled')
	}

	return true
}

const setInvalid = (node) => {
	node.classList.add('is-invalid')

	validFields.find(
		(field) => field.name === node.id || field.name === node.name
	).isValid = false
	submitButton.setAttribute('disabled', '')
	updateButton.setAttribute('disabled', '')

	return false
}

// Resetting selects
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

// Getters for selected team and positions
const getSelectedTeam = () => {
	const team = desiredTeam.find((team) => team.checked)
	return team ? team.value : null
}

const getSelectedPositions = () => {
	const positions = desiredPosition
		.filter((position) => position.checked)
		.map((position) => position.value)
	return positions.length ? positions : null
}

// Alert message
let messageTimeout
const showMessage = (node, message) => {
	node.innerText = message
	node.parentElement.classList.add('show')
	clearTimeout(messageTimeout)
	messageTimeout = setTimeout(
		() => node.parentElement.classList.remove('show'),
		4000
	)
}

// Collect form details
const collectFormDetails = () => ({
	userName: userName.value,
	firstName: firstName.value,
	lastName: lastName.value.trim(),
	countryCode: countryCodes.value,
	phone: phone.value,
	email: email.value,
	ageGroup: ageGroup.value,
	desiredTeam: getSelectedTeam(),
	desiredPosition: getSelectedPositions(),
	address: {
		address: address.value.trim(),
		pincode: pincode.value,
		country: countries.value,
		state: states.value,
		city: cities.value,
	},
})
