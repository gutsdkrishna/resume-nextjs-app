import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);
const GetUserResumes = () => axiosClient.get("/user-resumes");
const UpdateResumeDetail = (id, data) =>
  axiosClient.put("/user-resumes/" + id, data);
const GetResumeById = (id) => axiosClient.get("/user-resumes/" + id);
const DeleteResumeById = (id) => axiosClient.delete("/user-resumes/" + id);
const CreateResumeWithDummyData = async (data) => {
  try {
    const response = await CreateNewResume(data);
    return response.data;
  } catch (error) {
    console.error('CreateResumeWithDummyData error:', error);
    throw error;
  }
};
export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,
  CreateResumeWithDummyData,
};
