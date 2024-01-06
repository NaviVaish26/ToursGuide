import { useEffect, useState } from 'react';
import Tours from './components/Tours';
import Loading from './components/Loading';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [tours, setTours] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) return;
      const tours = await response.json();
      setTours(tours);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (tours.length === 0 || !tours) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button
            type='button'
            style={{ marginTop: '2rem' }}
            className='btn'
            onClick={fetchTours}
          >
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <div>
      <main>
        {isLoading ? (
          <Loading />
        ) : (
          <Tours tours={tours} removeTour={removeTour} />
        )}
      </main>
    </div>
  );
};
export default App;
