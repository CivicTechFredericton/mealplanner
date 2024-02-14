import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay/hooks";
import { CurrentUserQuery } from "./__generated__/CurrentUserQuery.graphql";
const userQuery = graphql`
    query CurrentUserQuery {
        currentPerson{
            fullName
            email
            role
        }
    }
`;

export const CurrentUser = () => {
    const data = useLazyLoadQuery<CurrentUserQuery>(
        userQuery, 
        {}, 
        {
        fetchPolicy: 'store-or-network'
        }
    );

    return (
        <div>
            <p>username: {data.currentPerson?.fullName}</p>
            <p>email: {data.currentPerson?.email}</p>
        </div>
    )
}
