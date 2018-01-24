const app = angular.module('LearnBivvyApp', ['ngRoute']);

// =====================================
// Config Routes
// =====================================
app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'pages/home.html',
    controller: 'MainController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/gettingstarted', {
    templateUrl: 'pages/gettingstarted.html',
    controller: 'GettingStartedController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/sewer', {
    templateUrl: 'pages/sewer.html',
    controller: 'SewerController',
    controllerAs: 'ctrl'
  });
  //
  // $routeProvider.when('/pagetwo', {
  //   templateUrl: 'pagetwo.html',
  //   controller: 'PageTwoController',
  //   controllerAs: 'ctrl'
  // });
  //
  // $routeProvider.when('/pagethree', {
  //   templateUrl: 'pagethree.html',
  //   controller: 'PageThreeController',
  //   controllerAs: 'ctrl'
  // });
  //
  // $routeProvider.when('/pagefour', {
  //   templateUrl: 'pagefour.html',
  //   controller: 'PageFourController',
  //   controllerAs: 'ctrl'
  // });
  //
  // $routeProvider.when('/pagefive', {
  //   templateUrl: 'pagefive.html',
  //   controller: 'PageFiveController',
  //   controllerAs: 'ctrl'
  // });
  //
  // $routeProvider.when('/pagesix', {
  //   templateUrl: 'pagesix.html',
  //   controller: 'PageSixController',
  //   controllerAs: 'ctrl'
  // });
  //
  // $routeProvider.when('/pageseven', {
  //   templateUrl: 'pageseven.html',
  //   controller: 'PageSevenController',
  //   controllerAs: 'ctrl'
  // });
  //
  // $routeProvider.when('/pageeight', {
  //   templateUrl: 'pageeight.html',
  //   controller: 'PageEightController',
  //   controllerAs: 'ctrl'
  // });
  //
  // $routeProvider.when('/pagenine', {
  //   templateUrl: 'pagenine.html',
  //   controller: 'PageNineController',
  //   controllerAs: 'ctrl'
  // });
  //
  // $routeProvider.when('/pageten', {
  //   templateUrl: 'pageten.html',
  //   controller: 'PageTenController',
  //   controllerAs: 'ctrl'
  // });
  //
  // $routeProvider.otherwise({
  //   redirectTo: '/'
  // });
}]);

// =====================================
// Controllers
// ======================================
app.controller('MainController', ['$http', function($http, $scope){

  // API
  this.url = 'http://localhost:3000'

  // Global variables
  this.form = false;
  this.formDataService = {};
  this.formDataLesson = {};
  this.service = null;
  this.openForm = () => {
    this.form = true;
  }
  this.openAddServiceForm = () => {
    this.serviceForm = true;
  }
  this.openAddLessonForm = () => {
    this.lessonForm = true;
  }
  this.getAllServices = () => {
    $http({
      method: 'GET',
      url: this.url + '/services'
    }).then(response => {
      this.services = response.data
    }).catch(reject => {
      console.log('Catch: ', reject);
    });
  }
  this.getAllLessons = () => {
    $http({
      method: 'GET',
      url: this.url + '/lessons'
    }).then(response => {
      this.lessons = response.data
    }).catch(reject => {
      console.log('Catch: ', reject);
    });
  }

  // User login
  this.login = (userPass) => {
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: {user: {username: userPass.username, password: userPass.password}}
    }).then(response => {
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }).catch(reject => {console.log('Rejected:', reject)
    });
  };

  // User logout
  this.logout = () => {
    localStorage.clear('token');
    location.reload();
  };

  // Lesson Data
  $http({
    method: 'GET',
    url: this.url + '/lessons'
  }).then(response => {
    this.lessons = response.data
  }).catch(reject => {
    console.log('Catch: ', reject);
  });

  // Services Data
  $http({
    method: 'GET',
    url: this.url + '/services'
  }).then(response => {
    this.services = response.data
  }).catch(reject => {
    console.log('Catch: ', reject);
  });

  // Create Lesson
  this.addLesson = () => {
    $http({
      method: 'POST',
      url: this.url + '/lessons',
      data: this.formDataLesson
    }).then(response => {
      console.log(response);
      this.getAllLessons();
    }).catch(reject => {
      console.log('Catch', reject);
    })
  }

  // Create Service
  this.addService = () => {

  }

  // Edit Lesson
  this.editLesson = (lesson) => {
    $http({
      method: 'PUT',
      url: this.url + '/lessons/' + lesson.id,
      data: this.formDataLesson
    }).then(response => {
      this.getAllLessons();
      this.formDataLesson = {};
    }).catch(reject => {
      console.log('Catch', reject)
    });
  };

  // Edit Service
  this.editService = (service) => {
    $http({
      method: 'PUT',
      url: this.url + '/services/' + service.id,
      data: this.formDataService
    }).then(response => {
      this.getAllServices();
      this.formDataService = {};
    }).catch(reject => {
      console.log('Catch', reject)
    });
  };

  // Delete Lesson
  this.deleteLesson = (lesson) => {
    $http({
      method: 'DELETE',
      url: this.url + '/lessons/' + lesson.id
    }).then(response => {
      this.getAllLessons();
    }).catch(reject => {
      console.log('Catch', reject);
    });
  };

  // Delete Service
  this.deleteService = (service) => {
    $http({
      method: 'DELETE',
      url: this.url + '/services/' + service.id
    }).then(response => {
      this.getAllServices();
    }).catch(reject => {
      console.log('Catch', reject);
    });
  };

}]);

app.controller('GettingStartedController', ['$http', function($http, $scope){

  // API
  this.url = 'http://localhost:3000'

  // Lesson Data
  $http({
    method: 'GET',
    url: this.url + '/lessons'
  }).then(response => {
    this.lessons = response.data
  }).catch(reject => {
    console.log('Catch: ', reject);
  });
}]);

app.controller('SewerController', ['$http', function($http, $scope){

}]);
// app.controller('PageTwoController', function(){
//   this.test = 'test';
// });
//
// app.controller('PageThreeController', function(){
//   this.test = 'test';
// });
//
// app.controller('PageFourController', function(){
//   this.test = 'test';
// });
//
// app.controller('PageFiveController', function(){
//   this.test = 'test';
// });
//
// app.controller('PageSixController', function(){
//   this.test = 'test';
// });
//
// app.controller('PageSevenController', function(){
//   this.test = 'test';
// });
//
// app.controller('PageEightController', function(){
//   this.test = 'test';
// });
//
// app.controller('PageNineController', function(){
//   this.test = 'test';
// });
//
// app.controller('PageTenController', function(){
//   this.test = 'test';
// });



  //
  // this.getUsers = () => {
  //   $http({
  //     url: this.url + '/users',
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' +
  //       JSON.parse(localStorage.getItem('token'))
  //     }
  //   }).then(response => {
  //     console.log(response);
  //     if (response.data.status == 401) {
  //       this.error = 'Unauthorized';
  //     } else {
  //       this.users = response.data;
  //     }
  //   }).catch(reject => {console.log('Reject is:', reject)
  //   });
  // };
