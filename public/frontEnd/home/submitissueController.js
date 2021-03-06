(function() {
	'use strict';
	
	angular	
		.module('FixYourCityApp')
		.controller('submitissueController', submitissueController);
		
		submitissueController.$inject = ['dataservice', '$stateParams'];
		
	function submitissueController(dataservice, $stateParams){
		var vm = this;
		vm.city = [];
		vm.category = [];
		vm.address='';
		vm.text='';
		vm.sent=0;
		vm.file;
		
		vm.getCity = getCity;
		vm.getCategory = getCategory;
		vm.submitissue = submitissue;
		vm.init = init;
		
		init();
		
		function init(){
			vm.city = getCity();
			vm.category = getCategory();
		};
		
		function getCity(){
			return dataservice.getCities().getCity({id:$stateParams.idcity});
		};
		
		function getCategory(){
			return dataservice.getCategories().getCategory({id:$stateParams.idcategory});
		};
		
		function submitissue(){
			var user = JSON.parse(localStorage.getItem("user"));
			var problem = {
				iduser: user.iduser,
				idcity : vm.city.idcity,
				idcategory : vm.category.idcategory,
				address : vm.address,
				text : vm.text,
			};
			
			vm.sent=1;
			dataservice.submitProblem(vm.file,problem)
				.then(function(data){
					if(data.idproblem!='undefined' && data.idproblem>0){
						vm.sent=2;
					}
				})
				.catch(function(data){
					vm.sent=-1;
				});
			/*
			dataservice.submitProblem().save(problem).$promise
				.then(function(data){
					vm.sent=true;
				})
				.catch(function(data){
					console.log(data);
				});
			*/		
		};
		
	}
})();