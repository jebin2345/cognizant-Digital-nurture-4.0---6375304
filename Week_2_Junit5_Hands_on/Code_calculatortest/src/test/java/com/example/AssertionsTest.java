package com.example;

import org.junit.Test;
import static org.junit.Assert.*;

public class AssertionsTest {

    @Test
    public void testAssertions() {
        // Check if 2 + 3 equals 5
        assertEquals(5, 2 + 3);

        // Check if 5 is greater than 3
        assertTrue(5 > 3);

        // Check if 5 is not less than 3
        assertFalse(5 < 3);

        // Check if null is null
        assertNull(null);

        // Check if an object is not null
        assertNotNull(new Object());
    }
}
