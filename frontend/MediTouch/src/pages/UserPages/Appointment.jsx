import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { FaCalendarAlt, FaUserMd, FaSearch, FaArrowRight, FaEnvelope, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedDoctors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/doctors/approved/');
        const doctorsData = response.data.approved_doctors || [];

        const validatedDoctors = doctorsData.map(doctor => ({
          ...doctor,
          specialization: doctor.specialization || 'General'
        }));
        
        setApprovedDoctors(validatedDoctors);
        setFilteredDoctors(validatedDoctors);
        setLoading(false);
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        setLoading(false);
        console.error('Error fetching doctors:', err);
      }
    };

    fetchApprovedDoctors();
  }, []);

  useEffect(() => {
    const results = approvedDoctors.filter(doctor => {
      const firstName = doctor.first_name?.toLowerCase() || '';
      const lastName = doctor.last_name?.toLowerCase() || '';
      const specialization = doctor.specialization?.toLowerCase() || '';
      
      return (
        firstName.includes(searchTerm.toLowerCase()) ||
        lastName.includes(searchTerm.toLowerCase()) ||
        specialization.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredDoctors(results);
  }, [searchTerm, approvedDoctors]);

  const handleBookAppointment = (doctorId) => {
    if (!selectedDate) {
      alert('Please select a date first');
      return;
    }
    navigate(`/book-appointment/${doctorId}?date=${selectedDate}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Book an Appointment
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Select from our approved specialists
          </p>
        </div>

        {/* Search and date picker */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-end">
          {/* Search */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-10 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search doctors by name or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Date Picker */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 right-10 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400 right-20" />
            </div>
            <input
              type="date"
              className="block w-full pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <FaUserMd className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Dr. {doctor.first_name || 'Unknown'} {doctor.last_name || ''}
                      </h3>
                      <p className="mt-1 text-sm text-blue-600">
                        {doctor.specialization || 'General Practitioner'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaEnvelope className="flex-shrink-0 mr-2" />
                      <span>{doctor.email || 'Email not available'}</span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <FaGraduationCap className="flex-shrink-0 mr-2" />
                      <span>Verified Specialist</span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="flex-shrink-0 mr-2" />
                      <span>Approved on: {new Date(doctor.approved_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={() => handleBookAppointment(doctor.id)}
                      disabled={!selectedDate}
                      className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${selectedDate ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      Book Appointment <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No doctors found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try a different search term' : 'No approved doctors available at the moment'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
