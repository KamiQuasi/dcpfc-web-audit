(function() {
    angular.module('audit', ['ngResource'])
        .factory('glossary', ['$resource', function($resource) {
            return $resource('data/glossary.json', null, {});
        }])
        .factory('baselines', ['$resource', function($resource) {
            return $resource('data/baseline.json', null, {});
        }])
        .factory('recommendations', ['$resource', function($resource) {
            return $resource('data/recommendations.json', null, {});
        }])
        .directive('auditBaselineDetails', function() {
            return {
                scope: { auditBaselineDetails: '=' },
                link: function(scope, element, attr) {
                    var obj = scope.auditBaselineDetails,
                        upd = '';
                    if(typeof obj === "object") {
                        if(obj.name && obj.url) {
                            upd = '<a href="'+obj.url+'">'+obj.name+'</a>';
                        } else {
                            upd = '<ul>';
                            for(var i=0, len=obj.length; i<len; i++) {
                                if(obj[i].name && obj[i].url) {
                                    upd += '<li><a href="'+obj[i].url+'">'+obj[i].name+'</a>';
                                    if(obj[i].details) {
                                        upd += ' - '+obj[i].details;
                                    }                                            
                                    upd += '</li>';
                                } else {
                                    upd += '<li>'+obj[i]+'</li>';
                                }
                            }
                            upd += '</ul>';
                        }
                    } else {
                        upd = obj;
                    }

                    element.html(upd);
                }

            };
        })
        .directive('auditRecommendDetails', function() {
            return {
                scope: { auditRecommendDetails: '=' },
                link: function(scope, element, attr) {
                    var obj = scope.auditRecommendDetails,
                        upd = '';
                    if(typeof obj === "object") {
                        upd = '<ul>';
                        for(var i=0, len=obj.length; i<len; i++) {
                            upd += '<li><strong>'+obj[i].area+'</strong> - '+obj[i].note+'</li>';
                        }
                        upd += '</ul>';
                    }

                    element.html(upd);
                }

            };
        })
        .controller('auditCtrl', ['$scope', 'glossary', 'baselines', 'recommendations', function($scope, glossary, baselines, recommendations) {
            $scope.links = {
                home: false, 
                gloss: true, 
                base: true, 
                rec: true, 
                setLink: function(lnk) {
                    for(k in this) {
                        if(typeof(this[k]) !== 'function') {
                            this[k] = lnk !== k;
                        }
                    }
                }
            };
            $scope.glossary = glossary.get(); 
            $scope.baseline = baselines.get(); 
            $scope.recommendations = recommendations.get();  
        }]);
}());