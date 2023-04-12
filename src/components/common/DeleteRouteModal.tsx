import { Modal } from 'flowbite-react'
import React from 'react'

export const DeleteRouteModal = () => {
  return (
    <Modal>
        <Modal.Header>
            <h1>Delete Route</h1>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this route?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
  )
}
