import {ModalComponent} from "../base/ModalComponent";
import React from "react";

const PrepareIndexModal = (callbacks, isVisible, t, action) => {
  let onClose = callbacks.onClose;
  let onDelete = callbacks.onDelete;
  let onRestore = callbacks.onRestore;
  let headerTitle = action !== '' ? action == 'delete' ? t("model.deleting") : t("model.restoring") : ('');
  let labels = {
    title: headerTitle,
    confirmation: t("model.confirmation"),
    confirmation_restore: t("model.confirmation_restore"),
    close: t("model.close"),
    delete: t("model.delete"),
    restore: t("model.restore")
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
              action === 'delete' ? <i className="fal fa-times-circle"></i> :
                <i className="fal fa-sync"></i>
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

export {PrepareIndexModal};
