import { useEffect, useState } from 'react';

function App () {
    const [isLightMode, setIsLightMode] = useState(true);

    const handleColorChange = () => {
        setIsLightMode(!isLightMode);
        console.log(isLightMode);
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode');
    }, [isLightMode]);
    return (
        <>
            <header className='header'>
                <aside className='header__logo-container'>
                    <img src='../src/assets/notebook.png' alt='Icono de cuaderno' className='header__logo-container__icon' />
                </aside>
                <h1 className='header__title'>ToDo List</h1>
                <div className='header__color-button'>
                    <input onClick={handleColorChange} type='checkbox' id='checkboxInput' className='header__color-button__input' />
                    <label htmlFor='checkboxInput' className='toggleSwitch header__color-button__label' />
                </div>

                <div className='header__username-container'>
                    <span className='header__username-container__username' />
                </div>
            </header>

            <main className='main' />
        </>
    );
}

export default App;
