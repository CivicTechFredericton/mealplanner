import React from 'react';
import { PropTypes } from 'prop-types';

const StarRating = (props) => {

    const {halfStars} = props;

    return (
        <>
        {[...Array(Math.floor(halfStars/2))].map((e, i) => 
            <svg x="0px" y="0px" width="42px" height="42px" viewBox="0 0 122.88 116.864" enable-background="new 0 0 122.88 116.864" xmlSpace="preserve">
                <g>
                    <polygon fill-rule="evenodd" clip-rule="evenodd" fill="gold"
                    points="61.44,0 78.351,41.326 122.88,44.638 88.803,73.491 99.412,116.864 61.44,93.371 23.468,116.864 34.078,73.491 0,44.638 44.529,41.326 61.44,0"/>
                </g>
            </svg>)}
        {halfStars % 2 && // append a half star if halfStars is an odd number
            <svg x="0px" y="0px" width="21px" height="42px" viewBox="0 0 61.44 116.864" enable-background="new 0 0 61.44 116.864" xmlSpace="preserve">
                <g>
                    <polygon fill-rule="evenodd" clip-rule="evenodd" fill="gold"
                    points="61.44,0 78.351,41.326 122.88,44.638 88.803,73.491 99.412,116.864 61.44,93.371 23.468,116.864 34.078,73.491 0,44.638 44.529,41.326 61.44,0"/>
                </g>
            </svg>
        }
        </>
    );
  };
  
  StarRating.propTypes = {
    halfStars: PropTypes.number.isRequired
  };
  
  export default StarRating;