import { useState, useEffect } from 'react';

import './App.css';

function App() {
    // api url and parameters
    const apiParameters = {
        city: 'Paris',
        days: '2',
        units: 'metric'
    };
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${apiParameters.city}&cnt=${apiParameters.days}&units=${apiParameters.units}&appid=${process.env.REACT_APP_API_KEY}`;

    // State variables
    const [dataValues, setDataValues] = useState([]);
    const [error, setError] = useState(null);

    // Fetch weather data on component mount (useEffect ensures the API call is made after the component has rendered)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Options for date formatting
                const dateOptions = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };

                // Map weather data with a cleaner date format
                const dataArray = data.list.map((day) => {
                    const timeStampinMs = day.dt * 1000;
                    const timeStampFormater = new Date(
                        timeStampinMs
                    ).toLocaleDateString('fr-FR', dateOptions);
                    // set date to an array of element
                    const dateArray = timeStampFormater.split(' ');

                    return {
                        date: {
                            dayOfWeek: dateArray[0],
                            dayOfMonth: dateArray[1],
                            month: dateArray[2]
                        },
                        min: day.temp.min,
                        max: day.temp.max
                    };
                });
                setDataValues(dataArray);
                setError(false);
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des données météo',
                    error
                );
                setError(true);
            }
        }
        fetchData();
    }, []);

    // calculte the average temp
    function calculateAverageTemp() {
        if (dataValues.length === 0) {
            return 0;
        }
        // Sum of max and min temp
        const totalTemperature = dataValues.reduce(
            (accumulator, day) => accumulator + day.min + day.max,
            0
        );
        const averageTemperature = totalTemperature / (dataValues.length * 2);
        return Math.round(averageTemperature * 100) / 100;
    }

    return (
        <>
            <header>
                <h1>Weather forecast</h1>
                {error && (
                    <p>
                        Oups, il semblerait qu'il y ait eu un problème avec la
                        récupération des données
                    </p>
                )}
                {!error && <p>next {apiParameters.days} days</p>}
            </header>

            {!error && (
                <main>
                    <section className="filter" id="filter">
                        {/* component */}
                        <div className="filter__container">
                            <p className="filter__p">
                                <span className="filter__label">min temp</span>
                                <span className="filter__value">20</span>
                            </p>
                            <input
                                type="range"
                                name="filter__range"
                                id="filter__range1"
                                className="filter__range"
                            />
                        </div>
                        <div className="filter__container">
                            <p className="filter__p">
                                <span className="filter__label">max temp</span>
                                <span className="filter__value">20</span>
                            </p>
                            <input
                                type="range"
                                name="filter__range"
                                id="filter__range2"
                                className="filter__range"
                            />
                        </div>
                    </section>
                    <section className="weather-display" id="weather-display">
                        {dataValues.map((data, index) => {
                            return (
                                <div
                                    key={`weather-display__card-${index}`}
                                    className="weather-display__card"
                                >
                                    <div className="weather-display__icon">
                                        *
                                    </div>
                                    <div className="weather-display__date">
                                        <p>
                                            <span className="weather-display__day">
                                                {data.date.dayOfWeek}
                                            </span>
                                            <span className="weather-display__number">
                                                {data.date.dayOfMonth}
                                            </span>
                                            <span className="weather-display__month">
                                                {data.date.month}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="weather-display__temp">
                                        <p className="weather-display__temp-min">
                                            <span>min temp</span>
                                            <span>{data.min}°C</span>
                                        </p>
                                        <p className="weather-display__temp-max">
                                            <span>max temp</span>
                                            <span>{data.max}°C</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                    <div className="average-temp">
                        <p>AVERAGE TEMP : {calculateAverageTemp()}°C</p>
                    </div>
                    <nav>
                        <span className="nav__item nav__item--prev">
                            PREVIOUS
                        </span>
                        <span className="nav__item nav__item--next">NEXT</span>
                    </nav>
                </main>
            )}
        </>
    );
}

export default App;
