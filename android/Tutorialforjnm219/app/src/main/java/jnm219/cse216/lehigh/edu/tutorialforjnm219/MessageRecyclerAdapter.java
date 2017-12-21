package jnm219.cse216.lehigh.edu.tutorialforjnm219;

/**
 * Created by Jack on 10/5/2017.
 */
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.util.LruCache;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static android.support.v4.content.ContextCompat.startActivity;

/**
 * This adapter is a bridge between our RecyclerAdapterView and the underlying data
 */

public class MessageRecyclerAdapter extends RecyclerView.Adapter<MessageRecyclerAdapter.MessageViewHolder>{

    private final List<Message> messageList;
    // Keeps track of where MessageRecyclerAdapter is called from. 0 is Main and 1 is Profile
    private final int view;
    private LruCache<String, Bitmap> mMemoryCache;
    String check = "true";

    public MessageRecyclerAdapter(List<Message> messageList, int view) {
        this.messageList = messageList;
        this.view = view;
    }

    @Override
    public MessageViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View itemView = layoutInflater.inflate(R.layout.message_item, parent, false);

        final int maxMemory = (int) (Runtime.getRuntime().maxMemory() / 1024);

        final int cacheSize = maxMemory / 8;

        mMemoryCache = new LruCache<String, Bitmap>(cacheSize) {
            @Override
            protected int sizeOf(String key, Bitmap bitmap) {
                return bitmap.getByteCount() / 1024;
            }
        };

