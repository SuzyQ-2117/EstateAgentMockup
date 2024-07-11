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
//@ActiveProfiles("test")
@AutoConfigureMockMvc
//@Sql(scripts = {"classpath:booking-data.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
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

        Booking toCreate = new Booking(6, LocalDate.of(2021,7,12), "2pm to 3pm");
        System.out.println("booking " + toCreate );


        String reqBody = this.mapper.writeValueAsString(toCreate);
        System.out.println("BODY: " + reqBody);

        RequestBuilder req = MockMvcRequestBuilders
                .post(URL+"/booking/new")
                .content(reqBody)
                .contentType(MediaType.APPLICATION_JSON);

        Booking created = new Booking(6, LocalDate.of(2021,7,12), "2pm to 3pm");
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




        BookingDto testBooking = new BookingDto(1, LocalDate.of(2024,7,11), "10-11am", "Buckingham Palace", "Jenny Bloggs");
        String testBookingAsJSON = this.mapper.writeValueAsString(testBooking);
        ResultMatcher checkBody = MockMvcResultMatchers.content().json(testBookingAsJSON);

        this.mvc.perform(mockRequest).andExpect(checkStatus).andExpect(checkBody);
    }


    @Test
    void testGetAll() throws Exception {

        RequestBuilder mockRequest = MockMvcRequestBuilders.get(URL+"/booking/all");


        // check the res body and status code
        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();
        BookingDto testBooking1 = new BookingDto (1, LocalDate.of(2021,7,12), "10-11am","Buckingham Palace", "Jenny Bloggs");
        BookingDto testBooking2 = new BookingDto (2, LocalDate.of(2024,7,18), "1-2pm","Buckingham Palace", "Jenny Bloggs");
        BookingDto testBooking3 = new BookingDto (3, LocalDate.of(2024,7,12), "9-10am","Updated address", "Jane Bloggs");
        BookingDto testBooking4 = new BookingDto (4, LocalDate.of(2024,7,12), "1-2pm","Tiny House", "Jenny Bloggs");
        List<BookingDto> testBookings = new ArrayList<>();
        testBookings.add(testBooking1);
        testBookings.add(testBooking2);
        testBookings.add(testBooking3);
        testBookings.add(testBooking4);
//        System.out.println("testBooking: " + testBooking);
        String testBookingsAsJSON = this.mapper.writeValueAsString(testBookings);
        System.out.println("testBookingJSON: " + testBookingsAsJSON);
        ResultMatcher checkBody = MockMvcResultMatchers.content().json(testBookingsAsJSON);

        this.mvc.perform(mockRequest).andExpect(checkStatus).andExpect(checkBody);
    }


    @Test
    void testUpdate() throws Exception {
        Booking updatedBooking = new Booking(4, LocalDate.of(2021,7,21), "1-2pm");
        String updateBookingAsJson = this.mapper.writeValueAsString(updatedBooking);

        RequestBuilder mockRequest = MockMvcRequestBuilders
                .patch("http://localhost:8001/booking/4?booking_date=2021-07-21&booking_time=1-2pm");

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