'''
THE PYTHON CLASS LIBRARIES for the MealPlan


Note




Contributors:
1. Olusayo Obajemu
2. ....

CivicTech Fredericton
February 2020

'''

######################################## CLASS USER ##################################
class User:
""" 
The User Class 001

preliminary notes:

1. Every user has userID and log status
2. When a user is authorised, the log status is changed to True

"""

	def __init__(self, LoggedIn_ = False, UserID_ = 0, *args, **kwargs):
		""" 
		Constructor for initialising the User Object
		Constructor initialises the 	loggedIn status, 	initial value = False
										UserID, 			initial value = 0


		**kwargs: Additional keyword arguments to pass to a superclass constructor 
		"""

		self.LoggedIn = LoggedIn_
		self.UserID =  UserID_


	def authorizeUser(self, username, password):
		''' 
		This method authorizes the users 

		This changes the LoggedIn_ status to True on authorisation

		'''

		# match username and password
		authorised = False

		if authorised:
			self.LoggedIn = True



######################################## CLASS USERPROFILE ###############################
class UserProfile:
''' 
The UserProfile is a class which contains information pertaining to a User with known ID.
Every user should have corresponding UserProfile object. 

-------To do: add UserProfile Object to the User Class.

-------Question: I wonder if it is beneficial to combine to the two classes into one?

Notes:

'''
	def __init__(self,  userID_= 0, date_ = 0, arrayOfDislikes_ = [], arrayOfWeeklyPlanID_ = [], *args, **kwargs):
		'''
		Constructor for initialising the UserProfile.
		-----	userID_ corresponds to the userID and is defaulted to value 0.
		-----	date_ corresponds to the date??? and is defaulted to value 0. ******see To do!
		-----   arrayOfDislikes is python list which is initially empty.
		----- 	arrayOfWeeklyPlanID is a python list which is initially empty.


		**kwargs: Additional keyword arguments to pass to a superclass constructor 


		To do:

		The date object should derive from the built-in Date class.
		'''

		self.userID = userID_
		self.date = date_
		self.arrayOfDislikes =arrayOfDislikes_
		self.arrayOfWeeklyPlanID = arrayOfWeeklyPlanID_

	def modifyUsageQty(self, username, password):
		''' 
		'''


######################################## CLASS SHOPPINGLIST ################
class ShoppingList:
''' 
The ShoppingList is a class which contains information pertaining to, well, the ShoppingList.

-------To do: Write more details pertaining to the ShoppingList.

Notes:

'''
	def __init__(self, shoppingListID_= 0, dateCreated_ = 0, shoppingListItem_ = [], *args, **kwargs):
		'''
		Constructor for initialising the ShoppingList.
		-----	shoppingListID_ auto increments.
		-----	dateCreated_ corresponds to the date??? and is defaulted to value 0. ******see To do!
		-----   shoppingListItem_ is python list which is initially empty.
	
		**kwargs: Additional keyword arguments to pass to a superclass constructor 


		To do:

		1. The date object should derive from the built-in Date class.
		2. The shoppingListID should auto increment, perhaps should be static??

		'''

		self.shoppingListItem = shoppingListItem_
		self.dateCreated = dateCreated_
		self.shoppingListItem = shoppingListItem_

	def totalCost(self):
		''' 
		Every member of the ShoppingListItem is a xxxx Object
		xxxx Object has methods that return the QUANTITY and
		'''
		pass

	def addWeeklyPlan(WeeklyPlan):
		'''
		Not sure what this does??
		'''
		pass

	def create():
		'''
		Not sure how this works?
		'''
		pass



######################################## CLASS SHOPPINGLISTITEM ################
class ShoppingListItem:
''' 
The ShoppingListIem is a class which encapsulate the items which could be in the ShoppingList

-------To do: Write more details pertaining to the ShoppingListItem.

Notes:

'''
	def __init__(self, ingredient_ = [],  usageQty_ = 0, purchaseQty_ = 0, purchaseCost_ = 0, *args, **kwargs):
		'''
		Constructor for initialising the ShoppingListItemClass.
		-----	ingredient_ an array of strings.
		-----	usageQty_ Not sure how this integrates
		-----   purchaseQty_ Not sure how this integrates
		----- 	purchaseCost_ Not sure how this integrates
	
		**kwargs: Additional keyword arguments to pass to a superclass constructor 


		To do:

		1. 

		'''

		self.ingredient = ingredient_
		self.usageQty = usageQty_
		self.purchaseQty = purchaseQty_
		self.purchaseCost = purchaseCost_

	def modifyUsageQty(self):
		''' 
			It is not clear yet how this works
		'''
		pass


