import { useParams } from "react-router-dom";

export default function BusinessProfilePage() {
  const p = useParams();
  return <div className="">{p.orgname}</div>;
}
