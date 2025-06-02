import { useState } from 'react';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = ({ companyId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      
      const response = await axios.post('https://api.sentryspot.co.uk/api/jobseeker/contact-company', 
        {
          ...formData,
          company_id: companyId
        },
        {
          headers: {
            'Authorization': ` ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.status === 'success' || response.data.code === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        toast.success('Message sent successfully!');
      } else {
        setSubmitStatus('error');
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast.error('Failed to send message. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form onSubmit={handleSubmit}>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {/* End .col */}

          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* End .col */}

          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
            <textarea
              className="darma"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          {/* End .col */}

          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
            <button
              className="theme-btn btn-style-one"
              type="submit"
              name="submit-form"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {/* End .col */}
        </div>
      </form>
    </>
  );
};

export default Contact;
