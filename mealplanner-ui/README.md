# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Meal Planner Version 2
In Version 2 of meal planner,we are using TypeScript and updated version of Relay and using global state managed by Relay.

## New features:

1. Drag and drop is replaced with select and click
2. Search of meals while constructing meal plan is provided.
3. While multiple select of meals is implemented we need to implementing cancelling the selection (deselect).
4. While searching, whichever meal plan is already selected should remain visible and provide the list based on the search criteria.

## List of changes🤘

Upgrading Relay as we are going to use hooks such as PreLoadedQuery as the version 9.1.0 used in the current code doesn’t support.

1. DashBoard
    1. Dashboard component will be simplified by extracting them as different components
        1. QueryRenderer and Refetch container becomes PreloadedQuery in Dashboard component.
        2. The people filter menu will be its own component with its associated fragment.
        3. DeleteDialog - use `@deleteEdge` on the commit mutation to automatically drop the edge and avoid a refetch.
    2. Extract selected person into its own local state. (Implementing state using Relay - commitLocalUpdate and separate graphQL file for state extending the Query type.)
    3. If and when pagination is implemented this client side filter will break i.e. if the record is not present for that user in the first page, but in the subsequent pages, it will show as no records found. So we need to use the condition in graphQL and refetch when the peoplefilter changes.
2. Mealplan page
    1. Create Plan option: a better name would be meal selector.
        1. create plan options - currently lists all meal plans together. Need to implement pagination
        2. When the list grows, it will be difficult to scroll through. Search would need to be implemented
        3. edges → node is not required. Instead just nodes is sufficient. This would reduce one .map function in CreatePlanOptions.
        4. CreateMealOptions defaultProps - remove the onSelectMeals and implement localState.
    2. Meal option - drag and drop requires a long way to drag and drop. As of now can only drag and drop one item at a time. A better approach is to tap to select multiple items and click to drop. 
    3. MealplansToolbar - Currently the problem is when the meal plan is created, the mealplan toolbar is not updated. This can be implemented in the new / duplicate mutations using the `@prependEdge` and `@appendEdge` to automatically add the record to the combo box. We can also use `@refetchable` directives to places where the data requires additional fields.
    4. MealplansToolbar - It unnecessarily queries all the fields on the meal plan while it displays only the meal plan name and the user name. So query needs to be modified to include only the meal plan name and username.
    5. CreatePlanTable - should contain the meal plan entry details for the current meal plan. As of now that part of the query fragment is in MealplansToolbar.
    6. Create a type for global state to include isCreateMPModalOpen, isDuplicateMPModalOpen, createMPConfig, duplicateMPConfig instead of using local state such as newModalOpen and selectedPlan controlled by the toolbar so that eventually we avoid prop drilling. Remove unnecessary states such as alreadySelectedMealAfterNav.
    7. New, Duplicate, Save is as 3 different buttons in the current release. This can all be combined to one. There can be just one modal which gives the option for the new meal plan which offers existing meal plan as template option and the other as from scratch. We can save as an when the meal is getting dropped instead of having a separate save button.
    8. MealplansToolbar - We will use the mealplan ID in the url and avoid using useLocation and useEffect. Instead we can use useParams.
    9. MealPlanAssignment - This assigns users. mutation will move from PlanPage to MealPlanAssignment and eliminating the need of a save button or props drilling. This will also read from the global state.
    10. Duplicate meal plan is going part of new meal plan itself as an option to select mealplan from a template rather than a separate button.
    11. The mutation of NewMealPlanModal is containing mealplan entries which is not available in a new mealplan. We need not query for it. NewMealPlanModal is in MealplanToolbar, but it should be in PlanPage.
    12. In Delete functionality as of now I am doing relay.refetch(). This can be avoided with `@deleteEdge` with connections.
    13. createMealPlanEntry is creating an array of promises and making so many network calls in a single SAVE button click. However we can push those entries to the database as and when it is created. This would eliminate requirement for mealEntryAlreadyExists, mealEntryHasBeenRemoved.
    14. As of now updateAssignment, doDeleteMealPlanEntry, doCreateMealPlanEntry is implemented as different promises and tracked in different states. Instead we can have the actions done right away.
    15. As of now, mealsAtTimes is dealt like a matrix of day and category and hence is passed on to CreateNewMealPlan from PlanPage on save. But this can be sorted in the backend and brought in the view page avoiding bugs created by handling localstate of mealsAtTimes. This removes putMealsAtTime, removeMealsAtTime.
    16. onMealDropped and onMealSelect should have been inside MealTableCell component instead of creating outside and passing on as props. However instead of drag and drop, click at source and then click at the destination would be easier for touch screens and people with accessibility issues. So these functions would not be required. We will create a global state for any meal selected (mealSelected) and while a table cell is clicked on, we will check whether the mealSelected property has a value and create a meal plan entry accordingly.
    17. MealTime is called from CreateMealPlanTable to drop the target. Since we are not going to use drag and drop, we would modify this to access the global state of meal when mealtime component is clicked.
3. Catalog page. We would refactor layout to its component and accept `props.children` and merge catalogue and catalogueGridList into the same component.
    1. Use useQuery hook instead of QueryRenderer component in catalogue (QueryRenderer is in catalogueGridList).
4. When a infoIcon is clicked in the Catalogue page, it opens the link `/meal/id` This link renders the DisplayMeal component reading the route from App.jsx. In DisplayMeal use useQuery hook instead of QueryRenderer.
5. In ShoppingList also use useQuery hook instead of QueryRenderer.


$ npm run relay
$ npm run start
