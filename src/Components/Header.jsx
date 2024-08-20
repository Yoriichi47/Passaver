import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";

const Header = () => {
  // Decalring a state to store input variables, the state is empty initially
  const [submission, setsubmission] = useState({
    use: "",
    username: "",
    password: "",
  });

  // Decalring a state to store the password array, and it is used to store the passwords 
  const [passwordArr, setpasswordArr] = useState([]);


  // Function to get the passwords from the server
  const getPass = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setpasswordArr(passwords);
  }


  // useEffect hook to get the passwords from the server
  useEffect(() => {
    getPass();
  }, []);


  // Function to change the state of the input variables nad store them in the state
  const handleChange = (e) => {
    setsubmission({ ...submission, [e.target.name]: e.target.value });
  };


  // Function to add the submission to the password array and also to the server
  const addSubmission = async () => {
    setpasswordArr([...passwordArr, {...submission, id: uuidv4()}]);
    
    // Deletes the entry if it already exists(Used while updating the password)
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: submission.id}),
    }); 


    // Adds the new entry to the server
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...submission, id: uuidv4()}),
    });

    //Resets the input variables using the state
    setsubmission({use: "", username: "", password: ""});
  };


  // Function to edit the password
  const editPass = async (id) => {
  // Sets the input fields to the selected password
  setsubmission({...passwordArr.filter((item) => item.id === id)[0], id: id})

  // Deletes the selected password from the server
  setpasswordArr(passwordArr.filter((item) => item.id !== id));
 }

  // Function to delete the password 
  const delPass = async (id) => {
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: id}),
    }); 

    //Deletes the entry from server and also from the state
    setpasswordArr(passwordArr.filter((item) => item.id !== id) 
    )
  }


  // Function to copy the text to the clipboard
  const copyText = (Text) => {
    navigator.clipboard.writeText(Text);
  };


  // Function to show the password while storing it
  const showPass = () => {
    const show = document.getElementById("pass");
    if (show.type === "password") {
      show.type = "text";
    } else {
      show.type = "password";
    }
  };

  return (
    <>
      <div className="border-2 bg-gradient-to-r from-pink-300 shadow-xl shadow-indigo-300 via-blue-100 to-violet-300 container m-auto rounded-[12px] lg:rounded-[32px] lg:my-[60px]">
        <div className=" p-2 lg:p-4">
          <input
            type="text"
            onChange={handleChange}
            name="use"
            minLength={3}
            placeholder="Enter the usage..."
            value={submission.use}
            className="border hover:bg-gray-100 transition-all duration-200 w-full focus:outline-none bg-white border-gray-900 lg:py-1 px-2 lg:px-4 rounded-lg lg:rounded-full"
          />
          <div className="flex mt-2 lg:mt-4 justify-around gap-2">
            <input
              type="text"
              onChange={handleChange}
              name="username"
              minLength={3}
              placeholder="Username"
              value={submission.username}
              className="border hover:bg-gray-100 transition-all duration-200 focus:outline-none w-1/2 px-2 lg:px-4 lg:py-1 bg-white border-gray-900 rounded-lg lg:rounded-full"
            />
            <div className=" w-1/2 flex">
              <input
                type="password"
                onChange={handleChange}
                minLength={8}
                name="password"
                placeholder="Password"
                value={submission.password}
                id="pass"
                className="border hover:bg-gray-100 transition-all duration-200 px-2 lg:px-4 rounded-r-none focus:outline-none w-full lg:py-1 bg-white border-gray-900 rounded-l-lg lg:rounded-l-full"
              />
              <button
                className="border border-gray-900 rounded-r-lg lg:rounded-r-full p-1 border-l-0 bg-white transition-all duration-200 hover:bg-gray-900 hover:text-white"
                onClick={showPass}
              >
                <FaEye />
              </button>
            </div>
          </div>
        </div>
        <div className="flex mx-auto w-fit rounded-lg lg:rounded-3xl justify-between mb-2 lg:mb-3 border bg-white border-gray-900 hover:bg-gray-600 transition-all text-gray-400 hover:border-black hover:text-white duration-200">
          <button onClick={addSubmission} className="px-3 lg:px-5 lg:py-1  mx-auto">
            Add
          </button>
        </div>
      </div>

      <div className="mt-[100px]">
        <table className="table-auto w-full">
          <thead className="from-cyan-400 to-violet-400 bg-gradient-to-bl text-center">
            <tr>
              <th className="border text-sm lg:text-base">Usecase</th>
              <th className="border text-sm lg:text-base w-1/4">Username</th>
              <th className="border text-sm px-2 lg:text-base w-1/4">Password</th>
            </tr>
          </thead>
          <tbody className="bg-gradient-to-tl from-cyan-400 to-violet-400 text-center">
            {passwordArr.map((items, index) => {
              return (
                <tr key={index}>
                  <td className="border lg:text-lg text-sm border-t-0 border-r-0 py-2 min-h-full">
                    <span className="lg:inline min-h-full block pb-2 lg:pb-0">{items.use} </span>
                      <button className="pl-1" onClick={() => copyText(items.use)}>
                        <FaRegCopy />
                      </button>
                  </td>
                  <td className="border lg:text-lg text-sm py-2">
                    <span className="lg:inline block pb-2 lg:pb-0">{items.username} </span>
                      <button className="pl-1" onClick={() => copyText(items.username)}>
                        <FaRegCopy />
                      </button>
                  </td>
                  <td className="border lg:text-lg text-sm py-2 ">
                    <span className="lg:inline pb-2 lg:pb-0 block">{"#".repeat(items.password.length)}</span>
                      <button className="pl-1" onClick={() => copyText(items.password)}>
                        <FaRegCopy />
                      </button>
                      <button onClick={() => (editPass(items.id))} className="pl-1">
                        <FaEdit />
                      </button>
                      <button onClick={() => (delPass(items.id))}>
                        <MdDeleteForever />
                      </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Header;
