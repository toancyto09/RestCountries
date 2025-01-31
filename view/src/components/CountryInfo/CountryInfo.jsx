import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  // const borders = country.map((country) => country.borders);

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        console.log(data)

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="country__info__wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

      {country?.map((country, index) => (
        <div className="country__info__container" key={index}>
          <div className="country__info-img">
            <img src={country.flags.png} alt="" />
          </div>

          <div className="country__info">
            <h3>{country.name.common}</h3>

            <div className="country__info-left">
              <h5>
                Population:{" "}
                <span>
                  {new Intl.NumberFormat().format(country.population)} people
                </span>
              </h5>
              <h5>
                Area:{" "}
                <span>
                  {new Intl.NumberFormat().format(country.area)} km2
                </span>
              </h5>
              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Currences: <span>{" "} {country.timezones} {" "}</span>
              </h5>
              <h5>
                Capital: <span>{country.capital}</span>
              </h5>
              <h5>
                Map: <a href={country.maps.googleMaps}>Click see map</a>
              </h5>
              {/* {console.log(country.currencies.MDL.name)} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
