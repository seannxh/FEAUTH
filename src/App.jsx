import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import everythingh in the authservice
import HootList from './components/HootList'
import { Show, index, Create, createComment, deleteHoot  } from './services/hootService' 
import HootDetails from './components/HootDetails/HootDetails.jsx'
import HootForm from './components/HootForm/hootform.jsx'


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await index();
      console.log('hootsData: ', hootsData);
      setHoots(hootsData);
    }
    if (user) fetchAllHoots();
  }, [user]); //


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddHoot = async (formData) => { //new
    //we need something that does the creation of the hoot
    const newHoot = await create(formData)
    setHoots([ newHoot, ...hoots])

    console.log(formData);
    navigate('/hoots');
  }

  const handleDeleteHoot = async (hootId) =>{
    console.log('hootId' ,hootId)

    //we want to delete the hoot from the database BE
    await deleteHoot(hootId)
    //we want to remove the hoot from the /hoot page FE
    setHoots(hoots.filter((hoot) => { return (
      hoot._id !== hootId
    )}))

    //we want to navigate to the /hoot page FE
    navigate('/hoots');
  }

  const handleUpdateHoot = async (hootId, hootFormData) => {
    //we want to update the hoot from the database BE
    const updatedHoot = await update(hootId, hootFormData)
    
    //we want to update the hoot from the /hoot page FE
    console.log(updatedHoot)
    setHoots(hoots.map((hoot) => {
      return (  hootId === hoot._id ? updatedHoot : hoot )
    }))
    //we want to navigate to the /hoot page FE
    navigate('/hoots');
}

console.log(hoots)


  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path='/hoots' element={<HootList hoots={hoots} />} />
              <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot}/>} /> {/**prop here */}
              <Route path='/hoots/:hootId' element={<HootDetails handleDeleteHoot={handleDeleteHoot}/>} />
              <Route path="/hoots/:hootId/edit" element={<HootForm handleUpdateHoot={handleUpdateHoot}/>} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;