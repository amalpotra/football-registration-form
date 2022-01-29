countries = document.getElementById('country')
states = document.getElementById('state')
cities = document.getElementById('city')
countryCodes = document.getElementById('country-code')

let countryData = []

document.addEventListener('DOMContentLoaded', () => {
	fetch('https://countriesnow.space/api/v0.1/countries/codes')
		.then((response) => response.json())
		.then((data) => {
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
					countryCodes.appendChild(optionCode)

					optionCountry.innerText = country.name
					countries.appendChild(optionCountry)
				})

			countryCodes.removeAttribute('disabled')
			countries.removeAttribute('disabled')

			// Setting +91 as default
			countryCodes.value = '+91'
			countryCodes.dispatchEvent(new Event('change'))
		})
		.catch((error) => {
			console.warn(`Stupid network error! - ${error.message}`)
		})
})

countryCodes.addEventListener('change', () => {
	countries.value = countryData.find(
		(country) => country.dial_code == countryCodes.value
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
	})
		.then((response) => response.json())
		.then((data) => {
			resetSelect(states, 'country')

			data.data.states.map((state) => {
				const option = document.createElement('option')
				option.innerText = state.name
				states.appendChild(option)
			})
			states.removeAttribute('disabled')
		})
		.catch((error) => {
			console.warn(`Stupid network error! - ${error.message}`)
		})
		.finally(() => {
			if (!cities.hasAttribute('disabled')) {
				resetSelect(cities, 'country')
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
	})
		.then((response) => response.json())
		.then((data) => {
			resetSelect(cities, 'state')

			data.data.map((city) => {
				const option = document.createElement('option')
				option.innerText = city
				cities.appendChild(option)
			})
			cities.removeAttribute('disabled')
		})
		.catch((error) => {
			console.warn(`Stupid network error! - ${error.message}`)
		})
})

const resetSelect = (node, from) => {
	while (node.firstChild) {
		node.firstChild.remove()
	}

	const option = document.createElement('option')
	option.setAttribute('selected', '')
	option.setAttribute('hidden', '')

	if (node.id === 'city' && from === 'country')
		option.innerText = `Select the state first`
	else option.innerText = `Select the ${node.id} now`

	node.appendChild(option)
}