        return new MessageRecyclerAdapter.MessageViewHolder(itemView);
    }

    public void addBitmapToMemoryCache(String key, Bitmap bitmap) {
        if (getBitmapFromMemCache(key) == null) {
            mMemoryCache.put(key, bitmap);
        }
    }
    public Bitmap getBitmapFromMemCache(String key) {
        return mMemoryCache.get(key);
    }

    /**
     * This method will fill each respective Textview with their respective values from the message object
     * @param holder
     * @param position
     */
    @Override
    public void onBindViewHolder(MessageViewHolder holder, int position) {
        final Message message = messageList.get(position);
        Log.d("Liger", message.toString());
        holder.messageId.setText(message.mId + "");
        holder.subjectTextView.setText("Subject: "+message.mSubject);
        holder.messageTextView.setText("Message: "+message.mMessage);
        holder.usernameTextView.setText("Username: "+message.mUsername);
        holder.votesTextView.setText("Votes: "+message.mVotes);        // setText needs a string
        holder.createTimeTextView.setText("Time: "+message.mCreateTime);
        holder.messageProfileButton.setText("" +message.mUsername);
        holder.messagePollExist.setText("" +message.mPollExist);
        if(message.mFileId == null || message.mFileId.toString().equals("Error")){
            holder.msg_img.setVisibility(View.GONE);
        }else {
            holder.msg_img.setImageBitmap(getImage(message.mFileId, R.id.msg_image));
        }
        //holder.msg_img.setImageBitmap(getImage(message.mFileId, R.id.msg_image));
    }

    public Bitmap getImage(String fileID, int resID){
        if(fileID.equals("")){
            return null;
        }
        String fullurl = "https://quiet-taiga-79213.herokuapp.com/messages/images/download/"+fileID;
        Bitmap bitmap = null;

        final String imageKey = String.valueOf(resID);
        final Bitmap bitmapStored = getBitmapFromMemCache(imageKey);
        if (bitmapStored != null) {
            return bitmapStored;
        } else {
            try {
                InputStream is = (InputStream) new URL(fullurl).openStream();
                bitmap = BitmapFactory.decodeStream(is);
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            if(bitmap!=null) {
                addBitmapToMemoryCache(String.valueOf(resID), bitmap);
            }
            //BitmapWorkerTask task = new BitmapWorkerTask(bitmap);
            //task.execute(resId);
            return bitmap;
        }
    }

    @Override
    public int getItemCount() {
        return messageList.size();
    }

    interface RecyclerItemClickListener{
        void onRecyclerClick(int position);
    }

    /**
     * This class Creates the text view elements for message, and sets up the like, dislike and comment buttons
     */
    public class MessageViewHolder extends RecyclerView.ViewHolder {
        //private final RecyclerItemClickListener mListenerInternal;
        private TextView messageId;
        private TextView subjectTextView;
        private TextView messageTextView;
        private TextView votesTextView;
        private TextView usernameTextView;
        private TextView createTimeTextView;
        private Button likeButton;
        private Button disLikeButton;
        private Button commentButton;
        private Button messageProfileButton;
        private Button messagePoll;
        private ImageView msg_img;
        private TextView messagePollExist;

        public MessageViewHolder(View itemView) {
            super(itemView);
            messageId = (TextView) itemView.findViewById(R.id.messageItemId);
            subjectTextView = (TextView) itemView.findViewById(R.id.messageItemSubject);
            messageTextView = (TextView) itemView.findViewById(R.id.messageItemMessage);
            votesTextView = (TextView) itemView.findViewById(R.id.messageItemVotes);
            likeButton = (Button) itemView.findViewById(R.id.messageLikeButton);
            disLikeButton = (Button) itemView.findViewById(R.id.messageDislikeButton);
            usernameTextView = (TextView) itemView.findViewById(R.id.messageItemUsername);
            commentButton = (Button) itemView.findViewById(R.id.messageCommentButton);
            createTimeTextView = (TextView) itemView.findViewById(R.id.messageItemCreateTime);
            messageProfileButton = (Button) itemView.findViewById(R.id.messageProfileButton);
            msg_img = (ImageView) itemView.findViewById(R.id.msg_image);
            messagePoll= (Button) itemView.findViewById(R.id.messagePoll);
            messagePollExist = (TextView) itemView.findViewById(R.id.messagePollExist);


            Log.d("Liger", "Username: "+messageId.getText().toString());

            /**
             * On comment button click, the activity will change to that messages comment view
             */
            commentButton.setOnClickListener(new View.OnClickListener(){
                public void onClick(View v) {
                    // onClick() for button is called after onInterceptTouchEvent() stashed adapter position in a global variable.
                    int position;
                    ApplicationWithGlobals mApp = (ApplicationWithGlobals)v.getContext().getApplicationContext();
                    //position = mApp.getPosition();
                    Intent i = new Intent(v.getContext(), CommentActivity.class);
                    Log.d("Liger", "Username: "+messageId.getText().toString());
                    i.putExtra("messageId",messageId.getText().toString());
                    i.putExtra("view",view);
                    i.putExtra("otherUser", messageProfileButton.getText().toString());
                    v.getContext().startActivity(i);
                }
            });

            //Click Button handler for the like button.  Sends a json object with mChangeVote with value 1
            //The like button is integrated in the list_item.xml
            likeButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // onClick() for button is called after onInterceptTouchEvent() stashed adapter position in a global variable.
                    int position;
                    ApplicationWithGlobals mApp = (ApplicationWithGlobals)v.getContext().getApplicationContext();
                    position = mApp.getPosition();

                    // todo: move PUT to main activity implementing an interface to link the two
                    //Log.d("jnm219", "attempting to change vote count of " + datumList.get(position).mId);
                    String url = "https://quiet-taiga-79213.herokuapp.com/upVote";
                    Map<String, String> jsonParams = new HashMap<String, String>();

                    //User sends username and message Id to database, who will toggle the downvotes
                    jsonParams.put("mUsername",ApplicationWithGlobals.getUsername());
                    jsonParams.put("mMessageId",messageId.getText().toString());
                    jsonParams.put("mKey",ApplicationWithGlobals.getKey()+"");
                    Log.d("jnm219", url);
                    JsonObjectRequest postRequest = new JsonObjectRequest(Request.Method.POST, url,
                            new JSONObject(jsonParams),
                            new Response.Listener<JSONObject>() {
                                @Override
                                public void onResponse(JSONObject response) {
                                    try {
                                        check = response.getString("mMessageData");
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                    Log.e("jnm219", "got response from PUT to update vote count");
                                    // todo: consider updating local vote count only if PUT succeeded.
                                }
                            },
                            new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Log.e("jnm219", "JsonObjectRequest() to update vote count failed: " + error.getMessage());
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
                    if(check != "false") {
                        VolleySingleton.getInstance(v.getContext()).addToRequestQueue(postRequest);
                    }
                    else{
                        ApplicationWithGlobals.setKey(0);
                        ApplicationWithGlobals.setUsername("error");
                    }
                    //This will refresh the page so the new vote count can be displayed
                    if(view == 0){
                        Intent i = new Intent(v.getContext(), MainActivity.class);
                        v.getContext().startActivity(i);
                        //Log.d("button", "click " + position);
                    }
                    else if(view == 1){
                        Intent i = new Intent(v.getContext(), ProfileActivity.class);
                        String username = ApplicationWithGlobals.getUsername();
                        i.putExtra("otherUser", messageProfileButton.getText().toString());
                        v.getContext().startActivity(i);
                        //Log.d("button", "click " + position);
                    }
                    else{
                        ApplicationWithGlobals.setKey(0);
                        ApplicationWithGlobals.setUsername("error");
                    }
                }
            });
            //Click Button handler for the dislike button  Sends a json object with mChangeVote with value -1
            //The Dislike button is integrated in the list_item.xml
            disLikeButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // onClick() for button is called after onInterceptTouchEvent() stashed adapter position in a global variable.
                    int position;
                    ApplicationWithGlobals mApp = (ApplicationWithGlobals)v.getContext().getApplicationContext();
                    position = mApp.getPosition();

                    // todo: move PUT to main activity implementing an interface to link the two
                    //Log.d("jnm219", "attempting to change vote count of " + datumList.get(position).mId);
                    String url = "https://quiet-taiga-79213.herokuapp.com/downVote";
                    Map<String, String> jsonParams = new HashMap<String, String>();

                    //User sends username and message Id to database, who will toggle the downvotes
                    jsonParams.put("mUsername",ApplicationWithGlobals.getUsername());
                    jsonParams.put("mMessageId",messageId.getText().toString());
                    jsonParams.put("mKey",ApplicationWithGlobals.getKey()+"");
                    Log.d("jnm219", url);
                    JsonObjectRequest postRequest = new JsonObjectRequest(Request.Method.POST, url,
                            new JSONObject(jsonParams),
                            new Response.Listener<JSONObject>() {
                                @Override
                                public void onResponse(JSONObject response) {
                                    try {
                                        check = response.getString("mMessageData");
                                        Log.e("jnm219", "Response: "+response.getString(("mMessageData")));
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                    Log.e("jnm219", "got response from PUT to update vote count");
                                    // todo: consider updating local vote count only if PUT succeeded.
                                }
                            },
                            new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Log.e("jnm219", "JsonObjectRequest() to update vote count failed: " + error.getMessage());
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
                    Log.e("jnm219","check "+check);
                    if(check != "false")
                    {
                        VolleySingleton.getInstance(v.getContext()).addToRequestQueue(postRequest);
                    }
                    else{
                        ApplicationWithGlobals.setKey(0);
                        ApplicationWithGlobals.setUsername("error");
                    }
                    //This will refresh the page so the new vote count can be displayed
                    if(view == 0){
                        Intent i = new Intent(v.getContext(), MainActivity.class);
                        v.getContext().startActivity(i);
                        //Log.d("button", "click " + position);
                    }
                    else if(view == 1){
                        Intent i = new Intent(v.getContext(), ProfileActivity.class);
                        String username = ApplicationWithGlobals.getUsername();
                        i.putExtra("otherUser", messageProfileButton.getText().toString());
                        v.getContext().startActivity(i);
                        //Log.d("button", "click " + position);
                    }
                    else{
                        ApplicationWithGlobals.setKey(0);
                        ApplicationWithGlobals.setUsername("error");
                    }
                }
            });

            /**
             * On profile button click, the activity will change to that profile view
             */
            messageProfileButton.setOnClickListener(new View.OnClickListener(){
                public void onClick(View v) {
                    // onClick() for button is called after onInterceptTouchEvent() stashed adapter position in a global variable.
                    int position;
                    ApplicationWithGlobals mApp = (ApplicationWithGlobals)v.getContext().getApplicationContext();
                    //position = mApp.getPosition();

                    Intent i = new Intent(v.getContext(), ProfileActivity.class);
                    //String username = ApplicationWithGlobals.getUsername();
                    Log.d("CLSDFSDFfsfs", messageProfileButton.getText().toString());
                    i.putExtra("otherUser", messageProfileButton.getText().toString());
                    v.getContext().startActivity(i);
                }
            });
            messagePoll.setOnClickListener(new View.OnClickListener(){
                public void onClick(View v) {
                    int position;
                    ApplicationWithGlobals mApp = (ApplicationWithGlobals)v.getContext().getApplicationContext();
                    Intent i =new Intent(v.getContext(), PollActivity.class);
                    //String username = ApplicationWithGlobals.getUsername ();
                    Log.d("CLSDFSDFfsfs", messagePollExist.getText().toString());
                    Log.d("CLSDFSDFfsfs", messageId.getText().toString());
                    //i.putExtra("otherUser", messagePoll.getText().toString());

                    i.putExtra("messageID", messageId.getText().toString());
                    i.putExtra("checkPoll",messagePollExist.getText().toString());
                    v.getContext().startActivity(i);
                }});

        }

        void onRecyclerItemClick(){
            int position = getAdapterPosition();
        }
    }
}

