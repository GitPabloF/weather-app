export default function WeatherCard({ data }) {
    const inconUrl = `http://openweathermap.org/img/wn/${data.icon}.png`;
    return (
        <div className="weather-display__card">
            <div className="weather-display__icon-date">
                <img className="weather-display__icon" src={inconUrl} alt="" />
                <div className="weather-display__date">
                    <p>
                        <span className="weather-display__day">
                            {data.date.weekday}.
                        </span>
                        <span className="weather-display__number">
                            {data.date.day}
                        </span>
                        <span className="weather-display__month">
                            {data.date.month}
                        </span>
                    </p>
                </div>
            </div>

            <div className="weather-display__temp-container">
                <p className="weather-display__temp weather-display__temp-min">
                    <span>min temp</span>
                    <span className="temp">{Math.floor(data.tempMin)}°C</span>
                </p>
                <p className="weather-display__temp weather-display__temp-max">
                    <span>max temp</span>
                    <span className="temp">{Math.floor(data.tempMax)}°C</span>
                </p>
            </div>
        </div>
    );
}
