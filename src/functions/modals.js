import ModalComponent from "../base/ModalComponent";
import React from "react";

const PrepareDeleteModal = (onClose, onDelete, isVisible, labels = {}) => {
  labels = {
    title: labels.title !== undefined ? labels.title : "Deleting",
    confirmation: labels.confirmation !== undefined ? labels.confirmation : "Are you sure you want to delete this item?",
    close: labels.close !== undefined ? labels.close : "Close",
    delete: labels.delete !== undefined ? labels.delete : "Delete",
  };
  return (
    <ModalComponent
      isVisible={isVisible}
      className={"modal-confirmation"}
      onClose={onClose}
      header={{content: (<div className={"modal-header-icon"}><i className="fal fa-times-circle">
        </i></div>)}}
      title={{content: (labels ? labels.title : "Deleting")}}
      body={{content: (<p>{labels ? labels.confirmation : "Are you sure you want to delete this item?"}</p>)}}
      footer={{
        content: (
          <>
            <button type='button' className='btn btn-secondary' onClick={onClose}>
              {labels ? labels.close : "Close"}
            </button>
            <button type='button' className='btn btn-danger' onClick={onDelete}>
              {labels ? labels.delete : "Delete"}
            </button>
          </>
        )
      }}
    />
  )
}

const PrepareIndexModal = (callbacks, isVisible, labels = {}, action = '') => {
  let onClose = callbacks.onClose;
  let onDelete = callbacks.onDelete;
  let onRestore = callbacks.onRestore;
  let headerTitle = action !== '' ? action === 'delete' ? t("model.deleting") : t("model.restoring") : ('');
  labels = {
    title: headerTitle,
    confirmation: labels.confirmation !== undefined ? labels.confirmation :'Are you sure you want to delete this item?',
    confirmation_restore: labels.confirmation_restore !== undefined ? labels.confirmation_restore :'Are you sure you want to restore this item?',
    close: labels.close !== undefined ? labels.close :'Close',
    delete: labels.delete !== undefined ? labels.delete :'Delete',
    restore: labels.restore !== undefined ? labels.restore :'Restore',
  }
  return (
    <ModalComponent
      isVisible={isVisible}
      className={"modal-confirmation"}
      onClose={onClose}
      header={{
        content: (
          <div className={"modal-header-icon"}>
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
            labels ? labels.title : "Deleting" :
            labels ? labels.title : "Restoring"
        )
      }}
      body={{
        content: (
          <p>
            {
              action === 'delete' ?
                labels ? labels.confirmation : "Are you sure you want to delete this item?" :
                labels ? labels.confirmation_restore : "Are you sure you want to restore this item?"
            }
          </p>
        )
      }}
      footer={{
        content: (
          <>
            <button type='button' className='btn btn-secondary' onClick={onClose}>
              {labels ? labels.close : "Close"}
            </button>
            {
              action === 'delete' ?
                <button type='button' className='btn btn-danger' onClick={onDelete}>
                  {labels ? labels.delete : "Delete"}
                </button>
                :
                <button type='button' className='btn btn-danger'
                        onClick={onRestore}>
                  {labels ? labels.restore : "Restore"}
                </button>
            }
          </>
        )
      }}
    />
  )
}

export {PrepareDeleteModal, PrepareIndexModal};
