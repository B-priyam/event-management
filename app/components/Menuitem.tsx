import { Alert, AlertTitle, Box, Input, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {AddIcon,CheckIcon} from "@chakra-ui/icons"


const Menuitem = (props:any) => {
  const [iconvalue,seticonvalue] = useState(true)
  const toast = useToast();
  const [data, setdata] = useState({
    itemName:"",
    quantity:"",
    specialRequirements:""
  });
  const handleclick = ()=>{
    if(data.itemName!=="" && data.quantity!==""){
      seticonvalue(false)
      props.onSubmit(data)
    }else{
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }


  return (
    <Box className="px-10 my-3 gap-5">
      <Input
        padding={10}
        width={"30%"}
        type="text"
        className="mx-2 rounded-md outline-none "
        placeholder="Item name"
        value={data.itemName}
        onChange={(e:any) => setdata({...data,itemName:e.target.value})}
      />
      <Input
        padding={10}
        width={"30%"}
        type="text"
        className="mx-2 rounded-md outline-none"
        placeholder="Quantity"
        value={data.quantity}
        onChange={(e:any) => setdata({...data,quantity:e.target.value})}
      />
      <Input
        padding={10}
        width={"30%"}
        type="text"
        className="mx-2 rounded-md outline-none"
        placeholder="Special Requirement"
        value={data.specialRequirements}
        onChange={(e:any) => setdata({...data,specialRequirements:e.target.value})}
      />
      {iconvalue?<button onClick={handleclick}><AddIcon/></button>:<button><CheckIcon/></button>}
    </Box>
  );
};

export default Menuitem;
