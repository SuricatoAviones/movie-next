import { promises as fs } from 'fs'
import path from 'path'

const productsFilePath = path.join(process.cwd(), 'const', 'products.json')

async function readProducts() {
    const fileContents = await fs.readFile(productsFilePath, 'utf8')
    return JSON.parse(fileContents)
}

export default async function handler(req, res) {
    if(req.method !== 'GET') {
        return res.status(405).json({ message: 'Metodo no permitido' })
    }

    try{
        const products = await readProducts()
        const { id } = req.query

        if(id) {
            const productId = Number(id)

            if(Number.isNaN(productId)) {
                return res.status(400).json({ message: 'El id debe ser numerico' })
            }

            const product = products.find((item) => item.id === productId)

            if(!product) {
                return res.status(404).json({ message: 'Producto no encontrado' })
            }

            return res.status(200).json(product)
        }

        return res.status(200).json(products)
    } catch(error) {
        return res.status(500).json({ message: 'Error al obtener los productos' })
    }
}