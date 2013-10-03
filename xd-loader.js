'use strict';

angular.module('xd.loader',[]).factory('loader', function($rootScope){

    this.init = function ()
    {
        $rootScope.loading = {};
    }

    this.check = function()
    {
        var wasUndefined = $rootScope.loading == undefined;
        if(wasUndefined)
            this.init();
        return wasUndefined;
    }

    this.loading = function()
    {
        this.check();
        for(var i in arguments)
        {
            var whatIsLoading = arguments[i];
            $rootScope.loading[whatIsLoading] = true;
        }
    }

    this.loaded = function()
    {
        this.check();
        for(var i in arguments)
        {
            var whatIsLoaded = arguments[i];
            if($rootScope.loading[whatIsLoaded] != undefined)
                $rootScope.loading[whatIsLoaded] = false;
        }
    }

    this.isLoading = function(whatToAsk)
    {
        return !(this.check())
        && $rootScope.loading[whatToAsk] != undefined
        && $rootScope.loading[whatToAsk];
    }

    return this;
});