import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import '../CSS/home.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import carousel_image1 from '../images/home_img_1.png'
import carousel_image2 from '../images/home_img_2.png'
import wave from '../images/wave.png'
import Carousel from './Carousel';
import Notices from './Notices';
import loadingAnimation1 from '../animations/loading_animation1.json'
import Lottie from "lottie-react";
import axios from 'axios';
import Product from './Product';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home(){

    const styles = {backgroundImage:wave}

    const [vegitables, setVegitable] = React.useState([]);
    const [load, setLoad] = React.useState(true)

    React.useEffect(()=>{
        function fetchAllData(){
            axios.get('http://localhost:8071/item/')
            .then((res)=>{
                setVegitable(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[])
    

    function myFunction() {
        setLoad(false)
    }

    function sayHello(){
        toast.success('Hello!');
    }

    function sayBye(){
        toast('bye!');
    }

    const toastId = React.useRef(null);

    const notify = () => toastId.current = toast("Hello", { autoClose: false });

    const update = () => toast.update(toastId.current, { type: toast.TYPE.INFO, autoClose: 5000 });

    return(
        <div className='home_container' onLoad={myFunction}>
            <ToastContainer  />
           {
                load&&<div id='loadingAnimation_home'>
                    <Lottie animationData={loadingAnimation1}/>
                </div>
            }
            <hr></hr>
            <Carousel/>

            {/* Horizontal line with text */}
            <div className='section_title'>
                <div className='section_title_line'>

                </div>
                <div className='section_title_text'>
                    <span>Vegetables</span>
                </div>
                <div className='section_title_line'>

                </div>
            </div>

            <div className='show_vegitableslist' >
                {/* <img src={wave}/> */}
            {vegitables.filter((thing)=>{
                        return thing.category.toLowerCase().includes('vegitable');
                    }).map((thing)=>{
                    return  <Product 
                                key={thing._id}
                                data = {thing}
                                
                            />
                })}
                
            </div>
            
            <div className='section_title'>
                <div className='section_title_line'>

                </div>
                <div className='section_title_text'>
                    <span>Notices</span>
                </div>
                <div className='section_title_line'>

                </div>
            </div>

            {/* Notices Component */}
            <Notices/>
            

            <div className='section_title'>
                <div className='section_title_line'>

                </div>
                <div className='section_title_text'>
                    <span>Fruits</span>
                </div>
                <div className='section_title_line'>

                </div>
            </div>
            <div className='show_vegitableslist'>
                {vegitables.filter((thing)=>{
                            return thing.category.toLowerCase().includes('fruit');
                        }).map((thing)=>{
                        return  <Product 
                                    key={thing._id}
                                    data = {thing}
                                    
                                />
                    })
                    }
            </div>
            {/* <button onClick={sayHello}>hello</button> */}
            {/* <button onClick={sayBye}>bye</button> */}

            {/* <div>
                <button onClick={notify}>Notify</button>
                <button onClick={update}>Update</button>
            </div> */}
        </div>
    )  
}