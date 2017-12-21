package edu.lehigh.cse216.jnm219.backend;

/**
 * StructuredPoll provides a common format for success and failure messages,
 * with an optional payload of type Object that can be converted into JSON.
 * 
 * NB: since this will be converted into JSON, all fields must be public.
 */
public class StructuredPoll{
    /**
     * The status is a string that the application can use to quickly determine
     * if the response indicates an error.  Values will probably just be "ok" or
     * "error", but that may evolve over time.
     */
    public String mStatus;

    /**
     * mPollData contains the poll id and all the poll options
     */
    public Object mPollData;

    /**
     * Construct a StructuredPoll by providing a status, and options 1 through 6.
     * If the status is not provided, set it to "invalid".
     * 
     * @param status The status of the response, typically "ok" or "error"
     * @param option1 
     * @param option2
     * @param option3
     * @param option4
     * @param option5
     * @param option6
     */
    public StructuredPoll(String status, Object data) {
        mStatus = (status != null) ? status : "invalid";
        mPollData = data;
    }
}