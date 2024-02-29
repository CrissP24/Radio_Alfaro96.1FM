app.controller('ControllerCategoria', [
	'$scope',
	'$http',
	function($scope, $http) {
		$scope.moment = moment;
		$scope.moment.locale('es');

		$scope.getCategoriaentradas = function() {
			$http.get('/categoriaentrada').success(function(data, status, headers, config) {
				//console.log(JSON.stringify($scope.categoriasentradas));
				$scope.categoriasentradas = data.categoriasentradas;
			}).error(function(data, status, headers, config) {
				console.log("Error> " + data);
			});
		};

		$scope.eliminarCategoriaentradas = function(id) {
			$http.get('/categoriaentrada/eliminar/' + id).success(function(data, status, headers, config) {
				console.log(JSON.stringify(data));
				$scope.getCategoriaentradas();
			}).error(function(data, status, headers, config) {
				console.log("Error> " + data);
			});
		};

		$scope.addCategoriaentradas = function() {
			if ($scope.nombre_categoria != undefined && $scope.descripcion != undefined) {
				$http.post('/categoriaentrada/create?_csrf=' + $scope._csrf +
						'&nombre_categoria=' + $scope.nombre_categoria +
						'&descripcion=' + $scope.descripcion)
					.success(function(data, status, headers, config) {
						$scope.getCategoriaentradas();
						console.log(JSON.stringify(data));
					}).error(function(data, status, headers, config) {
						alert(JSON.stringify(data));
						console.log("Error: " + data);
					});
			}
		};
	}
]);
