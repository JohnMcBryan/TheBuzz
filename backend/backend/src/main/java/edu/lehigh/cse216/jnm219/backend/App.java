package edu.lehigh.cse216.jnm219.backend;

// Import the Spark package, so that we can make use of the "get" function to 
// create an HTTP GET route
import com.google.api.client.googleapis.json.GoogleJsonError;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.*;
import spark.Spark;

// Import Google's JSON library
import com.google.gson.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import java.io.*;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.security.Permission;
import java.sql.Array;
import java.util.Arrays;

//Importing the ability to access the database from Postgres
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Map;
import java.util.Hashtable;
import java.util.Enumeration;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import javax.activation.MimetypesFileTypeMap;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.SecretKeyFactory;
import javax.servlet.MultipartConfigElement;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Part;
import java.math.BigInteger;
import java.security.spec.InvalidKeySpecException;
import java.io.IOException;
import java.util.Random;
import java.util.ArrayList;
import java.util.Map;
import java.util.Collections;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.Drive.Files;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import spark.utils.IOUtils;

import java.io.InputStreamReader;
import java.util.List;

/**
 * For now, our app creates an HTTP server that can only get and add data.
 */
//@WebServlet("/messages")
//@MultipartConfig
public class App {

    private static final HttpTransport transport = new NetHttpTransport();
    private static final JsonFactory jsonFactory = new JacksonFactory();
    
    
/**
 * Get an integer environment varible if it exists, and otherwise return the
 * default value.
 * 
 * @envar      The name of the environment variable to get.
 * @defaultVal The integer value to use as the default if envar isn't found
 * 
 * @returns The best answer we could come up with for a value for envar
 */

