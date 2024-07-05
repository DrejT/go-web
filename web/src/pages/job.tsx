import useJobData from "@/hooks/useJobData";
import { useParams } from "react-router-dom";

export default function JobPage() {
  const { jobData } = useJobData();
  return <div></div>;
}
