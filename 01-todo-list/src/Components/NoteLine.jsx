export const NoteLine = ({ text, setPage }) => {
    const autoGrow = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    };

    return (
        <textarea onInput={autoGrow} rows='1' className='notebook__note-line' />
    );
};
