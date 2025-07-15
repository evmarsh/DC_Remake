function Footer ({className}) {
    return (
        <footer className={`inset-x-0 bottom-0 h-25 bg-dark flex flex-col items-center justify-center px-4 pt-2 z-10 ${className}`}>
            <div className='grid grid-cols-2 items-center'>
                <div>
                    <a href="https://www.facebook.com/share/15bkfqHAcg/?mibextid=LQQJ4d" target='_blank'
                    className="social-button p-2 mx-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 71 72"
                        className="social-link scale-125">
                        <path
                        d="M46.4233 38.6403L47.7279 30.3588H39.6917V24.9759C39.6917 22.7114 40.8137 20.4987 44.4013 20.4987H48.1063V13.4465C45.9486 13.1028 43.7685 12.9168 41.5834 12.8901C34.9692 12.8901 30.651 16.8626 30.651 24.0442V30.3588H23.3193V38.6403H30.651V58.671H39.6917V38.6403H46.4233Z"
                         />
                        </svg>
                    </a>
                </div>
                <div>
                    <a href="https://www.google.com/search?sca_esv=75ee9eeb689080db&biw=1536&bih=695&sxsrf=AE3TifPTDxou6bN1_C2MzUsNFoo2-FPU-A:1751136746932&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s0uWZhM0KJFHiZuT6ILJUMbLe14rMYLbc6D7hE7bRJobiWc3joxdBI-5S_mX15hr2kcdcp-e1cYc1TdDFUo1-fPJeRwxrsTkr8vFjzE2Cyzv8bwjcw%3D%3D&q=Dick+Clark%27s+Family+Restaurant+Reviews&sa=X&ved=2ahUKEwj184Pe5JSOAxW2N94AHUZTOekQ0bkNegQIKRAE" target='_blank'
                    className="social-button p-2 mx-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
                        <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className='social-link scale-90' >
                        <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                    </a>
                </div>
            </div>
            <p className="py-2">© 2025 Dick Clark's. All rights reserved.</p>
        </footer>
    )
}

export default Footer