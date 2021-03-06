package jnm219.cse216.lehigh.edu.tutorialforjnm219;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {
    @Test
    public void addition_isCorrect() throws Exception {
        assertEquals(4, 2 + 2);
    }

    @Test
    public void Datum_constructor_sets_fields() throws Exception {
        Datum d = new Datum(7, "hello", "world", 12);
        assertEquals(d.mId, 7);
        assertEquals(d.mSubject, "hello");
        assertEquals(d.mMessage, "world");
        assertEquals(d.mVotes, 12);
    }
}