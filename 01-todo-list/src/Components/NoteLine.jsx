import { useEffect, useState } from 'react';

export const NoteLine = ({ text, handleTextChange, index }) => {
    const [checked, setChecked] = useState(false);
    const autoGrow = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    };

    // Animation for setting check to false to not show the line through
    useEffect(() => {
        if (!text) {
            setChecked(false);
        }
    }, [text]);

    return (
        <div className='notebook__task'>
            {text && <input type='checkbox' name='note' className='notebook__task__checkbox' checked={checked} onChange={() => setChecked(!checked)} />}
            <div className={`notebook__task__container ${checked ? 'completed' : ''}`}>
                <textarea
                    rows='1' name='note' className='notebook__task__container__note-line'
                    value={text} onInput={(e) => {
                        autoGrow(e);
                        handleTextChange(index, e.target.value);
                    }}
                />
            </div>
        </div>
    );
};
