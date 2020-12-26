import React, {Component} from 'react';
import Modal from "react-bootstrap4-modal";

/**
 * Bootstrap modal as a react component.
 * @param props
 * @param {boolean} props.isVisible Determine if modal is visible or hidden
 * @param {string} props.className Modal class name.
 *
 * @param {{}} props.header Modal header.
 * @param {string} props.header.className Custom class for modal header.
 * @param {any} props.header.content Header content.
 *
 * @param {{}} props.title Modal title.
 * @param {string} props.title.className Custom class for modal title.
 * @param {any} props.title.content Header content.
 *
 * @param {{}} props.body Modal body.
 * @param {string} props.body.className Custom class for modal body.
 * @param {any} props.body.content Header content.
 *
 * @param {{}} props.footer Modal footer.
 * @param {string} props.footer.className Custom class for modal footer.
 * @param {any} props.footer.content Header content.
 *
 * @param props.onClose Callback for modal close event
 */
const ModalComponent = (props) => {

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
    <Modal {...props.pluginProps} visible={_isVisible} onClickBackdrop={_onClose} className={_className}>

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
export default ModalComponent
