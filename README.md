# thuedia
 REQUIREMENTS
The software to be developed is to be used by the manager and clerks of a store that rents both movies and video games. (some functions will be available only to the manager. the system must provide some suitable mechanism to ensure that only the manager can access such functions.). 
To be able to rent from the store, a customer must provide his/her name, address, and phone number. a clerk enters this information into the system, and then gives the customer a card which contains a unique customer id. the customer must present this card to be able to rent anything. 
Movie dvds are rented for a specified rental period for a specified rental charge, and game  disks are rented for a specified rental period for a specified rental charge. if a movie dvd is returned late, it is charged an extra rental charge for each rental period (or fraction thereof) it is late; likewise, if a game disk is returned late it is charged an extra rental charge for each rental period (or fraction thereof) it is late. (the rental periods and prices charged are established by management, and can be different for movies than for games.)   
DVDs and game disks available for rental are displayed in the store in their boxes. Each has a unique ID number. To rent one or more items, thke customer brings it/them to a clerk, who enters the customer’s ID number from the customer’s card, and the DVD/disk ID number(s) from the box(es). When all have been entered, the system will calculate the total charge owed and the clerk will collect it from the customer. (A future improvement may use a bar code scanner to scan customer cards and DVD/disk ID numbers, but for now the system depends on the clerk typing the appropriate ID numbers.)
DVDs and disks being returned can either be handed to a clerk, or they can be placed in a returns box in the store, or they can be inserted into a returns slot in the wall of the /store if the store is closed. In any case, a clerk must enter the ID number of each DVD/disk that has been returned into the system. Of course, the clerk does not need to enter a customer id for returns - in fact, the customer may not even be present it the items are left in the return slot at night.
The system must load data from disk at startup, and automatically save data to disk at shutdown. 
The system must ultimately provide the following functions. The ones marked M are performed by the manager; those marked C are normally performed by the clerks. (Note that the manager may also perform clerk functions if he/she chooses to do so.).
1. 	Manage rental and return of movie DVDs and game disks. (C)
a. 	Rent one or more DVDs and/or disks to a customer.
b. 	Record the return of one or more DVDs and/or disks.
c. 	Report the status of a specific DVD or disk (title, checkout status [ on shelf; rented - if so, to whom and when due; on hold - if so for whom ].)
2. 	Manage list of customers (C and M as noted)
a. 	Add a new customer (C)
b. 	Modify information stored about a customer (C)
c. 	Delete a customer. (M)
3. 	Manage list of titles of movies and titles of games available for rental (M and C as noted)
a. 	Add a new title (M)
b. 	Delete a title (M)
c. 	Respond to inquiries about a particular title - general information about it, plus whether a  copy is available for rental now. (C)
4. 	Manage inventory of individual DVDs / disks available for rental. (M)
a. 	Add one or more newly acquired DVDs or disks.
b. 	Delete a lost, damaged, or no longer needed DVD or disk.
5. 	Manage records of outstanding late charges owed by a customer. ( C and M as noted) 
a. 	Add a late charge if a customer returns a DVD or disk late. (The customer may drop off  returns without interacting with a clerk, so late charges incurred may have to be recorded now and collected the next time the customer comes in for a rental. However, if the customer is present it should be possible to collect the charge on the spot.) The charge is computed and added automatically when the DVD or disk is returned (during 1b above) and the clerk is asked if the customer is present and wishes to pay the charge now. (C)
b. 	Indicate that the customer has unpaid late charges when the customer attempts to rent an item. This is done automatically when a customer’s id is entered during 1a above, and the clerk is told to ask the customer whether he/she wishes to pay the late charges now. (A customer who chooses not to pay can still rent the item) (C)
c. 	Record the payment of one or more late charges owed by a particular customer. The customer has the option of paying all outstanding late charges, or just specific one(s). This is available as part of 5a and 5b above, and is also directly available if a customer comes in and asks to pay late charges. (C)
d. 	Respond to customer inquiries about late charges (the title rented, when it was due, and when it was returned.) This option is available whenever the clerk attempts to collect outstanding late charges (5c above), and is also directly available if a customer comes in and asks about outstanding late charges. (C)
e. 	Cancel a specific late charge. (M)
6. 	Accept a customer reservation for a title for which all copies are currently rented, to be filled later on a “first come, first served” basis. (C)
a. 	Enter a reservation for a specific title.
b. 	Place a newly-returned item “on hold” for the first customer who has a reservation for it. 	(Done automatically during 1b above when a DVD or disk is returned and there are one or  more outstanding reservations for the title. The clerk is told the name and phone number of the customer for which the item is on hold so as to be able to phone the customer to let him/her know that the item is in.)
c. 	Cancel a reservation. This may be initiated by the customer at any time, or may need to be done if the customer for whom an item is being placed on hold cannot be contacted or doesn't want the item (in which case it is put on hold for the next customer on the list, or returned to general stock if there is none.)
 

7. 	Produce a customer report for management upon request, showing the following information, with the following reported for each customer: (M)
a. 	Name and other basic information (e.g. address, phone)
b. 	Total number of DVDs/disks the customer currently has out
c. 	Information about currently overdue DVDs or disks. There should be one line of information for each item, including its title and when it was supposed to be due.
d. 	Information about fines currently owed. There should be one line of information for each fine, including the title of the item that was returned late, the date on which it was due, the date on which it was actually returned, and the amount of the fine. In addition, if the customer owes one or more fines, the total amount of all fines should be shown.
The manager must be able to choose whether to produce such a report for
•	All customers.
•	Only customers that have one or more overdue items
•	Only for customers that owe one or more late fees. 
8. 	Produce a title report for management upon request, showing all titles, with the following information for each title: (M)
a. 	Name and other basic information.
b. 	Total number of copies currently owned (should equal sum of next three items, each of which should also be separately reported)
•	Number of copies currently rented out
•	Number of copies on hold for some customer
•	Number currently in stock 
c. 	Number of reservations pending for the item The purpose of this report is to help management decide whether to buy more copies of a given title or to sell off some copies when interest in renting a title declines.
9. 	Miscellaneous. These changes, once made, apply to subsequent rentals, but not to ones that are currently outstanding. (M)
a. 	Set the rental rate for a particular class of item (movie or video game.)
b. 	Set the rental period for a particular class of item (movie or video game)
10. 	Manually save all information to disk at any time. (This is in addition to the automatic save to disk which occurs at shutdown) (C)
Of course, information about customers, inventory, rentals, late charges, and reservations will need to be preserved between program runs through some sort of persistence mechanism.
