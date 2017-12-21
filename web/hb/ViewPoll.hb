<div id="ViewPoll" class="modal fade" role="dialog">
    <div id="iDontCare" class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{this.mPollData.mSubject}}</h4>
            </div>
            <form id="ViewPoll-form" name="form">
            <div class="modal-body">

                <div class="modal-body">
                    <p1><label for="ViewPoll-message">Option1</label></p1>
                    <p1>{{this.mPollData.mPollOption1}}</p1>
                    <p2><label for="ViewPoll-message">Option2</label></p2>
                    <p2>{{this.mPollData.mPollOption2}}</p2>
                    <p3><label for="ViewPoll-message">Option3</label></p3>
                    <p3>{{this.mPollData.mPollOption3}}</p3>
                    <p4><label for="ViewPoll-message">Option4</label></p4>
                    <p4>{{this.mPollData.mPollOption4}}</p4>
                    <p5><label for="ViewPoll-message">Option5</label></p5>
                    <p5>{{this.mPollData.mPollOption5}}</p5>
                    <p6><label for="ViewPoll-message">Option6</label></p6>
                    <p6>{{this.mPollData.mPollOption6}}</p6>
                </div>
            
            <div id="ViewPoll-pollVotes" class="modal-body">
                <div class="modal-body">
                    <p1><a href="#" data-toggle="tooltip" title="Option 1"><span class="badge">Option 1: {{this.mPollData.mPollOption1Votes}}</span></a></p1>
                    <p2><a href="#" data-toggle="tooltip" title="Option2"><span class="badge">Option 2: {{this.mPollData.mPollOption2Votes}}</span></a></p2>
                    <p3><a href="#" data-toggle="tooltip" title="Option3"><span class="badge">Option 3: {{this.mPollData.mPollOption3Votes}}</span></a></p3>
                    <p4><a href="#" data-toggle="tooltip" title="Option4"><span class="badge">Option 4: {{this.mPollData.mPollOption4Votes}}</span></a></p4>
                    <p5><a href="#" data-toggle="tooltip" title="Option5"><span class="badge">Option 5: {{this.mPollData.mPollOption5Votes}}</span></a></p5>
                    <p6><a href="#" data-toggle="tooltip" title="Option6"><span class="badge">Option 6: {{this.mPollData.mPollOption6Votes}}</span></a></p6>
                </div>
                <div class="modal-body">
                    <p1><button type="button" class="btn btn-default" id="ViewPoll-Option1">Option1</button></p1>
                    <p2><button type="button" class="btn btn-default" id="ViewPoll-Option2">Option2</button></p2>
                    <p3><button type="button" class="btn btn-default" id="ViewPoll-Option3">Option3</button></p3>
                    <p4><button type="button" class="btn btn-default" id="ViewPoll-Option4">Option4</button></p4>
                    <p5><button type="button" class="btn btn-default" id="ViewPoll-Option5">Option5</button></p5>
                    <p6><button type="button" class="btn btn-default" id="ViewPoll-Option6">Option6</button></p6>
                </div>
            </div>
            </form>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" id="ViewPoll-Close">Cancel</button>
            </div>
        </div>
    </div>
</div>