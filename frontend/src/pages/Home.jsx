import dc from '../assets/Dick-Clarks.jpg';
import Modal from 'react-modal';
import ReactImageGallery from 'react-image-gallery';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const homePageStyle = {
        background: 'linear-gradient(to bottom, var(--color-dark) 60%, var(--color-light) 40%',
    };

    const aboutPageStyle = {
        background: 'linear-gradient(to bottom, var(--color-dark) 20%, var(--color-light) 20%',
    };

    const images = [
    {
        original: "src/assets/pizza.jpg",
    },
    {
        original: "src/assets/cheese_bread.jpg",
    },
    {
        original: "src/assets/wide_shot.jpg",
    },
    {
        original: "src/assets/birthday.jpg",
    },
    ];

    return (
    <div>
        <div className="w-full flex flex-col items-center justify-center relative overflow-hidden"
             style={homePageStyle}>
            <img src={dc} alt="Picture of Dick Clark's exterior" className="scale-75" />
        </div>
        <div className='home-cards w-full flex md:flex-row items-center justify-center bg-light pb-5'>
            <div className='flex flex-col text-black mx-5'>
                <div className='my-2'>
                    <h1 className="text-2xl py-1">Hours</h1>
                    <p>Sunday: 10:30 a.m. - 8:00 p.m.</p>
                    <p>Monday - Thursday: 10:30 a.m. - 8:30 p.m.</p>
                    <p>Friday - Saturday: 10:30 a.m. - 9:00 p.m.</p>
                </div>
                <div className='my-2'>
                    <h1 className="text-2xl py-1">Location</h1>
                    <p>702 N Prince St</p>
                    <p>Princeton, IN</p>
                    <p>47670</p>
                </div>
                <div className='my-2'>
                    <h1 className="text-2xl py-1">Contact</h1>
                    <a href="tel:+1 812-385-3131">(812) 385-3131</a>
                </div>
            </div>
            <div className='pb-5 mx-5'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.959984402696!2d-87.56703018568953!3d38.36164408232969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8871e1913d487707%3A0x2e4770d38b48af4!2sDick%20Clark&#39;s%20Family%20Restaurant!5e0!3m2!1sen!2sus!4v1751134583573!5m2!1sen!2sus" 
                        className='md:w-120 md:h-120'
                        style={{border: 0}}
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        id="map">
                </iframe>
            </div>
        </div>
        <div className="w-full flex flex-col text-center items-center justify-center bg-dark py-5 text-white">
            <div className='w-3/4'>
                <h1>About Us</h1>
                <p className='py-2 border-b-2'>December 1946, Richard "Dick" Clark opened an ice cream and short orders shop in a small addition next to his uncle's grocery store, Sutton's grocery, located at 702 N. Prince St. The shop quickly evolved into a full dine in/carry out restaurant with a comprehensive menu featuring steaks, spaghetti, homemade pizza, fresh-made sandwiches, premium beer, select wines, and of course, our signature ice cream. Known affectionately to locals as Dick Clark's, our establishment was proudly operated by the Clark Family for 75 years, serving generations of families and becoming a cornerstone of the community. Over the decades, the Clark Family thoughtfully expanded the restaurant to meet growing demand, adding a comfortable meeting room and an expansive banquet facility that can accommodate up to 200 guests for special events, celebrations, and gatherings.</p>
                <p className='py-2 border-b-2'>In 2024, a new chapter began when local entrepreneur John "Asa" Deffendall acquired the restaurant, committed to preserving its rich heritage while bringing fresh energy to this beloved establishment. The new ownership maintains the same dedication to quality, service, and community that made Dick Clark's a local institution, while introducing subtle enhancements to ensure the restaurant continues to delight guests for generations to come.</p>
                <p className='py-2'>Whether you're a longtime regular or first-time visitor, we invite you to experience our warm hospitality and see why Dick Clark's has been the place "where the locals go" for over 75 years. Join us for a meal and become part of our continuing story.</p>
            </div>
        </div>
        <div className="w-full flex flex-col text-center items-center justify-center bg-light py-5 text-black relative overflow-hidden"
        style={aboutPageStyle}>
            <ReactImageGallery items={images} />
            <Link to="/book_a_party" text="Book a Party" className='button mt-4'>Book a Party</Link>
        </div>
    </div>
    );
}

export default Home