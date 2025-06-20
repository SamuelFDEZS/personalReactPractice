import { useEffect, useState } from 'react';
import { NoteLine } from './Components/NoteLine';
function App () {
    const [isLightMode, setIsLightMode] = useState(true);
    const [page, setPage] = useState({ 1: Array(16).fill(null) });
    const [currentPage, setCurrentPage] = useState(1);
    const handleColorChange = () => {
        setIsLightMode(!isLightMode);
        console.log(isLightMode);
    };

    useEffect(() => {
        if (isLightMode) {
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
        }
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
                    <span className='header__username-container__username'>Samuel test</span>
                </div>
            </header>

            <div className='notebook-cover' />
            <main className='notebook'>
                {
                    page[currentPage].map((text, i) => {
                        return <NoteLine text={text} key={i} />;
                    })
                }
            </main>
        </>
    );
}

export default App;
