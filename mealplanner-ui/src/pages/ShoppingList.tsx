import {
  Button,
  Checkbox,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router";
import { ShoppingListQuery } from "./__generated__/ShoppingListQuery.graphql";
import { Print } from "@mui/icons-material";
import moment from "moment";

// const query = graphql`
//   query ShoppingListQuery($rowId: BigInt!) {
//     # mealPlan (id:"WyJtZWFscyIsMV0="){
//     mealPlan(rowId: $rowId) {
//       nameEn
//       descriptionEn
//       person {
//         fullName
//       }
//       shoppingList {
//         nodes {
//           unit
//           quantity
//           productId
//           productName
//           product {
//             price
//             quantity
//             unit
//           }
//         }
//       }
//     }
//   }
// `;

export const ShoppingList = () => {
  return <div>Under construction 🚧</div>
  // const { id } = useParams();
  // console.log("trying ShoppingList");
  // const data = useLazyLoadQuery<ShoppingListQuery>(query, { rowId: id });
  // const { mealPlan } = data;
  // let totalPrice = 0;
  // if (mealPlan == null || mealPlan == undefined) {
  //   return <p>Meal plan is not found.</p>;
  // }

  // mealPlan.shoppingList.nodes.forEach((item) => {
  //   totalPrice += Number(item.product?.price);
  // });

  // return (
  //   <>
  //     <Grid container spacing="5" sx={{ padding: "2rem" }}>
  //       <Grid xs={12}>
  //         <Typography variant="caption" sx={{ mr: 5 }}>
  //           {mealPlan.person && `Prepared for ${mealPlan.person.fullName}`}
  //         </Typography>
  //         <Typography variant="caption">
  //           Week {moment().startOf("week").format("MMMM DD")} -{" "}
  //           {moment().endOf("week").format("MMMM DD")}
  //         </Typography>
  //       </Grid>

  //       <Grid item xs={8}>
  //         <Typography variant="h4">
  //           {mealPlan.nameEn} <br />
  //           Shopping List &nbsp;
  //           <Button
  //             onClick={() => {
  //               window.print();
  //             }}
  //           >
  //             <Print></Print>
  //           </Button>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={4}>
  //         <Typography sx={{ textAlign: "center" }}>
  //           Estimate
  //           <Typography variant="h2">${totalPrice.toFixed(2)}</Typography>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={12}>
  //         <Typography variant="caption">{mealPlan.descriptionEn}</Typography>
  //       </Grid>
  //       <TableContainer>
  //         <Table>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell style={{ color: "#000" }}>Bought?</TableCell>
  //               <TableCell style={{ color: "#000" }}>
  //                 Item/Description
  //               </TableCell>
  //               <TableCell style={{ color: "#000" }}>Quantity/Unit</TableCell>
  //               <TableCell style={{ color: "#000" }}>Price</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           {/* <ul className={classes.ul}> */}
  //           {mealPlan.shoppingList.nodes.map(function (item) {
  //             return (
  //               <TableRow key={item.productId}>
  //                 <TableCell>
  //                   <Checkbox checked={false} />
  //                 </TableCell>
  //                 <TableCell>
  //                   {item.productName}
  //                   <p>
  //                     {item.quantity} {item.unit}
  //                   </p>
  //                 </TableCell>
  //                 <TableCell>
  //                   {item.product?.quantity} {item.product?.unit}
  //                 </TableCell>
  //                 <TableCell>{item.product?.price}</TableCell>
  //               </TableRow>
  //             );
  //           })}
  //         </Table>
  //       </TableContainer>
  //     </Grid>
  //   </>
  // );
};
