import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import environment from './environment';
import MealPlans from './mealplans';
import Products from './products';

const query = graphql`
    query appQuery {
        currentPerson {
            id
            fullName
        }
        ...mealplans_mealPlansFragment
        ...products_productsFragment
    }
`;

const renderApp = ({error, props}) => {
    if(error) {
        console.log(error);
        return <div>Something went wrong..</div>;
    }
    if(!props) {
        return <div>Loading...</div>;
    }
    console.log(props);
    return (<div>
        User name: {props.currentPerson.fullName}
        <MealPlans mealPlansFragment={props} />
        <Products productsFragment={props} />
    </div>);
}

const App = () => (
    <QueryRenderer
        environment={environment}
        query={query}
        variables={{}}
        render = {renderApp}
    />
);

export default App;