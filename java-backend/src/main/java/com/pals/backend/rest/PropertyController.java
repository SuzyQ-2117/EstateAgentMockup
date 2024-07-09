package com.pals.backend.rest;

import com.pals.backend.dtos.PropertyDTO;
import com.pals.backend.entities.Property;
import com.pals.backend.service.PropertyService;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.StyledEditorKit;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
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
    public List<PropertyDTO> getAll() {
        return this.service.getAll();
    }


//    @GetMapping("/property/noproperty")
//    public String findNoProps() {
//        return this.service.findNoProps();
//    }

    @GetMapping("/property/filtersearch")
    public List<PropertyDTO> getAllByPredicate(@RequestParam(required = false) Integer minPrice,
                                            @RequestParam(required = false) Integer maxPrice,
                                            @RequestParam(required = false) Integer minBedrooms,
                                            @RequestParam(required = false) Integer maxBedrooms,
                                            @RequestParam(required = false) Integer minBathrooms,
                                            @RequestParam(required = false) Integer maxBathrooms,
                                            @RequestParam(required = false) Boolean hasGarden,
                                            @RequestParam(required = false) Boolean exSold) {
        return this.service.getAllByPredicate(minPrice,maxPrice,minBedrooms, maxBedrooms, minBathrooms, maxBathrooms, hasGarden, exSold);
    }


    @GetMapping("/property/{id}")
    public PropertyDTO getPropertyByID(@PathVariable Integer id) {
        return this.service.propertyByID(id);
    }

    @DeleteMapping("/property/delete/{id}")
    public PropertyDTO removeProperty(@PathVariable Integer id) {
        return this.service.removeProperty(id);
    }

    @PatchMapping("/property/update/{id}")
    public PropertyDTO updateProperty(@PathVariable int id,
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
