package com.pals.backend.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.pals.backend.dtos.BookingDto;
import com.pals.backend.entities.Booking;
import com.pals.backend.entities.Buyer;
import com.pals.backend.entities.Property;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@SpringBootTest
//active the test profile to use H2 for testing
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Sql(scripts = {"classpath:booking-data.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class BookingControllerMVCTest {

    @Autowired
    private MockMvc mvc;

@Autowired
private ObjectMapper mapper;

private final String URL = "http://localhost:8001/";
@Test
void testCreate() throws Exception{
    // need to add - URL, POST, Body, Header to the call
    //return - body & status code

    Booking toCreate = new Booking(1, LocalDate.of(2021,7,12), "2pm to 3pm");
    System.out.println("booking " + toCreate );


    String reqBody = this.mapper.writeValueAsString(toCreate);
    System.out.println("BODY: " + reqBody);

    RequestBuilder req = MockMvcRequestBuilders
            .post(URL+"/booking/new")
            .content(reqBody)
            .contentType(MediaType.APPLICATION_JSON);

    Booking created = new Booking(1, LocalDate.of(2021,7,12), "2pm to 3pm");
    System.out.println("CREATED: " + created);
    String resBody = this.mapper.writeValueAsString(created);
    System.out.println("BODY: " + resBody);

    ResultMatcher checkStatus = MockMvcResultMatchers.status().isCreated();
    ResultMatcher checkBody = MockMvcResultMatchers.content().json(resBody);


    this.mvc.perform(req).andExpect(checkStatus).andExpect(checkBody);

}


    @Test
    void testGetByID() throws Exception {


        RequestBuilder mockRequest = MockMvcRequestBuilders.get(URL + "/booking/1");


        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();




        BookingDto testBooking = new BookingDto(1, LocalDate.of(2021,7,12), "2pm to 3pm", "Buckingham Palace", "Jenny Bloggs");
        String testBookingAsJSON = this.mapper.writeValueAsString(testBooking);
        ResultMatcher checkBody = MockMvcResultMatchers.content().json(testBookingAsJSON);

        this.mvc.perform(mockRequest).andExpect(checkStatus).andExpect(checkBody);
    }


    @Test
    void testGetAll() throws Exception {

        RequestBuilder mockRequest = MockMvcRequestBuilders.get(URL+"/booking/all");


        // check the res body and status code
        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();
        BookingDto testBooking = new BookingDto (1, LocalDate.of(2021,7,12), "2pm to 3pm","Buckingham Palace", "Jenny Bloggs");
        List<BookingDto> testBookings = new ArrayList<>();
        testBookings.add(testBooking);
        System.out.println("testBooking: " + testBooking);
        String testBookingsAsJSON = this.mapper.writeValueAsString(testBookings);
        System.out.println("testBookingJSON: " + testBookingsAsJSON);
        ResultMatcher checkBody = MockMvcResultMatchers.content().json(testBookingsAsJSON);

        this.mvc.perform(mockRequest).andExpect(checkStatus).andExpect(checkBody);
    }


    @Test
    void testUpdate() throws Exception {
        Booking updatedBooking = new Booking(1, LocalDate.of(2021,7,12), "2pm to 3pm");
        String updateBookingAsJson = this.mapper.writeValueAsString(updatedBooking);

        RequestBuilder mockRequest = MockMvcRequestBuilders
                .patch("http://localhost:8001/booking/1?booking_date=2021-07-21&booking_time=2pm to 3pm");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(updateBookingAsJson);

        this.mvc.perform(mockRequest).andExpect(checkStatus).andExpect(checkBody);
    }


    @Test
    void testDelete() throws Exception {
        Booking deletedBooking = new Booking(1, LocalDate.of(2021,7,12), "2pm to 3pm");
        String deletedBookingASJSON = this.mapper.writeValueAsString(deletedBooking);
        final int id = 1;
        RequestBuilder mockRequest = MockMvcRequestBuilders.delete(URL+"/booking/delete/" + id);


        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();
        ResultMatcher checkBody  = MockMvcResultMatchers.content().json(deletedBookingASJSON);

        this.mvc.perform(mockRequest).andExpect(checkBody).andExpect(checkStatus);
    }

    @Test
    void testDeleteNotFound() throws Exception {
        final int id = 99;
        RequestBuilder mockRequest = MockMvcRequestBuilders.delete(URL+"/booking/delete/" + id);

        String msg = "No booking found with id: " + id;

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isNotFound();
        ResultMatcher checkBody  = MockMvcResultMatchers.content().string(msg);

        this.mvc.perform(mockRequest).andExpect(checkBody).andExpect(checkStatus);
    }
}












