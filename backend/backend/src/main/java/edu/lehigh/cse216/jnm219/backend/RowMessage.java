package edu.lehigh.cse216.jnm219.backend;

import java.security.Timestamp;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Calendar;
import java.text.SimpleDateFormat;

/**
 * RowMessage is fields of messages
 */
public class RowMessage {
    /**
     * The id of the message
     */
    int mId;
    /**
     * The subject of the message
     */
    String mSubject;
    /**
     * The message itself
     */
    String mMessage;
    /**
     * The number of votes for this row
     */
    int mVotes;
    /**
     * The time of row creation
     */
    String mCreateTime;
    /**
     * The username that created the message
     */
    String mUsername;

    String mFileId;

    int mPollExist;

    String mUrl;

    /**
     * Construct a RowMessage object by providing values for its fields
     */
    public RowMessage(int id, String subject, String message, String username, String createTime, int votes, String fileId, int pollExist, String url) {
        mId = id;
        mSubject = subject;
        mMessage = message;
        mUsername = username;
        mCreateTime = createTime;
        mVotes = votes;
        mFileId = fileId;
        mPollExist = pollExist;
        mUrl = url;
        checkYouTubeUrl(url);
    }

    /** if a url contains youtube.com, remove everything before the = sign, leaving the letters
     * Web implements YouTube videos and only needs the letters
     * ex: https://www.youtube.com/watch?v=cxrLRbkOwKs
     */
    void checkYouTubeUrl(String url) {
        System.out.println("in checkYouTubeUrl, where url = " + url);
        if (url.contains("youtube.com")) {
            System.out.println("Url is a youtube url");
            String[] tokens = url.split("[=]+");
            System.out.println("tokens[0] = " + tokens[0]);
            System.out.println("tokens[1] = " + tokens[1]);
            mUrl = tokens[1];
        }
    }

}