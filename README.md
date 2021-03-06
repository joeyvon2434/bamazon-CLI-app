# bamazon-CLI-app
Welcome to the Bamazon ReadMe file.

**Purpose**: Practice using MySQL by building a command line marketplace app.

**Help**: Feel free to contact me with questions at joseph.vonedwins@yahoo.com

**Contributors**: Created by Joseph Von Edwins


# Getting Started:
1. You will need to clone the GitHub repository to your computer.
2. Once the repository is cloned, you will need to navigate to the download location on your computer in your favorite command line interface.
3. You will likely need to update the  server connection information to match your own local server. The set up location is in each file in lines 7 through 11.
4. In your command line, execute "npm install".
5. Start your localhost database connection using MySQL, or any other SQL based database.
6. Use the schema.sql file to create the database. Copy the text within the file, and enter it into your favorite MySQL interface, then execute to set up the databse.
7. You're ready to go!

# Summary: 
The three files allow the user to act as a customer making purchases, a manager that can monitor inventory and products, and a supervisor that can add departments, and look at the performance for each department.

# Updates:
The table formatting in command line has been updated with console.table for better presentation / organization. *(Note: The pictures in the instructions do not reflect the table changes.)*

# bamazonCustomer.js
1. In your command line terminal / bash, type "node bamazonCustomer.js"

2. Upon execution you will be led to a screen with a list of products
![image_1](/images/image_1.png)

 and prompted to enter the ID of a product you would like to purchase. 
 3. After selecting a product, the user is prompted to input a quantity they would like to purchase.
 ![image_2](/images/image_2.png)


 4. If sufficient stock is available, the user in prompted with a confirmation of their purchase, and a total price. They are also asked if they would like to shop for more items.

![image_13](/images/image_13.png)


 5. If insufficient stock is available, the user is asked to purchase less items and is returned to the home menu.
  ![image_3](/images/image_3.png)


  6. Press "control C" to exit at any time


  # bamazonManager.js
 1. In your command line terminal / bash, type "node bamazonManager.js".

 2. The user will be prompted for a password.
![image_4](/images/image_4.png)
 Insert the password (management) and press enter to continue.

 3. A menu is presented to the user, where they can make a numeric selection of what they would like to do.
![image_5](/images/image_5.png)

 4. Choose an option and press enter.

 5. The "View Products for Sale" option shows the manager the current items for sale in the Bamazon marketplace with a prompt to exit or return to the home screen.
 ![image_6](/images/image_6.png)

 6. The "View Low Inventory" option shows all products with less than 5 items in stock.
![image_7](/images/image_7.png)

 The user can then choose to add products to inventory, return home, or exit.

 7. The "Add to Inventory" option allows the user to add more items to inventory. The user is prompted for the ID and a quantity of the product they would like to re-stock.
 ![image_8](/images/image_8.png)

 They can then choose to add more items, return home, or exit.

 8. The "Add New Product" option allows the manager to create a new product to stock. The manager is prompted to insert a product name, price, and a quantity to stock. The user must also select department for the item. *(Note: managers cannot create departments. Only supervisors can do that with the bamazonSupervisor.js file)*
 ![image_9](/images/image_9.png)

The user can then choose to return to the home menu, create more products, or exit.

9. "Exit" allows the user to exit the program.


# bamazonSupervisor.js
1. In your command line terminal / bash, type "node bamazonSupervisor.js"

2. A menu will appear asking the user to choose "View product sales by department", "Create new department", or exit.
![image_10](/images/image_10.png)

3. Choose an option by entering the number associated with the option, then press 'Enter'.

4. The "View product sales by department" option brings ups a table showing a summary of each department's performance, and a returns the user to the main menu.
![image_11](/images/image_11.png)

5. The "Create new department" option allows the user to create a new department. The user will be prompted to input a department name and overhead costs.

6. The user then sees a message stating that the department was created, and prompting the user to press enter to return to the main menu.
![image_12](/images/image_12.png)

