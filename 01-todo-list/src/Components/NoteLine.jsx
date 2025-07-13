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
                    rows='1' maxLength={135} name='note' className='notebook__task__container__note-line'
                    value={text} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (e.currentTarget.value.includes('\n')) {
                                e.preventDefault();
                            }
                        }
                    }} onChange={(e) => {
                        const value = e.currentTarget.value;

                        const lines = value.split('\n');
                        const limited = lines.slice(0, 2).join('\n');

                        autoGrow(e);
                        handleTextChange(index, limited);
                    }}
                />
            </div>
        </div>
    );
};
