export default function Filter({
    filterTemp,
    handleChangeFilterTemp,
    minOrMax
}) {
    return (
        <div className="filter__container">
            <p className="filter__p">
                <span className="filter__label">{minOrMax} temp</span>
                <span className="filter__value temp">
                    {minOrMax === 'min' ? filterTemp.min : filterTemp.max}°C
                </span>
            </p>
            <div className="filter__range-container">
                <input
                    type="range"
                    name="filter__range"
                    id={`filter__range--${minOrMax}`}
                    className="filter__range"
                    min="-50"
                    max="50"
                    value={minOrMax === 'min' ? filterTemp.min : filterTemp.max}
                    onChange={handleChangeFilterTemp}
                />
            </div>
        </div>
    );
}
