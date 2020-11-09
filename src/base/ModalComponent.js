import React, {Component} from 'react';
import Modal from "react-bootstrap4-modal";

export const ModalComponent = (props) => {

  //general
  let _isVisible = props.isVisible;

  let _className = props.className !== undefined ? props.className : '';

  //header
  let _customHeader = props.header;
  let _headerClass = _customHeader !== undefined ? _customHeader.className !== undefined ? _customHeader.className : '' : '';
  let _headerContent = _customHeader !== undefined ? _customHeader.content !== undefined ? _customHeader.content : '' : '';

  //title
  let _customTitle = props.title;
  let _titleClass = _customTitle !== undefined ? _customTitle.className !== undefined ? _customTitle.className : '' : '';
  let _titleContent = _customTitle !== undefined ? _customTitle.content !== undefined ? _customTitle.content : '' : '';

  //body
  let _customBody = props.body;
  let _bodyClass = _customBody !== undefined ? _customBody.className !== undefined ? _customBody.className : '' : '';
  let _bodyContent = _customBody !== undefined ? _customBody.content !== undefined ? _customBody.content : '' : '';

  //footer
  let _customFooter = props.footer;
  let _footerClass = _customFooter !== undefined ? _customFooter.className !== undefined ? _customFooter.className : '' : '';
  let _footerContent = _customFooter !== undefined ? _customFooter.content !== undefined ? _customFooter.content : '' : '';

  //default callbacks
  let _onClose = props.onClose;

  return (
    <Modal visible={_isVisible} onClickBackdrop={_onClose} className={_className}>

      {_customHeader !== undefined ? (
        <div className={'modal-header ' + _headerClass}>
          {_headerContent}
          {
            _customTitle !== undefined ? (
              <h5 className={'modal-title ' + _titleClass}>
                {
                  _titleContent
                }
              </h5>
            ) : ''
          }

        </div>
      ) : ('')
      }

      {_customBody !== undefined ? (
        <div className={'modal-body ' + _bodyClass}>
          {_bodyContent}
        </div>
      ) : ('')
      }

      {_customFooter !== undefined ? (
        <div className={'modal-footer ' + _footerClass}>
          {_footerContent}
        </div>
      ) : ('')
      }
    </Modal>
  )
}
