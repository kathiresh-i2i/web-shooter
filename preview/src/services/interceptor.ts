
export class AuthenticationInterceptor {
  public static Factory($q: ng.IQService) {
    return new AuthenticationInterceptor($q);
  }
  constructor(private $q: ng.IQService) {
  }

  public request(config) {
    console.log('=====request-', config);
    return config;
  }

  public response(response) {
    console.log('==========response====', response);
    return response || this.$q.when(response);
  }

  public responseError(rejection) {
    console.log('=======reject==', rejection);
    if (rejection.status === 401) {
    }
    return this.$q.reject(rejection);
  }
}
