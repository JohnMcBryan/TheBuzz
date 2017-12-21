"use strict";
/**
 * EditEntryForm encapsulates all of the code for the form for adding an entry
 */
var $;
var Handlebars;
var EditEntryForm = /** @class */ (function () {
    function EditEntryForm() {
    }
    /**
     * Initialize the EditEntryForm by creating its element in the DOM and
     * configuring its buttons.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use
     */
    EditEntryForm.init = function () {
        if (!EditEntryForm.isInit) {
            $("body").append(Handlebars.templates[EditEntryForm.NAME + ".hb"]());
            EditEntryForm.show;
            $("#" + EditEntryForm.NAME + "-Close").click(EditEntryForm.hide);
            EditEntryForm.isInit = true;
        }
    };
    /**
     * Refresh() doesn't really have much meaning, but just like in sNavbar, we
     * have a refresh() method so that we don't have front-end code calling
     * init().
     */
    EditEntryForm.refresh = function () {
        EditEntryForm.init();
    };
    /**
     * Hide the EditEntryForm.  Be sure to clear its fields first
     */
    EditEntryForm.hide = function () {
        $("#" + EditEntryForm.NAME + "-title").val("");
        $("#" + EditEntryForm.NAME + "-message").val("");
        $("#" + EditEntryForm.NAME).modal("hide");
    };
    /**
     * Show the EditEntryForm.  Be sure to clear its fields, because there are
     * ways of making a Bootstrap modal disapper without clicking Close, and
     * we haven't set up the hooks to clear the fields on the events associated
     * with those ways of making the modal disappear.
     */
    EditEntryForm.show = function () {
        var subject = $(this).data("subject");
        var message = $(this).data("message");
        var id = $(this).data("id");
        var createTime = $(this).data("createTime");
        var votes = $(this).data("votes");
        $("#" + EditEntryForm.NAME + "-title").val(subject);
        $("#" + EditEntryForm.NAME + "-message").val(message);
        $("#" + EditEntryForm.NAME + "-id").val(id);
        $("#" + EditEntryForm.NAME + "-date").val(createTime);
        $("#" + EditEntryForm.NAME + "-votes").val(votes);
        $("#" + EditEntryForm.NAME).modal("show");
    };
    /**
     * The name of the DOM entry associated with EditEntryForm
     */
    EditEntryForm.NAME = "EditEntryForm";
    EditEntryForm.idCurrentlyEditing = null;
    /**
     * Track if the Singleton has been initialized
     */
    EditEntryForm.isInit = false;
    return EditEntryForm;
}());
/**
 * NewEntryForm encapsulates all of the code for the form for adding an entry
 */
