# Hooks

In MVVM Pattern, the ViewModel is the bridge between the View and the Model. The ViewModel is responsible for wrapping the model and preparing observable data needed by the View. The ViewModel also provides hooks for the view to pass events to the model.

React Hooks will be used to implement the ViewModel. The ViewModel will be a function that returns an object containing the observable data and the hooks for the view to pass events to the model.