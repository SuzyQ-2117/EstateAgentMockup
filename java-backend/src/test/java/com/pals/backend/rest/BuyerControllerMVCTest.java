package com.pals.backend.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.pals.backend.dtos.BookingDto;
import com.pals.backend.dtos.BuyerDto;
import com.pals.backend.entities.Booking;
import com.pals.backend.entities.Buyer;
import com.pals.backend.entities.Property;
import com.pals.backend.entities.Seller;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc

public class BuyerControllerMVCTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    void testAdd() throws Exception {
        Buyer newBuyer = new Buyer("Joanna6","Bloggs6");
        String newBuyerAsJson = this.mapper.writeValueAsString(newBuyer);
        RequestBuilder mockRequest = MockMvcRequestBuilders.post("/buyer/add").contentType(MediaType.APPLICATION_JSON).content(newBuyerAsJson);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();

        Buyer addedBuyer = new Buyer(16,"Joanna6","Bloggs6");
        String addedBuyerAsJson = this.mapper.writeValueAsString(addedBuyer);

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(addedBuyerAsJson);
        this.mvc.perform(mockRequest).andExpect(checkStatus).andExpect(checkBody);
    }

    @Test
    void testGetById() throws Exception {
        RequestBuilder mockReq = MockMvcRequestBuilders.get("/buyer/get/2");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();
        String getBuyerAsJson = this.mapper.writeValueAsString(getBuyer2Dto());

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(getBuyerAsJson);
        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);

    }

    @Test
    void testGetBuyersByName() throws Exception {
        RequestBuilder mockReq = MockMvcRequestBuilders.get("/buyer/find/Jane/Bloggs");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();

//        BuyerDto getBuyerDto = getBuyerDto();
        String getBuyerByNameAsJson = this.mapper.writeValueAsString(getBuyer2Dto());

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(getBuyerByNameAsJson);
        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);

    }

    private static BuyerDto getBuyer2Dto() {
        List<Booking> getBooking = new ArrayList<>();
        Booking booking1 = new Booking(3, LocalDate.parse("2024-07-12"), "9-10am", null, null);
        getBooking.add(booking1);
        Buyer getBuyer = new Buyer(2,"Jane","Bloggs",getBooking);
        booking1.setBuyer(getBuyer);

        Property property1 = new Property(3, "https://live.staticflickr.com/207/455784003_40ee3ec691.jpg",  "25 Gresham Street", 25000000, 0, 10, false, "FORSALE", null);
        booking1.setProperty(property1);
        getBuyer.setBookings(getBooking);
        BuyerDto getBuyerDto = new BuyerDto(getBuyer);
        return getBuyerDto;
    }


    private static BuyerDto getBuyer4Dto() {
        List<Booking> getBooking = new ArrayList<>();
        Booking booking1 = new Booking(4, LocalDate.parse("2024-07-12"), "1-2pm", null, null);
        getBooking.add(booking1);
        Buyer getBuyer = new Buyer(4,"Jenny","Bloggs",getBooking);
        booking1.setBuyer(getBuyer);

        Property property1 = new Property(6, "https://th.bing.com/th/id/R.b44da734e3aff97690b46908a3f12f11?rik=BEpxyhSAJ9acaQ&pid=ImgRaw&r=0",  "Tiny House", 45000, 1, 1, false, "FORSALE", null);
        booking1.setProperty(property1);
        getBuyer.setBookings(getBooking);
        BuyerDto getBuyerDto = new BuyerDto(getBuyer);
        return getBuyerDto;
    }

    @Test
    void testUpdateById() throws Exception {
        RequestBuilder mockReq = MockMvcRequestBuilders.patch("/buyer/update/4").param("firstName","Praveen").param("surname","Karnam");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();

        BuyerDto newBuyer = getBuyer4Dto();
        newBuyer.setfirstName("Praveen");
        newBuyer.setSurname("Karnam");
        newBuyer.getBookings().get(0).setBuyer("Praveen Karnam");
        String updatedBuyerAsJson = this.mapper.writeValueAsString(newBuyer);

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(updatedBuyerAsJson);
        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);

    }
//
//
//    @Test
//    void testRemoveById() throws Exception {
//        RequestBuilder mockReq = MockMvcRequestBuilders.delete("/buyer/remove/9");
//
//        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();
//        Buyer removedBuyer = new Buyer(9,"Joanna6","Bloggs6");
//        String removeBuyerAsJson = this.mapper.writeValueAsString(new BuyerDto(removedBuyer));
//
//        ResultMatcher checkBody = MockMvcResultMatchers.content().json(removeBuyerAsJson);
//        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);
//
//    }


}
