package com.pals.backend.repos;

import org.springframework.stereotype.Repository;

@Repository
public class NoPropDao {

    public NoPropDao() {
    }

    public String findNoProps(){
        return "No properties found";
    }

}
