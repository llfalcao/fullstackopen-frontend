import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Unicafe from './pages/Unicafe';
import Anecdotes from './pages/Anecdotes';
import Courses from './pages/Courses';
import Notes from './pages/Notes';
import Phonebook from './pages/Phonebook';
import PhonebookInfo from './pages/PhonebookInfo';
import Countries from './pages/Countries';
import Blogs from './pages/Blogs';

const Header = () => {
  return <Link to="/fullstackopen-frontend">Home</Link>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/fullstackopen-frontend">
          <Route index element={<Home />} />
          <Route path="unicafe" element={<Unicafe />} />
          <Route path="anecdotes" element={<Anecdotes />} />
          <Route path="courses" element={<Courses />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="notes" element={<Notes />} />
          <Route path="phonebook">
            <Route index element={<Phonebook />} />
            <Route path="info" element={<PhonebookInfo />} />
          </Route>
          <Route path="countries" element={<Countries />} />
        </Route>
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
