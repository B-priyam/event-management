"use client"

import React, { useState } from 'react'
import {  Box, Button, FormControl, FormLabel,  Input, MenuItem} from '@chakra-ui/react'
import Menuitem from './Menuitem';

const Post = () => {
  const [val,setval] = useState<never[][]>([])
  const [eventname,seteventname] = useState("");
  const [eventdate,seteventdate] = useState(Date);
  const [eventtime,seteventtime] = useState("");
  const [eventlocation,seteventlocation] = useState("");
  const [menuitem,setmenuitems] = useState([{
    itemName:"",
    quantity:"",
    specialRequirement:""
  }])
  const [clientname,setclientname] = useState("")
  const [clientnumber,setclientnumber] = useState("")
  const [clientemail,setclientemail] = useState("")

  const add = ()=>{
    const abc=[...val,[]]
    setval(abc)
  }

  const menuitems = (data:any)=>{
    console.log(data)
      setmenuitems([...menuitem,{itemName:data.itemName,quantity:data.quantity,specialRequirement:data.specialRequirements}])
      console.log(menuitem)
  }
  
  const submitHandler =async (e:any)=> {
    // e.preventdefault();
    const res = await fetch("http://localhost:3000/api/Event",{
      method:"post",
      body:JSON.stringify({
        data:{
        eventname:eventname,
        date:eventdate,
        time:eventtime,
        location:eventlocation,
        menuItems:menuitem,
        clientDetails:{
          clientName: clientname,
          contactNumber: clientnumber,
          email: clientemail,
        }}
      })
    })
    // const data = await res.json()

  }
console.log(eventdate)
  return (
    <Box width={"100%"} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Box width={"53%"} padding={"20px 20px"} bgColor={"white"} style={{borderRadius: "12px",
background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
boxShadow:  "36px 36px 68px #989898,-36px -36px 68px #ffffff"}} mt={10} borderRadius={10} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={'column'}>
      <FormControl width={"80%"}>
      <FormLabel>Event Name</FormLabel>
      <Input className='outline-none pl-3' type='email' width={"100%"} borderRadius={5} height={40} fontSize={24} placeholder='enter event name' value={eventname} onChange={(e:any)=>seteventname(e.target.value)}/>
      </FormControl>
      <FormControl width={"80%"}>
      <FormLabel>Event Date</FormLabel>
      <Input className='outline-none pl-3' type='date' width={"100%"} borderRadius={5} height={40} fontSize={24} placeholder='enter event name' value={eventdate} onChange={(e:any)=>seteventdate(e.target.value)}/>
      </FormControl>
      <FormControl width={"80%"}>
      <FormLabel>Event time</FormLabel>
      <Input className='outline-none pl-3' type='time' width={"100%"} borderRadius={5} height={40} fontSize={24} placeholder='enter event name' value={eventtime} onChange={(e:any)=>seteventtime(e.target.value)}/>
      </FormControl>
      <FormControl width={"80%"}>
      <FormLabel>event location</FormLabel>
      <Input className='outline-none pl-3' type='email' width={"100%"} borderRadius={5} height={40} fontSize={24} placeholder='enter event location' value={eventlocation} onChange={(e:any)=>seteventlocation(e.target.value)}/>
      </FormControl>
      <FormLabel className='w-4/5 items-start'>Add Items In Menu</FormLabel>
      <Menuitem onSubmit={menuitems}/>
      {val.map((data,i)=>{
        return (
          <div key={i}>
          <Menuitem onSubmit={menuitems}/>
          </div>
          )
        })}
        <p>Kindly fill the itemname and quantity and click on + icon to add the item in menu</p>
        <Button onClick={add} className='p-2 px-10 bg-black font-semibold rounded-full text-white  mt-3 '> Add more</Button>
      <FormLabel className='w-4/5'>Add Client Details</FormLabel>
      <Box className='px-10 my-3 gap-5'>
        <Input padding={10} width={"30%"} type='text' className='mx-2 rounded-md outline-none ' placeholder='client name' value={clientname} onChange={(e:any)=>setclientname(e.target.value)}/>
        <Input padding={10} width={"30%"} type='text' className='mx-2 rounded-md outline-none' placeholder='client number' value={clientnumber} onChange={(e:any)=>setclientnumber(e.target.value)}/>
        <Input padding={10} width={"30%"} type='text' className='mx-2 rounded-md outline-none' placeholder='client email' value={clientemail} onChange={(e:any)=>setclientemail(e.target.value)}/>
      </Box>
      <Button onClick={submitHandler}>Add event</Button>
      </Box>
    </Box>
  )
}

export default Post
