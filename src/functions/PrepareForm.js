const PrepareForm = (model, data) => {
    let arr = [];
    arr[model.charAt(0).toUpperCase() + model.slice(1)] = [];
    Object.entries(data).forEach(function (value, key) {
        let val = value[1];
        val = (val === true) ? 1 : val;
        val = (val === false) ? 0 : val;

        arr[model.charAt(0).toUpperCase() + model.slice(1)][value[0]] = val;
    });

    return arr;
}

export { PrepareForm };
