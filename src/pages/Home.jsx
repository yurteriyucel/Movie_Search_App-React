import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen text-white">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={1000}
      >
        {/* Image-1 */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWUlMjBwb3N0ZXJzfGVufDB8fDB8fHww"
            alt="image-1"
            className="h-screen object-cover w-full"
          />
        </div>

        {/* Image-2 */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1638245776882-6c6633856b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYwfHxtb3ZpZSUyMHBvc3RlcnN8ZW58MHx8MHx8fDA%3D"
            alt="image-2"
            className="h-screen object-cover w-full"
          />
        </div>

        {/* Image-3 */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1565265491739-fc30b45f896a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fG1vdmllcG9zdGVyc3xlbnwwfHwwfHx8MA%3D%3D"
            alt="image-3"
            className="h-screen object-cover w-full"
          />
        </div>

        {/* Image-4 */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1709127129179-d6b06e0265be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fG1vdmllJTIwcG9zdGVyc3xlbnwwfHwwfHx8MA%3D%3D"
            alt="image-4"
            className="h-screen object-cover w-full"
          />
        </div>
      </Carousel>
      {/* Explore buttons */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded text-center md:top-[75%]">
        <Link
          to={"/movies"}
          className="text-white bg-red-600 rounded px-3 py-2 md:px-5 hover:bg-white hover:text-gray-800 hover:font-semibold transition-all duration-300 hover:scale-105"
        >
          Explore Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
