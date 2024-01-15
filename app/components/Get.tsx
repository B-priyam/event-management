"use client";

import { DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {Input , Button} from "@chakra-ui/react"
import React, { useCallback, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Tooltip } from "@mui/material";



const Get = () => {
  const [data, setdata] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [visible,setvisible] = useState(false)
  const [fieldname,setfieldname] = useState("eventname");
  const [innerfieldname,setinnerfieldname] = useState("")
  const [fielddata,setfielddata] = useState("");
  const [updateid,setupdateid] = useState("");
  const [index,setindex] = useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const setinnerfieldnamefunc=()=>
  {fieldname==="menuItems"?setinnerfieldname("itemName"):setinnerfieldname("clientName")}

  const Delete = async (id:Number) => {
    const res = await fetch(`https://event-management-dusky.vercel.app/api/Event`, {
      method: "delete",
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await res.json();
    // console.log(data);
  };

  const Update = async()=>{
    console.log(fielddata,fieldname,innerfieldname,updateid,index)
    try {
        const res = await fetch("https://event-management-dusky.vercel.app/api/Event",{
          method:"Put",
          body:JSON.stringify({
              updateid,
              fielddata,
              fieldname,
              innerfieldname,
              index
          })
        })
    } catch (error:any) {
        console.log(error.message)
    }
  }

  useEffect(() => {
    fetch("https://event-management-dusky.vercel.app/api/Event")
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
      });
  }, []);

  // console.log(innerfieldname)

  return (
<>
    <div className="flex items-center justify-center mt-10 mb-10">
      <table
        className="p-10"
        cellPadding={10}
        cellSpacing={20}
        style={{ border: "2px solid black" }}
      >
        <th style={{ border: "2px solid black" }}>Name</th>
        <th style={{ border: "2px solid black" }}>Date</th>
        <th style={{ border: "2px solid black" }}>Time</th>
        <th style={{ border: "2px solid black" }}>Location</th>
        <th style={{ border: "2px solid black" }}>
          Menuitems
          <th style={{ borderRight: "1px solid black" }}>itemName</th>
          <th style={{ borderRight: "1px solid black" }}>quantity</th>
          <th>special Requirements</th>
        </th>
        <th style={{ border: "2px solid black" }}>
          ClientDetails
          <th style={{ borderRight: "1px solid black" }}>clientName</th>
          <th style={{ borderRight: "1px solid black" }}>contactNumber</th>
          <th>email</th>
        </th>
        {data.map((main:any) => {
          return (
            <tr key={main._id} className="p-10">
               
              <td style={{ border: "2px solid black" }} onClick={(e)=>console.log(e.target)}>{main.eventname}</td>
              <td style={{ border: "2px solid black" }}>
                {main.date.toString()}
              </td>
              <td style={{ border: "2px solid black" }}>{main.time}</td>
              <td style={{ border: "2px solid black" }}>{main.location}</td>
              <td style={{ border: "2px solid black" }}>
                <table cellPadding={20}>
                  {main.menuItems?.map((en:any,i:any) => {
                    return (
                      en.itemName!==""&&
                      <tr key={en._id} className="flex justify-center items-center relative">
                        <p className="left-1 absolute">{i}.</p>
                        <td style={{ borderRight: "1px solid black" }}>
                          {en.itemName}
                        </td>
                        <td style={{ borderRight: "1px solid black" }}>
                          {en.quantity}
                        </td>
                        <td>{en.specialRequirements}</td>
                      </tr>
                    );
                  })}
                </table>
              </td>
              <td style={{ border: "2px solid black" }}>
                <table cellPadding={10}>
                  {main.clientDetails.map((e:any) => {
                    return (
                      <tr key={e._id}>
                        <td style={{ borderRight: "1px solid black" }}>
                          {e.clientName}
                        </td>
                        <td style={{ borderRight: "1px solid black" }}>
                          {e.contactNumber}
                        </td>
                        <td>{e.email}</td>
                      </tr>
                    );
                  })}
                </table>
              </td>
              <td className="flex flex-row justify-between gap-4 items-center">
                <h4 onClick={() => Delete(main._id) } className="text-red-600 cursor-pointer underline"><DeleteIcon/></h4>
                <h4 className="text-yellow-600 cursor-pointer" onClick={()=>setupdateid(main._id)}><EditIcon onClick={handleOpen}/></h4>
              </td>
            </tr>
          );
        })}
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display={"flex"} flexDirection={"column"} gap={5} fontSize={24}>
        <select name="fieldname" id="fieldname" onChange={(e)=>{setfieldname(e.target.value);
        setinnerfieldnamefunc()}}
        onClick={()=>fieldname==="menuItems"||fieldname==="clientDetails"?setvisible(true):setvisible(false)} className="border-solid border border-black rounded-md px-2 py-1" >
          <option value="eventname">Name</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="location">Location</option>
          <option value="menuItems">Menuitems</option>
          <option value="clientDetails">ClientDetails</option>
        </select>
        {visible &&
        <div className="flex flex-row justify-between gap-4">
          {fieldname==="menuItems" &&  <Tooltip title="enter the item no." draggable className="text-2xl" aria-label='A tooltip'><Input type="Number" borderRadius="10px" className="w-14 pl-1" border="1px solid black" placeholder="no." onChange={(e:any)=>setindex(e.target.value)}/></Tooltip>}
        <select name={fieldname} id={fieldname} onChange={(e)=>setinnerfieldname(e.target.value)} className="border-solid border border-black rounded-lg w-full">
          <option value={fieldname==="menuItems"?"itemName":"clientName"}>{fieldname==="menuItems"?"itemName":"clientName"}</option>
          <option value={fieldname==="menuItems"?"quantity":"contactNumber"}>{fieldname==="menuItems"?"quantity":"contactNumber"}</option>
          <option value={fieldname==="menuItems"?"specialRequirements":"email"}>{fieldname==="menuItems"?"specialRequirements":"email"}</option>
        </select>
        </div>
        }
        <Input type={fieldname==="date"?"date":fieldname==="time"?"time":innerfieldname==="quantity"?"number":innerfieldname==="contactNumber"?"number":"text"} placeholder="Enter the new data" border="2px solid black" borderRadius="5px" padding="0px 5px" onChange={(e:any)=>setfielddata(e.target.value)} />
        {fielddata && fieldname &&<Button className="w-full px-3 rounded-full bg-black -mb-5 text-white" onClick={Update}>Change Data</Button>}
        <Button className="w-full -mb-5 p-1 rounded-md bg-red-500 text-white" onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
          </div>
          
</>    
  );
};

export default Get;
