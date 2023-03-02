import {definitions} from "@/service/staff"
import {Staff} from "@/entities/staff/staff";
export const toStaff =(staff:definitions["fiber_server.Staff"]):Staff=>{
    return {
        id:staff.id,
        first_name:staff.first_name,
        last_name:staff.last_name,
        email:staff.email,
    };
}