import React from 'react';
import Modal  from 'react-bootstrap/Modal';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalHeader from 'react-bootstrap/ModalHeader';


const ConfirmationModal = ({modalConfig, setModalDisplay, modalDisplay, handleDelete}) => {
  const handleDeleteClick = () => {
    setModalDisplay(false)
    handleDelete();
  }

  if (modalDisplay) {
    return (
      <Modal show={modalDisplay} onHide={() => setModalDisplay(false)}>
        <ModalHeader closeButton>
          <ModalTitle>
            {modalConfig.title}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>{modalConfig.message}</p>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => setModalDisplay(false)} type='button' className='btn btn-secondary'>
            Cancel
          </button>
          <button onClick={() => handleDeleteClick()} className={`btn btn-${modalConfig.btnStyle}`}>
            {modalConfig.btnText}
          </button>
        </ModalFooter>
      </Modal>
    )
  }
  return <></>
}

export default ConfirmationModal;