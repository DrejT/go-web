import { useParams } from "react-router-dom";

export default function JobPage() {
  const { orgname, jobid } = useParams();
  console.log(orgname, jobid);
  return (
    <div>
      {orgname},{jobid}
    </div>
  );
}
