import React from 'react'
import { Button, Card } from 'react-bootstrap'

function ProductCards({products}) {
  return <>
    {
        products.length && products.map((e,i) => {
            return <>
                <Card style={{ width: '18rem' }} key={i}>
                    <Card.Img variant="top" src={e.image} height={250}/>
                    <Card.Body>
                        <Card.Title>{e.name}</Card.Title>
                        <Card.Text>{e.price}</Card.Text>
                        <Button variant="primary">Add to cart</Button>
                    </Card.Body>
                </Card>
            </>
        })
    
    }
  </>
}

export default ProductCards