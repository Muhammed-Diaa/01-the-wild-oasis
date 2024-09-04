import { useEffect } from "react";
import { useGetUser } from "../services/apiAuth";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Meta from "../utils/Meta";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";

function Dashboard() {
  const { user } = useGetUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  });

  // if (!user.session) return <Loader />;
  return (
    <Meta title="Dashboard">
      <Row type="row">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </Meta>
  );
}

export default Dashboard;