    static int getIntFromEnv(String envar, int defaultVal) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get(envar) != null) {
            return Integer.parseInt(processBuilder.environment().get(envar));
        }
        return defaultVal;
    }
    // Enables CORS on requests. This method is an initialization method and should be called once.
    
    /**  
     *This method encrypts the password by taking in the string password from the user
     *  and randomly generated salt by the getSalt() method using PBKDF
     */
    public static byte [] encryptPw (String password,byte [] salt) throws NoSuchAlgorithmException, InvalidKeySpecException
    {
        int iterations= 1000;
        char[] chars = password.toCharArray();
        PBEKeySpec spec = new PBEKeySpec(chars, salt, iterations, 64 * 8);
        SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte [] securedPw= skf.generateSecret(spec).getEncoded();
        return securedPw;
    }
    /**
    * This randomly creates salt which is in byte []
    */
    public static byte [] getSalt() throws NoSuchAlgorithmException
    {
        SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
        byte[] salt = new byte[16];
        sr.nextBytes(salt);
        return salt;
    }
    // This static hashtable keeps the log of which users are logged in with their keys
    public static Hashtable<String,Integer> logged_in=new Hashtable<String,Integer>();
    /** This method randomly creates key to return to the android and web */
    public static int keyGenerator (){
        Random rand = new Random();
        int  random = rand.nextInt(10000) + 1000;
        return random;
    };
    /** This method checks the hashtable if they are logged in */
    public static boolean checkLogin (String userName)
    {
        return logged_in.containsKey(userName);
    };
    /** This method removes the user from the hash table, -- logged out */
    public static void logOut(String user)
    {
        logged_in.remove(user);
    };
    /** This method checks if the key and the username matches in the hashtable */
    public static boolean checkKey(String mUsername, int mKey)
    {
        boolean checkExist= checkLogin(mUsername);
        int key=0;
        if (checkExist)
        {
            key=logged_in.get(mUsername);
            if (key==mKey)
            {
                return  true;
            }
        }
        return  false;
    }

    /** This method validates the Google Token. It accepts a String and returns a GooleIdToken */
    public static GoogleIdToken validateGoogleToken(final String idTokenString) {
        System.out.println("validating: "+idTokenString);
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory).setAudience(Collections.singletonList("1080316803619-flf753te3n99rv3mh90movqrs3eujk3v.apps.googleusercontent.com")).build();
        // Our CLIENT_ID: 1080316803619-flf753te3n99rv3mh90movqrs3eujk3v.apps.googleusercontent.com
        GoogleIdToken googleIdToken = null;
        try{
            googleIdToken = verifier.verify(idTokenString);
        } catch(GeneralSecurityException | IOException e){
            System.out.println("Exception: "+e);
        }
        if (googleIdToken != null) {
            return googleIdToken;
        } else {
            System.out.println("Invalid ID token.");
            return null;
        }
    }

    public static void main(String[] args) throws NoSuchAlgorithmException, InvalidKeySpecException 
    {

        // gson provides us with a way to turn JSON into objects, and objects
        // into JSON.
        //
        // NB: it must be final, so that it can be accessed from our lambdas
        //
        // NB: Gson is thread-safe.  See 
        // https://stackoverflow.com/questions/10380835/is-it-ok-to-use-gson-instance-as-a-static-field-in-a-model-bean-reuse
        final Gson gson = new Gson();
        Spark.port(getIntFromEnv("PORT", 4567));

        try {
            Drive service = GDrive.getDriveService();
            FileList result = service.files().list()
                    .execute();
            List<File> files = result.getItems();
            if (files == null || files.size() == 0) {
                System.out.println("No files found.");
            } else {
                System.out.println("Files:");
                for (File file : files) {
                    System.out.printf("%s (%s)\n",file.getTitle(),file.getId());
                }
            }
        }catch(IOException e)
        {
            System.out.println(e);
        }

       // Memcached.cache("jnm219",1);
        // Get a fully-configured connection to the database, or exit 
        // immediately
        Database db = Database.getDatabase(1);

        // Set up the location for serving static files.  If the STATIC_LOCATION
        // environment variable is set, we will serve from it.  Otherwise, serve
        // from "/web"
        String static_location_override = System.getenv("STATIC_LOCATION");
        if (static_location_override == null) {
            Spark.staticFileLocation("/web");
        } else {
            Spark.staticFiles.externalLocation(static_location_override);
        }

        // Set up a route for serving the main page
        Spark.get("/", (req, res) -> {
            res.redirect("/index.html");
            return "";
        });

        // This is the register/login/logout/changePW section

        /** This route is to get the information from user to put into table for registeration */
         Spark.post("/register", (request, response) -> {
            SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            response.status(200);
            response.type("application/json");
            boolean newUser = db.insertUser(req.mUsername, req.mRealName, req.mEmail); 
            if (newUser == false) {
                return gson.toJson(new StructuredResponse("error", "error performing insertion", null));
            } else {
                return gson.toJson(new StructuredResponse("ok", "" + newUser, null));
            }
        });
        // this route logs in the user and put them in hash table.
        // this also creates the profile page for the user if they just got 
         Spark.post("/login", (request, response) -> {
            SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            response.status(200);
            response.type("application/json");
            byte [] salt = db.getUserSalt(req.mUsername);
            if (salt==null) // No accounts exist under this username
            {
                return gson.toJson(new Structured_login("error", "No account under that username or password", 3, null));
                // android uses the value 3 -- discuss with android before changing the data value
            }
            byte [] password= encryptPw (req.mPassword,salt);// encrypt password to verify
            boolean curUser = db.selectOneUser(req.mUsername); // see if the password and username matched
            if (curUser==false) { // mismatch between pw and username 
                return gson.toJson(new Structured_login("error", "No account under that username or password", 2,null));
                // android uses the value 3 -- discuss with android before changing the data value
            } else { // succesfully found a user to login
                boolean createProfile=db.insertProfile(req.mUsername);
                if (checkLogin(req.mUsername)) // if the person is already logged in
                {
                    logOut(req.mUsername);// log the user out
                    return gson.toJson(new Structured_login("error", "Username "+ req.mUsername+"is already loggedin", -1,null));
                }
                else 
                {
                    int key=keyGenerator();// create key
                    logged_in.put(req.mUsername,key);// logged_in is hashtable, and add values into it

                    return gson.toJson(new Structured_login("ok", null, key, null));
                }
           }
        });
        // this route logs out people when they press log out
        // sends back status ok and null data when they successfully logged out
         Spark.post ("/logout", (request, response)->{
            SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            response.status(200);
            response.type("application/json");
            String username=req.mUsername;
            if (checkLogin(username)==false)// if the person is not logged in
            {
                return gson.toJson(new StructuredResponse("error", "this person is not logged in", null));
            }
            else // if person is logged in
            {
                logOut(username);
                return gson.toJson(new StructuredResponse("ok", username + " logged out ", null));
            }
        });
        // this put route changes password and updates tblUser
        // it verifies the old password, then updates with new salt and new encrypted pw
        Spark.put("/changePassword/:username", (request, response) -> {
            String user =request.params("username");
            SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            response.status(200);
            response.type("application/json");
            if (!checkKey(user,req.mKey))
            {
                return gson.toJson(new Structured_login("logout", null,false, null));
            }
            byte [] salt=db.getUserSalt(user);// get our old salt
            byte [] newSalt=getSalt();// create a new salt to enter into the table
            byte [] password= encryptPw (req.mCurrentPassword,salt);// get our old pw in bytes
            if (db.selectOneUser(user))
            {
                byte [] newPassword= encryptPw (req.mNewPassword,newSalt);// encrypt a new pw
                boolean check=db.updatePassword(user,newPassword,newSalt);// update the tblUser
                if (check)// if successfully updated
                {
                    return gson.toJson(new Structured_login("ok", null ,1, null));
                }
                else // if update had an error
                {
                    return gson.toJson(new Structured_login("error", "change password failed",-1,null));
                }
            }
            else // if the user doesn't exist in our tblUser
            {
               return gson.toJson(new Structured_login("error", "current password is wrong",-2,null));
            }
        });

        //This is the start of the messages

        //This get route returns all the attribute of all the messages
        Spark.get("/messages", (request, response) -> {
            response.status(200);
            response.type("application/json");

            return gson.toJson(new StructuredMessage("ok", null, db.selectAllMessage()));
        });
        // This post route allows user to create the messagge to the table

        Spark.get("/messages/images/download/:id", (request,response) -> {
            //SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            String id = request.params("id");
            response.status(200);
            response.type("image/png");
            Drive service;
            try {
                service = GDrive.getDriveService();
                OutputStream outputStream = new ByteArrayOutputStream();
                String mimeType = service.files().get(id).execute().getMimeType();
                System.out.println("Mime Type: "+mimeType);
                service.files().get(id)
                        .executeMediaAndDownloadTo(outputStream);
                ByteArrayOutputStream bos = (ByteArrayOutputStream)outputStream;
                response.raw().getOutputStream().write(bos.toByteArray());
                response.raw().getOutputStream().flush();
                response.raw().getOutputStream().close();
            } catch (GoogleJsonResponseException e){
                System.out.println("Google Drive Connection Failure "+e);
                GoogleJsonError error = e.getDetails();
                System.out.print(error);
            }
            return response.raw();
        });

        //image tag points to spark route and wraps the return value of get statement
        Spark.post("/messages", (request, response) -> {
            //System.out.println("Entering Messages");
            response.status(200);
            response.type("application/json");
            request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));

            String message = request.raw().getParameter("mMessage");
            String  subject = request.raw().getParameter("mSubject");
            String URL = request.raw().getParameter("mUrl");
            String fileName = request.raw().getParameter("mFilename");
            String fileId = "Error";
            String username = request.raw().getParameter("mUsername");
            String keyString = request.raw().getParameter("mKey");

            if (fileName.isEmpty()) {
                fileName = "error";
            }
            int key = Integer.parseInt(keyString);
            System.out.println("Username: "+username+" Subject: "+subject+" Message: "+message+" Filename: "+fileName+" Key: "+key);
            if(!fileName.equals("error")) {
                try (InputStream is = request.raw().getPart("mFile").getInputStream()) {
                    // Use the input stream to create a file
                    System.out.println("Input Stream Read");
                    fileId = uploadFile(is, fileName);
                    System.out.println("File Uploaded Successfully");
                } catch (Exception e) {
                    System.out.println("Failure: " + e);
                }
            }
            if (!checkKey(username,key))
            {
                return gson.toJson(new StructuredMessage("logout", null,false));
            }
            System.out.println("Username: "+username+" Subject: "+subject+" Message: "+message+" File ID: "+fileId+" Key: "+key);
            boolean newId = db.insertOneMessage(subject,message,username,URL,fileId);
            if (!newId) {
                return gson.toJson(new StructuredMessage("error", "error performing insertion", null));
            } else {
               // System.out.println("SUCCESS MESSAGE INSERT");
                return gson.toJson(new StructuredMessage("ok", "" + newId, null));
            }
        });

        // This message chooses message according to the message id and returns it in
        // StructuredMessage with RowMessage Data
        Spark.get("/messages/:messageId", (request, response) -> {
            int idx = Integer.parseInt(request.params("messageId"));
            response.status(200);
            response.type("application/json");
            RowMessage data = db.selectOneMessage(idx);
            if (data == null) {
                return gson.toJson(new StructuredMessage("error", idx + " not found", null));
            } else {
                return gson.toJson(new StructuredMessage("ok", null, data));
            }
        });

        /* Post for creating poll */
        Spark.post("/messages/poll/:messageId", (request, response) -> {
            System.out.println("entered /messages/poll/messageId");
                SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
                int messageId = Integer.parseInt(request.params("messageId"));
                System.out.println("messageId: "+ messageId);
                response.status(200);
                response.type("application/json");
                String subject = req.mSubject;
                System.out.println("mSubject:"+subject);
                String username = req.mUsername;
                System.out.println("mUsername: "+username);
                String option1 = req.mPollOption1;
                String option2 = req.mPollOption2;
                String option3 = req.mPollOption3;
                String option4 = req.mPollOption4;
                String option5 = req.mPollOption5;
                String option6 = req.mPollOption6;
                String[] pollOptions = {option1, option2, option3, option4, option5, option6};
                boolean pollWorked = db.insertPoll(messageId, subject, pollOptions);
                
                // update tblMessage, field: poll_exists, so 1 instead of 0
                if (pollWorked) {
                    System.out.println("poll worked");
                    boolean updateWorked = db.updatePollExist(messageId,1);
                    if (updateWorked) {
                        System.out.println("switch of 0 and 1 worked");
                        return gson.toJson(new StructuredPoll("ok", null)); 
                    } else {
                        response.status(500);
                        return gson.toJson(new StructuredPoll("error", null));
                    }
                }
                response.status(500);
                return gson.toJson(new StructuredPoll("error", null));
        });

        /* User votes a specific poll option */
        Spark.post("/pollVote", (request, response) -> {
                SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
                response.status(200);
                response.type("application/json");
                int pollOptionVoted = Integer.parseInt(req.mPollOptionVoted);
                System.out.println("pollOptionVoted: " + pollOptionVoted);
                int pollId = req.mPollId;
                String username = req.mUsername;
                
                // check if the user has voted. hasVoted = true if user has already voted
                boolean hasVoted = db.checkHasVoted(pollId, username);
                if (hasVoted) {
                    return gson.toJson(new StructuredPoll("already voted",null));
                }

                boolean worked = db.pollVote(pollOptionVoted, pollId, username);
                System.out.println("worked: " + worked);
                // TODO check that the user has not already voted
                if (worked) {
                    System.out.println("okay");
                    return gson.toJson(new StructuredPollVotes("ok", null));
                }
                System.out.println("error /pollVote");
                response.status(500);
                return gson.toJson(new StructuredPollVotes("error", null));
        });

        /** Get mPollData which contains mPollId and mPollOption1 through mPollOption6 */
        Spark.get("/poll/:pollId", (request,response) -> {
            System.out.println("In /poll/pollId");
            int pollId = Integer.parseInt(request.params("pollId"));
            System.out.println("pollId: "+pollId);
            response.status(200);
            response.type("application/json");
            RowPoll data = db.selectPoll(pollId);

            if (data == null) {
                System.out.println("data is null");
                response.status(500);
                return gson.toJson(new StructuredPoll("error", null));
            } else {
                System.out.println("data not null");
                System.out.println("poll option 1: "+data.mPollOption1);
                System.out.println("poll option 2: "+data.mPollOption2);
                System.out.println("poll option 3: "+data.mPollOption3);
                return gson.toJson(new StructuredPoll("ok", data));
            }
        });

        Spark.get("/poll/checkVoted", (request, response) -> {
            System.out.println("in /poll/checkVoted");
            String username = request.params("username");
            System.out.println("username: " + username);
            int pollId = Integer.parseInt(request.params("pollId"));
            System.out.println("pollId: " + pollId);
            boolean hasVoted = db.checkHasVoted(pollId, username);
            System.out.println("hasVoted: " + hasVoted);
            return gson.toJson(new StructuredAnswer("ok", hasVoted));
        });

        Spark.get("/poll/votes/:pollId", (request,response) -> {
            int pollId = Integer.parseInt(request.params("pollId"));
            response.status(200);
            response.type("application/json");
            RowPollVotes data = db.selectPollVotes(pollId);
            if (data == null) {
                response.status(500);
                return gson.toJson(new StructuredPollVotes("error", null));
            } else {
                return gson.toJson(new StructuredPollVotes("ok", data));
            }
            // how do we want to send the data back
            // object mOption1Votes

        });

        //This is the starts of the comment calls

        // This route takes in the message id and sends back the data
        // that has all the comments of that message id.
        Spark.get("/comments/:messageId/:username/:key", (request, response) -> {
            int mId = Integer.parseInt(request.params("messageId"));
            String user =request.params("username");
            int key = Integer.parseInt(request.params("key"));
            response.status(200);
            response.type("application/json"); 
            if (!checkKey(user,key))
            {
                return gson.toJson(new StructuredComment("logout", null,false));
            }
            return gson.toJson(new StructuredComment("ok", null, db.selectAllComment(mId)));
        });

        // This route allows user to create comment and 
        // adds it into the table.
        Spark.post("/comments", (request, response) -> {
            //System.out.println("Entering comments")
            //SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            response.status(200);
            response.type("application/json");
            request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));
            String fileID = "Error";
            String comment = request.raw().getParameter("mComment");
            System.out.println("Comment: "+comment);
            String username = request.raw().getParameter("mUsername");
            System.out.println("usenrmae: "+username);
            String url = request.raw().getParameter("mUrl");
            System.out.println("Url: "+url);
            String fileName = request.raw().getParameter("mFilename");
            System.out.println("Filename: "+fileName);
            int key = Integer.parseInt(request.raw().getParameter("mKey"));
            System.out.println("mKey: "+key);
            int messageId = Integer.parseInt(request.raw().getParameter("mMessageId"));
            System.out.println("MessageId: "+messageId);
            System.out.println(username+"--"+fileName+"--"+comment);
            if(fileName.isEmpty())
            {
                fileName = "error";
            }
            if(!fileName.equals("error")) {
                try (InputStream is = request.raw().getPart("mFile").getInputStream()) {
                    // Use the input stream to create a file
                    System.out.println("Success");
                    fileID = uploadFile(is, fileName);
                    //System.out.println("webUrl: "+webUrl);
                } catch (Exception e) {
                    System.out.println("Failure: " + e);
                }
            }
            if (!checkKey(username,key))
            {
                return gson.toJson(new StructuredComment("logout", null,false));
            }
            boolean check = db.insertComment(username, messageId, comment, url, fileID);
            if (check == false) {
                return gson.toJson(new StructuredComment("error", "error performing insertion", null));
            } else {
                return gson.toJson(new StructuredComment("ok", "" + check, null));
            }
        });
        Spark.get("/comments/images/download/:id", (request,response) -> {
            String id = request.params("id");
            response.status(200);
            response.type("image/png");
            Drive service;
            try {
                service = GDrive.getDriveService();
                OutputStream outputStream = new ByteArrayOutputStream();
                service.files().get(id)
                        .executeMediaAndDownloadTo(outputStream);
                ByteArrayOutputStream bos = (ByteArrayOutputStream)outputStream;
                response.raw().getOutputStream().write(bos.toByteArray());
                response.raw().getOutputStream().flush();
                response.raw().getOutputStream().close();
            } catch (GoogleJsonResponseException e){
                System.out.println("Google Drive Connection Failure "+e);
                GoogleJsonError error = e.getDetails();
                System.out.print(error);
            }

            return response.raw();
        });
       // This is the start of upvote and downvote section

       //This will either unlike the message you already liked or like a new message
        Spark.post("/upVote", (request, response) -> {

            SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            response.status(200);
            response.type("application/json");
            if (!checkKey(req.mUsername,req.mKey))
            {
                return gson.toJson(new StructuredMessage("logout", null,false));
            }
            boolean upVote=db.updateUpVote(req.mUsername,req.mMessageId);
            if (upVote)
            {
                return gson.toJson(new StructuredMessage("ok", "upvoted", null));
            }
            else 
            {
                return gson.toJson(new StructuredMessage("error", "upvote failed", null));
            }
        });

        //This will either undislike the message you already disliked or dislike a new message
        Spark.post("/downVote", (request, response) -> {

            SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            response.status(200);
            response.type("application/json");
            if (!checkKey(req.mUsername,req.mKey))
            {
                return gson.toJson(new StructuredMessage("logout", null,false));
            }
            boolean downVote=db.updateDownVote(req.mUsername,req.mMessageId);
            if (downVote)
            {
                return gson.toJson(new StructuredMessage("ok", "downvoted", null));
            }
            else 
            {
                return gson.toJson(new StructuredMessage("error", "downvote failed", null));
            }
        });
        
        //This is the start of the profile page calls

        // This route allows user to create a new profile text
        // and post it to the tables.

        Spark.post("/profile", (request, response) -> {
            SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            response.status(200);
            response.type("application/json");
            if (!checkKey(req.mUsername,req.mKey))
            {
                return gson.toJson(new StructuredProfile("logout", "logged out",false,null,null,null,null));
            }
            boolean makeProfile=db.updateProfile(req.mUsername,req.mProfile);
            if (makeProfile)
            {
               return gson.toJson(new StructuredProfile("ok", "successfully made a profile", null,null, null, null, null));
            }
            else
            {
               return gson.toJson(new StructuredProfile("error", "error making a profile", null, null,null, null, null));
            }
        });
        /** This route allows web or android to receive informations to display
         * It will use the username to get 
         * User's real name, email, profile_text
         * All the message the person created
         * All the comments that the person commented
         * All the messges that user upvoted or downvoted
        */

        // Spark.get("/profile/:username/:key", (request, response) -> {
        //     String user =request.params("username");
        //     int key = Integer.parseInt(request.params("key"));
        //     response.status(200);
        //     response.type("application/json"); 
        //     if (!checkKey(user,key))
        //     {
        //         return gson.toJson(new StructuredLoginCheck("logout", "logged out",false));
        //     }
        //     response.status(200);
        //     response.type("application/json"); 
        //     return gson.toJson(new StructuredProfile("ok", null, db.selectProfile(user),db.selectUserMessage(user),db.selectUserComment(user),db.selectMessageLiked(user),db.selectMessageDisliked(user)));
        // });
        Spark.get("/profile/:otherUser/:username/:key", (request, response) -> {
            String user =request.params("username");
            String others =request.params("otherUser");
            int key = Integer.parseInt(request.params("key"));
            response.status(200);
            response.type("application/json"); 
            if (!checkKey(user,key))
            {
                return gson.toJson(new StructuredLoginCheck("logout", "logged out",false));
            }
            response.status(200);
            response.type("application/json"); 
            return gson.toJson(new StructuredProfile("ok", null, db.selectProfile(others),db.selectUserMessage(others),db.selectUserComment(others),db.selectMessageLiked(others),db.selectMessageDisliked(others)));
        });

        /**
         * This route gets a token id to verify through google. 
         * Once the token is verified successfully, a users profile 
         * and account is created if needed, and the user is added to 
         * the hash table. If the user is not verified successfully, they 
         * will be unable to log into the buzz
         */
        Spark.post("/tokensignin", (request, response) -> {
            SimpleRequest req = gson.fromJson(request.body(), SimpleRequest.class);
            response.status(200);
            response.type("application/json");
            String idToke = req.token_id;
            System.out.println(idToke);
            GoogleIdToken ret = validateGoogleToken(idToke);
            
            Payload payload = ret.getPayload();
            
            // Print user identifier
            String userId = payload.getSubject();
            //System.out.println("User ID: " + userId);
            
            //Get profile information from payload
            String email = payload.getEmail();
            System.out.println("email = " + email);
            boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
            System.out.println("emailVerified = " + emailVerified);
            String name = (String) payload.get("name");
            System.out.println("name = " + name);
            
            String user = null;
            int key = 0;
            if(ret != null){
                String domain = email.substring(email.length()-10, email.length());
                if(domain.equals("lehigh.edu")){
                    user = email.substring(0,email.length()-11);

                    if(db.selectOneUser(user) == false){
                        db.insertUser(user, name, email);
                        boolean creatingProfile = db.insertProfile(user);
                    }else{
                        //user exists
                    }
                    key = keyGenerator(); // create key
                    logged_in.put(user,key); // logged_in is hashtable, and add values into it
                    System.out.println(logged_in); // prints hash table
                    return gson.toJson(new Structured_login("ok", null, key, user));
                }else{
                    System.out.println("Only lehigh.edu domains allowed");
                    return gson.toJson(new Structured_login("wrongDomain", null, key, user));
                }
            }else{
                //Returns user and key. If user returned is null and key is 0, then the user is not logged in
                //because of issues authenticating them
                System.out.println("Google user not verified");
                return gson.toJson(new Structured_login("notVerified", null, key, user));
            }
        });

    }

    public static File downloadFile(String id) throws IOException {
        Drive service;
        File file = null;
        try {
            service = GDrive.getDriveService();

            file = service.files().get(id).execute();

            file.getMimeType();


        } catch (GoogleJsonResponseException e){
            System.out.println("Google Drive Connection Failure "+e);
            GoogleJsonError error = e.getDetails();
            System.out.print(error);
        }
        return file;
    }

    public static String uploadFile(InputStream in,String filename) throws IOException {
        Drive service;
        String id = "error";
        System.out.println("Drive Found. Filename: "+filename);
        String mimeFull = "image/png";
        try {
            service = GDrive.getDriveService();

            String[] parts = filename.split("\\.");
            String name = parts[0];
            String mime = parts[1];
            System.out.println(name+" "+mime);
            File body = new File();
            body.setTitle(name);
            body.setDescription("Description");
            if(mime.equals("png") || mime.equals("jpeg"))
            {
                mimeFull = "image/"+mime;
                body.setMimeType(mime);
            }
            else if (mime.equals("pdf"))
            {
                mimeFull = "application/pdf";
                body.setMimeType(mime);
            }

            File file= service.files().insert(body,
                    new InputStreamContent(
                            mimeFull,
                            new ByteArrayInputStream(
                                    IOUtils.toByteArray(in)))).setFields("id").execute();
            id = file.getId();
            System.out.println("INPUT ID: "+id);
        } catch (GoogleJsonResponseException e){
            System.out.println("Google Drive Connection Failure "+e);
            GoogleJsonError error = e.getDetails();
            System.out.print(error);
            return "Error";
        }
        FileList result = service.files().list()
                .execute();
        List<File> files = result.getItems();
        if (files == null || files.size() == 0) {
            System.out.println("No files found.");
        } else {
            System.out.println("Files:");
            for (File file : files) {
                System.out.printf("%s (%s)\n",file.getTitle(),file.getId());
            }
        }
        return id;
    }
}

// mvn clean install