package com.pals.backend.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pals.backend.dtos.BuyerDto;
import com.pals.backend.dtos.PropertyDTO;
import com.pals.backend.dtos.SellerDto;
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

public class SellerControllerMVCTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    void testAdd() throws Exception {
        Seller newSeller = new Seller("Joanna","Bloggs");
        String newSellerAsJson = this.mapper.writeValueAsString(newSeller);
        RequestBuilder mockRequest = MockMvcRequestBuilders.post("/seller/add").contentType(MediaType.APPLICATION_JSON).content(newSellerAsJson);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();

        Seller addedSeller = new Seller(10,"Joanna","Bloggs");
        String addedSellerAsJson = this.mapper.writeValueAsString(addedSeller);

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(addedSellerAsJson);
        this.mvc.perform(mockRequest).andExpect(checkStatus).andExpect(checkBody);
    }

    @Test
    void testGetById() throws Exception {
        RequestBuilder mockReq = MockMvcRequestBuilders.get("/seller/get/2");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();

        String getSellerDtoAsJson = this.mapper.writeValueAsString(getSeller2Dto());

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(getSellerDtoAsJson);
        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);

    }

    @Test
    void testGetSellersByName() throws Exception {
        RequestBuilder mockReq = MockMvcRequestBuilders.get("/seller/find/John J /Bloggs");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();

        String getSellerByNameAsJson = this.mapper.writeValueAsString(getSeller2Dto());

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(getSellerByNameAsJson);
        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);

    }

    @Test
    void testUpdateById() throws Exception {
        RequestBuilder mockReq = MockMvcRequestBuilders.patch("/seller/update/4").param("firstName","Praveen").param("surname","Karnam");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();
        SellerDto updatedSeller = getSeller4Dto();
        updatedSeller.setfirstName("Praveen");
        updatedSeller.setSurname("Karnam");
//        updatedSeller.getProperties().get(0).setSeller();

        String updatedSellerAsJson = this.mapper.writeValueAsString(updatedSeller);

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(updatedSellerAsJson);
        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);

    }

    private static SellerDto getSeller2Dto() {
// First add the properties mapped to this seller
        List<Property> propList = new ArrayList<>();
        Property property1 = new Property(2, "https://i.pinimg.com/originals/a5/e1/bd/a5e1bdbf511a7874c9c3802857c01081.jpg",  "10 Downing Street", 10000000, 10, 10, false, "FORSALE",null);
        Property property2 = new Property(5, "https://th.bing.com/th/id/OIP.bPoAodSzIRLLvNXNvCT0DQHaJ4?rs=1&pid=ImgDetMain", "Haunted House", 125000, 2, 1, false, "FORSALE",null);
        propList.add(property1);
        propList.add(property2);

        // Create the Seller being tested
        Seller getSeller = new Seller("John J ","Bloggs");
        getSeller.setId(2);

// Add the properties to the Seller
        getSeller.setProperties(propList);

        return new SellerDto(getSeller);
    }


    private static SellerDto getSeller4Dto() {
// First add the properties mapped to this seller
        List<Property> propList = new ArrayList<>();
        Property property1 = new Property(10, "Image URL",  "Any house", 1234567890, 5, 3, true, "FORSALE",null);
        propList.add(property1);

        // Create the Seller being tested
        Seller getSeller = new Seller("Joanna","Bloggs");
        getSeller.setId(4);

// Add the properties to the Seller
        getSeller.setProperties(propList);

        return new SellerDto(getSeller);
    }


//    @Test
//    void testRemoveById() throws Exception {
//        RequestBuilder mockReq = MockMvcRequestBuilders.delete("/seller/remove/1");
//
//        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();
//        String removeSellerAsJson = this.mapper.writeValueAsString(new SellerDto(new Seller(1,"Praveen","Karnam")));
//
//        ResultMatcher checkBody = MockMvcResultMatchers.content().json(removeSellerAsJson);
//        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);
//
//    }
//

}
