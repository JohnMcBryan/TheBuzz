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
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * This class handles the view for the comment activity
 * Everytime a user clicks on the comment button for a message, they are brought to a comment activity filled with comments for that message
 * Menu has an action to create a comment for that message
 */
public class CreatePollActivity extends AppCompatActivity {

    /**
     * mCommentData holds data for all the comments, this probably has to be put within the declaration of a new message
     */
    ArrayList<Comment> mCommentData = new ArrayList<>();

    Menu optionsMenu;
    //Adapter for the message object
    RecyclerView.Adapter adapter;

    //On create will fill this with the unique messageId
    String messageIDGlobal = "";

    //On create will fill this with the unique view which says where comment
    //is being called from. 0 is for main and 1 is for profile.
    int viewGlobal = 0;

    String check = "";


    // enter into the browser to understand what the android app is parsing in the GET request.
    String urlPost = "";
    String urlGet = "";

    /**
     * This method is called every time the comment button is pressed, will fill the view with comments
     *
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.poll_layout);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        /*RecyclerView rv = (RecyclerView) findViewById(R.id.comment_list_view);
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.addItemDecoration(new SimpleDividerItemDecoration(this));
        adapter = new CommentRecyclerAdapter(mCommentData);
        rv.setAdapter(adapter);*/

        // Get top label from the calling activity, and put it in TextView
        Intent input = getIntent();
        //String topLabel = input.getStringExtra("topLabel");
        //final TextView tv = (TextView) findViewById(R.id.topLabel);
        //tv.setText(topLabel);

        final TextView em = (TextView) findViewById(R.id.textSubject);

        final TextView o1 = (TextView) findViewById(R.id.textOption1);
        final TextView o2 = (TextView) findViewById(R.id.textOption2);
        final TextView o3 = (TextView) findViewById(R.id.textOption3);
        o3.setVisibility(View.INVISIBLE);
        final TextView o4 = (TextView) findViewById(R.id.textOption4);
        o4.setVisibility(View.INVISIBLE);
        final TextView o5 = (TextView) findViewById(R.id.textOption5);
        o5.setVisibility(View.INVISIBLE);
        final TextView o6 = (TextView) findViewById(R.id.textOption6);
        o6.setVisibility(View.INVISIBLE);
        final EditText sub = (EditText) findViewById(R.id.enterSubject);
        final EditText option1 = (EditText) findViewById(R.id.enterOption1);
        final EditText option2 = (EditText) findViewById(R.id.enterOption2);
        final EditText option3 = (EditText) findViewById(R.id.enterOption3);
        option3.setVisibility(View.INVISIBLE);
        final EditText option4 = (EditText) findViewById(R.id.enterOption4);
        option4.setVisibility(View.INVISIBLE);
        final EditText option5 = (EditText) findViewById(R.id.enterOption5);
        option5.setVisibility(View.INVISIBLE);
        final EditText option6 = (EditText) findViewById(R.id.enterOption6);
        option6.setVisibility(View.INVISIBLE);
        final int[] pollNumber = new int[1];
        pollNumber[0] = 2;

        // The OK button gets the text from the input box and returns it to the calling activity
        Button bOk = (Button) findViewById(R.id.buttonOk);
        bOk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Create an intent only when the user entered text in both fields
                if (!sub.getText().toString().equals("")&&!option1.getText().toString().equals("") &&!option2.getText().toString().equals("")) {
                    Intent i = new Intent();
                    i.putExtra("resultSubject", sub.getText().toString());
                    i.putExtra("resultOption1", option1.getText().toString());
                    i.putExtra("resultOption2", option2.getText().toString());
                    if (!option3.getText().toString().equals("")){
                        i.putExtra("resultOption3", option3.getText().toString());
                    }
                    if (!option4.getText().toString().equals("")){
                        i.putExtra("resultOption4", option4.getText().toString());
                    }
                    if (!option5.getText().toString().equals("")){
                        i.putExtra("resultOption5", option5.getText().toString());
                    }
                    if (!option6.getText().toString().equals("")){
                        i.putExtra("resultOption6", option6.getText().toString());
                    }
                    Log.d("abc", String.valueOf(Activity.RESULT_OK));
                    Log.d("abcd", String.valueOf(i));
                    i.putExtra("numberOp",pollNumber[0]);
                    setResult(Activity.RESULT_OK, i);

                    finish();
                }


            }
        });
        Button bAddOption = (Button) findViewById(R.id.addOption);
        bAddOption.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (pollNumber[0] == 2) {
                    o3.setVisibility(View.VISIBLE);
                    option3.setVisibility(View.VISIBLE);
                    pollNumber[0] = 3;
                }
                else if (pollNumber[0] == 3) {
                    o4.setVisibility(View.VISIBLE);
                    option4.setVisibility(View.VISIBLE);
                    pollNumber[0] = 4;
                }
                else if (pollNumber[0] == 4) {
                    o5.setVisibility(View.VISIBLE);
                    option5.setVisibility(View.VISIBLE);
                    pollNumber[0] = 5;
                }
                else if (pollNumber[0] == 5) {
                    o6.setVisibility(View.VISIBLE);
                    option6.setVisibility(View.VISIBLE);
                    pollNumber[0] = 6;
                }
            }
        });
        Button bDeleteOption = (Button) findViewById(R.id.deleteOption);
        bDeleteOption.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (pollNumber[0] == 3) {
                    o3.setVisibility(View.INVISIBLE);
                    option3.setVisibility(View.INVISIBLE);
                    pollNumber[0] = 2;
                }
                else if (pollNumber[0] == 4) {
                    o4.setVisibility(View.INVISIBLE);
                    option4.setVisibility(View.INVISIBLE);
                    pollNumber[0] = 3;
                }
                else if (pollNumber[0] == 5) {
                    o5.setVisibility(View.INVISIBLE);
                    option5.setVisibility(View.INVISIBLE);
                    pollNumber[0] = 4;
                }
                else if (pollNumber[0] == 6) {
                    o6.setVisibility(View.INVISIBLE);
                    option6.setVisibility(View.INVISIBLE);
                    pollNumber[0] = 5;
                }
            }
        });
        // The Cancel button returns to the caller without sending it any data
        Button bCancel = (Button) findViewById(R.id.buttonCancel);
        bCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setResult(Activity.RESULT_CANCELED);
                finish();
            }
        });
    }
}

