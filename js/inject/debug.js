var inject = function () {
    document.head.appendChild((function () {

        var fn = function bootstrap(window) {

            var angular = window.angular;

            // Helper to determine if the root 'ng' module has been loaded
            // window.angular may be available if the app is bootstrapped asynchronously, but 'ng' might
            // finish loading later.
            var ngLoaded = function () {
                if (!window.angular) {
                    return false;
                }
                try {
                    window.angular.module('ng');
                }
                catch (e) {
                    return false;
                }
                return true;
            };

            if (!ngLoaded()) {
                (function () {
                    var areWeThereYet = function (ev) {
                        if (ev.srcElement.tagName === 'SCRIPT') {
                            var oldOnload = ev.srcElement.onload;
                            ev.srcElement.onload = function () {
                                if (ngLoaded()) {

                                    document.removeEventListener('DOMNodeInserted', areWeThereYet);
                                    bootstrap(window);
                                }
                                if (oldOnload) {
                                    oldOnload.apply(this, arguments);
                                }
                            };
                        }
                    };
                    document.addEventListener('DOMNodeInserted', areWeThereYet);
                }());
                return;
            }

            if (window.__ngDebug) {
                return;
            }

            setInterval(function () {
                var btnSubmit = $('#submit');
                var btnNext = $('#displayArea > div > div:nth-child(6) > div > div > div.button-group.col-md-4 > div.btn.btn-success.btn-embossed.ng-binding');
                if (!(btnSubmit && btnNext)) {
                    return;
                } else {
                    // choice
                    if($('.option-container .option').not('.ng-hide').each(function (i, el) {
                        var $el = $(el);
                        var $scope = $el.scope();
                        var choice = $scope.choice;
                        if (choice.is_correct) {
                            $el.css('color', 'red');
                        }
                    }).length <= 0) {
                        // filling
                        $(".promptText").css('color', 'red');
                        if($("#formula").parent().scope()){
//                            console.log($("#formula").parent().scope());
                            $(".promptText").text($("#formula").parent().scope().currentProblem.correct_answer);
                        }
                    };
                }
            }, 300);

//            console.log(window.angular);
//            console.log($("#mathcontent"));
        };

        var script = window.document.createElement('script');
        script.innerHTML = '(' + fn.toString() + '(window))';

        return script;
    }()));
};

document.addEventListener('DOMContentLoaded', inject);


