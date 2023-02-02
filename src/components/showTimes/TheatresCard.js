import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import './showtime.scss'
import { addfavoriteTheatres, delfavoriteTheatres, getUserById } from '../../actions/index.js'
import whiteheart from '../images/whiteheart.png'
import redheart from '../images/redheart.png'
import { useEffect } from 'react'
import { displayImage } from '../TheatersImages'



const TheatresCard = props => {
    const [userTheater, setUserTheatre] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)
    const [firstTime, setFirstTime] = useState(true)
    // console.log(props.getTheater.location)
    const theatre = props.theatres.filter(thea => thea.theatreId == props.show.id)
    useEffect(() => {
        let theater
        if (props.userInfo && firstTime) {
            theater = props.userInfo.theatres.filter(theat => theat.theatreId == props.show.id)
            setUserTheatre(theater)
            setFirstTime(false)
            if (theater.length > 0)
                setIsFavorite(true)
        }

    }, [])


    const addToFavorite = () => {
        console.log(theatre)
        props.addfavoriteTheatres(theatre)
        // props.getUserById()
        setIsFavorite(true)
    }

    const delFromFavorite = () => {
        props.delfavoriteTheatres(props.show.id)
        // props.getUserById()
        setIsFavorite(false)
    }


    console.log(props)
    return (
        <div className={props.ind > 0 ? "black-bg theatre" : 'theatre'}>

            <div className='all-theater-info'>

                <img src={displayImage(props.show.theatre)} className='theater-logo' alt={props.show.theatre} />
                    

                <div className="theateraddress">
                    <h2 className='theatre-name'>{props.show.theatre}</h2>

                    <p>{`${theatre[0].location.address.street}, ${theatre[0].location.address.city}, ${theatre[0].location.address.state}, ${theatre[0].location.address.postalCode}`}</p>

                </div>
                
            </div>
                
            {(localStorage.getItem("googleId") || localStorage.getItem("userId")) ?
                <div className="hearticon">{isFavorite ? <img src={redheart} onClick={() => delFromFavorite()} /> :
                    <img src={whiteheart} onClick={() => addToFavorite()} />}

                </div> : null

            }

            
        </div>
    )


}
const mapStateToProps = state => {
    return {
        fetchingData: state.fetchingData,
        theatres: state.theatres,
        userData: state.userData,
        userInfo: state.userInfo
    };
};

export default connect(mapStateToProps, { addfavoriteTheatres, delfavoriteTheatres, getUserById })(TheatresCard);