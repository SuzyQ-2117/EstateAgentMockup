
INSERT INTO `seller` (`id`,`first_name`,`surname`) VALUES (1,'Joe','Bloggs');

INSERT INTO `property` (`bathrooms`,`bedrooms`,`garden`,`id`,`price`,`seller_id`,`address`,`imageurl`,`sale_status`) VALUES (2,4,1,1,12000000,1,'Buckingham Palace',
'https://lp-cms-production.imgix.net/2021-04/shutterstockRF_457813381.jpg?q=40&w=2000&auto=format','FORSALE');

INSERT INTO `buyer` (`id`,`first_name`,`surname`) VALUES (1,'Jenny','Bloggs');

INSERT INTO `booking`(id, booking_date, booking_time, property_id, buyer_id) VALUES (
                                                                                       1,
                                                                                       '2021-07-12',
                                                                                       '2pm to 3pm',
                                                                                       1,
                                                                                       1
                                                                                   );