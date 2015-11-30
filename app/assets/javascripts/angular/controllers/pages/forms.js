var moduleName = "formsApp";

var formsApp = angular.module(moduleName, ['ngResource']);

mySimpleFormsCtrl = function ($scope, dataStore, dataShareService) {
  $scope.user = new dataStore.User;
  $scope.user.is_cool = false;
  $scope.colors = dataShareService.colors;

  $scope.reset_messages = function () {
    $scope.showSubmitSuccessMessage = false;
    $scope.showSubmitErrorMessage = false;
    $scope.showLoadSuccessMessage = false;
    $scope.showLoadErrorMessage = false;
  };

  $scope.get_user = function () {
    $scope.reset_messages();

    $scope.user = dataStore.User.get( { id: $scope.user.first_name} );

    $scope.sampleForm.email.$setDirty();
    $scope.sampleForm.color.$setDirty();
    $scope.sampleForm.is_cool.$setDirty();

    $scope.showLoadSuccessMessage = true;
  };

  $scope.submit_form = function() {
    $scope.reset_messages();

    $scope.firstNameInvalid = false;
    $scope.emailInvalid = false;
    $scope.colorInvalid = false;

    if ($scope.sampleForm.first_name.$invalid){
      $scope.firstNameInvalid = true;
    }

    if ($scope.sampleForm.email.$invalid){
      $scope.emailInvalid = true;
    }

    if ($scope.sampleForm.color.$invalid){
      $scope.colorInvalid = true;
    }

    if ($scope.sampleForm.$valid) {
      $scope.user.$save().then(function() {
        $scope.showSubmitSuccessMessage = true;
        dataShareService.get_all_users();
      });
    }
  }
};
mySimpleFormsCtrl.$inject = ['$scope', 'dataStore', 'dataShareService'];
formsApp.controller('mySimpleFormsCtrl', mySimpleFormsCtrl);


myModalFormsCtrl = function ($scope, dataStore, dataShareService) {
  $scope.form_template = asset_paths['pages/forms/form.html'];
  $scope.colors = dataShareService.colors;
  modal = $('#modal__form');

  $scope.$on('get_all_users', function() {
    $scope.get_all_users();
  });

  $scope.get_all_users = function () {
    $scope.users = dataStore.User.query();
  };

  $scope.openModal = function() {
    modal.foundation('reveal', 'open');
  };

  $scope.closeModal = function() {
    modal.foundation('reveal', 'close');
  };

  $scope.edit_user = function(first_name) {
    $scope.modal_user = dataStore.User.get( { id: first_name} );

    $scope.openModal();
  };

  $scope.update_user = function() {
    $scope.modal_user.$save().then(function() {
      $scope.closeModal();
      $scope.get_all_users();
    });
  };

  $scope.delete_user = function() {
    $scope.modal_user.$remove().then(function () {
      $scope.closeModal();
      $scope.get_all_users();
    });
  };
};
myModalFormsCtrl.$inject = ['$scope', 'dataStore', 'dataShareService'];
formsApp.controller('myModalFormsCtrl', myModalFormsCtrl);