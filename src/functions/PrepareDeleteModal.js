import ModalComponent from "../base/ModalComponent";
import React from "react";

const PrepareDeleteModal = (onClose, onDelete, isVisible, t) => {
  let labels = {
    title: t("model.deleting"),
    confirmation: t("model.confirmation"),
    close: t("model.close"),
    delete: t("model.delete"),
  };
  return (
    <ModalComponent
      isVisible={isVisible}
      className={"modal-confirmation"}
      onClose={onClose}
      header={{content: (<div className={"modal-header-icon"}><i className="fal fa-times-circle"></i></div>)}}
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

export default PrepareDeleteModal;
