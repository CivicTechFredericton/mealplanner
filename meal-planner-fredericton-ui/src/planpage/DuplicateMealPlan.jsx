import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Button } from '@material-ui/core';
import { commitMutation } from 'relay-runtime';
import environment from '../relay-environment';

const duplicatePlanMutation = graphql`
mutation DuplicateMealPlanMutation(
    $mealPlanId: BigInt!,
    $pId: BigInt!
) {
    duplicateMealPlan(input: {mealplanId: $mealPlanId, pId: $pId}) {
    mealPlan {
        id
        personId
        rowId
        nameEn
        nameFr
        descriptionEn
        descriptionFr
        person {
            id
            rowId
	        fullName
        }
        mealPlanEntries {
            nodes {
                id
                rowId
                days
                category
                meal {
                  id
                  rowId
                  nameEn
                  nameFr
                  descriptionEn
                  descriptionFr 
                }
            }
        }
    }
}
}
`;


function duplicatePlan(mealPlanId, pId) {
    return new Promise((resolve, reject) => {
        commitMutation(
            environment,
            {
                mutation: duplicatePlanMutation,
                variables: { mealPlanId, pId },
                onCompleted: (response, errors) => {
                    if (errors) {
                        reject(errors);
                        return;
                    }
                    const mealPlan = response.duplicateMealPlan.mealPlan;
                    resolve(mealPlan);
                },
                onError: (err) => {
                    reject(err);
                }
            }
        );
    });
}

export default function DuplicateMealPlan(props) {
    console.log("duplicate plan props", props.selectedPlan, props.assignedPersonId);
    async function handleClick() {
        //setDuplicate(true);
        console.log("Triggering duplicate plan ", props.selectedPlan.rowId, props.assignedPersonId.rowId);
        const mealPlan = await duplicatePlan(props.selectedPlan.rowId, props.assignedPersonId.rowId);
        console.log('Duplicate Meal Plan', mealPlan);
        props.setSelectedPlan(mealPlan);
    }
    //const [duplicate, setDuplicate] = useState(false);
    return (
        <div>
            <Button color="primary" onClick={handleClick}> Duplicate </Button>
        </div>
    );
}