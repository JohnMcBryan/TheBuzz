/**
 * ViewPoll encapsulates all of the code for the form for adding an entry
 */

var Handlebars: any;
class ViewPoll {
    
        /**
         * The name of the DOM entry associated with ViewPoll
         */
        private static readonly NAME = "ViewPoll";
    
        /**
         * Track if the Singleton has been initialized
         */
        private static isInit = false;

        private static pollId;
    
        /**
         * Initialize the ViewPoll by creating its element in the DOM and 
         * configuring its buttons.  This needs to be called from any public static 
         * method, to ensure that the Singleton is initialized before use
         */
        private static init() {
            console.log("here3");
            if (!ViewPoll.isInit) {
                //$("body").append(Handlebars.templates["ViewPoll.hb"]());
                $("nav.xyz").remove();
            }
        }

        /**
         * Refresh() doesn't really have much meaning, but just like in sNavbar, we
         * have a refresh() method so that we don't have front-end code calling
         * init().
         */
        public static refresh() {
            ViewPoll.init();
        }

        /**
         * Hide the ViewPoll.  Be sure to clear its fields first
         */
        private static hide() {
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
        }

        /**
         * Show the ViewPoll.  Be sure to clear its fields, because there are
         * ways of making a Bootstrap modal disapper without clicking Close, and
         * we haven't set up the hooks to clear the fields on the events associated
         * with those ways of making the modal disappear.
         */
        public static show(mId: String) {
            ViewPoll.pollId = mId;
            console.log("here1");
            ViewPoll.init();

            $.ajax({
                type: "GET",
                url: "/poll/" + mId,
                dataType: "json",
                success: ViewPoll.displayPoll
            });
        }

    /**
     * Method that will send a post to backend that tells the backend which option on the poll
     * the user voted for.
     */
    private static pollVote(option: number){
        $.ajax({
            type: "POST",
            url: "/pollVote",
            dataType: "json",
            data: JSON.stringify({ mUsername: Gusername, mPollId: ViewPoll.pollId, mPollOptionVoted: option}),    
            // might need id.Guser
            success: ViewPoll.show(ViewPoll.pollId),
        });
    }

    /** Method to show the poll of the message passed in in method show(mId: String)
     * data will contain all info of the poll from the AJAX call
     * @param data
     */
    public static displayPoll(data:any){
        if (data.mStatus === "logout") {
            window.alert(Gkey);
            window.alert("Session Timed Out");
            location.reload();
        }
        else if (data.mStatus === "error"){
            window.alert("Error");
        }
        //else if (data.mStatus === "already voted"){
           // ViewPoll.voted = true;
        //}
        else{

            // Checks if user has already voted
            ViewPoll.init();

            console.log("data: "+data.mStatus);
            //console.log("mSubject:" + data.mPollData.mSubject);
            console.log("mPoll1:" + data.mPollData.mPollOption1);
            console.log("mPoll2"+data.mPollData.mPollOption2);

            $("body").append(Handlebars.templates[ViewPoll.NAME + ".hb"](data));
            console.log("here2");
            $("#" + ViewPoll.NAME + "-Close").click(ViewPoll.hide);

            // Handles the option buttons functionality
            $("#" + ViewPoll.NAME + "-Option1").click(function(){
                ViewPoll.pollVote(1);
            });
            $("#" + ViewPoll.NAME + "-Option2").click(function(){
                ViewPoll.pollVote(2);
            });
            $("#" + ViewPoll.NAME + "-Option3").click(function(){
                ViewPoll.pollVote(3);
            });
            $("#" + ViewPoll.NAME + "-Option4").click(function(){
                ViewPoll.pollVote(4);
            });
            $("#" + ViewPoll.NAME + "-Option5").click(function(){
                ViewPoll.pollVote(5);
            });
            $("#" + ViewPoll.NAME + "-Option6").click(function(){
                ViewPoll.pollVote(6);
            });

            // Hides poll options if they are not initialized
            if(data.mPollData.mPollOption3 === "")
                $("p3").hide();
            if(data.mPollData.mPollOption4 === "")
                $("p4").hide();
            if(data.mPollData.mPollOption5 === "")
                $("p5").hide();
            if(data.mPollData.mPollOption6 === "")
                $("p6").hide();

            // Hides the poll results
            ViewPoll.init();

            // Displays modal
            $("#" + ViewPoll.NAME).modal("show");
        }
    }
}