import React from 'react'
import  ReactDOM  from 'react-dom';
import '../../assets/styles/_shared.scss';
import close from '../../assets/svgs/icons/close.svg';

export default function Modal({open, onClose, children}) {

    if (!open) return null

    return ReactDOM.createPortal(
        <div className='overlay'>
            <div className="modal">
                <button className='modal-close' onClick={onClose}><img src={close}/></button>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}
