import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Image, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import Loader from "../utils/Loader"
import TvCard from "../components/TvCard"


export default function Home() 
{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [current, setCurrent] = useState(0)

    useEffect(() =>     
    {
        const fetchTv = async () =>
        {
            setLoading(true)
            try{
                const response = await axios.get('https://api.tvmaze.com/shows')
                console.log(response)
                setData(response.data)

            }catch(error){
                console.log(error)
                setError(error)
           }finally{
            setLoading(false)
           }
        }
        fetchTv();

    }, [])
console.log('data', data)

const filterRating = data.filter((show) => show.rating.average >= 8.9) 
console.log(filterRating)
console.log(current)

  return (
    <>
    <div className="d-lg-flex">
        <Container className="py-4">
            {/* {filterRating.map((show) => */}
            {filterRating.slice(0, 3).map((show, index) => 
            
            <div key={show.id} className={index === current ? 'bgColorB' : 'textColor'} type='button'>
                <h1 className="text-capitalize" onClick={() => setCurrent(index)}>{show.name}</h1>
                <hr/>

            </div>)}

        </Container>
        <Container className='bgColorB py-4 text-white'>
            {filterRating.slice(0, 3).map((show, index) => (
              <div key={show.id}>
                {index === current && (
                  <>
                    <h1 className='fs-5 fw-bold'>{show.name}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: show.summary.slice(0, 200) + '...',
                      }}
                    />
                    <Link to={`/tvshows/${show.id}`}>See more</Link>
                  </>
                )}
              </div>
            ))}
          </Container>
          <Container className='p-0'>
            {filterRating.slice(0, 3).map((show, index) => (
              <div key={show.id}>
                {index === current && (
                  <div className='imgBox'>
                    <Image src={show.image.original} className='w-100 h-100 ' />
                  </div>
                )}
              </div>
            ))}
          </Container>

    </div>
    <Container className="mt-5 py-3">
        <Row>
            {data.slice(0, 30).map((show) =>
            (
                <Col key={show.id} xs={6} md={4} lg={3}>
                    <TvCard data={show}/>
                </Col>

            ))}
        </Row>

    </Container>
    </>
  )
}


