import Card from '../components/Card';
import dc from '../assets/Dick-Clarks.jpg';

function Home() {
    const homePageStyle = {
        background: 'linear-gradient(to bottom, var(--color-dark) 60%, var(--color-light) 40%',
    };

    return (
    <div>
        <div className="w-full mt-12 flex flex-col items-center justify-center relative overflow-hidden"
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
        <footer className='inset-x-0 bottom-0 h-16 bg-dark flex flex-row items-center justify-center px-4 z-10'>
            <div className='grid grid-cols-2 items-center'>
                <div>
                    <a href="https://www.facebook.com/share/15bkfqHAcg/?mibextid=LQQJ4d" target='_blank'
                    className="facebook p-2 mx-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 71 72"
                        className="facebook-link scale-125">
                        <path
                        d="M46.4233 38.6403L47.7279 30.3588H39.6917V24.9759C39.6917 22.7114 40.8137 20.4987 44.4013 20.4987H48.1063V13.4465C45.9486 13.1028 43.7685 12.9168 41.5834 12.8901C34.9692 12.8901 30.651 16.8626 30.651 24.0442V30.3588H23.3193V38.6403H30.651V58.671H39.6917V38.6403H46.4233Z"
                         />
                        </svg>
                    </a>
                </div>
                <div>
                    <a href="https://www.google.com/search?sca_esv=75ee9eeb689080db&biw=1536&bih=695&sxsrf=AE3TifPTDxou6bN1_C2MzUsNFoo2-FPU-A:1751136746932&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s0uWZhM0KJFHiZuT6ILJUMbLe14rMYLbc6D7hE7bRJobiWc3joxdBI-5S_mX15hr2kcdcp-e1cYc1TdDFUo1-fPJeRwxrsTkr8vFjzE2Cyzv8bwjcw%3D%3D&q=Dick+Clark%27s+Family+Restaurant+Reviews&sa=X&ved=2ahUKEwj184Pe5JSOAxW2N94AHUZTOekQ0bkNegQIKRAE" target='_blank'
                    className="google p-2 mx-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
                        <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className='google-link scale-90' >
                        <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                    </a>
                </div>
            </div>
        </footer>
    </div>
    );
}

export default Home