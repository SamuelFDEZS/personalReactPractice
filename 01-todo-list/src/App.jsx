import { useEffect, useState } from 'react';
import { NoteLine } from './Components/NoteLine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function App () {
    const [isLightMode, setIsLightMode] = useState(true);
    const [page, setPage] = useState({
        1: Array(13).fill(null).map(() => (
            { marked: false, text: '' }
        ))
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [isNotebookOpen, setIsNotebookOpen] = useState(false);
    const [pageFlips, setPageFlips] = useState(Array(11).fill(false));

    const flipPage = () => {
        setPageFlips(prev => {
            const newFlips = [...prev];
            newFlips[currentPage] = true;
            return newFlips;
        });
    };

    const unFlipPage = () => {
        setPageFlips(prev => {
            const newFlips = [...prev];
            newFlips[currentPage] = false;
            return newFlips;
        });
    };
    const handleNextPage = () => {
        if (currentPage > 10) return;
        if (!page[currentPage + 1]) {
            const pageCopy = { ...page };
            pageCopy[currentPage + 1] = Array(13).fill(null).map(() => (
                { marked: false, text: '' }
            ));
            setPage({ ...pageCopy });
        }
        flipPage();
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage >= 1) setCurrentPage(currentPage - 1);
        unFlipPage();
    };

    const handleTextChange = (index, text) => {
        const pageCopy = [...page[currentPage]];
        pageCopy[index] = { ...pageCopy[index], text };
        setPage(prev => ({
            ...prev,
            [currentPage]: pageCopy
        }));
    };
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
                    <a href='#'><img src='../src/assets/notebook.png' alt='Icono de cuaderno' className='header__logo-container__icon' /></a>
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

            <main className={`notebook ${isNotebookOpen ? 'show-page' : ''}`}>
                <div className={`notebook__cover ${!isNotebookOpen ? 'cover-closed' : 'cover-opened'}`} />
                <div className={`notebook__page ${pageFlips[currentPage] ? 'previous-page' : ''}`}>
                    {
                        page[currentPage].map((task, i) => {
                            return <NoteLine text={task.text} key={i} handleTextChange={handleTextChange} index={i} />;
                        })
                    }
                </div>
            </main>

            <div className='notebook-buttons'>
                <button onClick={handleNextPage} className={`notebook-buttons__button notebook-buttons__button--next ${isNotebookOpen ? 'show-arrow' : ''}`}><FontAwesomeIcon icon={faArrowRight} /></button>
                <button onClick={handlePreviousPage} className={`notebook-buttons__button notebook-buttons__button--previous ${isNotebookOpen && currentPage > 1 ? 'show-arrow' : ''}`}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <button className='notebook-buttons__button notebook-buttons__button--close' onClick={() => setIsNotebookOpen(!isNotebookOpen)}>{isNotebookOpen ? 'CLOSE' : 'OPEN'}</button>
            </div>
        </>
    );
}

export default App;
