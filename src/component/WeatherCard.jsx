export default function WeatherCard({ data }) {
    return (
        <div className="weather-display__card">
            <div className="weather-display__icon">*</div>
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
                    <span>{data.tempMin}°C</span>
                </p>
                <p className="weather-display__temp-max">
                    <span>max temp</span>
                    <span>{data.tempMax}°C</span>
                </p>
            </div>
        </div>
    );
}
