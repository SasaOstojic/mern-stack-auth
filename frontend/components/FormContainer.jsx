import {Container, Row, Col} from 'react-bootstrap';



const FormContainer = ({children}) => {
  return (
    <Container>
        <Row className='justify-content-md mt-5'>
            <Col xs={12} md={6} className='card pt-5'>
               {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer