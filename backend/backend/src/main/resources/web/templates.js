(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ElementList.hb'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-6\">\r\n                    <p>\r\n                        <a href=\"mailto:"
    + alias2(alias1((depth0 != null ? depth0.mUsername : depth0), depth0))
    + "@lehigh.edu\" data-toggle=\"tooltip\" title=\""
    + alias2(alias1((depth0 != null ? depth0.mUsername : depth0), depth0))
    + "@lehigh.edu\">"
    + alias2(alias1((depth0 != null ? depth0.mUsername : depth0), depth0))
    + "</a>\r\n                        <button id=\"buttonViewProfile"
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" type=\"button\" class=\"btn btn-default btn-xs\" data-value=\""
    + alias2(alias1((depth0 != null ? depth0.mUsername : depth0), depth0))
    + "\">View Profile</button>\r\n                    </p>\r\n                    <p class=\"subject-feed\">"
    + alias2(alias1((depth0 != null ? depth0.mSubject : depth0), depth0))
    + "</p>\r\n                    <p>"
    + alias2(alias1((depth0 != null ? depth0.mMessage : depth0), depth0))
    + "\r\n                    </p>\r\n                    <p class=\"date-feed\">"
    + alias2(alias1((depth0 != null ? depth0.mCreateTime : depth0), depth0))
    + "</p>\r\n                    <p>\r\n                        <a href=\"#\" data-toggle=\"tooltip\" title=\"Vote count\"><span class=\"badge\">"
    + alias2(alias1((depth0 != null ? depth0.mVotes : depth0), depth0))
    + "</span></a>\r\n                        <!--onclick=\"alert('Vote up.'); return false;\">-->\r\n                        <a id=\"aVoteUp"
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" href=\"#\" data-toggle=\"tooltip\" title=\"Vote Up\" data-value=\""
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" onclick=\"upvote(); return false;\"><span class=\"glyphicon glyphicon-thumbs-up\"></span></a>\r\n                        <a id=\"aVoteDown"
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" href=\"#\" data-toggle=\"tooltip\" title=\"Vote Down\" data-value=\""
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" onclick=\"ElementList.downvote(); return false;\"><span class=\"glyphicon glyphicon-thumbs-down\"></span></a>\r\n                    </p>\r\n                </div>\r\n                <div class=\"col-xs-6\">\r\n                    <div id=\"images"
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" style=\"display: none\"/>\r\n                </div>\r\n            </div>\r\n            <div>\r\n                <div id=\"comments"
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" style=\"display: none\"/>\r\n            </div>\r\n            <button id=\"buttonComment"
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" type=\"button\"  class=\"btn btn-default btn-xs\" onclick=\"foo("
    + alias2(((helper = (helper = helpers.mId || (depth0 != null ? depth0.mId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"mId","hash":{},"data":data}) : helper)))
    + ")\">Comment</button>\r\n            <button id=\"buttonViewPoll"
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" type=\"button\"  class=\"btn btn-default btn-xs\" data-value=\""
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\">View Poll</button>\r\n            <button id=\"buttonCreatePoll"
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" type=\"button\"  class=\"btn btn-default btn-xs\" data-value=\""
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\">Create Poll</button>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"container\" id=\"mainContainer\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.mMessageData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['EditEntryForm.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div id=\"EditEntryForm\" class=\"modal fade\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-body\">\r\n                <label for=\"EditEntryForm-title\">Title</label>\r\n                <input class=\"form-control\" type=\"text\" id=\"EditEntryForm-title\" readonly/>\r\n                <label for=\"EditEntryForm-message\">Message</label>\r\n                <textarea class=\"form-control\" id=\"EditEntryForm-message\" readonly></textarea>\r\n                <span id=\"EditEntryForm-date\"></span>\r\n                <span id=\"EditEntryForm-votes\"></span>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <!--\r\n                <button id=\"EditEntryForm-upvote\" data-value=\""
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\">Upvote</button>\r\n                <button id=\"EditEntryForm-downvote\" value=\""
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\">Downvote</button>\r\n                -->\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"EditEntryForm-Close\">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['NewEntryForm.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"NewEntryForm\" class=\"modal fade\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\">Create a Buzz</h4>\r\n            </div>\r\n            <form id=\"NewEntryForm-form\" name=\"form\">\r\n            <div class=\"modal-body\">\r\n                <p>\r\n                    <label for=\"NewEntryForm-title\">Title:</label>\r\n                    <input class=\"form-control\" type=\"text\" id=\"NewEntryForm-title\" name=\"title\" />\r\n                </p>\r\n                <p>\r\n                    <label for=\"NewEntryForm-message\">Message:</label>\r\n                    <textarea class=\"form-control\" id=\"NewEntryForm-message\" name=\"message\"></textarea>\r\n                </p>\r\n\r\n                <p>\r\n                    <button type=\"button\" class=\"btn btn-default\" id=\"NewEntryForm-Video\">Add Video</button>\r\n                    <button type=\"button\" class=\"btn btn-default\" id=\"NewEntryForm-picture\">Add Picture</button>\r\n                </p>\r\n\r\n                <p1>\r\n                    <label for=\"NewEntryForm-url\">Youtube Video URL:</label>\r\n                    <input class=\"form-control\" type=\"url\" id=\"NewEntryForm-url\" name=\"url\" />\r\n                </p1>\r\n\r\n                <p2>\r\n                    <label for=\"NewEntryForm-file\">Upload File:</label>\r\n                    <input type=\"file\" id=\"NewEntryForm-file\" name=\"file\" />\r\n                </p2>\r\n            </div>\r\n            </form>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"NewEntryForm-OK\">OK</button>\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"NewEntryForm-Close\">Cancel</button>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['NewPollForm.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"NewPollForm\" class=\"modal fade\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\">Create a Poll</h4>\r\n            </div>\r\n            <form id=\"NewPollForm-form\" name=\"form\">\r\n            <div class=\"modal-body\">\r\n                <p>\r\n                    <label for=\"NewPollForm-title\">Subject:</label>\r\n                    <input class=\"form-control\" type=\"text\" id=\"NewPollForm-title\" name=\"title\" />\r\n                </p>\r\n                <p>\r\n                    <label for=\"NewPollForm-file\">Poll Option 1:</label>\r\n                    <input class=\"form-control\" type=\"text\" id=\"NewPollForm-poll1\" name=\"poll1\" />\r\n                </p>\r\n                <p>\r\n                    <label for=\"NewPollForm-file\">Poll Option 2:</label>\r\n                    <input class=\"form-control\" type=\"text\" id=\"NewPollForm-poll2\" name=\"poll2\" />\r\n                </p>\r\n                <p3>\r\n                    <label for=\"NewPollForm-file\">Poll Option 3:</label>\r\n                    <input class=\"form-control\" type=\"text\" id=\"NewPollForm-poll3\" name=\"poll3\" />\r\n                </p3>\r\n                <p4>\r\n                    <label for=\"NewPollForm-file\">Poll Option 4:</label>\r\n                    <input class=\"form-control\" type=\"text\" id=\"NewPollForm-poll4\" name=\"poll4\" />\r\n                </p4>\r\n                <p5>\r\n                    <label for=\"NewPollForm-file\">Poll Option 5:</label>\r\n                    <input class=\"form-control\" type=\"text\" id=\"NewPollForm-poll5\" name=\"poll5\" />\r\n                </p5>\r\n                <p6>\r\n                    <label for=\"NewPollForm-file\">Poll Option 6:</label>\r\n                    <input class=\"form-control\" type=\"text\" id=\"NewPollForm-poll6\" name=\"poll6\" />\r\n                </p6>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p1><button type=\"button\" class=\"btn btn-default\" id=\"NewPollForm-addOption\">Add Option</button></p1>\r\n                <p3><button type=\"button\" class=\"btn btn-default\" id=\"NewPollForm-removeOption\">Remove Option</button></p3>\r\n            </div>\r\n            </form>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"NewPollForm-OK\">OK</button>\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"NewPollForm-Close\">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Navbar.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<nav class=\"navbar navbar-default\">\r\n    <div class=\"container\">\r\n        <!-- Brand and toggle get grouped for better mobile display -->\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" \r\n                data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\r\n              <span class=\"sr-only\">Toggle navigation</span>\r\n              <span class=\"icon-bar\"></span>\r\n              <span class=\"icon-bar\"></span>\r\n              <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <!-- Clicking the brand refreshes the page -->\r\n            <a class=\"navbar-brand\" href=\"/\">The Buzz</a>\r\n        </div>\r\n\r\n        <!-- Collect the nav links, forms, and other content for toggling -->\r\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li>\r\n                    <!--<a class=\"btn btn-link\" id=\"Navbar-createAccount\">\r\n                        Create Account\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a class=\"btn btn-link\" id=\"Navbar-logIn\">\r\n                        Log In\r\n                    </a>-->\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n\r\n  <head>\r\n    <meta name=\"google-signin-scope\" content=\"profile email\">\r\n    <meta name=\"google-signin-client_id\" content=1080316803619-flf753te3n99rv3mh90movqrs3eujk3v.apps.googleusercontent.com>\r\n    <script src=\"https://apis.google.com/js/platform.js\" async defer></script>\r\n  </head>\r\n  <body>\r\n    <div id=\"Gsignin\" class=\"g-signin2\" data-onsuccess=\"onSignIn\" data-theme=\"dark\"></div>\r\n    <script>\r\n      function onSignIn(googleUser) {\r\n        // Useful data for your client-side scripts:\r\n        var profile = googleUser.getBasicProfile();\r\n        console.log(\"ID: \" + profile.getId()); // Don't send this directly to your server!\r\n        console.log('Full Name: ' + profile.getName());\r\n        console.log('Given Name: ' + profile.getGivenName());\r\n        console.log('Family Name: ' + profile.getFamilyName());\r\n        console.log(\"Image URL: \" + profile.getImageUrl());\r\n        console.log(\"Email: \" + profile.getEmail());\r\n\r\n        // The ID token you need to pass to your backend:\r\n        var id_token = googleUser.getAuthResponse().id_token;\r\n        console.log(\"ID Token: \" + id_token);\r\n         $.ajax({\r\n                type: \"POST\",\r\n                url: \"/tokensignin\",\r\n                dataType: \"json\",\r\n                data: JSON.stringify({ token_id: id_token }),\r\n                success: Navbar.onLoginResponse\r\n            });       \r\n      };\r\n    </script>\r\n \r\n  </body>\r\n\r\n";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['LoginWindow.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"LoginWindow\" class=\"modal fade\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\">Log In</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <label for=\"LoginWindow-user\">Username</label>\r\n                <input class=\"form-control\" type=\"text\" id=\"LoginWindow-user\" />\r\n                <label for=\"LoginWindow-pass\">Password</label>\r\n                <input class=\"form-control\" type=\"text\" id=\"LoginWindow-pass\"></textarea>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"LoginWindow-Submit\">Submit</button>\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"LoginWindow-Close\">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['CreateAccountForm.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"CreateAccountForm\" class=\"modal fade\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\">Register</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <label for=\"CreateAccountForm-user\">Username</label>\r\n                <input class=\"form-control\" type=\"text\" id=\"CreateAccountForm-user\" />\r\n                <label for=\"CreateAccountForm-pass\">Real Name</label>\r\n                <input class=\"form-control\" type=\"text\" id=\"CreateAccountForm-realname\"></textarea>\r\n                <label for=\"CreateAccountForm-pass\">Email</label>\r\n                <input class=\"form-control\" type=\"text\" id=\"CreateAccountForm-email\"></textarea>\r\n                \r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"CreateAccountForm-Submit\">Submit</button>\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"CreateAccountForm-Close\">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['NavbarLoggedIn.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"container\">\r\n    <nav class=\"navbar navbar-default\">\r\n        <!-- Brand and toggle get grouped for better mobile display -->\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" \r\n                data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\r\n              <span class=\"sr-only\">Toggle navigation</span>\r\n              <span class=\"icon-bar\"></span>\r\n              <span class=\"icon-bar\"></span>\r\n              <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <!-- Clicking the brand refreshes the page -->\r\n            <a class=\"navbar-brand\" href=\"/\">The Buzz</a>\r\n        </div>\r\n\r\n        <!-- Collect the nav links, forms, and other content for toggling -->\r\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li>\r\n                    <a class=\"btn btn-link\" id=\"NavbarLoggedIn-add\">\r\n                        Create a Buzz\r\n                        <span class=\"glyphicon glyphicon-plus\"></span><span class=\"sr-only\">Show Trending Posts</span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a class=\"btn btn-link\" id=\"NavbarLoggedIn-viewBuzz\">\r\n                        View All Buzzes\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a class=\"btn btn-link\" id=\"NavbarLoggedIn-profile\">\r\n                        Profile\r\n                    </a>\r\n                </li>       \r\n                <li>\r\n                    <a class=\"btn btn-link\" id=\"NavbarLoggedIn-logOut\" onclick=\"signOut();\">\r\n                        Sign Out\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n             <script>\r\n                function signOut() {\r\n                    var auth2 = gapi.auth2.getAuthInstance();\r\n                    auth2.signOut().then(function () {\r\n                        console.log('User signed out.');\r\n                    });\r\n                }\r\n            </script>\r\n        </div>\r\n    </nav>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ProfilePage.hb'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <div class=\"panel panel-default\">\r\n                <div class=\"panel-body\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-xs-6\">\r\n                            <p class=\"subject-feed\">"
    + alias2(alias1((depth0 != null ? depth0.mSubject : depth0), depth0))
    + "</p>\r\n                            <p>"
    + alias2(alias1((depth0 != null ? depth0.mMessage : depth0), depth0))
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.mUrl : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                            </p>\r\n                            <p class=\"date-feed\">"
    + alias2(alias1((depth0 != null ? depth0.mCreateTime : depth0), depth0))
    + "</p>\r\n                            <p>\r\n                                <a href=\"#\" data-toggle=\"tooltip\" title=\"Vote count\"><span class=\"badge\">"
    + alias2(alias1((depth0 != null ? depth0.mVotes : depth0), depth0))
    + "</span></a>\r\n                            </p>\r\n                        </div>\r\n                        <div class=\"col-xs-6\">\r\n                            <img id=\"img"
    + alias2(alias1((depth0 != null ? depth0.mId : depth0), depth0))
    + "\" src=\"\" class=\"img-responsive thumbnail img-feed pull-right\" style=\"display: none\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                                    <a href=\""
    + alias2(alias1((depth0 != null ? depth0.mUrl : depth0), depth0))
    + "\" data-toggle=\"tooltip\" title=\""
    + alias2(alias1((depth0 != null ? depth0.mUrl : depth0), depth0))
    + "\" target=\"_blank\"><span class=\"glyphicon glyphicon-link\"></span></a>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <div class=\"panel panel-default\">\r\n                <div class=\"panel-body\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-xs-6\">\r\n                            <p>"
    + alias2(alias1((depth0 != null ? depth0.mUsername : depth0), depth0))
    + "</p>\r\n                            <p>"
    + alias2(alias1((depth0 != null ? depth0.mComment : depth0), depth0))
    + "</p>\r\n                            <p class=\"date-feed\">"
    + alias2(alias1((depth0 != null ? depth0.mCreateTime : depth0), depth0))
    + "</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"container\" id=\"mainContainer\">\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-6\">\r\n                    <p class=\"subject-feed\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mProfileData : depth0)) != null ? stack1.mUsername : stack1), depth0))
    + "</p>\r\n                    <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mProfileData : depth0)) != null ? stack1.mRealName : stack1), depth0))
    + "</p>\r\n                    <p><a href=\"mailto:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mProfileData : depth0)) != null ? stack1.mEmail : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mProfileData : depth0)) != null ? stack1.mEmail : stack1), depth0))
    + "</a></p>\r\n                    <p><button id=\"buttonEditBio\" type=\"button\" class=\"btn btn-default btn-xs\" data-value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mProfileData : depth0)) != null ? stack1.mUsername : stack1), depth0))
    + "\" style=\"display: none\">Edit Bio</button></p>\r\n                </div>\r\n                <div class=\"col-xs-6\">\r\n                    <img src=\"https://forum.wholetomato.com/mira/woman.png\" class=\"img-responsive pull-right\" />\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <p class=\"subject-feed\">Buzzes</p>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.mMessageData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <p class=\"subject-feed\">Buzzes Voted Up</p>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.mLikedData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <p class=\"subject-feed\">Buzzes Voted Down</p>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.mDisLikedData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <p class=\"subject-feed\">Comments Written</p>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.mCommentData : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['EditBio.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"EditBio\" class=\"modal fade\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\">Edit Bio</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p>\r\n                    <label for=\"EditBio-newBio\">Bio:</label>\r\n                    <textarea class=\"form-control\" id=\"EditBio-newBio\"></textarea>\r\n                </p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"EditBio-OK\">OK</button>\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"EditBio-Close\">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ViewComments.hb'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <tr>\r\n                <td>"
    + alias2(alias1((depth0 != null ? depth0.mComment : depth0), depth0))
    + "</td>\r\n\r\n                <td><button class=\"ViewComments-viewProfile\" data-value=\""
    + alias2(alias1((depth0 != null ? depth0.mUsername : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.mUsername : depth0), depth0))
    + "</button></td>\r\n                \r\n            </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"panel panel-default\" id=\"ViewComments\">\r\n\r\n    <td><button class=\"ViewComments-addComment\" data-value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.mMessageId : depth0), depth0))
    + "\">Add a comment</button></td>\r\n\r\n    <table class=\"table\">\r\n        <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.mCommentData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </tbody>\r\n    </table>\r\n</div>\r\n";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['NewCommentForm.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"NewCommentForm\" class=\"modal fade\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\">Add a Comment</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p>\r\n                    <label for=\"NewCommentForm-comment\">Comment:</label>\r\n                    <input class=\"form-control\" type=\"text\" id=\"NewCommentForm-comment\" />\r\n                </p>\r\n                <p>\r\n                    <label for=\"NewCommentForm-url\">URL:</label>\r\n                    <input class=\"form-control\" type=\"url\" id=\"NewCommentForm-url\" />\r\n                </p>\r\n                <p>\r\n                    <label for=\"NewCommentForm-file\">Upload File:</label>\r\n                    <input type=\"file\" id=\"NewCommentForm-file\" />\r\n                </p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"NewCommentForm-OK\">OK</button>\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"NewCommentForm-Close\">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['NewPassForm.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"NewPassForm\" class=\"modal fade\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\">Change Password</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <label for=\"NewPassForm-oldPass\">Enter current password:</label>\r\n                <input class=\"form-control\" type=\"text\" id=\"NewPassForm-oldPass\" />\r\n                <label for=\"NewPassForm-newPass\">Enter new password:</label>\r\n                <input class=\"form-control\" type=\"text\" id=\"NewPassForm-newPass\" />\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"NewPassForm-OK\">OK</button>\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"NewPassForm-Close\">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ViewPoll.hb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div id=\"ViewPoll\" class=\"modal fade\" role=\"dialog\">\r\n    <div id=\"iDontCare\" class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mSubject : stack1), depth0))
    + "</h4>\r\n            </div>\r\n            <form id=\"ViewPoll-form\" name=\"form\">\r\n            <div class=\"modal-body\">\r\n\r\n                <div class=\"modal-body\">\r\n                    <p1><label for=\"ViewPoll-message\">Option1</label></p1>\r\n                    <p1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption1 : stack1), depth0))
    + "</p1>\r\n                    <p2><label for=\"ViewPoll-message\">Option2</label></p2>\r\n                    <p2>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption2 : stack1), depth0))
    + "</p2>\r\n                    <p3><label for=\"ViewPoll-message\">Option3</label></p3>\r\n                    <p3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption3 : stack1), depth0))
    + "</p3>\r\n                    <p4><label for=\"ViewPoll-message\">Option4</label></p4>\r\n                    <p4>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption4 : stack1), depth0))
    + "</p4>\r\n                    <p5><label for=\"ViewPoll-message\">Option5</label></p5>\r\n                    <p5>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption5 : stack1), depth0))
    + "</p5>\r\n                    <p6><label for=\"ViewPoll-message\">Option6</label></p6>\r\n                    <p6>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption6 : stack1), depth0))
    + "</p6>\r\n                </div>\r\n            \r\n            <div id=\"ViewPoll-pollVotes\" class=\"modal-body\">\r\n                <div class=\"modal-body\">\r\n                    <p1><a href=\"#\" data-toggle=\"tooltip\" title=\"Option 1\"><span class=\"badge\">Option 1: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption1Votes : stack1), depth0))
    + "</span></a></p1>\r\n                    <p2><a href=\"#\" data-toggle=\"tooltip\" title=\"Option2\"><span class=\"badge\">Option 2: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption2Votes : stack1), depth0))
    + "</span></a></p2>\r\n                    <p3><a href=\"#\" data-toggle=\"tooltip\" title=\"Option3\"><span class=\"badge\">Option 3: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption3Votes : stack1), depth0))
    + "</span></a></p3>\r\n                    <p4><a href=\"#\" data-toggle=\"tooltip\" title=\"Option4\"><span class=\"badge\">Option 4: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption4Votes : stack1), depth0))
    + "</span></a></p4>\r\n                    <p5><a href=\"#\" data-toggle=\"tooltip\" title=\"Option5\"><span class=\"badge\">Option 5: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption5Votes : stack1), depth0))
    + "</span></a></p5>\r\n                    <p6><a href=\"#\" data-toggle=\"tooltip\" title=\"Option6\"><span class=\"badge\">Option 6: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mPollData : depth0)) != null ? stack1.mPollOption6Votes : stack1), depth0))
    + "</span></a></p6>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <p1><button type=\"button\" class=\"btn btn-default\" id=\"ViewPoll-Option1\">Option1</button></p1>\r\n                    <p2><button type=\"button\" class=\"btn btn-default\" id=\"ViewPoll-Option2\">Option2</button></p2>\r\n                    <p3><button type=\"button\" class=\"btn btn-default\" id=\"ViewPoll-Option3\">Option3</button></p3>\r\n                    <p4><button type=\"button\" class=\"btn btn-default\" id=\"ViewPoll-Option4\">Option4</button></p4>\r\n                    <p5><button type=\"button\" class=\"btn btn-default\" id=\"ViewPoll-Option5\">Option5</button></p5>\r\n                    <p6><button type=\"button\" class=\"btn btn-default\" id=\"ViewPoll-Option6\">Option6</button></p6>\r\n                </div>\r\n            </div>\r\n            </form>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" id=\"ViewPoll-Close\">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();
