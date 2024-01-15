import { NextResponse } from "next/server";
import connectDB from "@/app/db/conn";
import Event from "@/app/db/schemaModel";
import { NextApiRequest } from "next";

connectDB();

export async function GET(req:Request) {
  try {
    const data = await Event.find({});
    return NextResponse.json(data);
  } catch (error:any) {
    return NextResponse.json(error.message);
  }
}

export async function POST(req:Request) {
  try {
    // const data = {
    //     eventname : "first event",
    //     location : "Mumbai",
    //     menuItems : {
    //         itemName : "Sweets",
    //         quantity : 100,
    //     },
    //     clientDetails :{
    //         clientName : "jhon Doe",
    //         contactNumber : 1010101010,
    //         email : "jhondoe@gmail.com"
    //     }
    // }

    const { data } = await req.json();
    const send = await Event.create(data);
    if (send) {
      return NextResponse.json(send);
    } else {
      return NextResponse.json("errro");
    }
  } catch (error:any) {
    console.log(error.message);
  }
}

export async function PUT(req:Request) {
  try {
    const data = await req.json();
    console.log(data.updateid);
    const new_data = data.fielddata;
    // console.log(field, new_data);

    // if (!updateData.acknowledged) {
    if (data.fieldname === "menuItems" || data.fieldname === "clientDetails") {
      const find = await Event.findById({ _id: data.updateid });
      let id;
      if (data.fieldname === "menuItems") {
        id = find.menuItems[data.index]._id.toString();
      } else {
        id = find.clientDetails[0]._id.toString();
      }
      const field = `${data.fieldname}.$.${data.innerfieldname}`;
      const fieldid = `${data.fieldname}._id`;
      console.log(field);
      console.log(id);
      const updateData = await Event.updateOne(
        { _id: data.updateid, [fieldid]: id },
        {
          $set: {
            [field]: new_data,
          },
        }
      );
      console.log(updateData);
    } else {
      let field;
      if (data.fieldname === "clientDetails") {
        field = `${data.fieldname}.$.${data.innerfieldname}`;
      } else {
        field = data.fieldname;
      }
      console.log(field);
      const updateData = await Event.updateOne(
        { _id: data.updateid },
        {
          $set: {
            [field]: new_data,
          },
        }
      );
      console.log(updateData);
    }

    // }
    // else{
    //     console.log("nhi hua")
    // }

    // if(updateData){
    return NextResponse.json(data.id);
    // }
  } catch (error:any) {
    console.log(error.message);
    return NextResponse.json(error.message);
  }
}

export async function DELETE(req:Request) {
  try {
    const { id } = await req.json();
    const delete_data = await Event.findByIdAndDelete(id);
    if (delete_data) {
      return NextResponse.json(id);
    }
    return NextResponse.json("message");
  } catch (error:any) {
    return NextResponse.json(error.message);
  }
}
