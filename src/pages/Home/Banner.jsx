import banner from '../../assets/img/banner.avif'

const Banner = () => {
    return (
        <div>
            <img className='max-h-[500px] w-full' src={banner} alt="" />
        </div>
    );
};

export default Banner;