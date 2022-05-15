import React, { useState } from 'react'
import Modal from '../modal/Modal'
import addIcon from '../../assets/svgs/illustrations/undraw_add.svg';
import './CollectionCreateModal.scss';

const CollectionCreateModal = (props) => {
    const {open, onClose, onSave} = props
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Modal open={open} onClose={onClose}>
            <div className='create-collection-modal flex-row-center-y flex-space-between'>
                <div className='create-collection-modal-image'><img src={addIcon}/></div>
                <div className='create-collection-modal-info flex-column-start-x'>
                    <input value={title} className='input create-collection-modal-info-title' type={'text'} placeholder={'Title'} onChange={(e) => setTitle(e.target.value)}/>
                    <textarea value={description} className='textarea create-collection-modal-info-description' id="" name="description" placeholder='Description' rows="4" cols="50" onChange={(e) => setDescription(e.target.value)}/>
                    <button className='button-primary create-collection-modal-info-save' onClick={() => onSave(title, description)}>Save</button>
                </div>
            </div>
        </Modal>
    )
}

export default CollectionCreateModal
