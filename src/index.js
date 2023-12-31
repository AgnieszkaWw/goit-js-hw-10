// Nadal mam problem z Notflix
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const searchBox = document.getElementById('search-box');
const countryList = document.getElementById('country-list');
const countryInfo = document.getElementById('country-info');

const debounceSearchCountry = debounce(searchAnotherCountry, 300);

searchBox.addEventListener('input', debounceSearchCountry);

async function searchAnotherCountry() {
    const searchTerm = searchBox.value.trim();
    if (searchTerm === '') {
        clearResults();
        return;
    }

    try {
        const countries = await fetchCountries(searchTerm);

        if (countries.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (countries.length > 1) {
            displayCountryList(countries);
        } else {
            displayCountryInfo(countries[0]);
        }
    } catch (error) {
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
    }
}

function clearResults() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function displayCountryList(countries) {
    clearResults();
    const listItems = countries.map(country => {
        const listItem = document.createElement('div');
        listItem.className = 'country-item';
        listItem.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.official}">
            <span>${country.name.official}</span>
        `;
        listItem.addEventListener('click', () => displayCountryInfo(country));
        return listItem;
    });
    countryList.append(...listItems);
}

function displayCountryInfo(country) {
    clearResults();
    const countryCard = document.createElement('div');
    countryCard.className = 'country-card';
    countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.name.official}">
        <h2>${country.name.official}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${Object.values(country.languages).join(', ')}</p>
    `;
    countryInfo.appendChild(countryCard);
}
