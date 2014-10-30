angular.module('foundation.notification', []);

angular.module('foundation.notification')
  .directive('faNotification', ['FoundationApi', function(foundationApi) {
  return {
    restrict: 'EA',
    templateUrl: '/partials/panel.html',
    transclude: true,
    scope: {
      position: '@'
    },
    replace: true,
    compile: function compile(tElement, tAttrs, transclude) {
      var type = 'panel';

      return {
        pre: function preLink(scope, iElement, iAttrs, controller) {
          iAttrs.$set('fa-closable', type);
        },
        post: function postLink(scope, element, attrs) {
          var currentStatus = 'hide';
          scope.active = false;

          //setup
          foundationApi.subscribe(attrs.id, function(msg) {
            if(msg == 'show' || msg == 'open') {
              scope.show();
            } else if (msg == 'close' || msg == 'hide') {
              scope.hide();
            } else if (msg == 'toggle') {
              scope.toggle();
            }

            scope.$apply();

            return;
          });

          scope.hide = function() {
            scope.active = false;
            return;
          };

          scope.show = function() {
            scope.active = false;
            return;
          };

          scope.toggle = function() {
            scope.active = !scope.active;
            return;
          };
        }
      };
    },
  };
}]);
