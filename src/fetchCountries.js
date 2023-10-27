import Notiflix from 'notiflix';
export async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (response.status === 404) {
        throw new Error("Country not found");
    }
    const data = await response.json();
    return data;
}