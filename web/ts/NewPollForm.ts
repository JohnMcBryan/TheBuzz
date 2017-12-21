/**
 * NewPollForm encapsulates all of the code for the form for adding an entry
 */

var Handlebars: any;
class NewPollForm {
    
        /**
         * The name of the DOM entry associated with NewPollForm
         */
        private static readonly NAME = "NewPollForm";
    
        /**
         * Track if the Singleton has been initialized
         */
        private static isInit = false;

        private static messageId;
        private static options = 2;
    
        /**
         * Initialize the NewPollForm by creating its element in the DOM and 
         * configuring its buttons.  This needs to be called from any public static 
         * method, to ensure that the Singleton is initialized before use
         */
        private static init() {
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
                $("#" + NewPollForm.NAME + "-addOption").click(function(){
                    if(NewPollForm.options < 6){
                        NewPollForm.options++;
                        console.log("p" + NewPollForm.options);
                        $("p" + NewPollForm.options).show();
                        if(NewPollForm.options === 6){
                            $("p1").hide();
                        }
                    }
                });
                $("#" + NewPollForm.NAME + "-removeOption").click(function(){
                    if(NewPollForm.options > 2){
                        if(NewPollForm.options === 6){
                            $("p1").show();
                        }
                        $("#" + NewPollForm.NAME + "-poll" + NewPollForm.options).val("");
                        $("p" + NewPollForm.options).hide();
                        NewPollForm.options--;
                        console.log("p" + NewPollForm.options);
                    }
                });
            }
        }
    
        /**
         * Refresh() doesn't really have much meaning, but just like in sNavbar, we
         * have a refresh() method so that we don't have front-end code calling
         * init().
         */
        public static refresh() {
            NewPollForm.init();
        }
        /**
         * Hide the NewPollForm.  Be sure to clear its fields first
         */
        private static hide() {
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
        }
        /**
         * Show the NewPollForm.  Be sure to clear its fields, because there are
         * ways of making a Bootstrap modal disapper without clicking Close, and
         * we haven't set up the hooks to clear the fields on the events associated
         * with those ways of making the modal disappear.
         */
        public static show(mId: String) {
            NewPollForm.messageId = mId;
            $("#" + NewPollForm.NAME + "-title").val("foo");
            $("#" + NewPollForm.NAME + "-url").val("https://xkcd.com/");
            $("#" + NewPollForm.NAME + "-file").val("");
            $("#" + NewPollForm.NAME).modal("show");
        }
        /**
         * Send data to submit the form only if the fields are both valid.  
         * Immediately hide the form when we send data, so that the user knows that 
         * their click was received.
         */
        private static submitForm() {
            // get form fields
            let title = "" + $("#" + NewPollForm.NAME + "-title").val();   // prepend "" to force into a string

            let pollOptions1 = "" + $('#' + NewPollForm.NAME + "-poll1").val();
            let pollOptions2 = "" + $('#' + NewPollForm.NAME + "-poll2").val();
            let pollOptions3 = "" + $('#' + NewPollForm.NAME + "-poll3").val();
            let pollOptions4 = "" + $('#' + NewPollForm.NAME + "-poll4").val();
            let pollOptions5 = "" + $('#' + NewPollForm.NAME + "-poll5").val();
            let pollOptions6 = "" + $('#' + NewPollForm.NAME + "-poll6").val();

            if(title.length >= 50)
            {
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
            NewPollForm.hide();        // close modal dialog.

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
                url: "/messages/poll/"+NewPollForm.messageId,
                //url: "https://forums.wholetomato.com/mira/echo.aspx",
                dataType: "json",      // dataType of response to POST
                data: JSON.stringify({ mSubject: title, mPollOption1: pollOptions1, mPollOption2: pollOptions2, mPollOption3: pollOptions3, mPollOption4: pollOptions4, mPollOption5: pollOptions5, mPollOption6: pollOptions6, mUsername: Gusername, mKey: GuserKey }),
                success: NewPollForm.onSubmitResponse
            });
        }
    
        /**
         * onSubmitResponse runs when the AJAX call in submitForm() returns a 
         * result.
         * 
         * @param data The object returned by the server
         */
        private static onSubmitResponse(data: any) {
            
            //console.log("response to POST: " + data);   // DEBUG

            // If we get an "ok" message, clear the form and refresh the main 
            // listing of messages
            if (data.mStatus === "logout") {
                window.alert("Session Timed Out");
                location.reload();
            }
            
            if (data.mStatus === "ok") {
                if(viewingYours!=true){
                    $("nav.xyz").remove();
                }
                ElementList.refresh();
            }
            // Handle explicit errors with a detailed popup message
            else if (data.mStatus === "error") {
                window.alert("The server replied with an error:\n" + data.mMessage);
            }
            // Handle other errors with a less-detailed popup message
            else {
                window.alert("Unspecified error");
            }
        }
    }