package com.pals.backend.rest;

import com.pals.backend.entities.Property;
import com.pals.backend.service.PropertyService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PropertyController {

    private PropertyService service;

    public PropertyController(PropertyService service){
        this.service = service;
    }

    private List<Property> property = new ArrayList<>();

    @PostMapping("/property/add")
    public Property addProperty(@RequestBody Property property) {
        return this.service.addProperty(property);
    }

    @GetMapping("/property/all")
    public List<Property> getAll() {
        return this.service.getAll();
    }

    @GetMapping("/property/{id}")
    public Property getPropertyByID(@PathVariable Integer id) {
        return this.service.propertyByID(id);
    }

    @DeleteMapping("/delete/{id}")
    public Property deleteProperty(@PathVariable int id) {
        return this.service.deleteProperty(id);
    }

    @PatchMapping("/property/update/{id}")
    public Property updateProperty(@PathVariable int id,
                                   @RequestParam(required = false) String Address,
                                   @RequestParam(required = false) Integer Price,
                                   @RequestParam(required = false) Integer Bedrooms,
                                   @RequestParam(required = false) Integer Bathrooms,
                                   @RequestParam(required = false) Boolean Garden,
                                   @RequestParam(required = false) String ImageURL,
                                   @RequestParam(required = false) String SaleStatus){
        return this.service.updateProperty(id, Address, Price, Bedrooms, Bathrooms, ImageURL, Garden, SaleStatus);
    }







}