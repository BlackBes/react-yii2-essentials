import React, {Component} from 'react';
import Pagination from '../navigation/Pagination';
import {Link} from "react-router-dom";
import { faPencilAlt, faSearch, faSyncAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

/**
 * Component for generating and rendering index data. Analogue to yii2's DataProvider
 */
export default class DataView extends Component {
  static propTypes = {
    /** An array with fetched rows. */
    models: PropTypes.array,
    /** Model name. */
    model: PropTypes.string,
    /** Model attributes to be rendered. Ex: {id: 'Item Id', name: 'Item Name'} */
    attributes: PropTypes.object,
    /** Model actions to manipulate selected row. Ex: {view: {title: "view", icon: (Optional) HTML markup or Font Awesome>}, update: {title: "update"},} */
    actions: PropTypes.object,
    /** Assoc. array with onModalOpen() callback. Ex: modalActions={{ onModalOpen: () => {setModal(true)}}} */
    modalActions: PropTypes.object,
    /** (Optional) Text or HTML markup to be rendered if table is empty. Default value: 'Create your first item' */
    ifEmpty: PropTypes.any,
    /** An assoc array with required data to create pagination.
     * @param pagination.currentPage Current selected page
     * @param pagination.totalPages Total pages
     * @param pagination.callback Callback that will trigger when pagination button clicked
     * */
    pagination: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.prepareLines = this.prepareLines.bind(this);
    this.prepareHeader = this.prepareHeader.bind(this);
    this.preparePlaceholder = this.preparePlaceholder.bind(this);
    this.preparePagination = this.preparePagination.bind(this);

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  /**
   * Handler for opening modal window
   * @param {string|integer} id Model id
   * @param {string} type Modal action type. Available types: delete, restore
   */
  handleModalOpen(id, type = 'delete') {
    this.props.modalActions.onModalOpen(id, type);
  }

  /**
   * Handler for pagination
   * @param {string|integer} page Page number
   */
  handlePagination(page) {
    this.props.pagination.callback(page);
  }

  /**
   * Function that generates placeholder if no records were found.
   * Default output: 'Create your first item'.
   */
  preparePlaceholder() {
    const content = this.props.ifEmpty !== undefined ? this.props.ifEmpty : 'Create your first item';
    return (
      <h3>
        <small className='text-muted'>
          {content}
        </small>
      </h3>
    )
  }

  /**
   * Function that generates table header and rows.
   * @param {{}} attributes An associative array with attributes to be used as columns where array key is attribute name from you Data Base and array value is used as a label. Example: {id: 'Item #', name: 'User name'}
   *  @param model REQUIRED param for generating table rows. OPTIONAL param for generating table header.
   */
  lineItems(attributes, model) {
    let items = []
    let isModel = model !== undefined ? true : false;
    for (let col in attributes) {
      items.push(
        <div key={isModel ? "grid-item-model-"+col : 'grid-item-'+col} className={"grid-item"}>
          {isModel ?
            (
              <React.Fragment>
                <div className="tooltip-title">{attributes[col]}</div>
                <div>{model[col]}</div>
              </React.Fragment>
            ) :
            attributes[col]}
        </div>
      )
    }

    return items;

  }

  /**
   * Function that generates action buttons (view, update, delete).
   * @param {{}} actions An assoc. array with actions. Array key should match your api action name (Ex: Key for actionUpdate($id) will be 'update'. Key for actionGetData() will be 'get_data')
   * @param actions.title (Optional) Action title. Used for HTML attribute 'title'
   * @param actions.icon (Optional) Action icon. Allows to set a custom icon. Font awesome recommended. HTML markup allowed too. Actions that don't require icons: view, update, delete, restore.
   *  @param model Row data fetched from api
   */
  actionButtons(actions, model) {
    const _controller = this.props.modelName;
    let items = []

    const defaultIcons = {
      view: <FontAwesomeIcon icon={faSearch} />,
      update: <FontAwesomeIcon icon={faPencilAlt} />,
      delete: <FontAwesomeIcon icon={faTrashAlt} />,
      restore: <FontAwesomeIcon icon={faSyncAlt} />,
    }

    for (let action in actions) {
      let link = action.replace('_','-');
      items.push(
        model.is_delete === 0 ?
          action === 'delete' ?
            (
              <span key={"action-"+action} className="model-control-icon model-delete-icon"
                    onClick={() => this.handleModalOpen(model.id, action)}
                    title={actions[action].title !== undefined ? actions[action].title : ''}>
                                    {actions[action].icon !== undefined ? actions[action].icon : defaultIcons[action]}
                                </span>
            ) : action !== 'restore' ? (
              <Link key={"action-"+action} className="model-control-icon" to={_controller + "/" + link + "/" + model.id}
                    title={actions[action].title !== undefined ? actions[action].title : ''}>
                {actions[action].icon !== undefined ? actions[action].icon : defaultIcons[action]}
              </Link>
            ) :
            ('') : action === 'restore' ? (
            <span key={"action-"+action} className="model-control-icon model-delete-icon"
                  onClick={() => this.handleModalOpen(model.id, action)}
                  title={actions[action].title !== undefined ? actions[action].title : ''}>
                                    {actions[action].icon !== undefined ? actions[action].icon : defaultIcons[action]}
                            </span>
          ) : ('')

      )
    }


    return items;
  }

  /**
   * Function that generates table header/columns.
   */
  prepareHeader() {
    let attributes = this.props.attributes;
    const models = this.props.models;
    const className = this.props.className;

    if (models !== undefined) {
      if (models.length === 0) {
        return this.preparePlaceholder();
      } else {
        return (
          <div key={"grid-header"} className={"grid-container " + (className !== undefined ? className : "") + " grid-container-header"}>
            {this.lineItems(attributes)}
            <div className={"grid-item"}>
            </div>
          </div>
        )
      }
    }
  }

  /**
   * Function that generates table rows.
   */
  prepareLines() {
    let attributes = this.props.attributes;
    let actions = this.props.actions;
    const models = this.props.models;
    const className = this.props.className;
    let lines = [];

    if(models !== undefined) {
      for (let i in models) {
        let model = models[i];
        let line = (
          <div key={"line-" + model.id}
               className={"grid-container " + (className !== undefined ? className : "") + " grid-container-line"}
               style={{opacity: model.is_delete === 1 ? 0.4 : 1}}
          >
            {this.lineItems(attributes, model)}
            <div className={"grid-item action-buttons"}>
              {this.actionButtons(actions, model)}
            </div>

          </div>
        );

        lines.push(line);
      }
    }

    return lines;

  }

  /**
   * Function that generates pagination.
   */
  preparePagination() {
    let currentPage = this.props.pagination.currentPage;
    let totalPages = this.props.pagination.totalPages;
    return this.props.pagination !== undefined ?
      totalPages > 1 ?
        (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            callback={this.handlePagination}
          />
        ) : ('')
      : ('')
  }

  render() {
    return (
      <div className={'white-block main-block'}>

        {this.prepareHeader()}
        {this.prepareLines()}
        {this.preparePagination()}

      </div>
    )
  }
}
