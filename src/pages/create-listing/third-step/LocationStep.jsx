import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useOutletContext } from "react-router";
import axios from "axios";

import './LocationStep.css'

function LocationStep() {
  const [countriesData, setCountriesData] = useState([]);
  const [cities, setCities] = useState([]);

  const {setIsStepValid, listing, setListing} = useOutletContext();

  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    mode: 'onChange',
    defaultValues : {
      country: listing.location.country || '',
      city: listing.location.city || '',
      street: listing.location.street || '',
    }
  })

  useEffect(() => {
    async function fetchCountries() {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries')
        console.log(response.data.data)
        setCountriesData(response.data.data)
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    setIsStepValid(isValid)
  }, [isValid])

  function onSuccess(data) {
    const getCountryData = countriesData.find(countryData => countryData.iso2 === data.country);
    const countryName = getCountryData.country;
    const updatedData = {
      country: countryName,
      city: data.city,
      street: data.street,
      iso2: getCountryData.iso2
    }

    setListing(prev => ({
      ...prev,
      location: updatedData
    }))
    console.log(updatedData)
  }

  async function fetchCitiesOfCountry(e) {

    if (e.target.value === '') {
      setCities([])
      return
    }
    const getCountryData = countriesData.find(countryData => countryData.iso2 === e.target.value);
    const countryName = getCountryData.country;
    console.log(countryName)
    const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
      country : countryName
    });
    console.log(response.data.data)
    setCities(response.data.data)
  }

  return (
    <div className="location">
      <div className="location__header">
        <h1 className="location__title">Where is your place located?</h1>
        <p className="location__desc">
          Help guests find your place easily.
        </p>
      </div>

      <form className="location__form" onSubmit={handleSubmit(onSuccess)}>
        <div className="location__field">
          <label className="location__label">Country</label>
          <select
            className="location__select"
            {...register('country', {
            required: {value: true, message: 'Please choose country!'},
            onChange: fetchCitiesOfCountry,
            validate: value => value !== '' || 'Please choose country!'
            })}
          >
            <option value=''>Select country</option>

            {countriesData.map(countryData => {
                return (
                    <option key={countryData.iso2} value={countryData.iso2}>{countryData.country}</option>
                )
            })}
          </select>
          {errors.country && <small className="location__error">{errors.country.message}</small>}
        </div>

        <div className="location__field">
          <label className="location__label">City</label>
          <select className="location__select" disabled={!cities.length} {...register('city', {
            required: {value: true, message: 'Please choose city!'},
            validate: value => value !== '' || 'Please choose country!'
          })}>
            <option value=''>Select city</option>
            {cities.map(city => <option key={city}>{city}</option>)}
          </select>
          {errors.city && <small className="location__error">{errors.city.message}</small>}
        </div>

        <div className="location__field">
          <label className="location__label">Street / Address</label>
          <input
            type="text"
            className="location__input"
            placeholder="Enter address"
            {...register('street', {
            required: {value: true, message: 'Street / Address is required'}
          })}
          />
          {errors.street && <small className="location__error">{errors.street.message}</small>}
        </div>

        <button className="location__btn" disabled={!isValid}>Confirm</button>
      </form>
    </div>
  );
}

export default LocationStep;