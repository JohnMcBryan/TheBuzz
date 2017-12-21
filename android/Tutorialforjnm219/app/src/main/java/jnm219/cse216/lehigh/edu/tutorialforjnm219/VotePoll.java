package jnm219.cse216.lehigh.edu.tutorialforjnm219;

/**
 * Created by Jack on 10/5/2017.
 */

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * This class handles the view for the comment activity
 * Everytime a user clicks on the comment button for a message, they are brought to a comment activity filled with comments for that message
 * Menu has an action to create a comment for that message
 */
public class VotePoll extends AppCompatActivity {

    /**
     * mCommentData holds data for all the comments, this probably has to be put within the declaration of a new message
     */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent i = new Intent();
        setResult(Activity.RESULT_OK, i);
        finish();
    }


}

