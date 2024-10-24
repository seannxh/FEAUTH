const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`;
//import.meta.env is process.env and whatever the .env name file is 

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json();
    } catch (err) {
        console.log(err)
    }
}

const Show = async (hootId) => {
    try{
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json();
    }catch(err){
        console.log(err)
    }
}

 const Create = async (hootFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(hootFormData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        return res.json();
    } catch (error) {
        console.log(error)
    }
}
const createComment = async (hootId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
            method: 'POST',
            body: JSON.stringify(commentFormData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(res)
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

const deleteHoot = async (hootId) => {
    try {
      const res = await fetch(`${BASE_URL}/${hootId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  //lets create a function that allows us to update the hoot
const update = async (hootId, hootFormData)=> {
    try{
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hootFormData)
        })
    }catch(err) {
        console.log(err)
    }
}
export { index, Show, Create, createComment,deleteHoot, update }

