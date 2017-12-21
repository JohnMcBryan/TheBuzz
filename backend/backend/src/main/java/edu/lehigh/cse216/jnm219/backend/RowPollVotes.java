package edu.lehigh.cse216.jnm219.backend;

public class RowPollVotes {
    
    int mPollOption1Votes;
    int mPollOption2Votes;
    int mPollOption3Votes;
    int mPollOption4Votes;
    int mPollOption5Votes;
    int mPollOption6Votes;
    //int[] mPollOptionVotes;

    /** Construct a RowPollVotes with all counts set to 0*/
    public RowPollVotes() {
        
        mPollOption1Votes = 0;
        mPollOption2Votes = 0;
        mPollOption3Votes = 0;
        mPollOption4Votes = 0;
        mPollOption5Votes = 0;
        mPollOption6Votes = 0;
        
    }

    /** addCount updates the voteCount for the specified option */
    public void addCount(int optionNumber, int voteCount) {
        if (optionNumber == 1) {
            mPollOption1Votes = voteCount;
        }
        else if (optionNumber == 2) {
            mPollOption2Votes = voteCount;
        }
        else if (optionNumber == 3) {
            mPollOption3Votes = voteCount;
        }
        else if (optionNumber == 4) {
            mPollOption4Votes = voteCount;
        }
        else if (optionNumber == 5) {
            mPollOption5Votes = voteCount;
        }
        else if (optionNumber == 6) {
            mPollOption6Votes = voteCount;
        }
    }

}