######################################## CLASS WEEKLYPLAN ################

class WeeklyPlan:
''' 
The WeeklyPlan is a class which encapsulate the details of the weekly meal plan

-------To do: Write more details pertaining to the WeeklyPlan.

Notes:

'''
	def __init__(self, weeklyPlanID_ = 0,  arrayOfMeal_ = [], portionSize_ = 1, *args, **kwargs):
		'''
		Constructor for initialising the weeklyPlan class.
		-----	weeklyPlanID_ is  an int that unique identifies the week ????.
		-----	arrayOfMeal_ is a list that contains
		-----   portionSize_ Not sure how this integrates
		
		**kwargs: Additional keyword arguments to pass to a superclass constructor 


		To do:

		1. Make weekPlanID as static

		'''

		self.weeklyPlanID = weeklyPlanID_
		self.usageQty = usageQty_
		self.portionSize = portionSize_

	def nutritionalSummary(self):
		''' 
			returns the nutritional summary
			not sure how the data is to be presented yet.

		'''
		pass

	def containsAllergens(self):
		''' 
			The containsAllergens method should return two sets of data
			1. a bool that indicates if it contains allergens or not
			2. a list of allergens it contains
			
		'''
		containsAllergens_bool = False
		return containsAllergens_bool


	def changePortionSize(self):
		''' 
			To do
		'''
		pass


	def changeWeeklyPlan(self):
		'''
			To do
		'''
		pass



######################################## CLASS WEEKLYPLANS ################

class WeeklyPlans:
''' 
WeeklyPlans is a class which encapsulate the details of all possible weekly plans?

-------To do: Write more details pertaining to WeeklyPlans.

Notes:

'''
	def __init__(self, arrayOfWeeklyPlans_ = [], *args, **kwargs):
		'''
		Constructor for initialising the weeklyPlans class.
		-----	weeklyPlans_ is a python list ????.

		**kwargs: Additional keyword arguments to pass to a superclass constructor 


		To do:

		1. 

		'''

		self.arrayOfWeeklyPlans = arrayOfWeeklyPlans_

	def allPlans(self):
		''' 
			????

		'''
		pass


	def filteredPlans(self):
		''' 
			No idea how this should work.
			????

		'''
		pass





######################################## CLASS WEEKLYPLANS ################

class WeeklyPlans:
''' 
WeeklyPlans is a class which encapsulate the details of all possible weekly plans?

-------To do: Write more details pertaining to WeeklyPlans.

Notes:

'''
	def __init__(self, arrayOfWeeklyPlans_ = [], *args, **kwargs):
		'''
		Constructor for initialising the weeklyPlans class.
		-----	weeklyPlans_ is a python list ????.

		**kwargs: Additional keyword arguments to pass to a superclass constructor 


		To do:

		1. 

		'''

		self.arrayOfWeeklyPlans = arrayOfWeeklyPlans_

	def allPlans(self):
		''' 
			????

		'''
		pass


	def filteredPlans(self):
		''' 
			No idea how this should work.
			????

		'''
		pass


######################################## CLASS MEALS ################

class Meals:
''' 
Class Meals enscapsulates the details relating a particular meal


Perhaps this should be derive from the enumeration data type which contains a list of all meals.

-------To do: Write more details pertaining to Meals.

Notes:

'''
	def __init__(self, name_ = '',  description_ = '', nutritionalFacts_, PreparationTime_,
	ingredients_ = [], mealPhoto_ =  [], mealVideo = '',  *args, **kwargs):
		'''
		Constructor for initialising the Meals class.
		-----	

		**kwargs: Additional keyword arguments to pass to a superclass constructor 


		To do:

		1. 

		'''

		self.name = name_
		self.description = description_




######################################## CLASS INGREDIENTS ################

class Ingredients:
''' 
Class INGREDIENTS enscapsulates the details relating a particular ingredient


-------To do: Write more details pertaining to Ingredients.

Notes:

'''
	def __init__(self, name_ = '',  unitType_ = '', unitQty_ = 0, minPurchaseQty_ = 0,
	minPurchaseQtyCost_ = 0, allergen_ =  [], photo = '', preferredBrand = '', preferredStore = '',
	 *args, **kwargs):
		'''
		Constructor for initialising the Ingredients class.
		-----	

		**kwargs: Additional keyword arguments to pass to a superclass constructor 


		To do:

		1. 

		'''

		self.name = name_





