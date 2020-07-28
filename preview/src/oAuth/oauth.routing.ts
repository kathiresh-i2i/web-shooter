

const routes = ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $stateProvider
        .state({
            name: 'access_token',
            url: '/access_token',
            params: {
                id_token: null,
                token_type: null,
                expires_in: null
            },
            template: '<success></success>',

        })
}

routes.$inject = ["$stateProvider", "$urlRouterProvider"]

export default routes;
