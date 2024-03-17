import fs from "fs/promises";
import pgp from "pg-promise";

const productsJSON = "products-all-items.json";

type ProductType = {
  availability: string;
  brand: string;
  id: string;
  badges: string[];
  image: string;
  sponsored: boolean;
  manufacturer: string;
  name: string;
  price: number;
  priceCurrency: string;
  rating: {
    averageRating: number;
    numberOfReviews: number;
  };
  seller: string;
  url: string;
  product_keywords: string[];
  quantity: number;
  unit: string;
};
const pgpMain = pgp();
const db = pgpMain(process.env.DB_URL!);

const importProducts = async (fileName: string) => {
  const data = await fs.readFile(fileName);
  const products: ProductType[] = JSON.parse(data.toString());
  for (const product of products) {
    // insert into product table
    const productRec = await db.one(
      `INSERT INTO app.product(
        name_en,
        price,
        quantity,
        unit,
        upc,
        source_url,
        image_url,
        product_keywords
        ) 
        VALUES(
            $1, $2, $3, $4, $5, $6, $7, $8
        ) RETURNING *
        `,
      [
        product.name,
        product.price,
        product.quantity || 0,
        product.unit || "none",
        product.id,
        product.url,
        product.image,
        product.product_keywords,
      ]
    );
  }
};

await importProducts(productsJSON);
