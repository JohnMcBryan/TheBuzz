<div class="container">
    <nav class="navbar navbar-default">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" 
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <!-- Clicking the brand refreshes the page -->
            <a class="navbar-brand" href="/">The Buzz</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li>
                    <a class="btn btn-link" id="NavbarLoggedIn-add">
                        Create a Buzz
                        <span class="glyphicon glyphicon-plus"></span><span class="sr-only">Show Trending Posts</span>
                    </a>
                </li>
                <li>
                    <a class="btn btn-link" id="NavbarLoggedIn-viewBuzz">
                        View All Buzzes
                    </a>
                </li>
                <li>
                    <a class="btn btn-link" id="NavbarLoggedIn-profile">
                        Profile
                    </a>
                </li>       
                <li>
                    <a class="btn btn-link" id="NavbarLoggedIn-logOut" onclick="signOut();">
                        Sign Out
                    </a>
                </li>
            </ul>
             <script>
                function signOut() {
                    var auth2 = gapi.auth2.getAuthInstance();
                    auth2.signOut().then(function () {
                        console.log('User signed out.');
                    });
                }
            </script>
        </div>
    </nav>
</div>