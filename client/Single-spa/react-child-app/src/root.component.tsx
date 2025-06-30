// export default function Root(props) {
//   return <section>{props.name} is mounted!</section>;
// }

// root.component.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Home from './pages/Home';

export default function Root() {
  return (
    <BrowserRouter basename="/react">
      <Routes>
        <Route path="/cart" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}