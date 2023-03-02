import axios from "axios";
import { paths } from "@/service/staff";
import { toStaff } from "@/service/staff-adapter";
import { Staff } from "@/entities/staff/staff";

const client = axios.create({
  baseURL: "http://localhost:8080",
});
export const listStaff = async () =>
  // search: string = "",
  // offset: number = 0,
  // limit: number = 10
  {
    const { data } = await client.get<
      paths["/staff-test/staffs"]["get"]["responses"][200]["schema"]
    >(`/staff-test/staffs`, {
      // params: {
      //   search,
      //   offset,
      //   limit,
      // },
    });
    // return data.data;
    return { data: data.data?.map(toStaff), total: data.total };
  };

export const createStaff = async (staff: Staff) => {
  const { data } = await client.post<
    paths["/staff-test/staffs"]["post"]["responses"][201]["schema"]
  >(`/staff-test/staffs`, toStaff(staff));
  return data;
};

export const getStaffById = async (staffId: string | undefined) => {
  const { data } = await client.get<
    paths["/staff-test/staffs/{staff_id}"]["get"]["responses"][200]["schema"]
  >(`/staff-test/staffs/${staffId}`);

  return toStaff(data);
};

export const updateStaff = async (staff: Staff) => {
  await client.put<
    paths["/staff-test/staffs/{staff_id}"]["put"]["responses"][200]["schema"]
  >(`/staff-test/staffs/${staff.id}`, toStaff(staff));
};

export const deleteStaff = async (staffId: string | undefined) => {
  await client.delete<
    paths["/staff-test/staffs/{staff_id}"]["delete"]["responses"][200]["schema"]
  >(`/staff-test/staffs/${staffId}`);
};
