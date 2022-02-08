import environment from "../relay/environment";
import { graphql } from "babel-plugin-relay/macro";
import {loadQuery, usePreloadedQuery} from 'react-relay/hooks';
import { CurrentUserQuery } from "./__generated__/CurrentUserQuery.graphql";
const userQuery = graphql`
    query CurrentUserQuery {
        currentPerson{
            fullName
            email
        }
    }
`;

const preLoadedQuery = loadQuery<CurrentUserQuery>(environment, userQuery, {});

export const CurrentUser = () => {
    const data = usePreloadedQuery(userQuery, preLoadedQuery);

    return (
        <div>
            <p>username: {data.currentPerson?.fullName}</p>
            <p>email: {data.currentPerson?.email}</p>
        </div>
    )
}
