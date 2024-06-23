import { useParams } from "react-router-dom";

export default function BusinessProfile() {
  const p = useParams();
  return <div className="">{p.orgname}</div>;
}
