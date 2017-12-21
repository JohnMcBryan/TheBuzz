package jnm219.cse216.lehigh.edu.tutorialforjnm219;

/**
 * Created by Jack on 10/5/2017.
 */
import android.app.Activity;
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
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

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
 * This adapter is a bridge between our RecyclerAdapterView and the underlying data for comments
 */
public class CommentRecyclerAdapter extends RecyclerView.Adapter<CommentRecyclerAdapter.CommentViewHolder>{

    private final List<Comment> CommentList;
    private LruCache<String, Bitmap> mMemoryCache;

    public CommentRecyclerAdapter(List<Comment> CommentList) {
        this.CommentList = CommentList;
    }
    @Override
    public CommentViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View itemView = layoutInflater.inflate(R.layout.comment_item, parent, false);
///
        final int maxMemory = (int) (Runtime.getRuntime().maxMemory() / 1024);

        final int cacheSize = maxMemory / 8;

        mMemoryCache = new LruCache<String, Bitmap>(cacheSize) {
            @Override
            protected int sizeOf(String key, Bitmap bitmap) {
                return bitmap.getByteCount() / 1024;
            }
        };
////
        return new CommentRecyclerAdapter.CommentViewHolder(itemView);
    }

    /**
     * Binds the comment data with the text view for all the displayed elements for a comment
     * @param holder
     * @param position
     */
    @Override
    public void onBindViewHolder(CommentViewHolder holder, int position) {
        final Comment Comment = CommentList.get(position);
        holder.CommentTextView.setText("Comment: " + Comment.mComment);
        holder.commentProfileButton.setText(""+Comment.mUsername);
        holder.usernameTextView.setText("Username: "+ Comment.mUsername);
        holder.com_img.setImageBitmap(getImage(Comment.mFileId, R.id.com_image));
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
    public void addBitmapToMemoryCache(String key, Bitmap bitmap) {
        if (getBitmapFromMemCache(key) == null) {
            mMemoryCache.put(key, bitmap);
        }
    }
    public Bitmap getBitmapFromMemCache(String key) {
        return mMemoryCache.get(key);
    }


    @Override
    public int getItemCount() {
        return CommentList.size();
    }

    interface RecyclerItemClickListener{
        void onRecyclerClick(int position);
    }

    /**
     * Creates a holder for all the text view elements for a comment
     */
    public class CommentViewHolder extends RecyclerView.ViewHolder {
        //private final RecyclerItemClickListener mListenerInternal;
        private TextView CommentTextView;
        private TextView usernameTextView;
        private Button commentProfileButton;
        private ImageView com_img;
        public CommentViewHolder(View itemView) {
            super(itemView);
            CommentTextView = (TextView) itemView.findViewById(R.id.commentItemComment);
            usernameTextView = (TextView) itemView.findViewById(R.id.commentItemUsername);
            commentProfileButton = (Button) itemView.findViewById(R.id.commentProfileButton);
            com_img = (ImageView) itemView.findViewById(R.id.com_image);

        /**
         * On profile button click, the activity will change to that profile view
         */
        commentProfileButton.setOnClickListener(new View.OnClickListener(){
            public void onClick (View v){

            // onClick() for button is called after onInterceptTouchEvent() stashed adapter position in a global variable.
            int position;
            ApplicationWithGlobals mApp = (ApplicationWithGlobals) v.getContext().getApplicationContext();
            //position = mApp.getPosition();

            Intent i = new Intent(v.getContext(), ProfileActivity.class);
            String username = ApplicationWithGlobals.getUsername();
            i.putExtra("otherUser", commentProfileButton.getText().toString());
            v.getContext().startActivity(i);
            }
        });
    }

        void onRecyclerItemClick(){
            int position = getAdapterPosition();
        }
    }

}

