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

    @DeleteMapping("/property/delete/{id}")
    public Property removeProperty(@PathVariable Integer id) {
        return this.service.removeProperty(id);
    }

    @PatchMapping("/property/update/{id}")
    public Property updateProperty(@PathVariable int id,
                                   // Don't forget you need to use the Object wrappers here
                                   @RequestParam(required = false) String address,
                                   @RequestParam(required = false) Integer price,
                                   @RequestParam(required = false) Integer bedrooms,
                                   @RequestParam(required = false) Integer bathrooms,
                                   @RequestParam(required = false) Boolean garden,
                                   @RequestParam(required = false) String imageURL,
                                   @RequestParam(required = false) String saleStatus){
        return this.service.updateProperty(id, address, price, bedrooms, bathrooms, imageURL, garden, saleStatus);
    }

}