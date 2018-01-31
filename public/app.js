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

  $routeProvider.when('/potablewater', {
    templateUrl: 'pages/potablewater.html',
    controller: 'PotableWaterController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/sanitarysewer', {
    templateUrl: 'pages/sanitarysewer.html',
    controller: 'SanitarySewer',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/stormwater', {
    templateUrl: 'stormwater.html',
    controller: 'StormwaterController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/gas', {
    templateUrl: 'gas.html',
    controller: 'GasController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/electric', {
    templateUrl: 'electric.html',
    controller: 'ElectricController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/communications', {
    templateUrl: 'communications.html',
    controller: 'CommunicationsController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/na', {
    templateUrl: 'na.html',
    controller: 'NaController',
    controllerAs: 'ctrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);

// =====================================
// Controllers
// ======================================

// ********************Main********************
app.controller('MainController', ['$http', '$sce', function($http, $scope, $sce){
  // API
  this.url = 'http://localhost:3000'
  // this.url = 'https://learn-bivvy-api.herokuapp.com'


  // Global variables
  this.message = null;
  this.checked = false;
  this.pagesDisplay = true;
  this.lessonsDisplay = false;
  this.signInScreen = true;
  this.registerScreen = false;
  this.form = false;
  this.formDataService = {};
  this.formDataLesson = {};
  this.service = null;
  this.serviceTags = [];
  this.serviceInView = false;
  this.clickedService = null;
  this.showListOfLessons = false;
  this.editModal = false;
  this.createModal = false;
  this.viewModal = false;
  this.register = () => {
    this.signInScreen = false;
    this.registerScreen = true;
  };
  this.showPages = () => {
    this.pagesDisplay = true
    this.lessonsDisplay = false;
    this.serviceInView = false;
  };
  this.showLessons = () => {
    this.lessonsDisplay = true;
    this.pagesDisplay = false;
    this.serviceInView = false;
  };
  this.addLessonDisplayList = () => {
    this.showListOfLessons = !this.showListOfLessons
  };
  this.openForm = () => {
    this.form = true;
  };
  this.openAddServiceForm = () => {
    this.serviceForm = true;
  };
  this.openAddLessonForm = () => {
    this.lessonForm = true;
  };
  this.openLinkForm = () => {
    this.linkForm = true;
  };
  this.getAllServices = (service) => {
    $http({
      method: 'GET',
      url: this.url + '/services'
    }).then(response => {
      this.services = response.data
      for (let i = 0; i < this.services.length; i++) {
        if (this.services[i].id == service.id) {
          this.clickedService = this.services[i]
        }
      }
    }).catch(reject => {
      console.log('Catch: ', reject);
    });
  };
  this.getAllLessons = () => {
    $http({
      method: 'GET',
      url: this.url + '/lessons'
    }).then(response => {
      this.lessons = response.data
    }).catch(reject => {
      console.log('Catch: ', reject);
    });
  };
  this.viewServices = (service) => {
    this.serviceInView = !this.serviceInView
    this.pagesDisplay = false;
    this.clickedService = service
  };
  this.viewLesson = (lesson) => {
    this.viewedLesson = !this.viewedLesson
    this.clickedLesson = lesson
  };
  this.checkedService = (service) => {
    console.log(service);
  };

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

  // User register
  this.registerUser = (userPass) => {
    $http({
      method: 'POST',
      url: this.url + '/users',
      data: {user: {username: userPass.username, password: userPass.password}}
    }).then(response => {
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
    console.log(this.lessons);
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

  // Lessonplans Data
  $http({
    method: 'GET',
    url: this.url + '/lessonplans'
  }).then(response => {
    this.lessonplans = response.data
  }).catch(reject => {
    console.log('Catch: ', reject);
  });

  // Create Lesson
  this.addLesson = () => {
    this.currentLesson = null;
    let newServiceId = 0;
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].name == this.formDataLesson.services) {
        newServiceId = this.services[i].id
      }
    }
    // ...posting lesson
    $http({
      method: 'POST',
      url: this.url + '/lessons',
      data: this.formDataLesson
    }).then(response => {
      this.getAllLessons();
      this.getAllServices();
      this.lessons.push(response.data.lesson);
      this.currentLesson = this.lessons[this.lessons.length - 1];
      this.lessonForm = false;
      this.formDataLesson = {};
      // ...then posting lessonplan
      $http({
        method: 'POST',
        url: this.url + '/lessonplans',
        data: {service_id: newServiceId, lesson_id: this.currentLesson.id}
      }).then(response => {
        this.getAllLessons();
        this.getAllServices();
      }).catch(reject => {
        console.log('Catch', reject);
      });
    }).catch(reject => {
      console.log('Catch', reject);
    });
  };

  // Create lessonplan
  this.addLessonToService = (service, lessonID) => {
    $http({
      method: 'POST',
      url: this.url + '/lessonplans',
      data: {service_id: service.id, lesson_id: lessonID}
    }).then(response => {
      this.getAllServices(service);
      this.showListOfLessons = false;
    }).catch(reject => {
      console.log('Catch', reject);
    });
  };

  // Create Service
  this.addService = () => {
    $http({
      method: 'POST',
      url: this.url + '/services',
      data: this.formDataService
    }).then(response => {
      this.getAllServices();
      this.serviceForm = false;
    }).catch(reject => {
      console.log('Catch', reject);
    });
  };

  // Edit Lesson
  this.editLesson = (lesson) => {
    console.log(this.formDataLesson);


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

  // Remove Lesson from Service
  this.removeLesson = (service, lesson) => {
    $http({
      method: 'GET',
      url: this.url + '/lessonplans'
    }).then(response => {
      this.allLessonplans = response.data;
      for (let i = 0; i < this.allLessonplans.length; i++) {
        if (this.allLessonplans[i].service_id == service.id && this.allLessonplans[i].lesson_id == lesson.id) {
          this.lessonplanId = this.allLessonplans[i]
        }
      }
      // ...then remove lessonplan association
      $http({
        method: 'DELETE',
        url: this.url + '/lessonplans/' + this.lessonplanId.id,
        data: {service_id: service.id, lesson_id: lesson.id}
      }).then(response => {
        this.getAllServices(service);
      }).catch(reject => {
        console.log('Catch', reject);
      });
    }).catch(reject => {
      console.log('Catch', reject);
    });
  };

  // Delete Lesson
  this.deleteLesson = (lesson) => {
    console.log(lesson);
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

  // Edit Service
  this.editService = (service) => {
    $http({
      method: 'PUT',
      url: this.url + '/services/' + service.id,
      data: this.formDataService
    }).then(response => {
      this.getAllServices();
      this.form = false;
    }).catch(reject => {
      console.log('Catch', reject)
    });
  };
}]);

// ********************Getting Started********************
app.controller('PotableWaterController', ['$http', '$sce', function($http, $sce){

  // API
  this.url = 'http://localhost:3000'
  // this.url = 'https://learn-bivvy-api.herokuapp.com'

  // Global variables
  this.lessonUrl = null;
  this.currentUrl = [];

  // Lesson Data
  $http({
    method: 'GET',
    url: this.url + '/services/9'
  }).then(response => {
    this.serviceLessons = response.data.lessons;
    for (let i = 0; i < this.serviceLessons.length; i++) {
      console.log(this.serviceLessons[i].video_url);
    this.currentUrl.push($sce.trustAsResourceUrl(this.serviceLessons[i].video_url))
    }
    // ***********


    // ***********
  }).catch(reject => {
    console.log('Catch: ', reject);
  });
}]);

app.controller('SanitarySewerController', ['$http', '$sce', function($http, $sce){
}]);

app.controller('StormwaterController', ['$http', '$sce', function($http, $sce){
  this.test = 'test';
}]);

app.controller('GasController', ['$http', '$sce', function($http, $sce){
  this.test = 'test';
}]);

app.controller('ElectricController', ['$http', '$sce', function($http, $sce){
  this.test = 'test';
}]);

app.controller('CommunicationsController', ['$http', '$sce', function($http, $sce){
  this.test = 'test';
}]);

app.controller('NaController', ['$http', '$sce', function($http, $sce){
  this.test = 'test';
}]);



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
