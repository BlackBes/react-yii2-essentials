import React, {Component} from 'react';
import {Pagination} from "react-yii2-essentials";
import {Link} from "react-router-dom";

export class DataView extends Component {

  constructor(props) {
    super(props);

    this.prepareLines = this.prepareLines.bind(this);
    this.prepareHeader = this.prepareHeader.bind(this);
    this.preparePlaceholder = this.preparePlaceholder.bind(this);
    this.preparePagination = this.preparePagination.bind(this);

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  handleModalOpen(id, type = 'delete') {
    this.props.modalActions.onModalOpen(id, type);
  }

  handlePagination(page) {
    this.props.pagination.callback(page);
  }

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

  lineItems(attributes, model) {
    let items = []
    let isModel = model !== undefined ? true : false;
    for (let col in attributes) {
      items.push(
        <div key={isModel ? "grid-item-model-"+col : 'grid-item-'+col} className={"grid-item"}>
          {isModel ?
            (
              <>
                <div className="tooltip-title">{attributes[col]}</div>
                <div>{model[col]}</div>
              </>
            ) :
            attributes[col]}
        </div>
      )
    }

    return items;

  }

  actionButtons(actions, model) {
    const _controller = this.props.modelName;

    let items = []

    const defaultIcons = {
      view: <i className="fad fa-search"></i>,
      update: <i className="fad fa-pencil-alt"></i>,
      delete: <i className="fas fa-trash-alt"></i>,
      restore: <i className="fas fa-sync-alt"></i>,
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
