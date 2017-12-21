package edu.lehigh.cse216.jnm219.backend;

public class RowPoll {
    int mPollId;
    String mSubject;
    String mPollOption1;
    String mPollOption2;
    String mPollOption3;
    String mPollOption4;
    String mPollOption5;
    String mPollOption6;

    int mPollOption1Votes;
    int mPollOption2Votes;
    int mPollOption3Votes;
    int mPollOption4Votes;
    int mPollOption5Votes;
    int mPollOption6Votes;

    /**
     * Construct a RowPoll object by providing values for its fields
     */
    public RowPoll(int pollId, String subject, String option1, String option2, String option3, String option4, String option5, String option6) {
        mPollId = pollId;
        mSubject = subject;
        mPollOption1 = option1;
        mPollOption2 = option2;
        mPollOption3 = option3;
        mPollOption4 = option4;
        mPollOption5 = option5;
        mPollOption6 = option6;

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