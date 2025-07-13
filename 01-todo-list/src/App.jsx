import { useEffect, useState } from 'react';
import { NoteLine } from './Components/NoteLine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function App () {
    const [isLightMode, setIsLightMode] = useState(() => {
        const lightModeOn = localStorage.getItem('lightModeOn');
        return JSON.parse(lightModeOn) || true;
    });
    const [page, setPage] = useState(() => {
        const savedPages = localStorage.getItem('savedPages');
        return JSON.parse(savedPages) ||
        {
            1: Array(13).fill(null).map(() => (
                { marked: false, text: '' }
            ))
        };
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
            newFlips[currentPage - 1] = false;
            return newFlips;
        });
    };
    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        if (currentPage > 10) return;
        if (!page[nextPage]) {
            const pageCopy = { ...page };
            pageCopy[nextPage] = Array(13).fill(null).map(() => (
                { marked: false, text: '' }
            ));
            setPage({ ...pageCopy });
        }
        flipPage();
        setCurrentPage(nextPage);
    };

    const handlePreviousPage = () => {
        const previousPage = currentPage - 1;
        if (currentPage > 1) setCurrentPage(previousPage);
        unFlipPage();
    };

    const handleTextChange = (index, text) => {
        const pageCopy = [...page[currentPage]];
        pageCopy[index] = { ...pageCopy[index], text };

        setPage(prev => {
            const newPage = {
                ...prev,
                [currentPage]: pageCopy
            };
            localStorage.setItem('savedPages', JSON.stringify(newPage));

            return newPage;
        });
    };
    const handleColorChange = () => {
        setIsLightMode(!isLightMode);
        localStorage.setItem('lightModeOn', JSON.stringify(!isLightMode));
    };

    const handleOpenCloseNotebook = () => {
        setIsNotebookOpen(!isNotebookOpen);
        setCurrentPage(1);
        setPageFlips(Array(11).fill(false));
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
            </header>

            <main className={`notebook ${isNotebookOpen ? 'show-page' : ''}`}>
                <div className={`notebook__cover ${!isNotebookOpen ? 'cover-closed' : 'cover-opened'}`}><h3 className='notebook__cover__title'>My ToDo List</h3></div>

                {
                    Object.keys(page).map((pageNum, i) => {
                        return (
                            <div
                                key={i}
                                className={`notebook__page ${Number(pageNum) === currentPage ? 'active' : ''} ${pageFlips[pageNum] ? 'page-passed' : ''}`}
                            >
                                {
                                    page[Number(pageNum)].map((task, j) => {
                                        return <NoteLine text={task.text} key={j} handleTextChange={handleTextChange} index={j} />;
                                    })
                                }
                            </div>
                        );
                    })
                }
            </main>

            <div className='notebook-buttons'>
                <button onClick={handleNextPage} className={`notebook-buttons__button notebook-buttons__button--next ${isNotebookOpen ? 'show-arrow' : ''}`}><FontAwesomeIcon icon={faArrowRight} /></button>
                <button onClick={handlePreviousPage} className={`notebook-buttons__button notebook-buttons__button--previous ${isNotebookOpen && currentPage > 1 ? 'show-arrow' : ''}`}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <button className='notebook-buttons__button notebook-buttons__button--close' onClick={handleOpenCloseNotebook}>{isNotebookOpen ? 'CLOSE' : 'OPEN'}</button>
            </div>
        </>
    );
}

export default App;
