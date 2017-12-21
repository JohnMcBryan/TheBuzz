package edu.lehigh.cse216.jnm219.backend;

/**
 * StructuredPollVotes provides a common format for success and failure messages,
 * with an optional payload of type Object that can be converted into JSON.
 * 
 * NB: since this will be converted into JSON, all fields must be public.
 */
public class StructuredPollVotes{
    /**
     * The status is a string that the application can use to quickly determine
     * if the response indicates an error.  Values will probably just be "ok" or
     * "error", but that may evolve over time.
     */
    public String mStatus;

    /**
     * mPollData contains the poll id and all the poll options
     */
    public Object mPollVotesData;

    /**
     * Construct a StructuredPoll by providing a status, and options 1 through 6.
     * If the status is not provided, set it to "invalid".
     * 
     * @param status The status of the response, typically "ok" or "error"
     * @param data The mPollVotesData of the response, option 1 through 6
     */
    public StructuredPollVotes(String status, Object data) {
        mStatus = (status != null) ? status : "invalid";
        mPollVotesData = data;
    }
}