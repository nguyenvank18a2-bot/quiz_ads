import {UsersManager} from "@/components/admin/users-manager";
import {ProtectedPage} from "@/components/protected-page";
export default function AdminUsersPage(){return <ProtectedPage requiredRole="admin"><UsersManager/></ProtectedPage>}
