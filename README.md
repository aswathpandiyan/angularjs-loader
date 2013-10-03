angularjs-loader
================

Simple AngularJS module that allows the application to act differently when something is loading or when this thing is loaded.

##Installation

### Step 1 : Add the source js to your project

```html
#index.html
...
<script type="text/javascript" src="xd-loader.js"></script>
...
```

### Step 2 : Load the module in your angular application
```javascript
#app.js
angular.module('myApp', ['xd.loader']);
...
```

## Usage

First, be sure to inject the "loader" service.
Then, before executing a bunch of code that takes a little time, just call `loader.loading('aCustomIdToIdentifyThisLoadingProcess');`.
This call append to the $rootScope a boolean variable to the object "loader" for each loading called (with a different id).
This variable is true if the process is still loading, false otherwise.
Further in your code, when the loading process is finished, be sure to call `loader.loaded('aCustomIdToIdentifyThisLoadingProcess')` with the same id as before.

## Example

Loading a database of user from a distant server can take some time and thus making your application "lagging" in the eyes of your visitors.
Putting a simple loading gif is a good thing to tell your visitors your application is loading.

```javascript
// controllers.js
function myController($scope,loader,distantDatabase)
$scope.users = [];
loader.loading('users'); // we say the users are loading
// Fetching users, can take a while
distantDatabase.query({entity:'users'},function(data){
    console.log(data);
    $scope.users = data;
    loader.loaded('users'); // ok, the users are loaded
});

```

```html
<!-- index.html -->
<table ng-hide="loading.users">
<tr ng-repeat="user in users">
    <td>
        <img ng-src="{{user.profileImage}}" />
    </td>
    <td>{{user.name}} {{user.email}}</td>
</tr>
</table>
<div class="loading" ng-hide="!loading.users">
    <img src="img/loading.gif"/>
</div>
```

In this example, the loading gif will be displayed while the users are loading and hidden when they are loaded.
In the other hand, the table with the users (initially empty) will be hidden while the users are loading and displayed once the process is complete.