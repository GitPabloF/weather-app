import { useState, useEffect } from 'react';

import './App.css';
import Header from './component/Header';
import Filter from './component/Filter';
import WeatherCard from './component/WeatherCard';

export default function App() {
    // api url and parameters
    const apiParameters = {
        city: 'Paris',
        days: '5',
        units: 'metric'
    };
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${apiParameters.city}&cnt=${apiParameters.days}&units=${apiParameters.units}&appid=${process.env.REACT_APP_API_KEY}`;

    // set the initial values for the filter
    const filterTempInitial = {
        min: 5,
        max: 30
    };

    // State variables
    const [dataValues, setDataValues] = useState([]);
    const [error, setError] = useState(null);
    const [filterTemp, setFilterTemp] = useState(filterTempInitial);
    const [filteredData, setFilteredData] = useState([]);

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
                        tempMin: day.temp.min,
                        tempMax: day.temp.max
                    };
                });
                setDataValues(dataArray);
                setFilteredData(dataArray);
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

    // filtered data
    function filterData(filter) {
        const filterdData = dataValues.filter(
            (data) =>
                data.tempMin >= filterTemp.min && data.tempMax <= filterTemp.max
        );
        setFilteredData(filterdData);
    }

    // calculte the average temp
    function calculateAverageTemp() {
        if (dataValues.length === 0) {
            return 0;
        }
        // Sum of max and min temp
        const totalTemperature = dataValues.reduce(
            (accumulator, day) => accumulator + day.tempMin + day.tempMax,
            0
        );
        const averageTemperature = totalTemperature / (dataValues.length * 2);
        return Math.round(averageTemperature * 100) / 100;
    }

    // -- Filter --
    function handleChangeFilterTemp(event, minOrMax) {
        const newFilterTemp = { ...filterTemp, [minOrMax]: event.target.value };
        setFilterTemp(newFilterTemp);

        filterData(newFilterTemp);
    }

    return (
        <>
            <Header error={error} apiParameters={apiParameters} />

            {!error && (
                <main>
                    <section className="filter" id="filter">
                        <Filter
                            filterTemp={filterTemp}
                            handleChangeFilterTemp={(event) =>
                                handleChangeFilterTemp(event, 'min')
                            }
                            minOrMax="min"
                        />
                        <Filter
                            filterTemp={filterTemp}
                            handleChangeFilterTemp={(event) =>
                                handleChangeFilterTemp(event, 'max')
                            }
                            minOrMax="max"
                        />
                    </section>
                    <section className="weather-display" id="weather-display">
                        {filteredData.map((data, index) => {
                            console.log(data);
                            return (
                                <WeatherCard
                                    key={`weather-display__card-${index}`}
                                    data={data}
                                />
                            );
                        })}
                    </section>
                    <div className="average-temp">
                        <p>AVERAGE TEMP : {calculateAverageTemp()}°C</p>
                    </div>
                    <nav>
                        <span className="nav__item nav__item--prev">
                            previous
                        </span>
                        <span className="nav__item nav__item--next">next</span>
                    </nav>
                </main>
            )}
        </>
    );
}
