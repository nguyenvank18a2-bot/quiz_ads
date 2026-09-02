import {AdminDashboard} from "@/components/admin/admin-dashboard";
import {ProtectedPage} from "@/components/protected-page";
export default function AdminPage(){return <ProtectedPage requiredRole="admin"><AdminDashboard/></ProtectedPage>}
