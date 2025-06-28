import Card from '../components/Card';
import dc from '../../public/Dick-Clarks.jpg';

function Home() {
    const homePageStyle = {
        background: 'linear-gradient(to bottom, var(--color-dark) 60%, var(--color-light) 40%',
    };

    return (
    <div>
        <div className="w-full flex flex-col items-center justify-center relative overflow-hidden"
             style={homePageStyle}>
            <img src={dc} alt="Picture of Dick Clark's exterior" className="scale-75 z-10" />
        </div>
        <div className='home-cards w-full flex md:flex-row items-center justify-evenly bg-light'>
            <Card className="mb-10" heading="Our Hours" text={"Hello World!"} />
            <Card className="mb-10"/>
            <Card className="mb-10"/>
        </div>
        <footer>
            
        </footer>
    </div>
    );
}

export default Home