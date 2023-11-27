export default function Header({ error, apiParameters }) {
    return (
        <header className="header" id="header">
            <h1>Weather forecast</h1>
            {error && (
                <p className="header__error">
                    Oups, il semblerait qu'il y ait eu un problème avec la
                    récupération des données
                </p>
            )}
            {!error && (
                <p className="header__days">next {apiParameters.days} days</p>
            )}
        </header>
    );
}
