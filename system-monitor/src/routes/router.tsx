import { createHashRouter } from 'react-router';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Processes from '../pages/Processes';
import Performance from '../pages/Performance';
import Theme from '../pages/Theme';

const router = createHashRouter([
  {
    Component: Layout,
    children: [
      { path: '/', Component: Home },
      { path: '/processes', Component: Processes },
      { path: '/performance', Component: Performance },
      { path: '/theme', Component: Theme },
    ],
  },
]);

export default router;
