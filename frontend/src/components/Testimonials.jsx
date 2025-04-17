import { FaStar } from 'react-icons/fa';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      text: 'I was nervous about traveling alone, but TravelBuddy matched me with the perfect companion. We had an amazing time exploring Japan together!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      text: 'The budget matching feature saved us from so many awkward money conversations. My travel buddy and I were perfectly aligned on spending.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      location: 'Barcelona, Spain',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      text: 'I\'ve made lifelong friends through TravelBuddy. The preference matching is spot on - we all loved the same activities and had similar energy levels.',
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Hear from travelers who found their perfect match on TravelBuddy</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.location}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < testimonial.rating ? 'star-filled' : 'star-empty'} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