var Handlebars;
var NewEntryForm = /** @class */ (function () {
    function NewEntryForm() {
    }
    /**
     * Initialize the NewEntryForm by creating its element in the DOM and
     * configuring its buttons.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use
     */
    NewEntryForm.init = function () {
        if (!NewEntryForm.isInit) {
            $("body").append(Handlebars.templates[NewEntryForm.NAME + ".hb"]());
            $("p1").hide();
            $("p2").hide();
            $("#" + NewEntryForm.NAME + "-OK").click(NewEntryForm.submitForm);
            $("#" + NewEntryForm.NAME + "-Close").click(NewEntryForm.hide);
            $("#" + NewEntryForm.NAME + "-Video").click(function () {
                $("#" + NewEntryForm.NAME + "-file").val("");
                $("p2").hide();
                $("p1").toggle();
            });
            $("#" + NewEntryForm.NAME + "-picture").click(function () {
                $("#" + NewEntryForm.NAME + "-url").val("");
                $("p1").hide();
                $("p2").toggle();
            });
            NewEntryForm.isInit = true;
        }
    };
    /**
     * Refresh() doesn't really have much meaning, but just like in sNavbar, we
     * have a refresh() method so that we don't have front-end code calling
     * init().
     */
    NewEntryForm.refresh = function () {
        NewEntryForm.init();
    };
    /**
     * Hide the NewEntryForm.  Be sure to clear its fields first
     */
    NewEntryForm.hide = function () {
        $("#" + NewEntryForm.NAME + "-title").val("");
        $("#" + NewEntryForm.NAME + "-message").val("");
        //These lines hide the modal background(the shadow when bringing up a new entry form)
        $("#" + NewEntryForm.NAME).modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };
    /**
     * Show the NewEntryForm.  Be sure to clear its fields, because there are
     * ways of making a Bootstrap modal disapper without clicking Close, and
     * we haven't set up the hooks to clear the fields on the events associated
     * with those ways of making the modal disappear.
     */
    NewEntryForm.show = function () {
        $("#" + NewEntryForm.NAME + "-title").val("foo");
        $("#" + NewEntryForm.NAME + "-message").val("bar");
        $("p1").hide();
        $("p2").hide();
        $("#" + NewEntryForm.NAME + "-url").val("");
        $("#" + NewEntryForm.NAME + "-file").val("");
        $("#" + NewEntryForm.NAME).modal("show");
    };
    /**
     * Send data to submit the form only if the fields are both valid.
     * Immediately hide the form when we send data, so that the user knows that
     * their click was received.
     */
    NewEntryForm.submitForm = function () {
        // get form fields
        var title = "" + $("#" + NewEntryForm.NAME + "-title").val(); // prepend "" to force into a string
        var message = "" + $("#" + NewEntryForm.NAME + "-message").val();
        var url = "" + $("#" + NewEntryForm.NAME + "-url").val();
        var file = $("#" + NewEntryForm.NAME + "-file")[0].files[0];
        var filename = "error";
        if (file) {
            //console.log("file found");        // DEBUG
            filename = file.name;
        }
        console.log("filename:" + filename);
        if (message.length >= 500) {
            window.alert("Error: Message cannot exceed 500 characters");
            return;
        }
        if (title.length >= 50) {
            window.alert("Error: Title cannot exceed 50 characters");
            return;
        }
        if (title === "") {
            window.alert("Error: Title cannot be blank");
            return;
        }
        if (message === "") {
            window.alert("Error: Message cannot be blank");
            return;
        }
        // TODO: validate url
        NewEntryForm.hide(); // close modal dialog.
        // set up an AJAX post.  When the server replies, the onSubmitResponse will be called.
        /*
        // simple, one-part POST before requirement to send a file to the backend server.
        $.ajax({
            type: "POST",
            url: "/messages",
            dataType: "json",
            data: JSON.stringify({ mSubject: title, mMessage: msg, mUsername: Gusername, mKey: GuserKey }),
            success: NewEntryForm.onSubmitResponse
            // failure: alert "upload failed. please retry"
        });
        */
        //var formData = new FormData(<HTMLFormElement>document.getElementById(NewEntryForm.NAME + "-form"));
        var formData = new FormData();
        formData.append('mUsername', Gusername);
        formData.append('mKey', "" + GuserKey);
        formData.append('mSubject', title);
        formData.append('mMessage', message);
        formData.append('mUrl', url);
        formData.append('mFile', file);
        formData.append('mFilename', filename);
        $.ajax({
            type: "POST",
            url: "/messages",
            //url: "https://forums.wholetomato.com/mira/echo.aspx",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: NewEntryForm.onSubmitResponse
        });
    };
    /**
     * onSubmitResponse runs when the AJAX call in submitForm() returns a
     * result.
     *
     * @param data The object returned by the server
     */
    NewEntryForm.onSubmitResponse = function (data) {
        //console.log("response to POST: " + data);   // DEBUG
        // If we get an "ok" message, clear the form and refresh the main 
        // listing of messages
        if (data.mStatus === "logout") {
            window.alert("Session Timed Out");
            location.reload();
        }
        if (data.mStatus === "ok") {
            if (viewingYours != true) {
                $("nav.xyz").remove();
            }
            ElementList.refresh();
        }
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        }
        else {
            window.alert("Unspecified error");
        }
    };
    /**
     * The name of the DOM entry associated with NewEntryForm
     */
    NewEntryForm.NAME = "NewEntryForm";
    /**
     * Track if the Singleton has been initialized
     */
    NewEntryForm.isInit = false;
    return NewEntryForm;
}());
// Prevent compiler errors when using jQuery.  "$" will be given a type of 
// "any", so that we can use it anywhere, and assume it has any fields or
// methods, without the compiler producing an error.
var $;
var Handlebars;
// a global for the main ElementList of the program.  See newEntryForm for 
// explanation
var mainList;
/**
 * The ElementList Singleton provides a way of displaying all of the data
 * stored on the server as an HTML table.
 */
