import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';

const ProductsInner = (props) => {
    return (
        <>
        <h2>Products of Meal Plan</h2>
        <ul>
           {props.productsFragment.products.nodes.map((p)=> (
               <>
               <li>Product Name {p.nameEn}</li>
               <li>Product ID {p.rowId}</li>
               <li>Product tags {JSON.stringify(p.tags)}</li>
               </>
           )
           )}
        </ul>
        </>

    )
};

const Products = createFragmentContainer(ProductsInner, 
{productsFragment: graphql`
    fragment products_productsFragment on Query {
        products {
            nodes {
                id
                rowId
                nameEn
                tags
            }
        }
    }
`});

export default Products;