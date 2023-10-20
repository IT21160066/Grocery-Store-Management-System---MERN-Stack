import React from 'react';
import notice_1 from '../images/notice_1.png'
import notice_2 from '../images/notice_2-new.png'
import notice_3 from '../images/notice_3.png'
import '../CSS/notices.css';


import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay,EffectFade, Navigation, Pagination } from "swiper";

export default function Notices(){
    return(
        <div className='notices_container'>
            <Swiper
                spaceBetween={30}
                effect={"fade"}
                loop={true}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                pagination={{
                clickable: true,
                }}
                modules={[Autoplay,EffectFade, Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                <img src={notice_1} />
                </SwiperSlide>
                <SwiperSlide>
                <img src={notice_2} />
                </SwiperSlide>
                <SwiperSlide>
                <img src={notice_3} />
                </SwiperSlide>
            </Swiper>
            
        </div>
    )
}