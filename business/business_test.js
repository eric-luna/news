'use strict';

describe('myApp.general module', function() {

  beforeEach(module('myApp.general'));

  describe('general controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var generalCtrl = $controller('GeneralCtrl');
      expect(GeneralCtrl).toBeDefined();
    }));

  });
});