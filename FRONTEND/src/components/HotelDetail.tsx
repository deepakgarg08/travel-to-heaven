import React, { useEffect } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { GiSevenPointedStar } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearSearchState, fetchHotelById } from "../store/hotelSlice";
import { useNavigate } from "react-router-dom";
export const HotelDetail: React.FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { hotelDetails, lang } = useAppSelector((state) => state.hotels);
  console.log('hotelDetails: ', hotelDetails);
  const loremText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  useEffect(() => {
    dispatch(clearSearchState());
    const hotelId: number = +id!;
    dispatch(fetchHotelById(hotelId));
  }, [dispatch, id, lang]);

  return (
    <div className="">
      <div className="hotel_page">
        {hotelDetails[0] ? (
          <>
            <div className="carousel">
              <Carousel fade>
                {hotelDetails[0]?.images!.map((image) => {
                  return (
                    <Carousel.Item key={image.url}>
                      <img className="d-block w-100" src={image.url} alt={image.caption} />
                      <Carousel.Caption>
                        <h3>{image.caption}</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
            <div className="hotel_details">
              <h2>{hotelDetails[0]?.name}</h2>
              <p>{hotelDetails[0]?.address}</p>
              <p>{hotelDetails[0]?.description || loremText }</p>
              <div className="deal d-flex align-items-center">
                <span
                  className="p-1 text-center border"
                  style={{
                    color: "white",
                    backgroundColor: "#7acdf5",
                  }}
                >
                  <GiSevenPointedStar />
                </span>
                {hotelDetails[0].deals?.map((deal) => (
                  <div className="d-flex flex-column" key={deal.headline}>
                    <p className="m-2 text-primary">{deal.headline}</p>
                    <p className="m-2">{deal.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    </div>
  );
};
