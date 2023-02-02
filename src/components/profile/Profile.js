import React, { useState } from 'react'
import { connect } from 'react-redux'
import './profileStyle.scss'
import Close from '../images/closeButton.png'
import noImage from '../images/no-image.gif'
import setting from '../images/setting.svg'
import { getUserById, updateUser, updateUserData, delfavoriteTheatres } from '../../actions/index.js'
import { useEffect } from 'react'
import Loading from '../Loading.js'
import redheart from '../images/redheart.png'


function Profile(props) {
    console.log(localStorage.getItem("googleId"))
    console.log(props.userInfo)
    let image;
    let para;
    const [img, setImage] = useState();
    const [preview, setPreview] = useState();
    const [viewImage, setViewIamge] = useState(false)

    if (localStorage.getItem("googleId") && props.userData.image)
        para = "Use Google Image"
    useEffect(() => {
        props.getUserById()
    }, [])


    // Show Big Profile Image
    const changeImage = () =>
        setViewIamge(true)

    // Exist from Profile Page
    const exit = () => {
        props.history.goBack(2)
    }

    // Preview the Image To Upload
    const onImageChange = event => {
        let file = event.target.files[0];
        setImage(file);
        let reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setPreview(reader.result)
        }.bind(reader)
    }

    // Cancel The Image Upload
    const cancelIamge = () => {
        setViewIamge(false)
        setPreview("")
    }

    // To Delete the Image after Upload and Use Google Image instead
    const updateUserData = () => {
        props.updateUserData({ image: null })
        setViewIamge(false)
    }

    // Update User image
    const saveImage = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        if (img) formdata.append("image", img, img.name);
        else
            return setViewIamge(false);
        props.updateUser(formdata);
        setViewIamge(false);
        setPreview("")
    }

    // Check wich image to show
    if (props.userData.image)
        image = props.userData.image
    else if (localStorage.getItem("image"))
        image = localStorage.getItem("image");
    else image = noImage

    // DELETE THEATRE
    const delFromFavorite = (e, id) => {
        console.log(props.userInfo.theatres.theatreId)
        e.preventDefault()
        props.delfavoriteTheatres(id)
        props.getUserById()
    }

    if (props.fetchingData || !props.userInfo) return <Loading />
    return (
        <div className="profile-container" >

            {/* Nav-Bar */}
            <div className="profile-nav" >
                <h3>Profile</h3>
                <div>
                    <img src={Close} alt="exit" onClick={() => exit()} />
                </div>
            </div>
            {viewImage ? <div className="showImage"><img alt="profileImage" src={preview ? preview : image} />
                <form onSubmit={saveImage}>
                    <input type="file" onChange={onImageChange} />
                    <button type="submit">Save</button>
                    <button onClick={() => cancelIamge()}>Cancel</button>
                </form>{para ? <p onClick={() => updateUserData()}> Use Google Image</p> : null}
            </div> : null}

            {/* Header */}
            <div className="header" >
                <div className="profile-image">
                    <img alt="profileImage" src={image} onClick={() => changeImage()} />
                </div>
                <div className="name-setting">
                    <h3>{props.userInfo.username ? props.userInfo.username : props.userInfo.name}</h3>
                    <div className="setting">
                        <img alt="setting" src={setting} />
                        <p>Edit Setting</p>
                    </div>
                </div>
            </div>
            <div className="theatres">
                <h3>FAVORITE THEATERS</h3>
                {props.userInfo.theatres && props.userInfo.theatres.map(theatre => (
                    // <div className = "fav">
                    //     <p>{theatre.theatre}</p>
                    //     <p>{theatre.street}</p>
                    //     <p>{theatre.state}</p>

                    //     <p>{theatre.city}</p>
                    //     <p>{theatre.zip}</p>

                    // </div>
                    <div className='theatre'>
                        <div className="theateraddress">
                            <h2 className='theatre-name'>{theatre.theatre}</h2>

                            <p>{`${theatre.street}, ${theatre.city}, ${theatre.state}, ${theatre.zip}`}</p></div>
                        <div>
                            <img src={redheart} onClick={(e) => delFromFavorite(e, theatre.theatreId)} />


                        </div>




                    </div>
                )

                )}
            </div>

        </div>
    )

}


const mapStateToProps = state => {
    return {
        movieList: state.movieList,
        fetchingData: state.fetchingData,
        userData: state.userData,
        userInfo: state.userInfo
    };
};
export default connect(mapStateToProps, { delfavoriteTheatres, getUserById, updateUser, updateUserData })(Profile);

