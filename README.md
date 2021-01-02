##№ ATTENTION: Library is currently in development. We are looking for maintainers

### react-yii2-essentials

> React components, that support working with Yii2.

[![NPM](https://img.shields.io/npm/v/react-yii2-essentials.svg)](https://www.npmjs.com/package/react-yii2-essentials) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)  [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FBlackBes%2Freact-yii2-essentials&count_bg=%2379C83D&title_bg=%23555555&icon=react.svg&icon_color=%2361DBFB&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

### Install
First of all be sure that you have Redux installed

```bash
npm install @reduxjs/toolkit

npm install redux

npm install react-redux
npm install --save-dev redux-devtools
```
After installing Redux run this command

```bash
npm install --save react-yii2-essentials
```

We recommend installing `blackbes/yii2-yiireact` on your web server in order to simplify usage of this package
It provides React CRUD generator for gii that can generate required controllers and react pages for models.
```bash
composer require blackbes/yii2-yiireact
```

### Usage
This library provides you with components that are able to perform yii2 validation and fetch data from
your Yii2 server.

Validation will be performed by built in function in yii-validation.js
This function uses Redux to define your web server address and uses bearer token to access it.

It will send a request to
So in order to make function work correctly, you must add a reducer called `api.js` with properties listed below:

```js
 authToken: '', //here will be your bearer token
 address: '', //here you specify your web server url
```

```js
 //validation function will use this data to send axios request to
await axios({
    method: 'post',
    //your web server must have this url for models validation
    url: address + '/validate-model-input',
    data: stringify({
      //this data is taken from component props
      model: model,
      name: name,
      value: value
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Bearer ' + authToken
    }
})
```

Components List
---------------

### Input field
Generates input field with validation

```jsx
<InputField />

 propTypes = {
    /** Name of field in model. */
    name: PropTypes.string.isRequired,
    /** Name of a model. */
    model: PropTypes.string,
    /** Value of field. */
    value: PropTypes.any,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** Placeholder for input. */
    placeholder: PropTypes.string,
    /** Function, that handle change event. */
    onChange: PropTypes.func,
    /** Required. */
    required: PropTypes.bool,
    /** Help block text */
    helpBlock: PropTypes.string,
    /** Help block text */
    validated: PropTypes.any,
    /** Other props for plugin */
    pluginProps: PropTypes.object
  }
```

### Text area
Generates text area with validation

```jsx
<TextArea />

propTypes = {
    /** Name of field in model. */
    name: PropTypes.string.isRequired,
    /** Name of a model. */
    model: PropTypes.string,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** Placeholder for input. */
    placeholder: PropTypes.string,
    /** Function, that handle change event. */
    onChange: PropTypes.func,
    /** Required. */
    required: PropTypes.bool,
    /** Help block text */
    helpBlock: PropTypes.string,
    /** Help block text */
    validated: PropTypes.any,
    /** Other props for plugin */
    pluginProps: PropTypes.object
  }
```

### Radiobutton
Generates radiobutton or radiobutton list depending on the amount of keys

```jsx
<RadioButton />

propTypes = {
    /** Name of field in model. */
    name: PropTypes.string,
    /** Name of a model. */
    model: PropTypes.string,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** object Key and value*/
    options: PropTypes.object,
    /** Values of fields. */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /** Function, that handle change event. */
    onChange: PropTypes.func,
    /** Other props for plugin */
    pluginProps: PropTypes.object,
    /** Set required icon (require server validation!) */
    required: PropTypes.bool
  }
```

### Checkbox
Generates Checkbox or Checkbox list depending on the amount of keys

```jsx
<CheckBox />

propTypes = {
    /** Name of field in model. */
    name: PropTypes.string.isRequired,
    /** Name of a model. */
    model: PropTypes.string,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** object Key and value */
    options: PropTypes.object,
    /** Values of fields. */
    values: PropTypes.objectOf(PropTypes.bool),
    /** Key of field. */
    key: PropTypes.any,
    /** Other props for plugin */
    pluginProps: PropTypes.object,
    /** Set required icon (require server validation!) */
    required: PropTypes.bool
  }
```

### Dropdown list
Generates dropdown list with verification

```jsx
<DropDownList />

propTypes = {
    /** Name of field in model. */
    name: PropTypes.string.isRequired,
    /** Name of a model. */
    model: PropTypes.string,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** Options array */
    options: PropTypes.arrayOf(PropTypes.object),
    /** Selected value */
    value: PropTypes.any,
    /** Function, that handle change event. */
    onChange: PropTypes.func,
    /** Required. */
    required: PropTypes.bool,
    /** Help block text */
    helpBlock: PropTypes.string,
    /** Validation value. Can be empty string or bool */
    validated: PropTypes.any,
    /** Default value text */
    defaultValueText: PropTypes.string,
    /** Other props for plugin */
    pluginProps: PropTypes.object
  }
```
### BreadCrumbs
Generates breadcrumbs

To use this, you must add `breadcrumbs.js` reducer with following code:
```
//imports
const initialState = {
    breadcrumbs : []
};

const breadcrumbs = (state = initialState, action) => {
    switch (action.type) {
        case SET_BREADCRUMBS: {
            return {
                ...state,
                breadcrumbs: action.data
            };
        }
        default:
            return state;
    }
};

export default breadcrumbs;
```

```jsx
<BreadCrumbs />

propTypes = {
    /** breadcrumbs. */
    breadcrumbs: PropTypes.object,
    name: PropTypes.string
  }

/** example */

let bread = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Clients',
        link: '/clients'
    },
    {
        name: "Create",
        link: ''
    },
];
<BreadCrumbs breadcrumbs={bread} />
```

### DataProvider
Component for generating and rendering index data. Analogue to yii2's DataProvider
```jsx

<DataView/>

propTypes = {
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

/** example */

<DataView
    models={}
    modelName={"<model name>"}
    className={"<column style class>"}
    attributes={{
    //Shown attribute of model {attribute: lable}
    id: "ID",
    name: "",
    user: "",
    }}
    actions={{
    view: {title: "view"},
    update: {title: "update"},
    delete: {title: "delete"},
    restore: {title: "restore"},
    }}
    modalActions={{
    onModalOpen: this.actionOpenModal,
    }}
    ifEmpty={"Create first element"}
    pagination={{
    currentPage: this.state.page,
    totalPages: this.state.data.total_pages,
    callback: this.actionPagination
    }}
/>

```

### Pagination
Setups pagination

```jsx
<Pagination />

/**
example
*/

function actionPagination(page) {
        this.setState({currentPage: page})
        console.log(page)
    }

<Pagination
    currentPage={this.state.currentPage}
    totalPages={10}
    callback={actionPagination}
/>
```
### PrivateRoute
Allows to access routes by user with valid auth token.
Redirects to /login on fail
```jsx
<PrivateRoute />

<PrivateRoute exact path='/users' component={UsersIndex}/>

```

### AuthTypeRoute
 Modified version of PrivateRoute
 Allows to access routes by user with one or multiple auth types and valid auth token
 Redirects to /login on fail
```jsx
<AuthTypeRoute />

<AuthTypeRoute exact path='/users' component={UsersIndex} authType={[1, 2]} />

```

Preloaders
----------
### DataLoader
Preloader adds spinning circle
```jsx
if (this.state.isDataLoaded){
    return render(
        //...
        )
} else {
    return render(
         <DataLoader />
);
}
```
### IndexDataLoader
Preloader creates view of unloaded fields
```jsx
if (this.state.isDataLoaded){
    return render(
        //...
        )
} else {
    return render(
    <IndexDataLoader />
    );
}
```
### TableLoader
Preloader creates view of unloaded table on index page
```jsx
if (this.state.isDataLoaded){
    return render(
        //...
        )
} else {
    return render(
    <TableLoader />
    );
}
```

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### License

MIT © [BlackBes](https://github.com/BlackBes)
