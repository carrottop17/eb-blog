var ebBlog = angular.module("ebBlog", ['ngRoute', 'ngCookies', 'ngSanitize', 'textAngular']);
var apiPath = "http://localhost:3003";

ebBlog.controller('mainController', function($scope, $route, $http, $cookies, $location){
	
	$scope.login = function(){
		console.log(username);
		console.log($scope.username);
		if($scope.username == username && $scope.password == password){
			$cookies.put('username', $scope.username);
			console.log('username match');
			$scope.signedIn();
		}else{
			console.log('username not match');
		}
	};

	$scope.signedIn = function(){
		$scope.user = $cookies.get('username');
		if($scope.user == username){
			$scope.loggedIn = true;
		}else{
			$scope.loggedIn = false;
			$location.path('/');
		}
	};
	
	$scope.logout = function(){
		$cookies.remove('username');
		$scope.signedIn();
	}

	$scope.newBlogPost = function(){
		$http.post(apiPath + '/newBlogPost', {
			blogPost: $scope.htmlVariable
		}).then(function successCallback(response){
			console.log(response);
			if(response.data.message == 'added'){
				$location.path('/');
				console.log(response.data);
			}
		},function errorCallback(response){
			console.log('error');
			console.log(response);
		});
	};

	// $scope.getBlogs = function(){
	// 	$http.get(apiPath + '/getUserData?token=' + $cookies.get('token')).then(function successCallback(response){
	// 		if (response.data.failure == 'noToken' || response.data.failure == 'badToken'){
	// 			$location.path('/login');
	// 			console.log(response.data);
	// 		} else {
	// 			$scope.blogPost = response.data.blogPost;
	// 		}
	// 	}, function errorCallback(response){
	// 		console.log(response.status);
	// 	});
	// };

	$scope.getBlogs = function(){
		$http.get(apiPath).then(function successCallback(response){
			$scope.blogPost = response.data.blogPost;
			console.log($scope.blogPost);
		},function errorCallback(response){
			console.log('error');
			console.log(response);
		});		
	};

	$scope.deleteBlog = function(results){
		console.log(results.date);
		$http.post(apiPath + '/deleteBlog', {
			results: results,
			// token: $cookies.get('token')
		}).then(function successCallback(response){
			$scope.getBlogs();
			console.log(response);
		}, function errorCallback(response){
			console.log(response.data);
		});
	};
});

ebBlog.controller('wysiwygeditor', ['$scope', 'textAngularManager', function wysiwygeditor($scope, textAngularManager) {
    $scope.version = textAngularManager.getVersion();
    $scope.versionNumber = $scope.version.substring(1);
    $scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/2maA1-mvicY" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><h4>Supports non-latin Characters</h4><p>昮朐 魡 燚璒瘭 譾躒鑅, 皾籈譧 紵脭脧 逯郹酟 煃 瑐瑍, 踆跾踄 趡趛踠 顣飁 廞 熥獘 豥 蔰蝯蝺 廦廥彋 蕍蕧螛 溹溦 幨懅憴 妎岓岕 緁, 滍 蘹蠮 蟷蠉蟼 鱐鱍鱕, 阰刲 鞮鞢騉 烳牼翐 魡 骱 銇韎餀 媓幁惁 嵉愊惵 蛶觢, 犝獫 嶵嶯幯 縓罃蔾 魵 踄 罃蔾 獿譿躐 峷敊浭, 媓幁 黐曮禷 椵楘溍 輗 漀 摲摓 墐墆墏 捃挸栚 蛣袹跜, 岓岕 溿 斶檎檦 匢奾灱 逜郰傃</p>';
    $scope.htmlcontent = $scope.orightml;
    $scope.disabled = false;
}]);

ebBlog.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'views/main.html',
		controller: 'mainController'
	})
	.when('/login',{
		templateUrl: 'views/login.html',
		controller: 'mainController'
	})
	.when('/newpost',{
		templateUrl: 'views/newpost.html',
		controller: 'wysiwygeditor'
	})
});