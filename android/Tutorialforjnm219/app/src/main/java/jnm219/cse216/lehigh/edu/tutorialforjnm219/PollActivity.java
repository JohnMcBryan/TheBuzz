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
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;

import org.json.JSONArray;
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
public class PollActivity extends AppCompatActivity {
    ArrayList<Message> mMessageData = new ArrayList<>();
    Poll mPoll=null;
    Menu optionsMenu;
    //Adapter for the message object
    RecyclerView.Adapter adapter;

    //On create will fill this with the unique messageId
    String messageIDGlobal = "";

    String check = "";
    String voteNum="";
    // enter into the browser to understand what the android app is parsing in the GET request.
    String urlGet = "";
    String urlPost = "";
    // Information for the user profile
    String mUsername;
    String mRealName;
    String mEmail;
    String mProfile;
    //int messagePollExist=-1;
    //Profile info text views
    private TextView displaySub;
    private TextView displayOption1;
    private TextView displayOption2;
    private TextView displayOption3;
    private TextView displayOption4;
    private TextView displayOption5;
    private TextView displayOption6;
    private TextView displayVote1;
    private TextView displayVote2;
    private TextView displayVote3;
    private TextView displayVote4;
    private TextView displayVote5;
    private TextView displayVote6;
    private Button vote1;
    private Button vote2;
    private Button vote3;
    private Button vote4;
    private Button vote5;
    private Button vote6;
    private Button createPoll;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.view_poll_layout);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        Log.d("JOON SEONWOOO", "WHAT UP!");
        setSupportActionBar(toolbar);
        //String otherUser = getIntent().getStringExtra("otherUser");
        String mesId = getIntent().getStringExtra("messageID");
        messageIDGlobal =getIntent().getStringExtra("messageID");
        int messagePollExist=Integer.valueOf(getIntent().getStringExtra("checkPoll"));
        Log.d("CHECK POLL EXIST",""+messagePollExist);
        //Toast.makeText(PollActivity.this, messagePollExist, Toast.LENGTH_LONG).show();
        Log.d("JOON SEONWOOO", mesId);
        displaySub=(TextView) findViewById(R.id.displaySub);
        displayOption1=(TextView) findViewById(R.id.displayOption1);
        displayOption2=(TextView) findViewById(R.id.displayOption2);
        displayOption3=(TextView) findViewById(R.id.displayOption3);
        displayOption4=(TextView) findViewById(R.id.displayOption4);
        displayOption5=(TextView) findViewById(R.id.displayOption5);
        displayOption6=(TextView) findViewById(R.id.displayOption6);
        displayVote1=(TextView) findViewById(R.id.displayVote1);
        displayVote2=(TextView) findViewById(R.id.displayVote2);
        displayVote3=(TextView) findViewById(R.id.displayVote3);
        displayVote4=(TextView) findViewById(R.id.displayVote4);
        displayVote5=(TextView) findViewById(R.id.displayVote5);
        displayVote6=(TextView) findViewById(R.id.displayVote6);
        vote1= (Button)  findViewById(R.id.vote1);
        vote2= (Button)  findViewById(R.id.vote2);
        vote3= (Button)  findViewById(R.id.vote3);
        vote4= (Button)  findViewById(R.id.vote4);
        vote5= (Button)  findViewById(R.id.vote5);
        vote6= (Button)  findViewById(R.id.vote6);

        //Log.d("JOO", otherUser);
        urlPost = "https://quiet-taiga-79213.herokuapp.com/messages/poll/"+mesId;
        urlGet = "https://quiet-taiga-79213.herokuapp.com/poll/"+mesId;/*
        RecyclerView rv = (RecyclerView) findViewById(R.id.comment_list_view);
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.addItemDecoration(new SimpleDividerItemDecoration(this));
        displayOption1 = (TextView) findViewById(R.id.displayOption1);
        displayOption2 = (TextView) findViewById(R.id.displayOption2);
        displayOption3 = (TextView) findViewById(R.id.displayOption3);
        displayOption4 = (TextView) findViewById(R.id.displayOption4);
        displayOption5 = (TextView) findViewById(R.id.displayOption5);
        displayOption6 = (TextView) findViewById(R.id.displayOption6);
          rv.setAdapter(adapter);*/
        //Log.d("JOON SEONWOOO", "WHAT AMA AAMA UP!");
        //adapter = new MessageRecyclerAdapter(mMessageData, 1);
        Log.d("JOON SEONWOOO", "WHATaaa UP!");
        if (messagePollExist==1) {
            Log.d("JOON SEONWOOO", "WHATSPUP UP!");
            createPoll = (Button) findViewById(R.id.createPoll);
            refreshList();
        }
        else {
            createPoll = (Button) findViewById(R.id.createPoll);

            Log.d("JOON SEONWOOO", "WHAT!!!!!!!11sssss UP!");
            createPoll.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Log.d("JOON SEONWOOO", "WHATsssss UP!");
                    Intent i = new Intent(getApplicationContext(), CreatePollActivity.class);
                    i.putExtra("topLabel", "Create a buzz:");
                    Log.d("GETS TO HERE", "GETTTETEETEEETETETETETETE");
                    startActivityForResult(i, 123); // 789 is the number that will come back to us
                }
            });
            refreshList();
        }
    }
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.profile_menu, menu);
        optionsMenu = menu;

        MenuItem buzz = (MenuItem) menu.findItem(R.id.message_settings);

        return true;
    }
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        if (id == R.id.create_buzz_settings) {

            if(ApplicationWithGlobals.getUsername() != "error" && ApplicationWithGlobals.getKey() !=0){
                Intent i = new Intent(getApplicationContext(), CreateBuzzActivity.class);
                i.putExtra("topLabel", "Create a buzz:");
                startActivityForResult(i, 789); // 789 is the number that will come back to us
                return true;
            }
            else{
                Toast.makeText(PollActivity.this, "Error: User not Logged In", Toast.LENGTH_LONG).show();
            }
        }
        if (id == R.id.message_settings) {
            Intent i = new Intent(PollActivity.this, MainActivity.class);
            startActivity(i);
            return true;
        }

        if(id == R.id.logout_settings)
        {
            Intent i = new Intent(getApplicationContext(), logout.class);
            i.putExtra("topLabel","Are you sure you want to logout?");
            startActivityForResult(i,4);
        }
        return super.onOptionsItemSelected(item);
    }

    private void refreshList()
    {
        StringRequest stringRequest = new StringRequest(Request.Method.GET, urlGet,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("Response", response);
                        populateMessagesFromVolley(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.e("jnm219", "StringRequest() failed: " + error.getMessage());
                    }
                }
        );
        VolleySingleton.getInstance(this).addToRequestQueue(stringRequest);
    }
    private void populateMessagesFromVolley(String response){
        try{
            createPoll.setVisibility(View.INVISIBLE);
            JSONObject jsonObject = new JSONObject(response);
            //JSONArray json = new JSONArray(jsonObject.getString("mMessageData"));
            JSONObject json = new JSONObject(jsonObject.getString("mPollData"));
            //Log.d("Profile", profile + "");

            //mMessageData.clear(); //Clears all of the existing messages
                int mId = json.getInt("mPollId");
                String mSubject = json.getString("mSubject");
                String mOpt1 = json.getString("mPollOption1");
                String mOpt2 = json.getString("mPollOption2");
                String mOpt3 = json.getString("mPollOption3");
                String mOpt4 = json.getString("mPollOption4");
                String mOpt5 = json.getString("mPollOption5");
                String mOpt6 = json.getString("mPollOption6");
                int mVoteCount1=json.getInt("mPollOption1Votes");
                int mVoteCount2=json.getInt("mPollOption2Votes");
                int mVoteCount3=json.getInt("mPollOption3Votes");
                int mVoteCount4=json.getInt("mPollOption4Votes");
                int mVoteCount5=json.getInt("mPollOption5Votes");
                int mVoteCount6=json.getInt("mPollOption6Votes");
                mPoll=new Poll(mId,mSubject,mOpt1,mOpt2,"ds","ds","mOpt5","mOpt6");
                //Log.d("Liger",mId + ":" + mSubject + ":" + mMessage +":" + mVotes+ ":" + mCreateTime + ":" + mUsername);
            Log.d("SUBJECT PLZ", mSubject);
            displaySub.setText("Subject: " + mSubject);
            displaySub.setVisibility(View.VISIBLE);
            displayOption1.setText("1: " + mOpt1);
            displayVote1.setVisibility(View.VISIBLE);
            displayVote1.setText("Vote Count: " + mVoteCount1);
            displayVote2.setText("Vote Count: " + mVoteCount2);
            displayVote2.setVisibility(View.VISIBLE);
            vote1.setVisibility(View.VISIBLE);
            vote2.setVisibility(View.VISIBLE);
            displayOption2.setText("2: " + mOpt2);
            int numberofOptions=6;
            if (mOpt3.equals("")) {
                numberofOptions-=1;
            }
            if (mOpt4.equals("")) {
                numberofOptions-=1;
            }
            if (mOpt5.equals("")) {
                numberofOptions-=1;
            }
            if (mOpt6.equals("")) {
                numberofOptions-=1;
            }
            if (numberofOptions>=3){
                displayOption3.setText("3: " + mOpt3);
                vote3.setVisibility(View.VISIBLE);
                displayVote3.setVisibility(View.VISIBLE);
                displayVote3.setText("Vote Count: " +mVoteCount3);
            }
            if (numberofOptions>=4){
                displayOption4.setText("4: " + mOpt4);
                vote4.setVisibility(View.VISIBLE);
                displayVote4.setVisibility(View.VISIBLE);
                displayVote4.setText("Vote Count: " +mVoteCount3);
            }
            if (numberofOptions>=5){
                displayOption5.setText("5: " + mOpt5);
                vote5.setVisibility(View.VISIBLE);
                displayVote5.setVisibility(View.VISIBLE);
                displayVote5.setText("Vote Count: " +mVoteCount3);
            }
            if (numberofOptions==6){
                displayOption6.setText("6: " + mOpt6);
                vote6.setVisibility(View.VISIBLE);
                displayVote6.setVisibility(View.VISIBLE);
                displayVote6.setText("Vote Count: " +mVoteCount3);
            }
            vote1.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Intent i = new Intent(getApplicationContext(), VotePoll.class);
                    voteNum="1";
                    startActivityForResult(i, 321); // 789 is the number that will come back to us
                }
            });

            vote2.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Intent i = new Intent(getApplicationContext(), VotePoll.class);
                    voteNum="2";
                    startActivityForResult(i, 321); // 789 is the number that will come back to us
                }
            });
            vote3.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Intent i = new Intent(getApplicationContext(), VotePoll.class);
                    voteNum="3";
                    startActivityForResult(i, 321); // 789 is the number that will come back to us
                }
            });
            vote4.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Intent i = new Intent(getApplicationContext(),VotePoll.class);
                    voteNum="4";
                    startActivityForResult(i, 321); // 789 is the number that will come back to us
                }
            });
            vote5.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Intent i = new Intent(getApplicationContext(), VotePoll.class);
                    voteNum="5";
                    startActivityForResult(i, 321); // 789 is the number that will come back to us
                }
            });
            vote6.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Intent i = new Intent(getApplicationContext(), VotePoll.class);
                    voteNum="6";
                    startActivityForResult(i, 321); // 789 is the number that will come back to us
                }
            });
            //adapter.notifyDataSetChanged();
        } catch(final JSONException e){
            Log.d("Liger","Error Parsing JSON file: "+ e.getMessage());
            return;
        }
    }

    protected void onActivityResult(int requestCode, int resultCode, final Intent intent) {
        //Toast.makeText(MainActivity.this,"RequestCode: "+ requestCode+ "ResultCode: "+resultCode, Toast.LENGTH_LONG).show();
        // Json request for Create Buzz
        if (requestCode == 789) {
            // Make sure the request was successful
            if (resultCode == RESULT_OK) {

                String url = "https://quiet-taiga-79213.herokuapp.com/messages";
                // POST to backend server. Modified version of:
                // https://www.itsalif.info/content/android-volley-tutorial-http-get-post-put
                Map<String, String> jsonParams = new HashMap<String, String>();
                final String resultSubject = intent.getStringExtra("resultSubject");
                final String resultMessage = intent.getStringExtra("resultMessage");


                // add the data collected from user into map which gets made into a JSONObject
                jsonParams.put("mSubject", resultSubject);
                jsonParams.put("mMessage", resultMessage);
                jsonParams.put("mUsername", ApplicationWithGlobals.getUsername());
                jsonParams.put("mKey", ApplicationWithGlobals.getKey() + "");
                JsonObjectRequest postRequest = new JsonObjectRequest(Request.Method.POST, url,
                        new JSONObject(jsonParams),
                        new Response.Listener<JSONObject>() {

                            @Override
                            public void onResponse(JSONObject response) {
                                try {
                                    check = response.getString("mMessageData");
                                    if (check == "false") {
                                        //refreshLogout();
                                    }
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                Log.e("jnm219", "got response");
                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.e("jnm219", "JsonObjectRequest() failed: " + error.getMessage());
                            }
                        }) {
                    @Override
                    public Map<String, String> getHeaders() {
                        HashMap<String, String> headers = new HashMap<String, String>();
                        headers.put("Content-Type", "application/json; charset=utf-8");
                        headers.put("User-agent", System.getProperty("http.agent"));
                        return headers;
                    }
                };
                //Toast.makeText(MainActivity.this,"Check: "+check, Toast.LENGTH_LONG).show();
                if (check != "false") {
                    VolleySingleton.getInstance(this).addToRequestQueue(postRequest);
                } else {
                    ApplicationWithGlobals.setKey(0);
                    ApplicationWithGlobals.setUsername("error");
                    //refreshLogout();
                }
                finish();
                startActivity(getIntent());

            } else if (resultCode == RESULT_CANCELED) {
                Toast.makeText(PollActivity.this, "Buzz Canceled", Toast.LENGTH_LONG).show();
            } else {
                Toast.makeText(PollActivity.this, "Error Creating Buzz", Toast.LENGTH_LONG).show();
            }
        }
        //Json request for the logout functionality
        if (requestCode == 4) {
            if (resultCode == RESULT_OK) {
                String url = "https://quiet-taiga-79213.herokuapp.com/logout";

                Map<String, String> jsonParams = new HashMap<String, String>();
                jsonParams.put("mUsername", ApplicationWithGlobals.getUsername());

                JsonObjectRequest postRequest = new JsonObjectRequest(Request.Method.POST, url,
                        new JSONObject(jsonParams),
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                Log.e("Liger", "got response");
                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.e("Liger", "JsonObjectRequest() failed: " + error.getMessage());

                            }
                        }) {
                    @Override
                    public Map<String, String> getHeaders() {
                        HashMap<String, String> headers = new HashMap<String, String>();
                        headers.put("Content-Type", "application/json; charset=utf-8");
                        headers.put("User-agent", System.getProperty("http.agent"));
                        return headers;
                    }
                };
                //Volley request to logout a user from the server
                VolleySingleton.getInstance(this).addToRequestQueue(postRequest);
                //refreshLogout();
            } else {
                Toast.makeText(PollActivity.this, "Logout Cancelled", Toast.LENGTH_LONG).show();
            }
        }
        if (requestCode == 123) {
            if (resultCode == RESULT_OK) {
                Map<String, String> jsonParams = new HashMap<String, String>();
                Log.d("GETS TO HERE", "GETTTETEETEEETETETETETETE");
                //final String resultBio = intent.getStringExtra("resultBio");
                final int numberOp = intent.getIntExtra("numberOp", -1);
                final String option1 = intent.getStringExtra("resultOption1");
                final String option2 = intent.getStringExtra("resultOption2");
                final String subject = intent.getStringExtra("resultSubject");
                String option3 = "";
                String option4 = "";
                String option5 = "";
                String option6 = "";
                if (numberOp >= 3) {
                    option3 = intent.getStringExtra("resultOption3");
                    jsonParams.put("mPollOption3", option3);
                }
                if (numberOp >= 4) {
                    option4 = intent.getStringExtra("resultOption4");
                    jsonParams.put("mPollOption4", option4);
                }
                if (numberOp >= 5) {
                    option5 = intent.getStringExtra("resultOption5");
                    jsonParams.put("mPollOption5", option5);
                }
                if (numberOp == 6) {
                    option6 = intent.getStringExtra("resultOption6");
                    jsonParams.put("mPollOption6", option6);
                }
                final String username = ApplicationWithGlobals.getUsername();
                final int key = ApplicationWithGlobals.getKey();
                jsonParams.put("mUsername", username);
                //jsonParams.put("mKey",key+"");
                jsonParams.put("mPollId", messageIDGlobal);
                jsonParams.put("mSubject", subject);
                jsonParams.put("mPollOption1", option1);
                jsonParams.put("mPollOption2", option2);
                jsonParams.put("mPollOption3", option3);
                jsonParams.put("mPollOption4", option4);
                jsonParams.put("mPollOption5", option5);
                jsonParams.put("mPollOption6", option6);

                Log.d("GETS TO HERE", option1);
                //jsonParams.put("mUsername", mLoginInfo.mUsername);
                JsonObjectRequest postRequest = new JsonObjectRequest(Request.Method.POST, urlPost,
                        new JSONObject(jsonParams),
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                try {
                                    check = response.getString("mPollData");

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                Log.e("jnm219", "got response");
                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.e("jnm219", "JsonObjectRequest() failed: " + error.getMessage());

                                //refreshList();
                            }
                        }) {
                    @Override
                    public Map<String, String> getHeaders() {
                        HashMap<String, String> headers = new HashMap<String, String>();
                        headers.put("Content-Type", "application/json; charset=utf-8");
                        headers.put("User-agent", System.getProperty("http.agent"));
                        return headers;
                    }
                };
                if (check != "false") {
                    VolleySingleton.getInstance(this).addToRequestQueue(postRequest);
                } else {
                    ApplicationWithGlobals.setKey(0);
                    ApplicationWithGlobals.setUsername("error");
                }
                //refreshList();

                //Calls method from itself to more reliably refill the comment adapter
                finish();
                startActivity(getIntent());


            }
            else if (resultCode == RESULT_CANCELED) {
                Toast.makeText(PollActivity.this, "Canceling Poll", Toast.LENGTH_LONG).show();
            }
            else{
                Toast.makeText(PollActivity.this, "Poll Error", Toast.LENGTH_LONG).show();
            }
        }
        if (requestCode==321){
            Map<String, String> jsonParams = new HashMap<String, String>();
            jsonParams.put("mPollOptionVoted", voteNum);
            Log.d("VOTE",voteNum);
            Log.d("MID",""+messageIDGlobal);
            Log.d("username",""+ApplicationWithGlobals.getUsername());
            jsonParams.put("mPollId", messageIDGlobal);
            jsonParams.put("mUsername",ApplicationWithGlobals.getUsername());
            String voteUrl="https://quiet-taiga-79213.herokuapp.com/pollVote";
            JsonObjectRequest postRequest = new JsonObjectRequest(Request.Method.POST, voteUrl,
                    new JSONObject(jsonParams),
                    new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            try {
                                check = response.getString("mPollData");

                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            Log.e("jnm219", "got response");
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.e("jnm219", "JsonObjectRequest() failed: " + error.getMessage());

                            //refreshList();
                        }
                    }) {
                @Override
                public Map<String, String> getHeaders() {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Content-Type", "application/json; charset=utf-8");
                    headers.put("User-agent", System.getProperty("http.agent"));
                    return headers;
                }
            };
            if (check != null) {
                VolleySingleton.getInstance(this).addToRequestQueue(postRequest);
            } else {
                ApplicationWithGlobals.setKey(0);
                ApplicationWithGlobals.setUsername("error");
            }
            refreshList();

            //Calls method from itself to more reliably refill the comment adapter
            finish();
            startActivity(getIntent());


        }

        }
    }

