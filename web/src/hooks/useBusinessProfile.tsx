// import { API_URL } from "@/lib/utils";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function useBusinessProfile() {
//   const p = useParams();
//   const orgName = p.pathname?.split("/")[2];
//   const [businessData, setBusinessData] = useState<object>({});
//   useEffect(() => {
//     async function getData() {
//       const res = await axios.post(
//         API_URL + "org/",
//         { orgName },
//         { withCredentials: true }
//       );
//       console.log(res);
//       if (res.status === 200) {
//         setBusinessData(res.data);
//       }
//     }
//     try {
//       getData();
//     } catch (error) {
//       console.error(error);
//     }
//   }, [businessData, orgName]);
//   return {
//     businessData,
//     orgName,
//   };
// }