var ElementList = /** @class */ (function () {
    function ElementList() {
    }
    /**
    * Initialize the ElementList singleton.
    * This needs to be called from any public static method, to ensure that the
    * Singleton is initialized before use.
    */
    ElementList.init = function () {
        if (!ElementList.isInit) {
            ElementList.isInit = true;
        }
    };
    /**
    * refresh) updates the feed of all messages on The Buzz
    */
    ElementList.refresh = function () {
        // Make sure the singleton is initialized
        ElementList.init();
        // Issue a GET, and then pass the result to update()
        $.ajax({
            type: "GET",
            url: "/messages",
            //url: "https://forums.wholetomato.com/mira/messages.aspx",
            dataType: "json",
            success: ElementList.update
        });
    };
    ElementList.foo = function (id) {
        alert(id);
    };
    /**
    * update() is the private method used by refresh() to update the
    * list and initialize buttons for viewing profiles, voting, and commenting.
    */
    ElementList.update = function (data) {
        if (!data || !data.mMessageData)
            return;
        // replace main container, whatever it contains, with one for the feed.
        $("#mainContainer").remove();
        // Use a template to re-generate the feed.
        $("body").append(Handlebars.templates[ElementList.NAME + ".hb"](data));
        //console.log(JSON.stringify(data));        // uncomment to debug data object.
        //{"mStatus":"ok","mMessageData":[{"mId":"10","mSubject":"Favorite movie", ...
        // get and display images, and comments, associated with messages
        var images; // a string of html that will include all comments for a message
        images = "";
        var i;
        for (i = 0; i < data.mMessageData.length; i++) {
            var mId = data.mMessageData[i].mId; // mId is referenced often
            console.log("mId = " + mId);
            // look up the view-profile button.
            $('#buttonViewProfile' + mId).click(ElementList.getProfile);
            $('#buttonViewPoll' + mId).click(ElementList.viewPoll);
            $('#buttonCreatePoll' + mId).click(ElementList.createPoll);
            // Hide View Button if no poll exists or hide create poll if one exists
            if (data.mMessageData[i].mPollExist === 0) {
                $("#buttonViewPoll" + mId).hide();
                if (Gusername !== data.mMessageData[i].mUsername) {
                    $("#buttonCreatePoll" + mId).hide();
                }
            }
            else {
                $("#buttonCreatePoll" + mId).hide();
            }
            // Hide video if no url is given
            console.log("mFileId: " + data.mMessageData[i].mFileId) + ".";
            console.log("mUrl: " + data.mMessageData[i].mUrl) + ".";
            ElementList.getComment(mId);
            if (data.mMessageData[i].mFileId !== "Error") {
                images = //'<div class="row">'
                    '<img src="https://quiet-taiga-79213.herokuapp.com/messages/images/download/' + data.mMessageData.mFileId + '" class="img-responsive thumbnail img-feed pull-right" height=300 />';
                //+ '</div>';
                console.log("mMessageId: " + data.mMessageData[i].mId);
            }
            else if (data.mMessageData[i].mUrl !== "") {
                images = //'<div class="row">'
                    '<iframe type="text/html" height="300"src="https://www.youtube.com/embed/' + data.mMessageData[i].mUrl + '?autoplay=1&origin=http://example.com"frameborder="0" class="video pull-right"></iframe>';
                //+ '</div>';
                console.log("mMessageId: " + data.mMessageData[i].mId);
            }
            else {
                console.log("mMessageId: " + data.mMessageData[i].mId);
            }
            document.getElementById("images" + data.mMessageData[i].mId).innerHTML = images;
            document.getElementById("images" + data.mMessageData[i].mId).style.display = "inline";
        }
        $("." + ElementList.NAME + "-comments").click(ElementList.viewComments);
        $("." + ElementList.NAME + "-profile").click(ElementList.getProfile);
        $("." + ElementList.NAME + "-upvote").click(ElementList.upvote);
        $("." + ElementList.NAME + "-downvote").click(ElementList.downvote);
    };
    ElementList.getComment = function (mId) {
        // submit async request for comments for the message.
        $.ajax({
            type: "GET",
            //url: "/comments/"+messageid+"/"+Gusername+"/"+GuserKey,
            url: "/comments/" + mId + "/" + Gusername + "/" + GuserKey,
            //url: "https://forum.wholetomato.com/mira/comments/" + data.mMessageData[i].mId + ".aspx",
            dataType: "json",
            success: ElementList.addComments,
            error: function (xmlRequest) {
                console.log("GET comments for mId " + mId + " failed: " + xmlRequest.status + " " + xmlRequest.statusText);
                console.log(xmlRequest.responseText);
            }
        });
        // hook up the button that lets one add a comment.
        //$('#buttonComment' + mId).click(mesID = mId);
        $('#buttonComment' + mId).click(function () {
            //alert(mId);
            mesID = mId;
            //alert(mId);
            NewCommentForm.show();
        });
    };
    /*
    if (headers == false) {
        $('#yours').hide();
        $('#liked').hide();
        $('#disliked').hide();
        $('#commented').hide();
    }
    headers = false;
    */
    // add comments to browser document.
    // all comments must be for a single message!
    ElementList.addComments = function (data) {
        //alert("HERE");
        if (!data || !data.mCommentData)
            return;
        //alert("HERE2");
        //console.log(JSON.stringify(data));      // uncomment to debug
        if (data.mStatus === "logout") {
            window.alert("Session Timed Out");
            location.reload();
        }
        var comments; // a string of html that will include all comments for a message
        comments = "";
        var i;
        for (i = 0; i < data.mCommentData.length; i++) {
            // todo: make mUsername a link to send mail or view profile.
            comments += '<div class="row">'
                + '<div class="col-xs-6">'
                + '<blockquote class="blockquote-feed">'
                + '<p>' + data.mCommentData[i].mComment + '</p>'
                + '<img src="https://quiet-taiga-79213.herokuapp.com/messages/images/download/' + data.mCommentData[i].mFileId + '" class="img-responsive thumbnail img-feed pull-left height=100" />'
                //+ '<img src="http://www.aucustomerservice.com/wp-content/uploads/2017/08/Busy-Bee-Logo.jpg" class="img-responsive thumbnail img-feed pull-left" height=75 />'     // DEBUG
                + '<footer>' + data.mCommentData[i].mUsername + '</footer>'
                + '</blockquote>'
                + '</div>'
                + '<div class="col-xs-6">'
                + '</div>'
                + '</div>';
            //alert(data.mCommentData[i].mFileId);
            //  document.getElementById("comments"+data.mCommentData[i].mCommentId).innerHTML = comments;
            // document.getElementById("comments"+data.mCommentData[i].mCommentId).style.display = "inline";
        }
        //console.log("addComments() i=" + i);
        //console.log("addComments() comments=" + comments);
        if (i > 0) {
            document.getElementById("comments" + data.mCommentData[0].mMessageId).innerHTML = comments;
            document.getElementById("comments" + data.mCommentData[0].mMessageId).style.display = "inline";
            // add comments to message associated with first comment, i.e. data.mMessageData[0].mId
            //document.getElementById("comments" + data.mMessageData[0].mId).innerHTML = comments;
            //document.getElementById("comments" + data.mMessageData[0].mId).style.display = "inline";
        }
    };
    /**
    * clickDelete is the code we run in response to a click of a delete button
    * Not currently being used in the app
    */
    ElementList.clickDelete = function () {
        // for now, just print the ID that goes along with the data in the row
        // whose "delete" button was clicked
        var id = $(this).data("value");
        $.ajax({
            type: "DELETE",
            url: "/messages/" + id,
            dataType: "json",
            // TODO: we should really have a function that looks at the return
            //       value and possibly prints an error message.
            success: ElementList.refresh
        });
    };
    /**
     * Method used for upvoting entries
     * Called when upvote button on Elementlist is pressed
     * Sends mUsername and mMessageId
     */
    ElementList.upvote = function (id) {
        $("#editElement").hide();
        $.ajax({
            type: "POST",
            url: "/upVote",
            dataType: "json",
            data: JSON.stringify({ mUsername: Gusername, mMessageId: id, mKey: GuserKey }),
            // might need id.Guser
            success: ElementList.onVoteResponse
        });
    };
    /**
     * Method used for downvoting entries
     * Called when downvote button on Elementlist is pressed
     * Sends Username and mMessageId
     */
    ElementList.downvote = function (id) {
        $("#editElement").hide();
        $.ajax({
            type: "POST",
            url: "/downVote",
            dataType: "json",
            data: JSON.stringify({ mUsername: Gusername, mMessageId: id, mKey: GuserKey }),
            success: ElementList.onVoteResponse
        });
    };
    /**
    * A response from the AJAX call
    */
    ElementList.onVoteResponse = function (data) {
        if (data.mStatus === "logout") {
            window.alert("Session Timed Out");
            location.reload();
        }
        ElementList.refresh();
    };
    /**
    * Method to view profile of user. Allows you to see the username, real name, email,
    * and bio of the person who posted the buzz.
    */
    ElementList.getProfile = function () {
        $("#editElement").hide();
        var user = $(this).data("value");
        console.log("getProfile() of " + user);
        ProfilePage.show(user);
    };
    /**
     * onSubmitResponse determines if the upvote and downvote was successful
     * mStatus will be 1 upon successfull
     * @param data Has info on if upvote and downvote was successful
     */
    ElementList.onSubmitResponse = function (data) {
        // If we get an "ok" message, clear the form and refresh the main 
        // listing of messages
        //alert("mStatus"+data.mStatus);
        if (data.mStatus === "1") {
            ElementList.refresh();
        }
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        }
        else {
            window.alert("Unspecified error");
        }
    };
    /**
     * clickEdit is the code we run in response to the click of a data row
     * Will bring up a window that shows the current title and message
     */
    ElementList.clickEdit = function () {
        // as in clickDelete, we need the ID of the row
        //EditEntryForm.idCurrentlyEditing = $(this).data("value");
        //alert("Here");
        //$("."+ElementList.NAME+"-editbtn").click(EditEntryForm.init);
        $("." + ElementList.NAME + "-editbtn").click(EditEntryForm.show);
    };
    /**
     * viewComments allows you to see all the comments tied to a specific message, as well as add a new one.
     */
    ElementList.viewComments = function () {
        var msgToView = $(this).data("value");
        //mesID = msgToView;
        //window.alert(msgToView);
        $.ajax({
            type: "GET",
            url: "/comments/" + msgToView + "/" + msgToView.Gusername + "/" + msgToView.GuserKey,
            dataType: "json",
            success: ElementList.showComments
        });
    };
    /**
     * viewCommentsGivenID lets you view the comments of a message given an id
     *  @param messageId id of message to see comments ofS
     */
    ElementList.viewCommentsGivenID = function (messageid) {
        $.ajax({
            type: "GET",
            url: "/comments/" + messageid + "/" + Gusername + "/" + GuserKey,
            dataType: "json",
            success: ElementList.showComments
        });
    };
    /**
     * showComments will get the data of the AJAX call and actually display the comments of the message
     * @param data The object returned by the server
     */
    ElementList.showComments = function (data) {
        if (data.mStatus === "logout") {
            window.alert("Session Timed Out");
            location.reload();
        }
        $("#ElementList").remove();
        ViewComments.update(data);
    };
    /**
     * clickEdit is the code we run in response to the click of a data row
     * Will bring up a window that shows the current title and message
     */
    ElementList.viewPoll = function () {
        console.log("Clicked viewPoll");
        var mId = $(this).data("value");
        //ViewPoll.refresh();
        ViewPoll.show(mId);
        //ElementList.refresh();
    };
    /**
 * clickEdit is the code we run in response to the click of a data row
 * Will bring up a window that shows the current title and message
 */
    ElementList.createPoll = function () {
        console.log("Clicked createPoll");
        var mId = $(this).data("value");
        NewPollForm.show(mId);
        ElementList.refresh();
    };
    /**
     * The name of the DOM entry associated with ElementList
     */
    ElementList.NAME = "ElementList";
    /**
     * Track if the Singleton has been initialized
     */
    ElementList.isInit = false;
    return ElementList;
}());
/**
 * The Navbar Singleton is the navigation bar at the top of the page.  Through
 * its HTML, it is designed so that clicking the "brand" part will refresh the
 * page.  Apart from that, it has an "add" button, which forwards to
 * NewEntryForm
 */
