package edu.lehigh.cse216.jnm219.backend;

/**
 * StructuredAnswer provides a common format for success and failure messages,
 * with an optional payload of type Object that can be converted into JSON.
 * 
 * NB: since this will be converted into JSON, all fields must be public.
 */
public class StructuredAnswer{
    /**
     * The status is a string that the application can use to quickly determine
     * if the response indicates an error.  Values will probably just be "ok" or
     * "error", but that may evolve over time.
     */
    public String mStatus;

    /**
     * mPollData contains the poll id and all the poll options
     */
    public boolean mCheck;

    /**
     * Construct a StructuredAnswer by providing a status, and check.
     * Check is either true or false. True if user has already voted on a poll. False if not voted yet.
     * If the status is not provided, set it to "invalid".
     * 
     * @param status The status of the response, typically "ok" or "error"
     */
    public StructuredAnswer(String status, boolean check) {
        mStatus = (status != null) ? status : "invalid";
        mCheck = check;
    }
}