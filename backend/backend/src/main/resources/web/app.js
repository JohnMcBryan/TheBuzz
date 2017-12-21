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
/**
 * NewPollForm encapsulates all of the code for the form for adding an entry
 */
var Handlebars;
var NewPollForm = /** @class */ (function () {
    function NewPollForm() {
    }
    /**
     * Initialize the NewPollForm by creating its element in the DOM and
     * configuring its buttons.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use
     */
    NewPollForm.init = function () {
        if (!NewPollForm.isInit) {
            $("body").append(Handlebars.templates["NewPollForm.hb"]());
            $("#" + NewPollForm.NAME + "-OK").click(NewPollForm.submitForm);
            $("#" + NewPollForm.NAME + "-Close").click(NewPollForm.hide);
            NewPollForm.isInit = true;
            $("p3").hide();
            $("p4").hide();
            $("p5").hide();
            $("p6").hide();
            $("p1").show();
            $("#" + NewPollForm.NAME + "-addOption").click(function () {
                if (NewPollForm.options < 6) {
                    NewPollForm.options++;
                    console.log("p" + NewPollForm.options);
                    $("p" + NewPollForm.options).show();
                    if (NewPollForm.options === 6) {
                        $("p1").hide();
                    }
                }
            });
            $("#" + NewPollForm.NAME + "-removeOption").click(function () {
                if (NewPollForm.options > 2) {
                    if (NewPollForm.options === 6) {
                        $("p1").show();
                    }
                    $("#" + NewPollForm.NAME + "-poll" + NewPollForm.options).val("");
                    $("p" + NewPollForm.options).hide();
                    NewPollForm.options--;
                    console.log("p" + NewPollForm.options);
                }
            });
        }
    };
    /**
     * Refresh() doesn't really have much meaning, but just like in sNavbar, we
     * have a refresh() method so that we don't have front-end code calling
     * init().
     */
    NewPollForm.refresh = function () {
        NewPollForm.init();
    };
    /**
     * Hide the NewPollForm.  Be sure to clear its fields first
     */
    NewPollForm.hide = function () {
        $("#" + NewPollForm.NAME + "-title").val("");
        //These lines hide the modal background(the shadow when bringing up a new entry form)
        $("#" + NewPollForm.NAME).modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $("#" + NewPollForm.NAME + "-poll1").val("");
        $("#" + NewPollForm.NAME + "-poll2").val("");
        $("#" + NewPollForm.NAME + "-poll3").val("");
        $("#" + NewPollForm.NAME + "-poll4").val("");
        $("#" + NewPollForm.NAME + "-poll5").val("");
        $("#" + NewPollForm.NAME + "-poll6").val("");
        $("p3").hide();
        $("p4").hide();
        $("p5").hide();
        $("p6").hide();
        $("p1").show();
        NewPollForm.options = 2;
    };
    /**
     * Show the NewPollForm.  Be sure to clear its fields, because there are
     * ways of making a Bootstrap modal disapper without clicking Close, and
     * we haven't set up the hooks to clear the fields on the events associated
     * with those ways of making the modal disappear.
     */
    NewPollForm.show = function (mId) {
        NewPollForm.messageId = mId;
        $("#" + NewPollForm.NAME + "-title").val("foo");
        $("#" + NewPollForm.NAME + "-url").val("https://xkcd.com/");
        $("#" + NewPollForm.NAME + "-file").val("");
        $("#" + NewPollForm.NAME).modal("show");
    };
    /**
     * Send data to submit the form only if the fields are both valid.
     * Immediately hide the form when we send data, so that the user knows that
     * their click was received.
     */
    NewPollForm.submitForm = function () {
        // get form fields
        var title = "" + $("#" + NewPollForm.NAME + "-title").val(); // prepend "" to force into a string
        var pollOptions1 = "" + $('#' + NewPollForm.NAME + "-poll1").val();
        var pollOptions2 = "" + $('#' + NewPollForm.NAME + "-poll2").val();
        var pollOptions3 = "" + $('#' + NewPollForm.NAME + "-poll3").val();
        var pollOptions4 = "" + $('#' + NewPollForm.NAME + "-poll4").val();
        var pollOptions5 = "" + $('#' + NewPollForm.NAME + "-poll5").val();
        var pollOptions6 = "" + $('#' + NewPollForm.NAME + "-poll6").val();
        if (title.length >= 50) {
            window.alert("Error: Title cannot exceed 50 characters");
            return;
        }
        if (title === "") {
            window.alert("Error: Title cannot be blank");
            return;
        }
        if (pollOptions1 === "") {
            window.alert("Error: pollOptions1 cannot be blank");
            return;
        }
        if (pollOptions2 === "") {
            window.alert("Error: pollOptions2 cannot be blank");
            return;
        }
        // TODO: validate url
        NewPollForm.hide(); // close modal dialog.
        // set up an AJAX post.  When the server replies, the onSubmitResponse will be called.
        /*
        // simple, one-part POST before requirement to send a file to the backend server.
        $.ajax({
            type: "POST",
            url: "/messages",
            dataType: "json",
            data: JSON.stringify({ mSubject: title, mMessage: msg, mUsername: Gusername, mKey: GuserKey }),
            success: NewPollForm.onSubmitResponse
            // failure: alert "upload failed. please retry"
        });
        */
        $.ajax({
            type: "POST",
            url: "/messages/poll/" + NewPollForm.messageId,
            //url: "https://forums.wholetomato.com/mira/echo.aspx",
            dataType: "json",
            data: JSON.stringify({ mSubject: title, mPollOption1: pollOptions1, mPollOption2: pollOptions2, mPollOption3: pollOptions3, mPollOption4: pollOptions4, mPollOption5: pollOptions5, mPollOption6: pollOptions6, mUsername: Gusername, mKey: GuserKey }),
            success: NewPollForm.onSubmitResponse
        });
    };
    /**
     * onSubmitResponse runs when the AJAX call in submitForm() returns a
     * result.
     *
     * @param data The object returned by the server
     */
    NewPollForm.onSubmitResponse = function (data) {
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
     * The name of the DOM entry associated with NewPollForm
     */
    NewPollForm.NAME = "NewPollForm";
    /**
     * Track if the Singleton has been initialized
     */
    NewPollForm.isInit = false;
    NewPollForm.options = 2;
    return NewPollForm;
}());
/**
 * ViewPoll encapsulates all of the code for the form for adding an entry
 */
var Handlebars;
var ViewPoll = /** @class */ (function () {
    function ViewPoll() {
    }
    /**
     * Initialize the ViewPoll by creating its element in the DOM and
     * configuring its buttons.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use
     */
    ViewPoll.init = function () {
        console.log("here3");
        if (!ViewPoll.isInit) {
            //$("body").append(Handlebars.templates["ViewPoll.hb"]());
            $("nav.xyz").remove();
        }
    };
    /**
     * Refresh() doesn't really have much meaning, but just like in sNavbar, we
     * have a refresh() method so that we don't have front-end code calling
     * init().
     */
    ViewPoll.refresh = function () {
        ViewPoll.init();
    };
    /**
     * Hide the ViewPoll.  Be sure to clear its fields first
     */
    ViewPoll.hide = function () {
        //$("#" + ViewPoll.NAME + "-title").val("");
        //$("#" + ViewPoll.NAME + "-message").val("");
        //These lines hide the modal background(the shadow when bringing up a new entry form)
        $("#" + ViewPoll.NAME).modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $("#ViewPoll").remove();
        ViewPoll.refresh();
        //ViewPoll.refresh();
        //ElementList.refresh();
        //ViewPoll.isInit = false;
    };
    /**
     * Show the ViewPoll.  Be sure to clear its fields, because there are
     * ways of making a Bootstrap modal disapper without clicking Close, and
     * we haven't set up the hooks to clear the fields on the events associated
     * with those ways of making the modal disappear.
     */
    ViewPoll.show = function (mId) {
        ViewPoll.pollId = mId;
        console.log("here1");
        ViewPoll.init();
        $.ajax({
            type: "GET",
            url: "/poll/" + mId,
            dataType: "json",
            success: ViewPoll.displayPoll
        });
    };
    /**
     * Method that will send a post to backend that tells the backend which option on the poll
     * the user voted for.
     */
    ViewPoll.pollVote = function (option) {
        $.ajax({
            type: "POST",
            url: "/pollVote",
            dataType: "json",
            data: JSON.stringify({ mUsername: Gusername, mPollId: ViewPoll.pollId, mPollOptionVoted: option }),
            // might need id.Guser
            success: ViewPoll.show(ViewPoll.pollId)
        });
    };
    /** Method to show the poll of the message passed in in method show(mId: String)
     * data will contain all info of the poll from the AJAX call
     * @param data
     */
    ViewPoll.displayPoll = function (data) {
        if (data.mStatus === "logout") {
            window.alert(Gkey);
            window.alert("Session Timed Out");
            location.reload();
        }
        else if (data.mStatus === "error") {
            window.alert("Error");
        }
        else {
            // Checks if user has already voted
            ViewPoll.init();
            console.log("data: " + data.mStatus);
            //console.log("mSubject:" + data.mPollData.mSubject);
            console.log("mPoll1:" + data.mPollData.mPollOption1);
            console.log("mPoll2" + data.mPollData.mPollOption2);
            $("body").append(Handlebars.templates[ViewPoll.NAME + ".hb"](data));
            console.log("here2");
            $("#" + ViewPoll.NAME + "-Close").click(ViewPoll.hide);
            // Handles the option buttons functionality
            $("#" + ViewPoll.NAME + "-Option1").click(function () {
                ViewPoll.pollVote(1);
            });
            $("#" + ViewPoll.NAME + "-Option2").click(function () {
                ViewPoll.pollVote(2);
            });
            $("#" + ViewPoll.NAME + "-Option3").click(function () {
                ViewPoll.pollVote(3);
            });
            $("#" + ViewPoll.NAME + "-Option4").click(function () {
                ViewPoll.pollVote(4);
            });
            $("#" + ViewPoll.NAME + "-Option5").click(function () {
                ViewPoll.pollVote(5);
            });
            $("#" + ViewPoll.NAME + "-Option6").click(function () {
                ViewPoll.pollVote(6);
            });
            // Hides poll options if they are not initialized
            if (data.mPollData.mPollOption3 === "")
                $("p3").hide();
            if (data.mPollData.mPollOption4 === "")
                $("p4").hide();
            if (data.mPollData.mPollOption5 === "")
                $("p5").hide();
            if (data.mPollData.mPollOption6 === "")
                $("p6").hide();
            // Hides the poll results
            ViewPoll.init();
            // Displays modal
            $("#" + ViewPoll.NAME).modal("show");
        }
    };
    /**
     * The name of the DOM entry associated with ViewPoll
     */
    ViewPoll.NAME = "ViewPoll";
    /**
     * Track if the Singleton has been initialized
     */
    ViewPoll.isInit = false;
    return ViewPoll;
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
/**
 * The NavbarLoggedIn Singleton is the navigation bar at the top of the page for logged users.  Through
 * its HTML, it is designed so that clicking the "brand" part will refresh the
 * page.  Apart from that, it has an "add" button, which forwards to
 * NewEntryForm
 */
var Handlebars;
var NavbarLoggedIn = /** @class */ (function () {
    function NavbarLoggedIn() {
    }
    /**
     * Initialize the NavbarLoggedIn Singleton by creating its element in the DOM and
     * configuring its button.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use.
     */
    NavbarLoggedIn.init = function () {
        if (!NavbarLoggedIn.isInit) {
            $("body").prepend(Handlebars.templates[NavbarLoggedIn.NAME + ".hb"]());
            $("#" + NavbarLoggedIn.NAME + "-add").click(NewEntryForm.show);
            //$("#"+NavbarLoggedIn.NAME+"-poll").click(NewPollForm.show);
            $("#" + NavbarLoggedIn.NAME + "-profile").click(NavbarLoggedIn.loadProfile);
            $("#" + NavbarLoggedIn.NAME + "-viewBuzz").click(NavbarLoggedIn.viewBuzz);
            $("#" + NavbarLoggedIn.NAME + "-logOut").click(NavbarLoggedIn.logOut);
            //$("#"+NavbarLoggedIn.NAME+"-changePass").click(NewPassForm.show);
            //$("div.container-fluid well span6").hide();
            //$("div.container-fluid well span6").hide();
            //ProfilePage.show(Gusername);
            //$("div.container-fluid well span6").hide(); 
            $("div.container well span6").hide();
            ElementList.refresh();
            //NavbarLoggedIn.isInit = true;
        }
    };
    /**
     * Method in navbar to allow a user to log out
     * Sends AJAX call to authenticate logout
     */
    NavbarLoggedIn.logOut = function () {
        $.ajax({
            type: "POST",
            url: "/logout",
            dataType: "json",
            data: JSON.stringify({ mUsername: Gusername }),
            success: NavbarLoggedIn.onLogOutResponse
        });
    };
    NavbarLoggedIn.signOut = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    };
    /**
     * Method for the response from the AJAX call to log out
     */
    NavbarLoggedIn.onLogOutResponse = function (data) {
        if (data.mStatus === "ok") {
            window.alert("Logged Out Successfully");
        }
        else if (data.mStatus === "error") {
            window.alert("Problem Logging Out");
        }
        location.reload();
    };
    /**
     * Method in navbar to allow a user to view all message on The Buzz
     */
    NavbarLoggedIn.viewBuzz = function () {
        viewingYours = false;
        $("nav.xyz").hide();
        //$('body').removeClass('div.container-fluid well span6');
        $('body').removeClass('div.container well span6');
        //$("div.container-fluid well span6").hide();
        $("div.container well span6").hide();
        $("#ElementList").remove();
        $("#ProfilePage").remove();
        $("#ViewComments").remove();
        ElementList.refresh();
    };
    /**
     * Method in navbar to allow a user to view their profile page
     */
    NavbarLoggedIn.loadProfile = function () {
        ProfilePage.show(Gusername);
    };
    /**
     * Refresh() doesn't really have much meaning for the navbar, but we'd
     * rather not have anyone call init(), so we'll have this as a stub that
     * can be called during front-end initialization to ensure the navbar
     * is configured.
     */
    NavbarLoggedIn.refresh = function () {
        NavbarLoggedIn.init();
    };
    /**
     * Track if the Singleton has been initialized
     */
    NavbarLoggedIn.isInit = false;
    /**
     * The name of the DOM entry associated with Navbar
     */
    NavbarLoggedIn.NAME = "NavbarLoggedIn";
    return NavbarLoggedIn;
}());
var Handlebars;
var tUsername;
var LoginWindow = /** @class */ (function () {
    function LoginWindow() {
    }
    /**
    * Initialize the LoginWindow singleton.
    * This needs to be called from any public static method, to ensure that the
    * Singleton is initialized before use.
    */
    LoginWindow.init = function () {
        if (!LoginWindow.isInit) {
            if (Gusername != null) {
                GloggedIn = true;
            }
            if (GloggedIn == false) {
                $("body").append(Handlebars.templates[LoginWindow.NAME + ".hb"]());
                $("#" + LoginWindow.NAME + "-Submit").click(LoginWindow.submitForm);
                $("#" + LoginWindow.NAME + "-Close").click(LoginWindow.hide);
                LoginWindow.isInit = true;
                GloggedIn = true;
                LoginWindow.refresh();
            }
            else {
                window.alert("Already Logged In as :" + Gusername);
            }
        }
    };
    /**
     * refresh gives a public method to initialize the LoginWindow
     */
    LoginWindow.refresh = function () {
        LoginWindow.init();
    };
    /**
     * hide() method hides the login form
     */
    LoginWindow.hide = function () {
        $("#" + LoginWindow.NAME + "-user").val("");
        $("#" + LoginWindow.NAME + "-pass").val("");
        //These lines hide the modal background(the shadow when bringing up a new entry form)
        $("#" + LoginWindow.NAME).modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };
    /**
     * show() method presents the login form
     */
    LoginWindow.show = function () {
        $("#" + LoginWindow.NAME + "-user").val("");
        $("#" + LoginWindow.NAME + "-pass").val("");
        $("#" + LoginWindow.NAME).modal("show");
    };
    /**
     * submitForm() method submits the login form and sends AJAX call
     */
    LoginWindow.submitForm = function () {
        // get the values of the two fields, force them to be strings, and check 
        // that neither is empty
        var tUsername = "" + $("#" + LoginWindow.NAME + "-user").val();
        var Gpassword = "" + $("#" + LoginWindow.NAME + "-pass").val();
        GloggedIn == true;
        if (tUsername == "") {
            window.alert("Empty Username");
        }
        if (Gpassword == "") {
            window.alert("Empty Password");
        }
        if (tUsername != null || tUsername != undefined) {
            Gusername = tUsername;
        }
        LoginWindow.hide();
        LoginWindow.refresh();
        $.ajax({
            type: "POST",
            url: "/login",
            dataType: "json",
            data: JSON.stringify({ mUsername: Gusername, mPassword: Gpassword }),
            success: LoginWindow.onLoginResponse
        });
    };
    /**
     * onSubmitResponse runs when the AJAX call in submitForm() returns a
     * result.
     *
     * @param data The object returned by the server
     */
    LoginWindow.onLoginResponse = function (data) {
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
        else if (data.mStatus === "error") {
            window.alert("Failed to Log you in. Please Make sure the credentials are correct.");
        }
        else {
            window.alert("Unspecified error");
        }
        //window.alert("Key i got: "+GuserKey);
        //window.alert("good: "+data);
        //LoginWindow.loginCheck();
    };
    /**
    * The name of the DOM entry associated with LoginWindow
    */
    LoginWindow.NAME = "LoginWindow";
    /**
     * Track if the Singleton has been initialized
    */
    LoginWindow.isInit = false;
    return LoginWindow;
}());
/**
 * CreateAccountForm encapsulates all of the code for the form for Creating an account
 */
var Handlebars;
//var tUsername: string;
var CreateAccountForm = /** @class */ (function () {
    function CreateAccountForm() {
    }
    /**
     * Initialize the CreateAccountForm by creating its element in the DOM and
     * configuring its buttons.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use
     */
    CreateAccountForm.init = function () {
        if (!CreateAccountForm.isInit) {
            $("body").append(Handlebars.templates[CreateAccountForm.NAME + ".hb"]());
            $("#" + CreateAccountForm.NAME + "-Submit").click(CreateAccountForm.submitForm);
            $("#" + CreateAccountForm.NAME + "-Close").click(CreateAccountForm.hide);
            //window.alert(loggedIn);
            CreateAccountForm.isInit = true;
            CreateAccountForm.refresh();
        }
    };
    /**
     * Refresh() doesn't really have much meaning, but just like in sNavbar, we
     * have a refresh() method so that we don't have front-end code calling
     * init().
     */
    CreateAccountForm.refresh = function () {
        CreateAccountForm.init();
    };
    /**
     * Hide the CreateAccountForm.  Be sure to clear its fields first
     */
    CreateAccountForm.hide = function () {
        $("#" + CreateAccountForm.NAME + "-user").val("");
        $("#" + CreateAccountForm.NAME + "-realname").val("");
        $("#" + CreateAccountForm.NAME + "-email").val("");
        //$("#" + CreateAccountForm.NAME + "-password").val("");
        //These lines hide the modal background(the shadow when bringing up a new entry form)
        $("#" + CreateAccountForm.NAME).modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };
    /**
     * Show the CreateAccountForm.  Be sure to clear its fields first
     */
    CreateAccountForm.show = function () {
        $("#" + CreateAccountForm.NAME + "-user").val("");
        $("#" + CreateAccountForm.NAME + "-realname").val("");
        $("#" + CreateAccountForm.NAME + "-email").val("");
        //$("#" + CreateAccountForm.NAME + "-password").val("");
        $("#" + CreateAccountForm.NAME).modal("show");
    };
    /**
     * Submits the CreateAccountForm. Upon completing, hide the form and AJAX call
     */
    CreateAccountForm.submitForm = function () {
        // get the values of the two fields, force them to be strings, and check 
        // that neither is empty
        var userName = "" + $("#" + CreateAccountForm.NAME + "-user").val();
        var realName = "" + $("#" + CreateAccountForm.NAME + "-realname").val();
        var email = "" + $("#" + CreateAccountForm.NAME + "-email").val();
        //let password = "" + $("#" + CreateAccountForm.NAME + "-password").val();
        if (userName.length >= 255 || userName == "") {
            window.alert("Error: UserName exceeds 500 or is empty");
            return;
        }
        if (realName.length >= 255 || realName == "") {
            window.alert("Error: Name exceeds 50 or is empty");
            return;
        }
        if (email == "" || !email.includes("@") || !email.includes(".com")) {
            window.alert("Error: Invalid Email");
            return;
        }
        //must have seperate includes forpassword
        //if (password.length >= 50 || !password.includes("1234567890")) {
        //    window.alert("Error: Password must have a number");
        //    return;
        //}
        CreateAccountForm.hide();
        CreateAccountForm.refresh();
        //tUsername = userName;
        $.ajax({
            type: "POST",
            url: "/register",
            dataType: "json",
            data: JSON.stringify({ mUsername: userName, mRealName: realName, mEmail: email }),
            success: CreateAccountForm.onCreateResponse
        });
    };
    /**
     * onCreateResponse runs when the AJAX call in submitForm() returns a
     * result.
     *
     * @param data The object returned by the server
     */
    CreateAccountForm.onCreateResponse = function (data) {
        //window.alert("good");
    };
    /**
     * The name of the DOM entry associated with CreateAccountForm
     */
    CreateAccountForm.NAME = "CreateAccountForm";
    /**
     * Track if the Singleton has been initialized
     */
    CreateAccountForm.isInit = false;
    return CreateAccountForm;
}());
// globals
var $;
var Handlebars;
var usernameToDisplay;
var ProfilePage = /** @class */ (function () {
    function ProfilePage() {
    }
    /**
     * Initialize the ProfilePage Singleton by creating its element in the DOM and
     * configuring its button.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use.
     */
    ProfilePage.init = function () {
        //NavbarLoggedIn.refresh();
        if (!ProfilePage.isInit) {
            //$("div.panel-default").hide();
            //$("nav.navbar-default").hide();
            //NavbarLoggedIn.refresh();
            $("nav.xyz").remove();
            //window.alert("end of profile init");
            //$("nav.navbar-default").hide();
        }
    };
    /** Method to show the profile of the user passed in
     * @param username
     */
    ProfilePage.show = function (username) {
        ProfilePage.init();
        usernameToDisplay = username;
        $.ajax({
            type: "GET",
            url: "/profile/" + usernameToDisplay + "/" + Gusername + "/" + GuserKey,
            dataType: "json",
            success: ProfilePage.displayProfile
        });
    };
    /** Method to show the profile of the user passed in in method show(username)
     * data will contain all info of the user from the AJAX call
     * @param data
     */
    ProfilePage.displayProfile = function (data) {
        if (data.mStatus === "logout") {
            window.alert(Gkey);
            window.alert("Session Timed Out");
            location.reload();
        }
        ProfilePage.init();
        //console.log("displayProfile() for " + usernameToDisplay + ":");
        //console.log(JSON.stringify(ProfilePage.profile));
        // replace main container, whatever it contains, with one for a profile.
        $("#mainContainer").remove();
        $("body").append(Handlebars.templates[ProfilePage.NAME + ".hb"](data));
        if (Gusername == usernameToDisplay) {
            //$("#"+ProfilePage.NAME+"-editBio").show();
            //$("#"+ProfilePage.NAME+"-editBio").click(ProfilePage.editBio);
            $("#buttonEditBio").show();
            $("#buttonEditBio").click(ProfilePage.editBio);
        }
    };
    /**
     * Method to edit your bio (user logged in)
     */
    ProfilePage.editBio = function () {
        //window.alert("called method");
        if (Gusername == usernameToDisplay) {
            EditBio.showEdit();
        }
        else {
            window.alert("You may only edit your own profile bio");
        }
        EditBio.refresh();
    };
    /**
     * Method to change the bio of your profile
     * @param username
     */
    ProfilePage.changeBio = function (username) {
        var newBio = $("#EditBio-newBio").val();
    };
    /**
     * Method to hide the edit bio form
     */
    ProfilePage.hideEdit = function () {
        var newBio = "";
        $("#EditBio").modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };
    ProfilePage.isInit = false;
    /**
     * The name of the DOM entry associated with ProfilePage
     */
    ProfilePage.NAME = "ProfilePage";
    return ProfilePage;
}());
/**
 * EditBioForm form encapsulates all of the code for the form for adding an entry
 */
var Handlebars;
var EditBio = /** @class */ (function () {
    function EditBio() {
    }
    /**
     * Initialize the EditBio form by creating its element in the DOM and
     * configuring its buttons.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use
     */
    EditBio.init = function () {
        if (!EditBio.isInit) {
            $("body").append(Handlebars.templates[EditBio.NAME + ".hb"]());
            //window.alert("appended");
            $("#EditBio-OK").click(EditBio.changeBio);
            $("#EditBio-Close").click(EditBio.hideEdit);
            EditBio.isInit = true;
        }
    };
    /**
     * Refresh() doesn't really have much meaning, but just like in sNavbar, we
     * have a refresh() method so that we don't have front-end code calling
     * init().
     */
    EditBio.refresh = function () {
        EditBio.init();
    };
    /**
     * changeBio will take the form and put in AJAX call to upadte your profile
     */
    EditBio.changeBio = function () {
        var newBio = "" + $("#" + EditBio.NAME + "-newBio").val();
        if (newBio.length > 500) {
            window.alert("Too long of a bio. Max 500 characters");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/profile",
            dataType: "json",
            data: JSON.stringify({ mUsername: Gusername, mProfile: newBio, mKey: GuserKey }),
            success: EditBio.onUpdateResponse
        });
        $("nav.xyz").hide();
        $("#ViewComments").remove();
        ProfilePage.show(Gusername);
        EditBio.hideEdit();
    };
    /**
     * onUpdateResponse will get the backends response to the updated bio
     */
    EditBio.onUpdateResponse = function (data) {
        if (data.mStatus === "logout") {
            window.alert("Session Timed Out");
            location.reload();
        }
        //window.alert("Updated Bio Successfully");
    };
    /**
     * Hides the EditBio form
     */
    EditBio.hideEdit = function () {
        $("#" + EditBio.NAME + "-newBio").val("");
        $("#" + EditBio.NAME).modal("hide");
        //$('body').removeClass('modal-open');
        //$('.modal-backdrop').remove();
    };
    /**
     * Shows the EditBio form
     */
    EditBio.showEdit = function () {
        $("#" + EditBio.NAME + "-newBio").val("");
        $("#" + EditBio.NAME).modal("show");
        //EditBio.refresh();
    };
    /**
     * The name of the DOM entry associated with EditBio
     */
    EditBio.NAME = "EditBio";
    /**
     * Track if the Singleton has been initialized
     */
    EditBio.isInit = false;
    return EditBio;
}());
// Prevent compiler errors when using jQuery.  "$" will be given a type of 
// "any", so that we can use it anywhere, and assume it has any fields or
// methods, without the compiler producing an error.
var $;
var Handlebars;
var prof;
var ViewComments = /** @class */ (function () {
    function ViewComments() {
    }
    /**
    * Initialize the ViewComments singleton.
    * This needs to be called from any public static method, to ensure that the
    * Singleton is initialized before use.
    */
    ViewComments.init = function () {
        if (!ViewComments.isInit) {
            ViewComments.isInit = true;
        }
    };
    /**
    * refresh() is the public method for updating the ElementList
    */
    ViewComments.refresh = function () {
        // Make sure the singleton is initialized
        ViewComments.init();
    };
    /**
     * Method to update the comments list for a message
     * @param data
     */
    ViewComments.update = function (data) {
        $("#ViewComments").remove();
        $("nav.xyz").remove();
        // Remove the table of data, if it exists
        $("#" + ViewComments.NAME).remove();
        // Use a template to re-generate the table, and then insert it
        $("body").append(Handlebars.templates[ViewComments.NAME + ".hb"](data));
        //$("."+ElementList.NAME+"-editbtn").click(ElementList.clickEdit);
        //window.alert("MESSAGE ID IS: "+mesID);
        //ViewComments.addComment();
        $("." + ViewComments.NAME + "-viewProfile").click(ViewComments.getProfile);
        $("." + ViewComments.NAME + "-addComment").click(NewCommentForm.show);
    };
    /**
     * Method to get the profile of a user
     */
    ViewComments.getProfile = function () {
        $("#ViewComments").remove();
        var user = $(this).data("value");
        ProfilePage.show(user);
    };
    /**
     * The name of the DOM entry associated with ViewComments
     */
    ViewComments.NAME = "ViewComments";
    /**
     * Track if the Singleton has been initialized
     */
    ViewComments.isInit = false;
    return ViewComments;
}());
/**
 * NewCommentForm encapsulates all of the code for the form for making a new comment on a message/buzz
 */
var Handlebars;
var NewCommentForm = /** @class */ (function () {
    function NewCommentForm() {
    }
    /**
     * Initialize the NewCommentForm by creating its element in the DOM and
     * configuring its buttons.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use
     */
    NewCommentForm.init = function () {
        if (!NewCommentForm.isInit) {
            $("body").append(Handlebars.templates[NewCommentForm.NAME + ".hb"]());
            $("#" + NewCommentForm.NAME + "-OK").click(NewCommentForm.submitForm);
            $("#" + NewCommentForm.NAME + "-Close").click(NewCommentForm.hide);
            NewCommentForm.isInit = true;
        }
    };
    /**
     * Refresh() doesn't really have much meaning, but just like in sNavbar, we
     * have a refresh() method so that we don't have front-end code calling
     * init().
     */
    NewCommentForm.refresh = function () {
        NewCommentForm.init();
    };
    /**
     * Hide the NewCommentForm.  Be sure to clear its fields first
     */
    NewCommentForm.hide = function () {
        $("#" + NewCommentForm.NAME + "-comment").val("");
        //These lines hide the modal background(the shadow when bringing up a new entry form)
        $("#" + NewCommentForm.NAME).modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };
    /**
     * Show the NewCommentForm.  Be sure to clear its fields, because there are
     * ways of making a Bootstrap modal disapper without clicking Close, and
     * we haven't set up the hooks to clear the fields on the events associated
     * with those ways of making the modal disappear.
     */
    NewCommentForm.show = function () {
        //window.alert();
        $("#" + NewCommentForm.NAME + "-comment").val("");
        $("#" + NewCommentForm.NAME).modal("show");
    };
    /**
     * Send data to submit the form only if the fields are both valid.
     * Immediately hide the form when we send data, so that the user knows that
     * their click was received.
     */
    NewCommentForm.submitForm = function () {
        // get the values of the two fields, force them to be strings, and check 
        // that neither is empty
        var comment = "" + $("#" + NewCommentForm.NAME + "-comment").val();
        var url = "" + $("#" + NewCommentForm.NAME + "-url").val();
        var file = $("#" + NewCommentForm.NAME + "-file")[0].files[0];
        //let id = "" + $("#" + NewCommentForm.NAME + "-id").val(); 
        var filename = "error";
        if (file) {
            //console.log("filename not null");           // DEBUG
            filename = file.name;
        }
        //console.log("filename: " + filename);          // DEBUG
        if (comment === "") {
            window.alert("Comment is required.");
            return;
        }
        if (comment.length > 255) {
            window.alert("Comment cannot exceed 255 characters.");
            return;
        }
        //alert(mesID);
        NewCommentForm.hide();
        var formData = new FormData();
        formData.append('mUsername', Gusername);
        formData.append('mKey', "" + GuserKey); // convert number to string.
        formData.append('mMessageId', "" + mesID);
        formData.append('mComment', comment);
        formData.append('mUrl', url);
        formData.append('mFile', file);
        formData.append('mFilename', filename);
        // set up an AJAX post.  When the server replies, onSubmitResponse() will be called.
        //window.alert(mesID+" , "+comment+" , "+Gusername);
        /*
        $.ajax({
            type: "POST",
            url: "/comments",
            dataType: "json",
            data: JSON.stringify({ mUsername: Gusername, mMessageId: mesID, mComment: comment, mKey: GuserKey }),
            success: NewCommentForm.onSubmitResponse
        });
        */
        $.ajax({
            type: "POST",
            url: "/comments",
            //url: "https://forums.wholetomato.com/mira/echoComment.aspx",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: NewCommentForm.onSubmitResponse
        });
    };
    /**
     * onSubmitResponse runs when the AJAX call in submitForm() returns a
     * result.
     *
     * @param data The object returned by the server
     */
    NewCommentForm.onSubmitResponse = function (data) {
        console.log(data); // DEBUG
        if (data.mStatus === "logout") {
            window.alert("Session Timed Out");
            location.reload();
        }
        // If we get an "ok" message, clear the form and refresh the main 
        // listing of messages
        if (data.mStatus === "ok") {
            //NewCommentForm.refresh();
            $("#ViewComments").remove();
            //window.alert(mesID);
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
     * The name of the DOM entry associated with NewCommentForm
     */
    NewCommentForm.NAME = "NewCommentForm";
    /**
     * Track if the Singleton has been initialized
     */
    NewCommentForm.isInit = false;
    return NewCommentForm;
}());
/**
 * NewPassForm encapsulates all of the code for the form for adding an entry
 */
var Handlebars;
var NewPassForm = /** @class */ (function () {
    function NewPassForm() {
    }
    /**
     * Initialize the NewPassForm by creating its element in the DOM and
     * configuring its buttons.  This needs to be called from any public static
     * method, to ensure that the Singleton is initialized before use
     */
    NewPassForm.init = function () {
        if (!NewPassForm.isInit) {
            $("body").append(Handlebars.templates[NewPassForm.NAME + ".hb"]());
            $("#" + NewPassForm.NAME + "-OK").click(NewPassForm.submitForm);
            $("#" + NewPassForm.NAME + "-Close").click(NewPassForm.hide);
            NewPassForm.isInit = true;
        }
    };
    /**
     * Refresh() doesn't really have much meaning, but just like in sNavbar, we
     * have a refresh() method so that we don't have front-end code calling
     * init().
     */
    NewPassForm.refresh = function () {
        NewPassForm.init();
    };
    /**
     * Hide the NewPassForm.  Be sure to clear its fields first
     */
    NewPassForm.hide = function () {
        $("#" + NewPassForm.NAME + "-oldPass").val("");
        $("#" + NewPassForm.NAME + "-newPass").val("");
        //These lines hide the modal background(the shadow when bringing up a new entry form)
        $("#" + NewPassForm.NAME).modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };
    /**
     * Show the NewPassForm.  Be sure to clear its fields, because there are
     * ways of making a Bootstrap modal disapper without clicking Close, and
     * we haven't set up the hooks to clear the fields on the events associated
     * with those ways of making the modal disappear.
     */
    NewPassForm.show = function () {
        $("#" + NewPassForm.NAME + "-oldPass").val("");
        $("#" + NewPassForm.NAME + "-newPass").val("");
        $("#" + NewPassForm.NAME).modal("show");
    };
    /**
     * Send data to submit the form only if the fields are both valid.
     * Immediately hide the form when we send data, so that the user knows that
     * their click was received.
     */
    NewPassForm.submitForm = function () {
        // get the values of the two fields, force them to be strings, and check 
        // that neither is empty
        var oldPass = "" + $("#" + NewPassForm.NAME + "-oldPass").val();
        var newPass = "" + $("#" + NewPassForm.NAME + "-newPass").val();
        if (oldPass.length >= 30 || oldPass == "") {
            window.alert("Error: Make a reasonable password");
            return;
        }
        if (newPass.length >= 30 || newPass == "") {
            window.alert("Error: Make a reasonable password");
            return;
        }
        NewPassForm.hide();
        // set up an AJAX post.  When the server replies, the result will go to
        // onSubmitResponse
        //window.alert("before ajax"+oldPass+","+newPass);
        $.ajax({
            type: "PUT",
            url: "/changePassword/" + Gusername,
            dataType: "json",
            data: JSON.stringify({ mCurrentPassword: oldPass, mNewPassword: newPass, mKey: GuserKey }),
            success: NewPassForm.onChangeResponse
        });
    };
    /** Takes the response from a successful AJAX call to create a new password
     * @param data
     */
    NewPassForm.onChangeResponse = function (data) {
        if (data.mStatus === "logout") {
            window.alert("Session Timed Out");
            location.reload();
        }
        if (data.mStatus === "ok") {
            window.alert("Changed Successfully");
        }
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        }
    };
    /**
     * The name of the DOM entry associated with NewPassForm
     */
    NewPassForm.NAME = "NewPassForm";
    /**
     * Track if the Singleton has been initialized
     */
    NewPassForm.isInit = false;
    return NewPassForm;
}());
/// <reference path="ts/EditEntryForm.ts"/>
/// <reference path="ts/NewEntryForm.ts"/>
/// <reference path="ts/NewPollForm.ts"/>
/// <reference path="ts/ViewPoll.ts"/>
/// <reference path="ts/ElementList.ts"/>
/// <reference path="ts/Navbar.ts"/>
/// <reference path="ts/NavbarLoggedIn.ts"/>
/// <reference path="ts/LoginWindow.ts"/>
/// <reference path="ts/CreateAccountForm.ts"/>
/// <reference path="ts/ProfilePage.ts"/>
/// <reference path="ts/EditBio.ts"/>
/// <reference path="ts/ViewComments.ts"/>
/// <reference path="ts/NewCommentForm.ts"/>
/// <reference path="ts/NewPassForm.ts"/>
// Prevent compiler errors when using jQuery.  "$" will be given a type of 
// "any", so that we can use it anywhere, and assume it has any fields or
// methods, without the compiler producing an error.
var $;
var Handlebars;
var GloggedIn = false;
var Gusername;
var Gpassword = "";
var GuserKey = -1;
var headers = false;
var viewingYours = false;
// a global for the EditEntryForm of the program.  See newEntryForm for 
// explanation
var editEntryForm;
var loginWindow;
var createAccountForm;
var changePass;
var editBio;
var mesID;
// Run some configuration code when the web page loads
$(document).ready(function () {
    if (GloggedIn == false) {
        Navbar.refresh();
    }
    else {
        NavbarLoggedIn.refresh();
    }
    NewEntryForm.refresh();
    NewPollForm.refresh();
    //ViewPoll.refresh();
    NewCommentForm.refresh();
    CreateAccountForm.refresh();
    LoginWindow.refresh();
    //ElementList.refresh();
    EditEntryForm.refresh();
    EditBio.refresh();
    NewPassForm.refresh();
    // Create the object that controls the "Edit Entry" form
    editEntryForm = new EditEntryForm();
    changePass = new NewPassForm();
    loginWindow = new LoginWindow();
    createAccountForm = new CreateAccountForm();
    editBio = new EditBio();
    // set up initial UI state
    $("#editElement").hide();
});