var Handlebars;
var $;
var Gusername;
var Gpassword;
var GuserKey;
var GloggedIn;
// var editEntryForm: EditEntryForm;
// var loginWindow: LoginWindow;
//var createAccountForm: CreateAccountForm;
var Navbar = /** @class */ (function () {
    function Navbar() {
    }
    /**
     * Initialize the Navbar Singleton by creating its element in the DOM and
     * configuring its button.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use.
     */
    Navbar.init = function () {
        if (!Navbar.isInit) {
            $("body").prepend(Handlebars.templates[Navbar.NAME + ".hb"]());
            $("#" + Navbar.NAME + "-createAccount").click(CreateAccountForm.show);
            $("#" + Navbar.NAME + "-logIn").click(LoginWindow.show);
            $("body").append("<h1 id = 1>Welcome to The Buzz</h1>");
            $("body").append("<h4 id = 2>Login to your Lehigh email to make a Buzz'</h4>");
            Navbar.isInit = true;
        }
    };
    Navbar.onLoginResponse = function (data) {
        //window.alert("hi");
        GuserKey = data.mLoginData;
        Gusername = data.mUsername;
        if (data.mStatus === "ok") {
            $("nav.navbar-default").hide();
            var x = document.getElementById("Gsignin");
            x.style.display = "none";
            //$("Gsignin").hide();
            $('#1').hide();
            $('#2').hide();
            NavbarLoggedIn.refresh();
        }
        else if (data.mStatus === "wrongDomain") {
            NavbarLoggedIn.signOut();
            window.alert("Failed to Log you in. Please Make sure the credentials are correct.");
        }
        else if (data.mStatus === "notVerified") {
            window.alert("Failed to Log you in. Please Make sure the credentials are correct.");
        }
        else {
            window.alert("Unspecified error");
        }
        //window.alert("Key i got: "+GuserKey);
        //window.alert("good: "+data);
        //LoginWindow.loginCheck();
    };
    /*
    public static onSignIn (googleUser)
    {
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
         $.ajax({
                type    : "POST",
                url     : "/tokensignin",
                dataType: "json",
                data    : JSON.stringify({ token_id: id_token }),
                success : LoginWindow.onLoginResponse
            });

    }
    public static signOut()
    {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        });
    }
        */
    /**
     * Refresh() doesn't really have much meaning for the navbar, but we'd
     * rather not have anyone call init(), so we'll have this as a stub that
     * can be called during front-end initialization to ensure the navbar
     * is configured.
     */
    Navbar.refresh = function () {
        Navbar.init();
    };
    /**
     * Track if the Singleton has been initialized
     */
    Navbar.isInit = false;
    /**
     * The name of the DOM entry associated with Navbar
     */
    Navbar.NAME = "Navbar";
    return Navbar;
}());
/// <reference path="ts/EditEntryForm.ts"/>
/// <reference path="ts/NewEntryForm.ts"/>
/// <reference path="ts/ElementList.ts"/>
/// <reference path="ts/Navbar.ts"/>
// Prevent compiler errors when using jQuery.  "$" will be given a type of 
// "any", so that we can use it anywhere, and assume it has any fields or
// methods, without the compiler producing an error.
var describe;
var beforeAll;
var it;
var expect;
var spyOn;
var $;
describe("Ajax Test", function () {
    // Wait for CSS to load before running tests
    beforeAll(function (done) {
        $(document).ready(done);
    });
    /**
     * Mocks an Ajax call for a sucessful new entry
     */
    it("NewEntryForm Fake Ajax Call-Success", function () {
        // Checks the settings sent by the ajax call from the add button
        function mockAjax(settings) {
            expect(settings.type).toEqual("POST");
            expect(settings.url).toEqual("/messages");
            expect(settings.dataType).toEqual("json");
            expect(typeof settings.success).toEqual("function");
            var data = JSON.parse(settings.data);
            expect(data.mSubject).toEqual("some title");
            expect(data.mMessage).toEqual("some message");
        }
        // Replace $.ajax with my mock function
        spyOn($, "ajax").and.callFake(mockAjax);
        // Navigate to the add form
        $('#Navbar-add').click();
        // Enter some data and click add
        $("#NewEntryForm-title").val("some title");
        $("#NewEntryForm-message").val("some message");
        $('#NewEntryForm-OK').click();
        expect($.ajax).toHaveBeenCalled();
        $('#NewEntryForm-Close').click();
        $('#NewEntryForm').modal("hide");
    });
    /**
     * Mocks an Ajax Call for a failure if the title is more then 50 characters
     */
    it("NewEntryForm Fake Ajax Call-Title Failure", function () {
        // Checks the settings sent by the ajax call from the add button
        function mockAjax(settings) {
            expect(settings.type).toEqual("POST");
            expect(settings.url).toEqual("/messages");
            expect(settings.dataType).toEqual("json");
            expect(typeof settings.success).toEqual("function");
            var data = JSON.parse(settings.data);
        }
        // Replace $.ajax with my mock function
        spyOn($, "ajax").and.callFake(mockAjax);
        // Navigate to the add form
        $('#Navbar-add').click();
        // Enter some data and click add
        $("#NewEntryForm-title").val("1oa4I1ECO5JugPCxNriZaqcolGJCrzZr0jFkJ6HZVIdbboa9R5IggeGvbmjo");
        $("#NewEntryForm-message").val("some message");
        $('#NewEntryForm-OK').click();
        expect($.ajax).not.toHaveBeenCalled();
        $('#NewEntryForm-Close').click();
        $('#NewEntryForm').modal("hide");
    });
    /**
     * Mocks an Ajax call for a failure if the message is more then 500 characters
     */
    it("NewEntryForm Fake Ajax Call-Message Failure", function () {
        // Checks the settings sent by the ajax call from the add button
        function mockAjax(settings) {
            expect(settings.type).toEqual("POST");
            expect(settings.url).toEqual("/messages");
            expect(settings.dataType).toEqual("json");
            expect(typeof settings.success).toEqual("function");
            var data = JSON.parse(settings.data);
        }
        // Replace $.ajax with my mock function
        spyOn($, "ajax").and.callFake(mockAjax);
        // Navigate to the add form
        $('#Navbar-add').click();
        // Enter some data and click add
        $("#NewEntryForm-title").val("some Title");
        $("#NewEntryForm-message").val("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu");
        $('#NewEntryForm-OK').click();
        expect($.ajax).not.toHaveBeenCalled();
        $('#NewEntryForm-Close').click();
        $('#NewEntryForm').modal("hide");
    });
    /**
     * Mocks an Ajax call for a failure if nothing is entered into the title and message fields
     */
    it("NewEntryForm Fake Ajax Call- No Title or Message Failure", function () {
        // Checks the settings sent by the ajax call from the add button
        function mockAjax(settings) {
            expect(settings.type).toEqual("POST");
            expect(settings.url).toEqual("/messages");
            expect(settings.dataType).toEqual("json");
            expect(typeof settings.success).toEqual("function");
            var data = JSON.parse(settings.data);
        }
        // Replace $.ajax with my mock function
        spyOn($, "ajax").and.callFake(mockAjax);
        // Navigate to the add form
        $('#Navbar-add').click();
        // Enter some data and click add
        $("#NewEntryForm-title").val("");
        $("#NewEntryForm-message").val("");
        $('#NewEntryForm-OK').click();
        expect($.ajax).not.toHaveBeenCalled();
        $('#NewEntryForm-Close').click();
        $('#NewEntryForm').modal("hide");
    });
});
describe("Tests of UI", function () {
    /**
     * This test checks to see if the title and message fields are empty before going to
     * add a new entry to the database
     */
    it("UI Test: Title and Message Fields are Empty on Startup", function () {
        // click the button for showing the add button
        $('#Navbar-add').click();
        // Gets the strings currently in the -title and -message tag
        var title = $("#NewEntryForm-title").val();
        var message = $("#NewEntryForm-message").val();
        //Checks to see if both entries are empty
        expect(title).toEqual("");
        expect(message).toEqual("");
        //Closes out of AddEntry Form
        $('#NewEntryForm-Close').click();
        $('#NewEntryForm').modal("hide");
    });
    /**
     * Checks that the modals for AddElement and EditElement are hidden before starting up the page
     */
    it("UI Test: Tests that AddElement and EditElement Divs are hidden on start", function () {
        var newEntryVisibility = $('#NewEntryForm').is(':visible');
        expect(newEntryVisibility).toEqual(false);
        var editEntryVisibility = $('#EditEntryForm').is(':visible');
        expect(editEntryVisibility).toEqual(false);
    });
});
describe("Test EditBio", function () {
    /**
     * This tests edit bio functionality
     */
    it("UI Test: test edit bio", function () {
        $('#EditBio-newBio').click();
        var bio = $("#EditBio-newBio").val();
        expect(bio).toEqual("");
        //Closes out of AddEntry Form
        $('#EditBio-Close').click();
        $('#EditBio').modal("hide");
    });
    /**
     * Checks that the modals for AddElement and EditElement are hidden before starting up the page
     */
    it("UI Test: Tests that AddElement and EditElement Divs are hidden on start", function () {
        var newEntryVisibility = $('#EditBio').is(':visible');
        expect(newEntryVisibility).toEqual(false);
        var editEntryVisibility = $('#EditBio').is(':visible');
        expect(editEntryVisibility).toEqual(false);
    });
});
describe("Test EditBio", function () {
    /**
     * This tests New Comment
     */
    it("UI Test: test new comment", function () {
        $('#NewCommentForm-comment').click();
        var com = $("#NewCommentForm-comment").val();
        expect(com).toEqual("");
        //Closes out of AddEntry Form
        $('#NewCommentForm-Close').click();
        $('#NewCommentForm').modal("hide");
    });
    /**
     * Checks that the modals for AddElement and EditElement are hidden before starting up the page
     */
    it("UI Test: Tests that AddElement and EditElement Divs are hidden on start", function () {
        var newEntryVisibility = $('#NewCommentForm').is(':visible');
        expect(newEntryVisibility).toEqual(false);
        var editEntryVisibility = $('#NewCommentForm').is(':visible');
        expect(editEntryVisibility).toEqual(false);
    });
});
describe("Test New Password form", function () {
    /**
     * This tests New Password
     */
    it("UI Test: test new password", function () {
        $('#NewPassForm-oldPass').click();
        $('#NewPassForm-newPass').click();
        var oldP = $("#NewPassForm-oldPass").val();
        var newP = $("#NewPassForm-newPass").val();
        expect(oldP).toEqual("");
        expect(newP).toEqual("");
        //Closes out of AddEntry Form
        $('#NewPassForm-Close').click();
        $('#NewPassForm').modal("hide");
    });
    /**
     * Checks modals
     */
    it("UI Test: Tests that AddElement and EditElement Divs are hidden on start", function () {
        var newEntryVisibility = $('#NewPassForm').is(':visible');
        expect(newEntryVisibility).toEqual(false);
        var editEntryVisibility = $('#NewPassForm').is(':visible');
        expect(editEntryVisibility).toEqual(false);
    });
});
