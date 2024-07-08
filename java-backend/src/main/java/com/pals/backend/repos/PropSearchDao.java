package com.pals.backend.repos;

import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.pals.backend.entities.Property;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class PropSearchDao {
    @Autowired
    private EntityManager em;

    public PropSearchDao() {
    }

    public PropSearchDao(EntityManager em) {
        this.em = em;
    }

public String findNoProps(){
        return "No properties found";
}
    public List<Property> findFilteredProperties(
        Integer minPrice,
        Integer maxPrice,
        Integer minBedrooms,
        Integer maxBedrooms,
        Integer minBathrooms,
        Integer maxBathrooms,
        Boolean hasGarden,
        Boolean exSold
        ){

        CriteriaBuilder  criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Property> criteriaQuery = criteriaBuilder.createQuery(Property.class);

        // Select * from Property
        // Required even if no filter condition are to be added to the WHERE clause
        Root<Property> root = criteriaQuery.from(Property.class);

        // prepare WHERE clause

        // Since there are multiple WHERE conditions / Predicates, need to put them in a list before attaching it to the WHERE clause of the QueryBuilder

        List<Predicate> filterPropPredicates = new ArrayList<>();

        // If Min Price filter exists, add that to the Where clause
        if(minPrice != null ) {
            Predicate minPricePredicate = criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice);
            filterPropPredicates.add(minPricePredicate);
        }

        // If Max Price filter exists, add that to the Where clause
        if(maxPrice  != null ) {
            Predicate maxPricePredicate = criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice);
            filterPropPredicates.add(maxPricePredicate);
        }


        // If Min Bedrooms filter exists, add that to the Where clause
        if(minBedrooms  != null ) {
            Predicate minBedroomsPredicate = criteriaBuilder.greaterThanOrEqualTo(root.get("bedrooms"), minBedrooms);
            filterPropPredicates.add(minBedroomsPredicate);
        }

        // If Max Bedrooms filter exists, add that to the Where clause
        if(maxBedrooms  != null ) {
            Predicate maxBedroomsPredicate = criteriaBuilder.lessThanOrEqualTo(root.get("bedrooms"), maxBedrooms);
            filterPropPredicates.add(maxBedroomsPredicate);
        }

        // If Min Bathrooms filter exists, add that to the Where clause
        if(minBathrooms  != null ) {
            Predicate minBathroomsPredicate = criteriaBuilder.greaterThanOrEqualTo(root.get("bathrooms"), minBathrooms);
            filterPropPredicates.add(minBathroomsPredicate);
        }

        // If Max Bathrooms filter exists, add that to the Where clause
        if(maxBathrooms  != null ) {
            Predicate maxBathroomsPredicate = criteriaBuilder.lessThanOrEqualTo(root.get("bathrooms"), maxBathrooms);
            filterPropPredicates.add(maxBathroomsPredicate);
        }

        // If Has Garden filter exists, add that to the Where clause
        if(hasGarden  != null ) {
            Predicate hasGardenPredicate = criteriaBuilder.equal(root.get("garden"), hasGarden);
            filterPropPredicates.add(hasGardenPredicate);
        }

        // If Has Garden filter exists, add that to the Where clause
        if(exSold  != null ) {
            Predicate exSoldPredicate = criteriaBuilder.notEqual(root.get("saleStatus"), "SOLD");
            filterPropPredicates.add(exSoldPredicate);
        }

        //        Predicate bedroomPredicate = criteriaBuilder.equal(root.get("bedrooms"),3);
//
//        Predicate andPredicate = criteriaBuilder.and(pricePredicate, bedroomPredicate);
//
        // Add the Predicate to the query
        criteriaQuery.where(criteriaBuilder.and(filterPropPredicates.toArray(new Predicate[0])));

// Below is according to Baeldung - may need to test whether this will work the same way but glad the above works!!
//        criteriaQuery.where(filterPropPredicates.toArray(new Predicate[0]));

        // Execute the query
        TypedQuery<Property> query = em.createQuery(criteriaQuery);

        // return the result
        return query.getResultList();
    }
}
