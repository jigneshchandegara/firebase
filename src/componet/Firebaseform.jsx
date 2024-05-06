import { collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { firestore } from "./config"
import { useEffect, useRef, useState } from 'react';

function Firebaseform() {

    let name = useRef();
    let email = useRef();
    let [show, setshow] = useState([]);
    let [updata, setupdata] = useState({});


    //add data
    const save = async () => {
        let obj = {
            name: name.current.value,
            email: email.current.value
        }

        console.log(obj);
        try{
            await setDoc(doc(firestore, "data", `${Date.now()}`), obj, { merge: true });
        }catch(error){
            console.error("Error ADD data document: ", error);
        }
        name.current.value = "";
        email.current.value = "";
    }
    //get all data 
    const getAllData = async () => {
        const allitem = await getDocs(collection(firestore, "data"));
        setshow(allitem.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }


    //delete data
    const deletelocal = async (id) => {
        try {
            await deleteDoc(doc(firestore, "data", id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    //updata data
    const updatavalue = async (e) => {
        setupdata({ ...updata, [e.target.name]: e.target.value })
    }

    const handleupdata = async () => {
        try {
            await updateDoc(doc(firestore, "data", updata.id), updata);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }
    useEffect(() => {
        getAllData()
    }, [])
    return (
        <>
            <p>FIREBASE</p>

            <input type="text" placeholder="enter name" ref={name} />
            <input type="text" placeholder="enter email" ref={email} />
            <button onClick={save}>save</button>

            <table cellpadding="10px" className="col-12 text-center table-bordered  border-secondary">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                        <th>Updata</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        show.map((value, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td><button onClick={() => deletelocal(value.id)}>delete</button></td>
                                    <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setupdata(value)}>Updata</button></td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" name="name" placeholder='enter name' value={updata.name} onChange={updatavalue} required /><br />
                            <input type="text" name="email" placeholder='enter email' value={updata.email} onChange={updatavalue} required /><br />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleupdata} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Firebaseform;
