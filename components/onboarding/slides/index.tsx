import One from './one';
import Two from './two';
import Three from './three';

export const slides = [
  {
    id: 1,
    body: {
      title: 'Set Price Alerts',
      description: 'Get notified when the market hits your target.',
      image: 'price-control-togles',
    },
    render() {
      const { id, body: { title, description, image } } = this;
      return <One key={id} image={image} title={title} description={description} />
    }
  },
  {
    id: 2,
    body: {
      title: 'Manage Your Portfolio',
      description: 'Keep track of your investments effortlessly.',
      image: 'manage-your-portfolio',
    },
    render() {
      const { id, body: { title, description, image } } = this;
      return <Two key={id} image={image} title={title} description={description} />
    }
  },
  {
    id: 3,
    body: {
      title: 'Stay Secure',
      description: 'Protect your data with our advanced security measures.',
      image: 'stay-secure',
    },
    render() {
      const { id, body: { title, description, image } } = this;
      return <Three key={id} image={image} title={title} description={description} />
    }
  }
];