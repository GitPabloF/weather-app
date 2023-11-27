import { useState, useEffect } from 'react';

import './App.css';
import Header from './component/Header';
import Filter from './component/Filter';
import WeatherCard from './component/WeatherCard';
import NavItem from './component/NavItem';

export default function App() {
    // api url and parameters
    const apiParameters = {
        city: 'Paris',
        days: '15',
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
    const [pagination, setPagination] = useState(0);

    // Fetch weather data on component mount (useEffect ensures the API call is made after the component has rendered)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Options for date formatting
                const dateOptions = {
                    weekday: 'short',
                    month: 'long',
                    day: 'numeric'
                };

                // Map weather data with a cleaner date format
                const dataArray = data.list.map((day) => {
                    const timeStampinMs = day.dt * 1000;
                    const timeStampFormater = new Date(
                        timeStampinMs
                    ).toLocaleDateString('en-US', dateOptions);
                    // set date to an array of element
                    const dataArraySplited = timeStampFormater
                        .split(' ')
                        .map((element) => element.replace(',', ''));

                    return {
                        date: {
                            weekday: dataArraySplited[0],
                            day: dataArraySplited[2],
                            month: dataArraySplited[1]
                        },
                        tempMin: day.temp.min,
                        tempMax: day.temp.max,
                        icon: day.weather[0].icon
                    };
                });
                const dataSliced = dataArray.slice(pagination, pagination + 5);
                setDataValues(dataArray);
                setFilteredData(dataSliced);
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
    }, [pagination]);

    // filtered data re-render when filterTemp change
    useEffect(() => {
        function filterData(filter) {
            const filterdData = dataValues.filter(
                (data) =>
                    parseInt(data.tempMin) >= filterTemp.min &&
                    parseInt(data.tempMax) <= filterTemp.max
            );
            setFilteredData(filterdData);
        }
        filterData(filterTemp);
    }, [filterTemp]);

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
        return Math.floor(averageTemperature);
    }

    // Filter
    function handleChangeFilterTemp(event, minOrMax) {
        setFilterTemp((prevFilterTemp) => ({
            ...prevFilterTemp,
            [minOrMax]: parseInt(event.target.value)
        }));
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
                    <nav className="nav" id="nav">
                        <NavItem
                            pagination={pagination}
                            setPagination={setPagination}
                            dataValues={dataValues}
                            prevOrNext={'previous'}
                        />
                        <NavItem
                            pagination={pagination}
                            setPagination={setPagination}
                            dataValues={dataValues}
                            prevOrNext={'next'}
                        />
                    </nav>
                </main>
            )}
        </>
    );
}
