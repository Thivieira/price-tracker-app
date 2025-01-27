import One from './one';
import Two from './two';
import Three from './three';

export const slides = [
  {
    id: 1,
    body: {
      title: 'Set Price Alerts',
      description: 'Receive alerts when prices drop for your tracked items',
      image: 'price-control-togles',
    },
    render() {
      const { title, description, image } = this.body;
      return <One key={this.id} image={image} title={title} description={description} />
    }
  },
  {
    id: 2,
    body: {
      title: 'Manage Your Portfolio',
      description: 'Never miss a deal with our price tracking system',
      image: 'manage-your-portfolio',
    },
    render() {
      const { title, description, image } = this.body;
      return <Two key={this.id} image={image} title={title} description={description} />
    }
  },
  {
    id: 3,
    body: {
      title: 'Stay Secure',
      description: 'Never miss a deal with our price tracking system',
      image: 'stay-secure',
    },
    render() {
      const { title, description, image } = this.body;
      return <Three key={this.id} image={image} title={title} description={description} />
    }
  }
];