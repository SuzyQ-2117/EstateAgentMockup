package com.pals.backend.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pals.backend.dtos.PropertyDTO;
import com.pals.backend.entities.Booking;
import com.pals.backend.entities.Property;
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

public class PropertyControllerMVCTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    void testAdd() throws Exception {
        Property newProperty = new Property("Image URL","Any house",1234567890,5,3,true,"FORSALE",null);

        Seller getSeller = new Seller("James","Bloggs");
        getSeller.setId(3);

        newProperty.setSeller(getSeller);

        String newPropertyAsJson = this.mapper.writeValueAsString(newProperty);
        RequestBuilder mockRequest = MockMvcRequestBuilders.post("/property/add").contentType(MediaType.APPLICATION_JSON).content(newPropertyAsJson);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();

        Property addedProperty = new Property(12,"Image URL","Any house",1234567890,5,3,true,"FORSALE",null);
        addedProperty.setSeller(getSeller);
        String addedPropertyAsJson = this.mapper.writeValueAsString(addedProperty);

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(addedPropertyAsJson);
        this.mvc.perform(mockRequest).andExpect(checkStatus).andExpect(checkBody);
    }

    @Test
    void testGetById() throws Exception {
        RequestBuilder mockReq = MockMvcRequestBuilders.get("/property/1");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();
        String getPropertyAsJson = this.mapper.writeValueAsString(getProperty1Dto());

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(getPropertyAsJson);
        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);

    }

        @Test
    void testUpdateById() throws Exception {
        RequestBuilder mockReq = MockMvcRequestBuilders.patch("/property/update/3")
                .param("address","Updated address")
                .param("price","1000")
                .param("bedrooms","20")
                .param("bathrooms","20")
                .param("garden","false")
                .param("imageURL","Updated URL")
                .param("saleStatus","WITHDRAWN");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();

        PropertyDTO newProp = getProperty3Dto();
            newProp.setAddress("Updated address");
            newProp.setPrice(1000);
            newProp.setBedrooms(20);
            newProp.setBathrooms(20);
            newProp.setGarden(false);
            newProp.setImageURL("Updated URL");
            newProp.setSaleStatus("WITHDRAWN");

//            newProp.sets.get(0).setBuyer("Praveen Karnam");
        String updatedPropAsJson = this.mapper.writeValueAsString(newProp);

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(updatedPropAsJson);
        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);

    }


    @Test
    void testFilterSearch() throws Exception {
        RequestBuilder mockReq = MockMvcRequestBuilders.get("/property/filtersearch?minPrice=1000&maxPrice=10000000&minBedrooms=2&maxBedrooms=20&minBathrooms=10&maxBathrooms=15&hasGarden=false&exSold=true");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isOk();
        List<PropertyDTO> filteredPropDto= new ArrayList<>();
        PropertyDTO newProp = getProperty2Dto();
        filteredPropDto.add(newProp);
        String updatedPropAsJson = this.mapper.writeValueAsString(filteredPropDto);

        ResultMatcher checkBody = MockMvcResultMatchers.content().json(updatedPropAsJson);
        this.mvc.perform(mockReq).andExpect(checkStatus).andExpect(checkBody);

    }


    private static PropertyDTO getProperty1Dto() {
        List<Booking> getBooking = new ArrayList<>();

//        Property getProperty = new Property("Image URL","Any house",1234567890,5,3,true,"FORSALE",null);

        Property property1 = new Property(1, "https://lp-cms-production.imgix.net/2021-04/shutterstockRF_457813381.jpg?q=40&w=2000&auto=format",  "Buckingham Palace", 12000000, 4, 2, true, "FORSALE", null);

        Seller getSeller = new Seller("Joe","Bloggs");
        getSeller.setId(1);

        property1.setSeller(getSeller);

        PropertyDTO getPropertyDto = new PropertyDTO(property1);
        return getPropertyDto;
    }

    private static PropertyDTO getProperty3Dto() {
        List<Booking> getBooking = new ArrayList<>();

//        Property getProperty = new Property("Image URL","Any house",1234567890,5,3,true,"FORSALE",null);

        Property property3 = new Property(3, "",  "", 0, 0, 0, false, "", null);

        Seller getSeller = new Seller("James","Bloggs");
        getSeller.setId(3);

        property3.setSeller(getSeller);

        PropertyDTO getPropertyDto = new PropertyDTO(property3);
        return getPropertyDto;
    }

    private static PropertyDTO getProperty2Dto() {
        List<Booking> getBooking = new ArrayList<>();

//        Property getProperty = new Property("Image URL","Any house",1234567890,5,3,true,"FORSALE",null);

        Property property2 = new Property(2, "https://i.pinimg.com/originals/a5/e1/bd/a5e1bdbf511a7874c9c3802857c01081.jpg",  "10 Downing Street", 10000000, 10, 10, false, "FORSALE", null);

        Seller getSeller = new Seller("John J ","Bloggs");
        getSeller.setId(2);

        property2.setSeller(getSeller);

        PropertyDTO getPropertyDto = new PropertyDTO(property2);
        return getPropertyDto;
    }

}
