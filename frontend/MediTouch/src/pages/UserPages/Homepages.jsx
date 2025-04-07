import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../components/UserComponents/HeroSection";
import axios from "axios";

const Homepages = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/allmedicine")
      .then((res) => {
        setData(res.data.slice(0, 4)); // Only keep the first 4 products
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddToCart = (id) => {
    navigate(`/product/${id}`);
  };

  const [approvedDoctors, setApprovedDoctors] = useState([]);

  useEffect(() => {
    const fetchApprovedDoctors = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/doctors/approved/"
        );
        setApprovedDoctors(response.data.approved_doctors || []);
      } catch (error) {
        console.error("Error fetching approved doctors:", error);
      }
    };

    fetchApprovedDoctors();
  }, []);

  return (
    <div>
      <HeroSection />

      <div className="font-[sans-serif] bg-gray-100">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            Medicine
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {data.map((item) => (
              <div
                className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative"
                key={item.id}
              >
                {/* Wishlist Icon */}
                <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    className="fill-gray-800 inline-block"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>

                {/* Product Image */}
                <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                  <img
                    src={item.image}
                    alt={item.medicine_name}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div>
                  <h3 className="text-lg font-extrabold text-gray-800">
                    {item.medicine_name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {item.description}
                  </p>
                  <h4 className="text-lg text-gray-800 font-bold mt-4">
                    Rs. {item.price}
                  </h4>

                  {/* Add to Cart Button */}
                  <button
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-300 transition duration-300"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    View Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                Our Doctors
              </h2>
              <p className="text-gray-600 mb-12">
                Meet some of our verified and experienced medical professionals
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {approvedDoctors.slice(0, 3).map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center"
                  >
                    <div className="relative w-24 h-24 mb-4">
                      <div className="w-full h-full rounded-full border-4 border-blue-100 flex items-center justify-center bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-blue-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0C9.79 0 8 1.79 8 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 12c-3.31 0-6-2.69-6-6v-1h2v1c0 2.21 1.79 4 4 4s4-1.79 4-4v-1h2v1c0 3.31-2.69 6-6 6z" />
                        </svg>
                      </div>

                      <div className="absolute -bottom-2 -right-2 bg-blue-600 p-1 rounded-full shadow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800">
                      Dr. {doctor.first_name} {doctor.last_name}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm mt-1">
                      {doctor.specialization || "General Practitioner"}
                    </p>
                    <span className="text-gray-400 text-xs mt-1">
                      Verified Doctor
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Homepages;
