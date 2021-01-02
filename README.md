# ATTENTION: Library is currently in development. We are looking for maintainers


# react-yii2-essentials

> React components, that support working with Yii2.

[![NPM](https://img.shields.io/npm/v/react-yii2-essentials.svg)](https://www.npmjs.com/package/react-yii2-essentials) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FBlackBes%2Freact-yii2-essentials&count_bg=%2379C83D&title_bg=%23555555&icon=react.svg&icon_color=%2361DBFB&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## Install

```bash
npm install --save react-yii2-essentials
```
Be sure that you have Redux installed

```bash
npm install @reduxjs/toolkit

npm install redux

npm install react-redux
npm install --save-dev redux-devtools
```


## Components List
###Input field
Generates input field with validation

```jsx
<InputField />

props:
     /** Name of field in model. */
     name: PropTypes.string,
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
```

###Text area
Generates text area with validation

```jsx
<TextArea />

props:
     /** Name of field in model. */
     name: PropTypes.string,
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
```

####Radiobutton
Generates radiobutton or radiobutton list depending on the amount of keys

```jsx
<RadioButton />
props:
    /** Name of field in model. */
    name: PropTypes.string,
    /** Name of a model. */
    model: PropTypes.string,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** Placeholder for input. */
    placeholder: PropTypes.string,
    /** object Key and value (can have multiple keys and values in one object)*/
    options: PropTypes.object,
    /** Function, that handle change event. */
    onChange: PropTypes.func,
```

####Checkbox
Generates Checkbox or Checkbox list depending on the amount of keys

```jsx
<CheckBox />

 props
     /** Name of field in model. */
     name: PropTypes.string,
     /** Name of a model. */
     model: PropTypes.string,
     /** Label for input. If it empty or bool:false, using a field name. */
     label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
     /** Add more classes to field container. */
     class: PropTypes.string,
     /** Placeholder for input. */
     placeholder: PropTypes.string,
     /** object Key and value (can have multiple keys and values in one object)*/
     options: PropTypes.object,
     /** Value of field. */
     value: PropTypes.bool,
    /** Key of field. */
     key: PropTypes.any,
```

####Dropdown list
Generates dropdown list with verification

```jsx
<DropDownList />

props:
    /** Name of field in model. */
    name: PropTypes.string,
    /** Name of a model. */
    model: PropTypes.string,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** Placeholder for input. */
    placeholder: PropTypes.string,
    /** Options array */
    options: PropTypes.object,
    /** Function, that handle change event. */
    onChange: PropTypes.func,
    /** Required. */
    required: PropTypes.bool,
```
####BreadCrumbs
Generates breadcrumbs

```jsx
<BreadCrumbs />
props:
 breadcrumbs: PropTypes.object,

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

####DataProvider
Gets data for the index page table

```jsx
<DataProvider
props:
    api.address,
    api.authToken,
    models={this.state.models},
    /** Name of a model. */
    modelName: PropTypes.string,
    /** Fields from table. */
    fields: PropTypes.array
/>
```

####Pagination
Setups pagination

```jsx
<Pagination />
```
####PrivateRoute
```jsx
<PrivateRoute />
```

Preloaders
---
####DataLoader
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
####IndexDataLoader
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
####TableLoader
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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT © [BlackBes](https://github.com/BlackBes)
