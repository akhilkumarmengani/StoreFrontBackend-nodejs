import Client from '../database';

type ProductRequest = { name: string, price : number , category : string };

export type Product = {
    id : number,
    name : string,
    price : number,
    category : string 
};

export class ProductStore{
    async index():Promise<Product[]>{
        const sql = 'SELECT * FROM products';
        try{
            const conn = await Client.connect();
            const result = conn.query(sql);
            conn.release();
            return (await result).rows;
        }
        catch(err){
            throw new Error('SHOW Error - '+ err);
        }
        
    }

    async show(id: number): Promise<Product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(product : ProductRequest ): Promise<Product>{
        const sql = 'INSERT INTO products(name,price,category) VALUES($1,$2,$3) RETURNING *';
        try{
            const conn = await Client.connect();
            const result = await conn.query(sql,[product.name,product.price,product.category]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error('CREATE Error - '+ err);
        }
    } 
}