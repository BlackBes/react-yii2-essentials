import ModalComponent from '../base/ModalComponent'
import React from 'react'

/**
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} onClose Event that triggers when user clicks "Close" button
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} onDelete Event that triggers when user clicks "Delete" button
 * @param {boolean} isVisible Is modal active?
 * @param labels Modal labels (title, confirmation, etc.)
 * @param labels.title Modal title
 * @param labels.confirmation Modal confirmation message
 * @param labels.close Modal close label
 * @param labels.delete Modal delete label
 */
const PrepareDeleteModal = (onClose, onDelete, isVisible, labels = {}) => {
  return (
    <ModalComponent
      isVisible={isVisible}
      className={'modal-confirmation'}
      onClose={onClose}
      header={{
        content: (<div className={'modal-header-icon'}><i className="fal fa-times-circle">
        </i></div>)
      }}
      title={{ content: (labels ? labels.title : 'Deleting') }}
      body={{ content: (<p>{labels ? labels.confirmation : 'Are you sure you want to delete this item?'}</p>) }}
      footer={{
        content: (
          <React.Fragment>
            <button type='button' className='btn btn-secondary' onClick={onClose}>
              {labels ? labels.close : 'Close'}
            </button>
            <button type='button' className='btn btn-danger' onClick={onDelete}>
              {labels ? labels.delete : 'Delete'}
            </button>
          </React.Fragment>
        )
      }}
    />
  )
}

/**
 * @param callbacks Main callbacks for index page modal
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} callbacks.onClose Event that triggers when user clicks "Close" button
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} callbacks.onDelete Event that triggers when user clicks "Delete" button
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} callbacks.onRestore Event that triggers when user clicks "Restore" button
 * @param {boolean} isVisible Is modal active?
 * @param {string} action Name of api action that will be executed on confirmation('delete' - for actionDelete(), 'restore' - for actionRestore())
 * @param labels Modal labels (title, confirmation, etc.)
 * @param labels.title Modal title
 * @param labels.confirmation Modal confirmation message for 'delete' action
 * @param labels.confirmation_restore Modal confirmation message for 'restore' action
 * @param labels.close Modal close label
 * @param labels.delete Modal delete label
 * @param labels.restore Modal restore label
 */
const PrepareIndexModal = (callbacks, isVisible,action, labels = {}) => {
  let onClose = callbacks.onClose
  let onDelete = callbacks.onDelete
  let onRestore = callbacks.onRestore

  return (
    <ModalComponent
      isVisible={isVisible}
      className={'modal-confirmation'}
      onClose={onClose}
      header={{
        content: (
          <div className={'modal-header-icon'}>
            {
              action === 'delete' ? <i className="fal fa-times-circle">
                </i> :
                <i className="fal fa-sync">
                </i>
            }
          </div>
        )
      }}
      title={{
        content: (
          action === 'delete' ?
            labels ? labels.title : 'Deleting' :
            labels ? labels.title : 'Restoring'
        )
      }}
      body={{
        content: (
          <p>
            {
              action === 'delete' ?
                labels ? labels.confirmation : 'Are you sure you want to delete this item?' :
                labels ? labels.confirmation_restore : 'Are you sure you want to restore this item?'
            }
          </p>
        )
      }}
      footer={{
        content: (
          <React.Fragment>
            <button type='button' className='btn btn-secondary' onClick={onClose}>
              {labels ? labels.close : 'Close'}
            </button>
            {
              action === 'delete' ?
                <button type='button' className='btn btn-danger' onClick={onDelete}>
                  {labels ? labels.delete : 'Delete'}
                </button>
                :
                <button type='button' className='btn btn-danger'
                        onClick={onRestore}>
                  {labels ? labels.restore : 'Restore'}
                </button>
            }
          </React.Fragment>
        )
      }}
    />
  )
}

export { PrepareDeleteModal, PrepareIndexModal }
