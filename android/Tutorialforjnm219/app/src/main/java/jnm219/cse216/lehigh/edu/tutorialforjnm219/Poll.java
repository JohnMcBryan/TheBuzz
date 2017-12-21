package jnm219.cse216.lehigh.edu.tutorialforjnm219;

/**
 * Created by Jack on 10/5/2017.
 */

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * This class handles the view for the comment activity
 * Everytime a user clicks on the comment button for a message, they are brought to a comment activity filled with comments for that message
 * Menu has an action to create a comment for that message
 */
public class Poll {

    /**
     * mMessgeId is what is used to distinguish different messages
     */
    int mPollId;
    String mSubject;
    String mMessage;
    String mUsername;
    /**
     * mSubject  is the text for the subject of a message
     */

    String mPollOption1;

    /**
     * mMessage is the text for the message of a message
     */

    String mPollOption2;

    /**
     * mCreateTime is used to show the create time of a message
     */

    String mPollOption3;

    /**
     * mUsername is used to hold data for the posters username
     */

    String mPollOption4;

    /**
     * mVotes holds the data for how many votes this message has
     */
    String mPollOption5;
    String mPollOption6;


    Poll (int messageId, String subject,String option1,String option2, String option3, String option4 ,String option5 , String option6){
        mSubject=subject;
        mPollId = messageId;
        mPollOption1= option1;
        mPollOption2= option2;
        mPollOption3= option3;
        mPollOption4= option4;
        mPollOption5= option5;
        mPollOption6= option6;

    }
}